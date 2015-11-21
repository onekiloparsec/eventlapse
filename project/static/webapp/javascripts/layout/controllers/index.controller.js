(function () {
    'use strict';

    angular
        .module('webapp.layout.controllers')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', '$routeParams', 'ArticlesService', 'TweetsService'];

    function IndexController($scope, $routeParams, ArticlesService, TweetsService) {
        var ctlr = this;
        cartodb.createVis('map', 'http://eventlapse.cartodb.com/api/v2/viz/47413b28-903d-11e5-8333-0e5db1731f59/viz.json');
        activate();
        $scope.articles = undefined;

        function activate() {

            d3.json("http://eventlapse-prod.herokuapp.com/api/articlecounts/?days=7", function(error, json) {
                if (error) return console.warn(error);
                createArticleCountChart(json);
            });

            $( "#slider" ).slider({
                max: 1856,
                min: 1,
                slide: function( event, ui ) {
                    $scope.tweets = undefined;
                    ArticlesService.all(ui.value).then(articlesSuccessFn, errorFn);
                },
                stop: function( event, ui ) {
                    setTimeout(function() {
                        for(var i=0;i<$scope.articles.length;i++) {
                            $scope.articles[i]['photo_url_delayed'] = $scope.articles[i]['photo_url'];
                        }
                    }, 1000);
                    TweetsService.all(ui.value).then(tweetsSuccessFn, errorFn);
                }
            });

            function articlesSuccessFn(response, status, headers, config) {
                $scope.articles = response.data;
                if ($scope.articles.length > 0) {
                    $scope.date = $scope.articles[0].date;
                }
                else {
                    $scope.date = undefined;
                }
            }

            function tweetsSuccessFn(response, status, headers, config) {
                $scope.tweets = response.data['statuses'];
            }

            function errorFn(response, status, headers, config) {
                console.log(response.error);
            }

            function createArticleCountChart(dataset) {
                var w = $('#map').width(), h = 50;

                var svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

                var xLabels = d3.time.scale().domain([new Date(2010, 11, 1), new Date(2016, 0, 1)]).range([0, w]);
                var xScale = d3.scale.linear().domain([0, dataset.length]).range([0, w]);
                var yScale = d3.scale.linear().domain([0, d3.max(dataset, function (d) {
                        return d.count;
                    })])
                    .range([0, h]);

                //var xAxis = d3.svg.axis().scale(xLabels).ticks(d3.time.months).tickFormat(d3.time.format("%B")).tickSize(-h).tickSubdivide(true);
                //svg.append("svg:g")
                //    .attr("class", "x axis")
                //    .attr("transform", "translate(0," + h + ")")
                //    .call(xAxis);

                var yAxisLeft = d3.svg.axis().scale(yScale).ticks(7).tickFormat("%.f").orient("left");
                svg.append("svg:g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(0," + h + ")")
                    .call(yAxisLeft);

                // Add a group for each row of data
                var groups = svg.selectAll("g.y")
                    .data(dataset)
                    .enter()
                    .append("g")
                    .style("fill", function(d, i) {
                        return "#000";
                    });

                // Add a rect for each data value
                var rects = svg.selectAll("rect")
                    .data(dataset)
                    .enter()
                    .append("rect")
                    .attr("x", function(d, i) {
                        return xScale(i);
                    })
                    .attr("y", function(d) {
                        return h-yScale(d.count);
                    })
                    .attr("height", function(d) {
                        return yScale(d.count);
                    })
                    .attr("width", xScale(1)*0.95)
                    .style("fill", "#000");
            }

        }
    }
})();

