(function () {
    'use strict';

    angular
        .module('webapp.routes')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'IndexController',
                controllerAs: 'vm',
                templateUrl: '/static/webapp/templates/layout/index.html'
            })
    }
})();

