var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 1600 - margin.left - margin.right,
    height = 900 - margin.top - margin.bottom;

var svgv1 = d3.select("#svg1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var color = d3.scaleOrdinal(d3.schemeCategory20);
//var rerange = d3.scaleLinear().range([10, 50]).domain([400, 4000]);
var format = d3.format(".2f");

var dat;
var dropdown;

function extracted_v1(data, conf) {
    data = data[conf];
    var count = 0;
    var colorRange = d3.scaleLinear().range([0, 600]).domain([0, 150]);
    var height = 50;
    var greyScale = d3.scaleLinear().range(["#FFFFFF", "#654EA3"]).domain([0, 1]);
    map = data;

    Object.keys(map).forEach(function (key) {
        value = map[key];
        count += 1;
//        var sum = new Array(value.length);
//        sum[0] = 0;
//        for (var i = 1; i < value.length; i++) {
//            sum[i] = sum[i - 1] + value[i - 1]
//        }
        console.log(key)
        // console.log(sum)
        var boxes = svgv1.append('g')
            .selectAll("rect")
            .data(value)
            .enter();

        y_ax = svgv1.append("text")
            .text(key)
            .attr('dy', '1.5em')
            .attr('dx', '1.5em')
            .attr("y", function (d) {
                return count * height
            });

        boxes.append('rect')
            .attr("x", function (d, index) {
                return index * 50 + 100
            })
            .attr("y", function (d) {
                return count * height
            })
            .attr("width", function (d, index) {
                return 50 + "px"
            })
            .attr("height", function (d) {
                return height + "px"
            })
            .attr("stroke", "white")
            .attr("fill", function (d, index) {
                return greyScale(value[index])
            })
            .on("mouseover", function (d) {
                byear = this.y.baseVal['value'] / height + 2000;
                bconf = $("#d1").dropdown('get value');
                bar_render(bconf, byear)
            });

        boxes.append("text")
            .text(function (d, index) {
                return format(d)
            })
            .attr("x", function (d, index) {
                return index * 50 + 100
            })
            .attr("y", function (d) { return count * height})
            .attr("dx", 10)
            .attr("dy", 25);
        // boxes.append('text')
        //     .text(function (d, index) {
        //         return index + 1
        //     })
        //     .attr("fill", "#654EA3")
        //     .attr("x", function (d, index) {
        //         return index * 50 + 100
        //     })
        //     .attr('dy', '5em')
        //     .attr('dx', '20px')
        //     .attr("y", function (d) {
        //           return count * height
        //     })
    });
}

d3.json("./data/view2.json", function (data) {
    dat = data;
    extracted_v1(dat, "IEEE Transactions on Pattern Analysis and Machine Intelligence");
    keys = Object.keys(dat)
    conf_list = [];
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] === "IEEE Transactions on Pattern Analysis and Machine Intelligence") {
            conf_list.push({
                name: keys[i],
                value: keys[i],
                selected: true
            })
        } else {
            conf_list.push({
                name: keys[i],
                value: keys[i]
            })
        }
    }
    console.log(conf_list)
    $('#d1')
        .dropdown({
            values: conf_list
        })
    ;
    $('#d1')
        .dropdown({
            onChange: function (e) {
                extracted_v1(dat, e)
            }
        })
    ;
});

