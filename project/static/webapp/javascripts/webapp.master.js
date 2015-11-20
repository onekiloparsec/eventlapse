(function () {
    'use strict';

    angular
        .module('webapp.master')
        .controller('MasterCtrl', function ($rootScope, $location, alertService) {

            $rootScope.closeAlert = alertService.closeAlert;

            // If the user attempts to access a restricted page, redirect them back to the main page.
            $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
                console.error("Unable to change routes.  Error: ", rejection);
                $location.path('/restricted').replace();
            });
        })
})();

