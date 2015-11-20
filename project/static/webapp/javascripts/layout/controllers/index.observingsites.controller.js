(function () {
    'use strict';

    angular
        .module('webapp.layout.controllers')
        .controller('ObservingSitesIndexController', ObservingSitesIndexController);

    ObservingSitesIndexController.$inject = ['$rootScope', '$scope', '$location', 'ObservingSites', 'uiGmapGoogleMapApi', 'alertService', 'Snackbar'];

    function ObservingSitesIndexController($rootScope, $scope, $location, ObservingSites, uiGmapGoogleMapApi, alertService, Snackbar) {
        var vm = this;

        $scope.searchString = "";
        $scope.continents = ObservingSites.continents;
        $scope.observingsites = undefined;
        $scope.all_observingsites = undefined;
        $scope.filter_observingsites = false;

        $scope.toggleMapBoundsFiltering = function() {
            if ($scope.gmap !== undefined) {
                filterObservingSitesOnMapBounds();
                reloadMapMarkers();
            }
        };

        $scope.observingSiteCreating = false;
        $scope.createNewObservingSite = function() {
            if ($scope.searchString.length > 0 && $scope.map.zoom >= 10) {
                if ($rootScope.authenticated) {
                    $scope.observingSiteCreating = true;
                    var obsname = $scope.searchString;
                    ObservingSites.create(
                        obsname,
                        $scope.map.center.longitude.toString(),
                        $scope.map.center.latitude.toString(),
                        "0.0")
                        .then(function(response) {
                            $location.path('/observingsites/'+obsname)
                        },
                        function(response) {
                            var msg = "<strong>" + response.statusText + "</strong> ("+response.status+") ";
                            if (response.data.hasOwnProperty('coordinates')) {
                                msg += response.data.coordinates.non_field_errors;
                            }
                            alertService.addError(msg);
                        })
                }
                else {
                    alertService.addError("You must be authenticated to create a new observing site.");
                }
            }
            else {
                alertService.addError("Map zoom must be at least 10 to create a new observing site.");
            }
        };

        $scope.viewLoading = true;

        uiGmapGoogleMapApi.then(function(maps) {
            $scope.map = {
                center: {
                    latitude: 15.0,
                    longitude: 0.0
                },
                zoom: 1,
                markers: [], // array of models to display
                markersEvents: {
                    click: function(marker, eventName, model, args) {
                        $scope.map.window.model = model;
                        $scope.map.windowOptions.show = true;
                    }
                },
                window: {
                    model: {},
                    closeClick: function() {
                        this.model = {};
                        $scope.windowOptions.show = false;
                    }
                },
                options: {
                    scrollwheel: false,
                    dragging: true
                },
                closeClick: function () {
                    $scope.map.window.model = {};
                    $scope.map.windowOptions.show = false;
                },
                windowOptions: {
                    show: false
                },
                events: {
                    bounds_changed: function(map, eventName, args) {
                        $scope.gmap = map;
                        filterObservingSitesOnMapBounds();
                        reloadMapMarkers();
                    }
                }
            };

            $scope.zoomInToObservingSite = function(site) {
                $scope.map.center = site.coordinates;
                $scope.map.zoom = 8;
            };
        });

        ObservingSites.all().then(successFn, errorFn);

        function successFn(response, status, headers, config) {
            $scope.viewLoading = false;
            $scope.observingsites = response.data;
            $scope.all_observingsites = response.data;

            $scope.$watch(function() {
                return $scope.searchString;
            }, function(newValue, oldValue, scope) {
                reloadMapMarkers();
            });
        }

        function errorFn(response, status, headers, config) {
            $scope.viewLoading = false;
            Snackbar.error(response.error);
            console.log(response.error);
        }

        function filterObservingSitesOnMapBounds() {
            $scope.observingsites = $scope.all_observingsites.filter(function (el) {
                if (el.coordinates == null) { return true; }
                var ll = new google.maps.LatLng(el.coordinates.latitude, el.coordinates.longitude);
                return !$scope.filter_observingsites || $scope.gmap.getBounds().contains(ll);
            });
        }

        function reloadMapMarkers() {
            var markers = [];
            for (var i = 0; i < $scope.observingsites.length; i++) {
                var site = $scope.observingsites[i];
                var siteName = ('name' in site && site.name !== null) ? site.name : "";
                var siteCountry = ('country' in site && site.country !== null) ? site.country : "";

                if (site.coordinates != null &&
                    ($scope.searchString.length == 0 ||
                    siteName.indexOf($scope.searchString) > -1 ||
                    siteCountry.indexOf($scope.searchString) > -1))
                {
                    var marker = {
                        "idKey": site.id,
                        "coords": {
                            "latitude": site.coordinates.latitude,
                            "longitude": site.coordinates.longitude
                        },
                        "name": site.name,
                        "country": site.country,
                        "icon": "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    };
                    markers.push(marker);
                }
            }
            $scope.map.markers = markers;
        }
    }
})();

