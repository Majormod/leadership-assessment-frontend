// components/ChordDiagram.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ChordDiagram = ({ data }) => {
    const ref = useRef();
    const { matrix, labels, colors } = data;

    useEffect(() => {
        if (!matrix || !labels || !colors) return;
        
        const width = 700;
        const height = 700;
        const outerRadius = Math.min(width, height) * 0.5 - 60;
        const innerRadius = outerRadius - 20;

        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;");

        svg.selectAll("*").remove(); // Clear previous renders

        const chord = d3.chord()
            .padAngle(0.05)
            .sortSubgroups(d3.descending);

        const chords = chord(matrix);

        const group = svg.append("g")
            .selectAll("g")
            .data(chords.groups)
            .join("g");

        group.append("path")
            .attr("fill", d => colors[d.index])
            .attr("d", d3.arc().innerRadius(innerRadius).outerRadius(outerRadius))
            .attr("stroke", d => d3.rgb(colors[d.index]).darker())
            .on("mouseover", function() { d3.select(this).style("fill-opacity", 0.8); })
            .on("mouseout", function() { d3.select(this).style("fill-opacity", 1); });

        group.append("text")
            .each(d => (d.angle = (d.startAngle + d.endAngle) / 2))
            .attr("dy", "0.35em")
            .attr("transform", d => `
                rotate(${(d.angle * 180 / Math.PI - 90)})
                translate(${outerRadius + 5})
                ${d.angle > Math.PI ? "rotate(180)" : ""}
            `)
            .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
            .text(d => labels[d.index]);

        svg.append("g")
            .attr("fill-opacity", 0.67)
            .selectAll("path")
            .data(chords)
            .join("path")
            .attr("d", d3.ribbon().radius(innerRadius))
            .attr("fill", d => colors[d.target.index])
            .attr("stroke", d => d3.rgb(colors[d.target.index]).darker());

    }, [matrix, labels, colors]);

    return <svg ref={ref}></svg>;
};

export default ChordDiagram;