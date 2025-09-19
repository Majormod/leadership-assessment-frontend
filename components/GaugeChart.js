// components/GaugeChart.js
import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

const GaugeChart = ({ strengths }) => {
    if (!strengths || strengths.length === 0) return null;

    const segmentColors = ['#021B79', '#032a9a', '#0439ba', '#0575E6'];
    const averageScore = strengths.reduce((acc, s) => acc + s.score, 0) / strengths.length;

    // CORRECTED LOGIC: Create segment stops that correctly start at 0 and end at 10.
    const segmentStops = [0];
    strengths.forEach((s, i) => {
        segmentStops.push(((i + 1) / strengths.length) * 10);
    });

    return (
        <div style={{ textAlign: 'center', position: 'relative' }}>
            <ReactSpeedometer
                maxValue={10}
                value={averageScore}
                needleHeightRatio={0.7}
                needleColor="#333333"
                startColor="#EAECEE"
                endColor="#EAECEE"
                segments={strengths.length}
                segmentColors={segmentColors}
                customSegmentStops={segmentStops} // Use the corrected array
                ringWidth={40}
                currentValueText={`Avg. Strength: ${averageScore.toFixed(1)}`}
                valueTextFontSize="18px"
            />
            <div style={{ marginTop: '-20px', fontFamily: "'Helvetica Neue', sans-serif" }}>
                {strengths.map((s, i) => (
                    <div key={i} style={{ display: 'inline-block', margin: '0 15px' }}>
                        <span style={{ height: '12px', width: '12px', backgroundColor: segmentColors[i], borderRadius: '50%', display: 'inline-block', marginRight: '8px' }}></span>
                        {s.trait}: <strong>{s.score}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GaugeChart;