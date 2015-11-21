(function () {
    'use strict';

    angular
        .module('webapp.layout.services')
        .factory('ArticlesService', ArticlesService);

    ArticlesService.$inject = ['$http', '$window'];

    function ArticlesService($http, $window) {
        var ArticlesService = {
            all: all,
            get: get
        };

        ArticlesService.root_url = "http://eventlapse-prod.herokuapp.com/api/";

        return ArticlesService;

        ////////////////////

        function all(day_number) {
            var url = ArticlesService.root_url + "articles/";
            if (day_number !== undefined) {
                url += "?day_number="+day_number;
            }
            return $http.get(url);
        }

        function get(id, config) {
            return $http.get(ArticlesService.root_url + 'articles/' + id + '/', config);
        }
    }
})();

