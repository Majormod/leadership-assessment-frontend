// components/DivergingBarChart.js

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';

const theme = {
    colors: {
        left: '#4A90E2',  // Accent Blue
        right: '#1D2951', // Primary Navy
        text: '#333333',
        lightText: '#555555',
        borderColor: '#DEE2E6',
    }
};

const DivergingBarChart = ({ dataPairs, labels }) => {
    if (!dataPairs || dataPairs.length === 0 || !labels) return null;

    // Transform the data: calculate a "lean" score for each pair.
    // Positive leans right, negative leans left.
    const chartData = dataPairs.map(pair => {
        const lean = (pair.rA || 3.5) - (pair.rB || 3.5); // Default to a neutral 3.5 if null
        return {
            name: labels.labels[pair.qA],
            lean: lean,
        };
    });

    return (
        <div style={{ width: '100%', height: `${chartData.length * 50}px` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 40px', fontFamily: 'Helvetica, Arial, sans-serif', color: theme.colors.text, fontWeight: 'bold' }}>
                <span style={{color: theme.colors.left}}>{labels.left}</span>
                <span style={{color: theme.colors.right}}>{labels.right}</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 20, right: 50, left: 50, bottom: 5 }}
                >
                    <XAxis type="number" domain={[-5, 5]} hide />
                    <YAxis 
                        type="category" 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        width={180} 
                        tick={{ fill: theme.colors.lightText, fontSize: 12 }} 
                    />
                    <Tooltip 
                        cursor={{ fill: 'rgba(233, 236, 239, 0.4)' }}
                        formatter={(value) => [`${Math.abs(value).toFixed(1)} strength`, value > 0 ? labels.right : labels.left]}
                    />
                    <ReferenceLine x={0} stroke={theme.colors.borderColor} />
                    <Bar dataKey="lean" radius={[4, 4, 4, 4]} isAnimationActive={false}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.lean < 0 ? theme.colors.left : theme.colors.right} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DivergingBarChart;