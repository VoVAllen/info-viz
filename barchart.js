var bmargin = {top: 20, right: 20, bottom: 30, left: 40},
    bwidth = 600 - bmargin.left - bmargin.right,
    bheight = 400 - bmargin.top - bmargin.bottom;

// set the ranges
var bar_x = d3.scaleBand()
    .range([0, bwidth])
    .padding(0.1);
var bar_y = d3.scaleLinear()
    .range([bheight, 0]);

var bbsvg = d3.select("#v2").append("svg")
    .attr("id", "bbar")
    .attr("style","margin-top:100px")
    // .id("bar")
    .attr("width", bwidth + bmargin.left + bmargin.right)
    .attr("height", bheight + bmargin.top + bmargin.bottom)

var bar_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([0, 0])
    .html(function (d) {
        console.log(d);
        return d.title + " " + d.count;
    });
// bbsvg.call(bar_tip);
// bsvg.renderlet(function (chart) {
//   // rotate x-axis labels
//   chart.selectAll('g.x text')
//     .attr('transform', 'translate(-10,10) rotate(315)')});

var dd;

function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}


// get the data
d3.json("./python/barchart.json", function (error, data) {
    dd = data;
    // bar_render("computer vision and pattern recognition", 2007);

});

function bar_render(conf, year) {
    // debugger;
    console.log(111)
    d3.selectAll("#bbar > *").remove();
    bsvg = bbsvg
        .append("g")
        .attr("transform",
            "translate(" + bmargin.left + "," + bmargin.top + ")");

    d = dd[conf][year];
    let data = [];
    Object.keys(d).forEach(function (kkk) {
        data.push({
            title: d[kkk].title,
            count: d[kkk].count
        })
    });
    console.log(data)

    // format the data
    // data.forEach(function (d) {
    //     d.count = +d.count;
    // });

    // Scale the range of the data in the domains
    bar_x.domain(data.map(function (d) { return d.title; }));
    bar_y.domain([0, d3.max(data, function (d) { return d.count; })]);
    // debugger
    // append the rectangles for the bar chart
    bsvg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            console.log(d)
            return bar_x(d.title);
        })
        .attr("width", bar_x.bandwidth())
        .attr("y", function (d) {
            return bar_y(d.count);
        })
        .attr("height", function (d) { return bheight - bar_y(d.count); })
        .call(bar_tip)
        .on('mouseover', bar_tip.show)
        .on('mouseout', bar_tip.hide);
    ;

    // add the x Axis
    bsvg.append("g")
        .attr("transform", "translate(0," + bheight + ")")
        .call(d3.axisBottom(bar_x))
        .selectAll(".tick text")
        .call(wrap, bar_x.bandwidth());
    ;

    // add the y Axis
    bsvg.append("g")
        .call(d3.axisLeft(bar_y));
}
