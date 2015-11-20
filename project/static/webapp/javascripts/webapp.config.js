(function () {
    'use strict';

    angular
        .module('webapp.config')
        .config(config);

    config.$inject = ['$httpProvider', '$locationProvider', 'uiGmapGoogleMapApiProvider'];

    function config($httpProvider, $locationProvider, uiGmapGoogleMapApiProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        uiGmapGoogleMapApiProvider.configure({
            //key: 'YOUR KEY HERE',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    }
})();

