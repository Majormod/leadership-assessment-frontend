// components/BulletChart.js

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Legend, Label } from 'recharts';

const theme = {
    colors: {
        score: '#1D2951',      // Primary Navy
        average: '#4A90E2',    // Accent Blue
        top: '#50E3C2',        // Success Teal
        background: '#e9ecef', // Light Gray
        text: '#333333',
    }
};

const BulletChart = ({ score, benchmark, topPerformer }) => {
    const data = [
        { name: 'Performance', yourScore: score }
    ];

    return (
        <div style={{ width: '100%', height: 100 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                >
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                    <YAxis type="category" dataKey="name" hide />
                    <Tooltip cursor={false} formatter={(value) => [`${value.toFixed(1)}%`, 'Your Score']} />
                    
                    {/* Background Bar */}
                    <Bar dataKey="yourScore" background={{ fill: theme.colors.background, radius: 4 }} radius={4} isAnimationActive={false}>
                         <Label 
                            value={`${score.toFixed(1)}%`} 
                            position="right" 
                            offset={5} 
                            style={{ fill: theme.colors.text, fontWeight: 'bold' }}
                         />
                    </Bar>
                    
                    {/* Benchmark lines */}
                    <ReferenceLine x={benchmark} stroke={theme.colors.average} strokeWidth={2} strokeDasharray="3 3">
                        <Label value="Avg" position="top" offset={-25} fill={theme.colors.average} />
                    </ReferenceLine>
                    <ReferenceLine x={topPerformer} stroke={theme.colors.top} strokeWidth={2}>
                        <Label value="Top" position="top" offset={-25} fill={theme.colors.top} />
                    </ReferenceLine>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BulletChart;