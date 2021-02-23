d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json").then(function(data) {


    var svg = d3.select("#canvas").append("svg")
        .attr("height", 1000)
        .attr("width", 1000)
        .style("color", "white")
        .style("margin-left", "10%");


    var root = d3.hierarchy(data)

    var treemaplayout = d3.treemap()
        .size([1000, 800])

    .paddingInner(1)




    root.sum(function(d) {
        return d.value
    })

    treemaplayout(root);




    var tooltip = d3.select('body')
        .append('div')
        .attr("id", "tooltip")
        .style("height", "40px")
        .style("width", "500px")
        .style("z-index", "500")
        .style("visibility", "visible")
        .style("text-align", "center")
        .style("color", "black")
        .style("position", "absolute")
        .style("bottom", "80px")
        .style("left", "50%");



    var cell = svg
        .selectAll('g')
        .data(root.leaves())
        .enter()
        .append('g')

    .attr("transform", (d) => "translate(" + d.x0 + "," + d.y0 + ")")
        .on("mouseover", function(d) {
            tooltip.style('visibility', 'visible')
                .attr("data-value", d.value);
            tooltip.text("Title: " + d.data.name + " , " + "Platform: " + d.data.category + " , " + "Value: " + d.value).style("color", "white");
        })
        .on("mouseout", function() {
            tooltip.style('visibility', 'hidden');
        })


    var tilecolor = d3.scaleOrdinal()
        .domain((data.children.map(c => c.name))) //genre
        .range(['purple', 'green', 'red', 'orange', 'white', 'blue', 'grey']);

    var tile = cell.append("rect")
        .attr("class", "tile")
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("data-name", (d) => d.data.name)
        .attr("data-value", (d) => d.data.value)
        .attr("data-category", (d) => d.data.category)
        .attr("fill", d => tilecolor(d.data.category));




    cell.append("text")
        .text((d) => d.data.name)
        .attr("class", "cellText")
        .attr("transform", "translate(0,13)")
        .style("fill", "black");







})

// reference: https://codepen.io/uncledolan/pen/VgyyXp