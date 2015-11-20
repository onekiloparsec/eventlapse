(function () {
    'use strict';

    angular
        .module('webapp.layout.directives')
        .directive('bootstrapNavbar', bootstrapNavbar);

    function bootstrapNavbar() {
        var directive;
        directive = {
            restrict: 'E',
            replace: true,
            scope: {
                initial: '='
            },
            templateUrl: '/static/webapp/templates/layout/bootstrap.navbar.html',
            controller: ['$scope', '$rootScope', '$location', 'djangoAuth', function ($scope, $rootScope, $location, djangoAuth) {
                $scope.go = function ( path ) {
                    $location.path( path );
                };

                var toggleNavbarInitial = function() {
                    if ($location.path() === "/") {
                        $(".navbar").addClass("navbar__initial scrollspy_menu");
                        Waypoint.enableAll();
                    }
                    else {
                        Waypoint.disableAll();
                        $(".navbar").removeClass("navbar__initial scrollspy_menu");
                    }
                };

                $scope.authenticated = false;
                djangoAuth.authenticationStatus(true).then(function () {
                    $scope.authenticated = true;
                    djangoAuth.profile().then(function (data) {
                        $scope.profile = data;
                    });
                });

                $scope.$on('djangoAuth.logged_out', function () {
                    $scope.authenticated = false;
                    delete $scope.profile;
                });
                $scope.$on('djangoAuth.logged_in', function () {
                    $scope.authenticated = true;
                    djangoAuth.profile().then(function (data) {
                        $scope.profile = data;
                    });
                });

                toggleNavbarInitial();
                $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
                    toggleNavbarInitial();
                });
            }]
        };
        return directive;
    }
})();
