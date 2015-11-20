(function () {
    'use strict';

    angular
        .module('webapp.layout.services')
        .factory('alertService', alertService);

    alertService.$inject = ['$rootScope'];

    function alertService($rootScope) {
        var alertService = {};

        // create an array of alerts available globally
        $rootScope.alerts = [];

        alertService.add = function(type, msg) {
            $rootScope.alerts.push({'type': type, 'msg': msg});
        };

        alertService.addError = function(msg) {
            alertService.add("danger", msg);
        };

        alertService.addWarning = function(msg) {
            alertService.add("warning", msg);
        };

        alertService.addInfo = function(msg) {
            alertService.add("info", msg);
        };

        alertService.addSuccess = function(msg) {
            alertService.add("success", msg);
        };

        alertService.closeAlert = function(index) {
            $rootScope.alerts.splice(index, 1);
        };

        return alertService;
    }
})();

