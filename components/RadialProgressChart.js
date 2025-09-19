// components/RadialProgressChart.js

import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

const theme = {
    colors: {
        score: {
            low: '#D0021B',
            mid: '#F5A623',
            high: '#50E3C2',
        },
        primary: '#1D2951',
        average: '#4A90E2', // Changed for better visibility in legend
        top: '#a9c9f7', // Changed for better visibility in legend
    }
};

const getColor = (score) => {
    if (score < 40) return theme.colors.score.low;
    if (score < 70) return theme.colors.score.mid;
    return theme.colors.score.high;
};

const RadialProgressChart = ({ score = 0, benchmark = 0, topPerformer = 0 }) => {
    // The order here is important for layering the chart correctly (bottom layer first)
    const data = [
      { name: 'Top Performer', value: topPerformer, fill: theme.colors.top },
      { name: 'Industry Average', value: benchmark, fill: theme.colors.average },
      { name: 'Your Score', value: score, fill: getColor(score) },
    ];

    return (
        <div style={{ width: 220, height: 240, display: 'flex', flexDirection: 'column' }}>
            
            {/* Chart Area */}
            <div style={{ flex: 1, position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="55%"
                        outerRadius="105%"
                        data={data}
                        startAngle={90}
                        endAngle={-270}
                        barSize={15}
                    >
                        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                        <RadialBar dataKey="value" background={{ fill: '#eee' }} cornerRadius={10} isAnimationActive={false} />
                        {/* The built-in <Legend> component is removed */}
                    </RadialBarChart>
                </ResponsiveContainer>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '1.8em', fontWeight: 'bold', color: theme.colors.primary }}>
                        {score.toFixed(0)}%
                    </div>
                </div>
            </div>

            {/* Custom Legend Area */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                flexShrink: 0, 
                paddingTop: '15px' 
            }}>
                {data.map((entry, index) => (
                    <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
                        <div style={{ width: 12, height: 12, backgroundColor: entry.fill, marginRight: 6, borderRadius: '2px', flexShrink: 0 }}></div>
                        <span style={{
                            color: entry.fill, // <-- Font color now matches the radial color
                            fontSize: '14px',
                            fontWeight: '400',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.1)', // Drop shadow
                        }}>
                            {entry.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadialProgressChart;