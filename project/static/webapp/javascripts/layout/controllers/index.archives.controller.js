(function () {
    'use strict';

    angular
        .module('webapp.layout.controllers')
        .controller('ArchivesIndexController', ArchivesIndexController);

    ArchivesIndexController.$inject = ['$scope', '$interval', 'Archives', 'Times', 'Telescopes', 'ObservingSites', 'Snackbar'];

    function ArchivesIndexController($scope, $interval, Archives, Times, Telescopes, ObservingSites, Snackbar) {
        var vm = this;

        vm.data_rows = [];
        vm.coordinates = undefined;
        vm.instruments = [];
        vm.telescopes = {};
        vm.observingsites = {};
        vm.first_data_row_date = undefined;

        vm._telRowsMapping = {};

        var tick = function() {
            $scope.times = Times.all(vm.coordinates);
        };
        tick();
        $interval(tick, 1000);

        $scope.updateCountdownFinished = function(timer) {
            fetch_last_data_rows();
        };

        activate();

        function activate() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(positionSuccessFn, positionErrorFn, {enableHighAccuracy: true});
            }

            fetch_last_data_rows();

            function positionSuccessFn(position) {
                vm.coordinates = position.coords;
            }

            function positionErrorFn(error) {
                console.log(error);
            }
        }

        function fetch_last_data_rows() {
            $scope.viewLoading = true;

            Archives.latest('ESO', {start:vm.first_data_row_date}).then(archivesSuccessFn, archivesErrorFn);

            function archivesSuccessFn(response, status, headers, config) {
                var new_rows_count = 0;
                if (undefined !== response.data.results && undefined !== response.data.count) {
                    new_rows_count = response.data.results.length;
                    vm.data_rows = response.data.results.concat(vm.data_rows);
                }
                else {
                    new_rows_count = response.data.length;
                    vm.data_rows = response.data.concat(vm.data_rows);
                }

                var telescope_identifiers = [];
                for (var i = 0; i < new_rows_count; i++) {
                    var data_row = vm.data_rows[i];
                    if (i == 0) {
                        vm.first_data_row_date = data_row.date;
                    }

                    if ($.inArray(data_row.instrument_name, vm.instruments) == -1) {
                        vm.instruments.push(data_row.instrument_name);
                    }

                    if (data_row.telescope !== undefined && data_row.telescope != null && isNumeric(data_row.telescope)) {
                        var telescope_id = data_row.telescope.toString();
                        if (undefined === vm.telescopes[telescope_id]) {
                            if (vm._telRowsMapping[telescope_id] == undefined) {
                                vm._telRowsMapping[telescope_id] = [];
                            }
                            vm._telRowsMapping[telescope_id].push(data_row);

                            if ($.inArray(telescope_id, telescope_identifiers) == -1) {
                                telescope_identifiers.push(telescope_id);
                            }
                        }
                        else {
                            data_row.telescope = vm.telescopes[telescope_id];
                        }
                    }
                }

                for (var j = 0; j < telescope_identifiers.length; j++) {
                    Telescopes.get(telescope_identifiers[j]).then(telescopeSuccessFn, telescopeErrorFn);
                }

                $scope.viewLoading = false;
                document.getElementById("timer")['start']();
            }

            function archivesErrorFn(response, status, headers, config) {
                console.log('Failed to load data from /archives/ APIs. Restarting timer.');
                $scope.viewLoading = false;
                document.getElementById("timer")['start']();
            }

            function telescopeSuccessFn(response) {
                var telescope = response.data;
                var telescope_id = telescope.id.toString();

                vm.telescopes[telescope_id] = telescope;

                var data_rows = vm._telRowsMapping[telescope_id];
                for (var i = 0; i < data_rows.length; i++) {
                    data_rows[i].telescope = telescope;
                }
                delete vm._telRowsMapping[telescope_id];

                var encoded_observingsite_name = URI(telescope.observing_site).path().split("/").filter(function (el) {return el.length}).pop();
                var observingsite_name = decodeURIComponent(encoded_observingsite_name);

                ObservingSites.get(observingsite_name, {telescope: telescope}).then(observingsiteSuccessFn, observingsiteErrorFn);
            }

            function telescopeErrorFn(response) {
                console.log('Failed to load data from /telescopes/ APIs.');
            }

            function observingsiteSuccessFn(response) {
                var observingsite = response.data;
                var telescope = response.config.telescope;
                telescope.observingsite = observingsite;
            }

            function observingsiteErrorFn(response) {
                console.log('Failed to load data from /observingsites/ APIs.');
            }

            function isNumeric(value) {
                return (!isNaN(parseFloat(value)) && isFinite(value));
            }
        }
    }
})();

