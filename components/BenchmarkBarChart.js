// components/BenchmarkBarChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid, Cell } from 'recharts';

const theme = {
    colors: {
        yourScore: '#1D2951',      // Deep Navy
        industryAverage: '#4A90E2', // Bright Blue
        topPerformers: '#50E3C2',   // Teal
    }
};

const BenchmarkBarChart = ({ data, showLegend = true }) => {
    if (!data || data.length === 0) return null;

    const bars = [
        { key: 'yourScore', color: theme.colors.yourScore, name: 'Your Score' },
        { key: 'industryAverage', color: theme.colors.industryAverage, name: 'Industry Average' },
        { key: 'topPerformer', color: theme.colors.topPerformers, name: 'Top Performers' },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                barCategoryGap="20%"
            >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12, fill: '#333' }} />
                <Tooltip cursor={{fill: '#f8f9fa'}} formatter={(value, name) => [`${value.toFixed(1)}%`, name]} />
                {showLegend && <Legend />}

                {bars.map(bar => (
                    <Bar key={bar.key} dataKey={bar.key} name={bar.name} fill={bar.color} isAnimationActive={false} />
                ))}

            </BarChart>
        </ResponsiveContainer>
    );
};

export default BenchmarkBarChart;