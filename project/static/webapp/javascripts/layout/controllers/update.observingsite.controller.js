(function () {
    'use strict';

    angular
        .module('webapp.layout.controllers')
        .controller('ObservingSiteUpdateController', ObservingSiteUpdateController);

    ObservingSiteUpdateController.$inject = ['$scope', '$routeParams', 'ObservingSites', 'Snackbar'];

    function ObservingSiteUpdateController($scope, $routeParams, ObservingSites, Snackbar) {
        var vm = this;
        vm.observingsitedetail = undefined;
        
        activate();

        function activate() {
            $scope.viewLoading = true;

            if ($routeParams.site_name !== "new" && $routeParams.site_name !== undefined) {
                ObservingSites.get($routeParams.site_name).then(successFn, errorFn);
            }

            function successFn(response, status, headers, config) {
                vm.observingsitedetail = response.data;
                $scope.viewLoading = false;
            }

            function errorFn(response, status, headers, config) {
                console.log(response);
                $scope.viewLoading = false;
            }
        }
    }
})();

