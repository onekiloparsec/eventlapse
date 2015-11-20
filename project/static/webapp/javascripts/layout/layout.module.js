(function () {
    'use strict';

    angular
        .module('webapp.layout', [
            'webapp.layout.services',
            'webapp.layout.controllers',
            'webapp.layout.directives'
        ]);

    angular
        .module('webapp.layout.services', ['ui.bootstrap']);

    angular
        .module('webapp.layout.controllers', ['timer', 'ui.bootstrap']);

    angular
        .module('webapp.layout.directives', []);

})();
