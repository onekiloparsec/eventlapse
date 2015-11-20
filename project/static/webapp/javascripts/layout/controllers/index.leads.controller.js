(function () {
    'use strict';

    angular
        .module('webapp.layout.controllers')
        .controller('LeadsIndexController', LeadsIndexController);

    LeadsIndexController.$inject = ['$scope', '$location'];

    function LeadsIndexController($scope, $location) {
        var vm = this;
        activate();
        function activate() {
            $scope.leads_name = $location.path().substr(1);
            if ($location.path() == "/OMM") {
                $scope.leads_welcome = "Bienvenue sur arcsecond.io"
            }
        }
    }
})();
