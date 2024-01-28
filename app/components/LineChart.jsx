"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function LineChart() {
  const chartRef = useRef();

  useEffect(() => {
    // Data for the line plot
    const data = [1, 2, 3, 4, 5];

    // Set up the SVG container
    const svg = d3.select(chartRef.current);
    const width = 400;
    const height = 200;

    // Set up scales
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([height, 0]);

    // Create a line function
    const line = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d));

    // Append the line to the SVG
    svg
      .append("path")
      .data([data])
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "blue");

    // Append X-axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    // Append Y-axis
    svg.append("g").call(d3.axisLeft(yScale));
  }, []);

  return (
    <div>
      <svg ref={chartRef} width={400} height={200}></svg>
    </div>
  );
}
