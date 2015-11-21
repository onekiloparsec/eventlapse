(function () {
    'use strict';

    angular
        .module('webapp.layout.services')
        .factory('ArticlesService', ArticlesService);

    ArticlesService.$inject = ['$http'];

    function ArticlesService($http) {
        var ArticlesService = {
            all: all,
            get: get
        };

        return ArticlesService;

        ////////////////////

        function all(day_number) {
            var url = "/api/articles/";
            if (day_number !== undefined) {
                url += "?day_number="+day_number;
            }
            return $http.get(url);
        }

        function get(id, config) {
            return $http.get('/api/articles/' + id + '/', config);
        }
    }
})();

