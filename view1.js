var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 1600 - margin.left - margin.right,
    height = 1600 - margin.top - margin.bottom,
    offset = 425;
var resizeRadius = d3.scaleLinear().range([10, 50]);
var resizeOpacity1 = d3.scaleLinear().range([0.2, 0.8]);
var resizeOpacity2 = d3.scaleLinear().range([0.2, 0.8]);
var resizeWidth1 = d3.scaleLinear().range([0.5, 5]);
var resizeWidth2 = d3.scaleLinear().range([0.5, 5]);

var my_svg = d3.select("#bd")
    .insert("svg", ":first-child")
    .attr("id", "main")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var svg = my_svg
    .attr("width", 1200)
    .attr("height", 1200)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var color = d3.scaleOrdinal(d3.schemeCategory20);
var radius = 350;

var cursorX;
var cursorY;
document.onmousemove = function (e) {
    cursorX = e.pageX;
    cursorY = e.pageY;
};
var initialize = function (nodes) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
        node = nodes[i];
        node.index = i;
        var angle = 2 * Math.PI / nodes.length;
        node.x = radius * Math.cos(angle * i);
        node.y = radius * Math.sin(angle * i);
    }
};
var global_graph;
var render, conf = [];
var colorResize = d3.scaleLinear().range(['#b92636', 'white', '#3d428b']).domain([-1, 0, 1])
var layout = function (node, link1, link2, graph, index_graph) {

    var my_node = node
        .attr("transform", function (d) {
            x = offset + d.x;
            y = offset + d.y;
            return "translate(" + x + ',' + y + ')'
        });

    my_node.append("foreignObject")
        .attr("x", function (d) {
            return resizeRadius(d.count) * 0.9
        })
        .attr("y", function (d) {
            return resizeRadius(d.count) * 0.9
        })
        .attr("width", 200)
        .attr("height", 200)
        .append('xhtml:p')
        .append('p')
        .html(function (d) {
            return d.venue
        });

    my_node.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', function (d) {
            return resizeRadius(d.count)
        })
        .attr('fill', function (d) {
            return colorResize(d.cr)
        })
        .on('mouseover', tool_tip.show)
        .on('mouseout', tool_tip.hide);
    ;

    link1
        .attr("x1", function (d) { return offset + graph.nodes[index_graph[d.original]].x; })
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

            r = 100;
            l = 1 / 2 * Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            theta = Math.atan(r / l);

            return line([[x1, y1], [mid_x + r * Math.sin(theta), mid_y - r * Math.cos(theta)], [x2, y2]]).toString();

        })
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", function (d) {
            if (isNaN(resizeOpacity1(d.count))) {
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

            r = 100;
            l = 1 / 2 * Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            theta = Math.atan(r / l);

            return line([[x1, y1], [mid_x - r * Math.sin(theta), mid_y + r * Math.cos(theta)], [x2, y2]]).toString();

        })
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", function (d) {
            return resizeOpacity1(d.count);
        });

    try {
        link1.call(link_tip)
            .on('mouseover', link_tip.show)
            .on('mouseout', link_tip.hide);

        link2.call(link_tip)
            .on('mouseover', link_tip.show)
            .on('mouseout', link_tip.hide);
    } catch (err) {

    }
};


var tool_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-8, 0])
    .html(function (d) {
        console.log(d)
        return "# Pubs: " + d.count;
    });

var link_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([0, 0])
    .html(function (d) {
        console.log(d)
        return "Counts: " + d.count;
    });

// link_tip
svg.call(tool_tip);


d3.json("./data/view1.json", function (graph) {
    global_graph = graph
    render = function (year) {

        d3.selectAll("#main > *").remove();
        var links = graph.links;
        graph.nodes = graph['nodes_'][year];

        var index_graph = function (nodes) {
            var map = {};
            nodes.forEach(function (node, index) {
                map[node.venue] = index;
            });
            return map;
        }(graph.nodes);

        venue_list = graph.nodes.map(function (d) {return d.venue});

        graph.links1 = links[year].filter(function (d) {
            return (conf.indexOf(d.original) > -1) && (venue_list.indexOf(d.original) > -1) && (venue_list.indexOf(d.cites) > -1)
        });

        graph.links2 = links[year].filter(function (d) {
            return conf.indexOf(d.cites) > -1 && (venue_list.indexOf(d.original) > -1) && (venue_list.indexOf(d.cites) > -1)
        });

        venue_list.forEach(function (v, index) {
            o = links[year].filter(function (d) {
                return d.original === v
            });
            c = links[year].filter(function (d) {
                return d.cites === v
            });
            to = d3.sum(o, function (d) {
                return d.count
            });
            tc = d3.sum(c, function (d) {
                return d.count
            });
            if (to > tc) {
                cr = to / (to + tc);
            } else {
                cr = -tc / (to + tc)
            }
            ;
            year_list = graph['nodes_'][year];
            for (var k = 0; k < year_list.length; k++) {
                if (year_list[k].venue === v) {
                    graph.nodes[k].cr = cr;
                }
            }
        });
        console.debug(graph)
        resizeRadius.domain(d3.extent(graph.nodes, function (d) {return d.count}));
        resizeOpacity1.domain(d3.extent(graph.links1, function (d) {return d.count}));
        resizeOpacity2.domain(d3.extent(graph.links2, function (d) {return d.count}));
        resizeWidth1.domain(d3.extent(graph.links1, function (d) {return d.count}));
        resizeWidth2.domain(d3.extent(graph.links2, function (d) {return d.count}));

        var link1 = svg.append("g")
            .attr("class", "links1")
            .selectAll("path")
            .data(graph.links1)
            .enter()
            .append("path")
            .attr("stroke", '#b92636')
            .attr("stroke-width", function (d) {
                return resizeWidth1(d.count);
            });
        // link1.on("mouseover", link_tip.show)
        //     .on("mouseout", link_tip.hide);

        var link2 = svg.append("g")
            .attr("class", "links2")
            .selectAll("path")
            .data(graph.links2)
            .enter()
            .append("path")
            .attr("stroke", '#3d428b')
            .attr("stroke-width", function (d) {
                return resizeWidth2(d.count);
            });

        // .call(link_tip)
        // .on("mouseover",link_tip.show)
        // .on("mouseout",link_tip.hide);

        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(graph.nodes)
            .enter().append("g")
            .on("click", function (e) {
                if (conf.indexOf(e.venue) > -1) {
                    conf = conf.filter(function (d) {
                        return d !== e.venue
                    })
                } else {
                    conf.push(e.venue);
                }
                render(year)
            })
            .on('mouseover', function (d, i) {
                this.children[1].setAttribute("fill-opacity", 0.5);
                bar_render(d.venue, parseInt($('input[type="range"]').val()))
            })
            .on('mouseleave', function (d, i) {
                this.children[1].setAttribute("fill-opacity", 1)
            });

        initialize(graph.nodes);
        layout(node, link1, link2, graph, index_graph);
    };
    render(2009);

    $('#add-all').on('click', function (e) {
        conf = graph.nodes.map(function (d) {return d.venue});
        render(parseInt($('input[type="range"]').val()))
    });
    $('#clear-all').on('click', function (e) {
        conf = [];
        render(parseInt($('input[type="range"]').val()))
    });
});