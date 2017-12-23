var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 1600 - margin.left - margin.right,
    height = 1600 - margin.top - margin.bottom,
    offset = 500;
var resizeRadius = d3.scaleLinear().range([10, 50]);
var resizeOpacity1 = d3.scaleLinear().range([0.2, 0.8]);
var resizeOpacity2 = d3.scaleLinear().range([0.2, 0.8]);
var resizeWidth1 = d3.scaleLinear().range([0.5, 5]);
var resizeWidth2 = d3.scaleLinear().range([0.5, 5]);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var color = d3.scaleOrdinal(d3.schemeCategory20);
var radius = 400;

var initialize = function (nodes) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
        node = nodes[i];
        node.index = i;
        var  angle = 2 * Math.PI / nodes.length;
        node.x = radius * Math.cos(angle * i);
        node.y = radius * Math.sin(angle * i);
    }
};
var render,conf=[];

var layout = function (node, link1, link2, graph, index_graph) {

    var nodes_g = node
        .attr("transform", function (d) {
            x = offset + d.x;
            y = offset + d.y;
            return "translate(" + x + ',' + y + ')'
        });
    nodes_g.append("foreignObject")

        .attr("x", function (d) {
            theta=Math.acos(d.x/radius);
            return resizeRadius(d.count)*Math.cos(theta) })
        .attr("y", function (d) {
            theta=Math.acos(d.x/radius);
            return resizeRadius(d.count)*Math.sin(theta) })
        .attr("width", 200)
        .attr("height", 200)
        .append('xhtml:p')
        .append('p')
        .html(function (d) {
            return d.venue
        });
    nodes_g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', function (d) {return resizeRadius(d.count)})
        .attr('fill', "#6867e8");
    link1
        .attr("x1", function (d) {
            return offset + graph.nodes[index_graph[d.original]].x;
        })
        .attr("y1", function (d) { return offset + graph.nodes[index_graph[d.original]].y; })
        .attr("x2", function (d) { return offset + graph.nodes[index_graph[d.cites]].x; })
        .attr("y2", function (d) { return offset + graph.nodes[index_graph[d.cites]].y; })
        .attr('d', function (d) {

            x1 = offset + graph.nodes[index_graph[d.original]].x;
            y1 = offset + graph.nodes[index_graph[d.original]].y;
            x2 = offset + graph.nodes[index_graph[d.cites]].x;
            y2 = offset + graph.nodes[index_graph[d.cites]].y;

            line = d3.line().curve(d3.curveBasis);

            mid_x = (x1 + x2) / 2;
            mid_y = (y1 + y2) / 2;

            r=100;
            l=1/2*Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
            theta=Math.atan(r/l);

            // delta_x=100;
            // delta_y
            return line([[x1, y1], [mid_x + r*Math.sin(theta), mid_y - r*Math.cos(theta)], [x2, y2]]).toString();

        })
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", function (d) {
            if (isNaN(resizeOpacity1(d.count))){
                debugger
            }
            return resizeOpacity1(d.count)
        });

    link2
        .attr("x1", function (d) {
            return offset + graph.nodes[index_graph[d.original]].x;
        })
        .attr("y1", function (d) { return offset + graph.nodes[index_graph[d.original]].y; })
        .attr("x2", function (d) { return offset + graph.nodes[index_graph[d.cites]].x; })
        .attr("y2", function (d) { return offset + graph.nodes[index_graph[d.cites]].y; })
        .attr('d', function (d) {


            x1 = offset + graph.nodes[index_graph[d.original]].x;
            y1 = offset + graph.nodes[index_graph[d.original]].y;
            x2 = offset + graph.nodes[index_graph[d.cites]].x;
            y2 = offset + graph.nodes[index_graph[d.cites]].y;

            line = d3.line().curve(d3.curveBasis);

            mid_x = (x1 + x2) / 2;
            mid_y = (y1 + y2) / 2;

            r=100;
            l=1/2*Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
            theta=Math.atan(r/l);

            // delta_x=100;
            // delta_y
            return line([[x1, y1], [mid_x - r*Math.sin(theta), mid_y + r*Math.cos(theta)], [x2, y2]]).toString();

        })
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", function (d) {
            return resizeOpacity1(d.count);
        });
};

//
// $('input[type="range"]').rangeslider({
//     onSlide:function (position, value) {
//         console.log(value)
//     }
// });

d3.json("rrr2.json", function (graph) {
    render=function (year) {
        d3.selectAll("svg > *").remove();
        var links = graph.links;
        graph.nodes = graph['nodes_'][year];
        venue_list=graph.nodes.map(function(d){return d.venue});
        graph.links1 = links[year].filter(function (d) {
            return (conf.indexOf(d.original) > -1)&&(venue_list.indexOf(d.original)>-1)&&(venue_list.indexOf(d.cites)>-1)
        });
        graph.links2 = links[year].filter(function (d) {
            return conf.indexOf(d.cites) > -1&&(venue_list.indexOf(d.original)>-1)&&(venue_list.indexOf(d.cites)>-1)
        });
        resizeRadius.domain(d3.extent(graph.nodes, function (d) {return d.count}));
        resizeOpacity1.domain(d3.extent(graph.links1, function (d) {return d.count}));
        resizeOpacity2.domain(d3.extent(graph.links2, function (d) {return d.count}));
        resizeWidth1.domain(d3.extent(graph.links1, function (d) {return d.count}));
        resizeWidth2.domain(d3.extent(graph.links2, function (d) {return d.count}));


        var index_graph = function (nodes) {
            var map = {};
            nodes.forEach(function (node, index) {
                map[node.venue] = index;
            });
            return map;
        }(graph.nodes);


        // d3.select("#year").on("input", function () {
        //     console.log(this.value);
        //     render(this.value, conf);
        // });
        // $('input[type="range"]').rangeslider({
        //     onSlide:function (position, value) {
        //         console.log(value)
        //         render(value, conf)
        //     }
        // })
        var link1 = svg.append("g")
            .attr("class", "links1")
            .selectAll("path")
            .data(graph.links1)
            .enter()
            .append("path")
            .attr("stroke", '#ee4c50')
            .attr("stroke-width", function (d) {
                return resizeWidth1(d.count);
            });
        var link2 = svg.append("g")
            .attr("class", "links2")
            .selectAll("path")
            .data(graph.links2)
            .enter()
            .append("path")
            .attr("stroke", '#8194ff')
            .attr("stroke-width", function (d) {
                return resizeWidth2(d.count);
            });

        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(graph.nodes)
            .enter().append("g")
            .on("click", function (e) {
                if (conf.indexOf(e.venue) > -1) {
                    // debugger
                    conf = conf.filter(function (d) {
                        return d !== e.venue
                    })
                }
                else {
                    conf.push(e.venue);
                }
                render(year)
            }).on('mouseover',function (d,i) {
                this.children[1].setAttribute("fill-opacity",0.5)

            }).on('mouseleave',function (d,i) {
                this.children[1].setAttribute("fill-opacity",1)

            });

        initialize(graph.nodes);
        // debugger
        layout(node, link1, link2, graph, index_graph);
    };

    render(2009)
    // debugger
    $('#add-all').on('click',function (e) {
        conf=graph.nodes.map(function(d){return d.venue});
        render(parseInt($('input[type="range"]').val()))
    });
    $('#clear-all').on('click',function (e) {
        conf=[];
        render(parseInt($('input[type="range"]').val()))
    });
});
