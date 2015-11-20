(function () {
    'use strict';

    angular
        .module('webapp', [
            'webapp.config',
            'webapp.master',
            'webapp.routes',
            'webapp.utils',
            'webapp.layout'
        ]);

    angular
        .module('webapp.config', ['uiGmapgoogle-maps']);

    angular
        .module('webapp.filters', []);

    angular
        .module('webapp.master', []);

    angular
        .module('webapp.routes', ['ngRoute']);

    angular
        .module('webapp.layout', ['ui.bootstrap']);

    angular
        .module('webapp')
        .run(run);

    run.$inject = ['$http', '$window'];

    function run($http, $window) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
        $http.defaults.withCredentials = true;
    }
})();
