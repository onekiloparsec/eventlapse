(function () {
    'use strict';

    angular
        .module('webapp.filters', [])
        .filter('nameContainsSubstring', function () {
            return function (items, searchString) {
                if (searchString === undefined) {
                    return items;
                }
                var filtered = [];
                var stringRegex = new RegExp(searchString, 'i');
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (stringRegex.test(item.name)) {
                        filtered.push(item);
                    }
                }
                return filtered;
            };
        });

    angular
        .module('webapp.filters')
        .filter('timeAgo', ['$interval', function ($interval) {
            $interval(function (){}, 60000);

            function fromNowFilter(time){
                return moment(time).fromNow();
            }

            fromNowFilter.$stateful = true;
            return fromNowFilter;
        }]);

    angular
        .module('webapp.filters')
        .filter('timeSince', function () {
            function sinceFilter(time){
                return moment(time).calendar();
            }
            return sinceFilter
        });

    angular
        .module('webapp.filters')
        .filter('sexagesimal', function (numberFilter) {
            function isNumeric(value) {
                return (!isNaN(parseFloat(value)) && isFinite(value));
            }

            return function (inputNumber, isHour) {
                if (isNumeric(inputNumber)) {
                    var sign = (inputNumber < 0) ? '-' : '';
                    if (isHour !== undefined) {
                        inputNumber /= 15.0;
                    }
                    var absNumber = Math.abs(inputNumber);
                    var degrees = Math.floor(absNumber);
                    var minutes = Math.floor((absNumber - degrees)*60.0);
                    var seconds = (absNumber - degrees - minutes/60.0) * 3600.0;
                    return sign+degrees.toString()+':'+minutes.toString()+':'+seconds.toFixed(2).toString();
                }
                else {
                    return inputNumber;
                }
            }
        });

})();

