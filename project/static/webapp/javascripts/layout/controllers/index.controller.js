(function () {
    'use strict';

    angular
        .module('webapp.layout.controllers')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', '$routeParams', 'ArticlesService'];

    function IndexController($scope, $routeParams, ArticlesService) {
        var ctlr = this;
        cartodb.createVis('map', 'http://documentation.cartodb.com/api/v2/viz/2b13c956-e7c1-11e2-806b-5404a6a683d5/viz.json');
        activate();
        $scope.articles = undefined;

        function activate() {

            d3.json("http://eventlapse-prod.herokuapp.com/api/articlecounts/?days=7", function(error, json) {
                if (error) return console.warn(error);
                createArticleCountChart(json);
            });

            $( "#slider" ).slider({
                max: 1856,
                min: 0,
                slide: function( event, ui ) {
                    console.log(ui.value);
                }
            });

            ArticlesService.all(1).then(successFn, errorFn);

            function successFn(response, status, headers, config) {
                $scope.articles = response.data;
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

