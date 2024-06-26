//U22978120

function createVisualization(data) {
  const svg = d3.select("#visualization");
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = svg.attr("width") - margin.left - margin.right;
  const height = svg.attr("height") - margin.top - margin.bottom;

  // Define scales
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.price))
    .range([height, 0]);

  // Create the main group element
  const g = svg.append("g")
    .attr("transform", `translate(<span class="math-inline">\{margin\.left\},</span>{margin.top})`);

  // Add the X axis
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Add the Y axis
  g.append("g")
    .call(d3.axisLeft(yScale));

  // Create the line path
  const line = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.price));

  // Add the line to the chart
  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 1.5)
    .attr("d", line);

   const tooltip = d3.select("#tooltip").style("opacity", 0);
//Create Mouseover function
  g.selectAll("line") 
    .data(data)
    .enter()
    .append("line")
    .attr("cx", d => xScale(d.date))
    .attr("cy", d => yScale(d.price))
    .attr("r", 3) // Adjust circle radius as needed
    .attr("fill", "steelblue")
    .on("mouseover", (event, d) => {
      tooltip.transition()
        .duration(200)
        .style("opacity", 0.9);
      tooltip.html(`
        Stock: ${d.stock}<br>
        Price: ${d.price}<br>
        Date: ${d.date.toLocaleDateString()}`
      )
        .style("left", (event.pageX + 5) + "px")
        .style("top", (event.pageY + 5) + "px");
    })
    .on("mouseout", () => {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });
}

