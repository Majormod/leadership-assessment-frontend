// components/TradeoffChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';

const theme = {
    colors: {
        left: '#D0021B',   // Red
        right: '#4A90E2',  // Blue
    }
};

const TradeoffChart = ({ dataPairs, labels }) => {
    if (!dataPairs || dataPairs.length === 0) return null;

    const chartData = dataPairs.map(pair => {
        const tradeOffName = labels.labels[pair.qA] || `Trade-Off ${pair.pair_id}`;
        const score = pair.rA; 
        const divergingScore = score - 3.5;
        return { name: tradeOffName, score: divergingScore };
    });

    return (
        <div style={{ width: '100%', height: `${chartData.length * 50}px` }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={chartData} margin={{ top: 5, right: 60, left: 60, bottom: 5 }}>
                    <XAxis type="number" domain={[-3, 3]} ticks={[-2.5, 0, 2.5]} tickFormatter={(tick) => {
                        if (tick === -2.5) return labels.left;
                        if (tick === 2.5) return labels.right;
                        return '';
                    }} style={{ fontWeight: 'bold' }} />
                    <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#f8f9fa'}} formatter={(value) => [`Lean: ${value > 0 ? 'Right' : 'Left'}`, null]}/>
                    <ReferenceLine x={0} stroke="#ccc" />
                    <Bar dataKey="score" barSize={20}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.score < 0 ? theme.colors.left : theme.colors.right} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TradeoffChart;