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
                templateUrl: '/static/webapp/templates/layout/index.www.html'
            })
            .when('/accounts/login/', {
                templateUrl: '/static/webapp/templates/authentication/login.html',
                resolve: {
                    authenticated: ['djangoAuth', function(djangoAuth){
                        return djangoAuth.authenticationStatus();
                    }]
                }
            })
            .when('/accounts/logout/', {
                templateUrl: '/static/webapp/templates/authentication/logout.html',
                resolve: {
                    authenticated: ['djangoAuth', function(djangoAuth){
                        return djangoAuth.authenticationStatus();
                    }]
                }
            })
            .when('/accounts/register/', {
                templateUrl: '/static/webapp/templates/authentication/register.html',
                resolve: {
                    authenticated: ['djangoAuth', function(djangoAuth){
                        return djangoAuth.authenticationStatus();
                    }]
                }
            })
            .when('/users/:username/', {
                templateUrl: '/static/webapp/templates/authentication/userprofile.html',
                resolve: {
                    authenticated: ['djangoAuth', function(djangoAuth){
                        return djangoAuth.authenticationStatus();
                    }]
                }
            })
            .when('/observingsites', {
                controller: 'ObservingSitesIndexController',
                controllerAs: 'vm',
                templateUrl: '/static/webapp/templates/layout/index.observingsites.html'
            })
            .when('/observingsites/activity', {
                controller: 'ObservingSitesActivityController',
                controllerAs: 'vm',
                templateUrl: '/static/webapp/templates/layout/activity.observingsites.html'
            })
            .when('/observingsites/:site_name', {
                controller: 'ObservingSiteUpdateController',
                controllerAs: 'vm',
                templateUrl: '/static/webapp/templates/layout/update.observingsite.html',
                resolve: {
                    authenticated: ['djangoAuth', function(djangoAuth){
                        return djangoAuth.authenticationStatus();
                    }]
                }
            })
            .when('/archives', {
                controller: 'ArchivesIndexController',
                controllerAs: 'vm',
                templateUrl: '/static/webapp/templates/layout/index.archives.html'
            })
            .when('/telegrams', {
                controller: 'TelegramsIndexController',
                controllerAs: 'vm',
                templateUrl: '/static/webapp/templates/layout/index.telegrams.html'
            })
            .when('/OMM', {
                controller: 'LeadsIndexController',
                controllerAs: 'vm',
                templateUrl: '/static/webapp/templates/layout/index.leads.html'
            });
    }
})();

