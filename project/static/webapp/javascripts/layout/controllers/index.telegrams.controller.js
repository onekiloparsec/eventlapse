(function () {
    'use strict';

    angular
        .module('webapp.layout.controllers')
        .controller('TelegramsIndexController', TelegramsIndexController);

    TelegramsIndexController.$inject = ['$scope', '$http', '$interval', 'Times', 'Telegrams', 'Snackbar'];

    function TelegramsIndexController($scope, $http, $interval, Times, Telegrams, Snackbar) {
        var vm = this;

        vm.telegrams = [];

        //var tick = function() {
        //    $scope.times = Times.all(vm.coordinates);
        //};
        //tick();
        //$interval(tick, 1000);

        activate();

        function activate() {
            $scope.viewLoading = true;

            Telegrams.all().then(telegramsSuccessFn, telegramsErrorFn);

            function telegramsSuccessFn(response) {
                vm.telegrams = response.data.results; // Paginated
            }

            function telegramsErrorFn(response) {
                console.log(response);
            }
        }
    }
})();

