// components/ScoreBarChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

const ScoreBarChart = ({ score, benchmarkScore }) => {
    if (score === undefined || score === null) return null;

    const data = [
        { name: 'Performance', 'Your Score': score, 'Industry Average': benchmarkScore }
    ];
    
    return (
        <div style={{ height: '150px', marginBottom: '30px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={false} />
                    <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                    <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                    <Legend />
                    <Bar dataKey="Your Score" fill="#1D2951" barSize={50} />
                    <Bar dataKey="Industry Average" fill="#F5A623" barSize={50} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
export default ScoreBarChart;