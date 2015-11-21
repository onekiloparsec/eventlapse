(function () {
    'use strict';

    angular
        .module('webapp.layout.services')
        .factory('TweetsService', TweetsService);

    TweetsService.$inject = ['$http'];

    function TweetsService($http) {
        var TweetsService = {
            all: all
        };

        return TweetsService;

        ////////////////////

        function all(day_number) {
            var url = "/api/tweets/";
            if (day_number !== undefined) {
                url += "?day_number="+day_number;
            }
            return $http.get(url);
        }
    }
})();

