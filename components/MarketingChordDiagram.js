// components/MarketingChordDiagram.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MarketingChordDiagram = ({ matrixData }) => {
    const ref = useRef();
    const { matrix, labels, colors } = matrixData;

    useEffect(() => {
        if (!matrix || !labels || !colors) return;
        
        // The viewBox defines the coordinate system. We'll keep it at 700x700.
        const viewboxSize = 700;
        const outerRadius = viewboxSize * 0.5 - 110; // Increased margin for text
        const innerRadius = outerRadius - 20;

        const svg = d3.select(ref.current)
            // Remove fixed width/height, use viewBox for scaling
            .attr("viewBox", [-viewboxSize / 2, -viewboxSize / 2, viewboxSize, viewboxSize])
            // This style makes it scale within the parent div
            .attr("style", "width: 100%; height: auto; max-width: 100%;");
        
        svg.selectAll("*").remove();

        const chord = d3.chord().padAngle(0.05).sortSubgroups(d3.descending);
        const chords = chord(matrix);

        const group = svg.append("g").selectAll("g").data(chords.groups).join("g");

        group.append("path")
            .attr("fill", d => colors[d.index])
            .attr("d", d3.arc().innerRadius(innerRadius).outerRadius(outerRadius));

        group.append("text")
            .each(d => (d.angle = (d.startAngle + d.endAngle) / 2))
            .attr("dy", "0.35em")
            .attr("transform", d => `
                rotate(${(d.angle * 180 / Math.PI - 90)})
                translate(${outerRadius + 15})
                ${d.angle > Math.PI ? "rotate(180)" : ""}
            `)
            .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
            .text(d => labels[d.index])
            .style("font-size", "16px") // Slightly larger font for clarity
            .style("font-weight", "bold");

        svg.append("g")
            .attr("fill-opacity", 0.75)
            .selectAll("path")
            .data(chords)
            .join("path")
            .attr("fill", d => colors[d.source.index])
            .attr("d", d3.ribbon().radius(innerRadius));

    }, [matrix, labels, colors]);

    return <svg ref={ref}></svg>;
};

export default MarketingChordDiagram;