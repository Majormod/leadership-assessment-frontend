// components/BenchmarkGaugeChart.js

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts';

const theme = {
    colors: {
        primary: '#1D2951',
        accent: '#4A90E2',
        accent2: '#F5A623',
        success: '#50E3C2',
        danger: '#D0021B',
        lightBackground: '#F8F9FA',
    },
};

const BenchmarkGaugeChart = ({ score = 0, benchmark = 65, topPerformer = 90 }) => {
    const data = [
        { name: 'Score', value: score },
        { name: 'Remaining', value: 100 - score },
    ];

    const COLORS = [theme.colors.primary, theme.colors.lightBackground];

    return (
        <div style={{ width: 200, height: 200, position: 'relative', textAlign: 'center' }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        startAngle={180}
                        endAngle={-180}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    {/* Benchmark Indicator */}
                    <Pie
                        data={[{ value: 1 }]}
                        cx="50%"
                        cy="50%"
                        outerRadius={85}
                        innerRadius={84}
                        startAngle={(180 - (benchmark * 1.8))}
                        endAngle={(180 - (benchmark * 1.8))}
                        dataKey="value"
                        isAnimationActive={false}
                        cornerRadius={5}
                    >
                        <Cell fill={theme.colors.accent} stroke={theme.colors.accent} strokeWidth={2} />
                    </Pie>
                     {/* Top Performer Indicator */}
                    <Pie
                        data={[{ value: 1 }]}
                        cx="50%"
                        cy="50%"
                        outerRadius={85}
                        innerRadius={84}
                        startAngle={(180 - (topPerformer * 1.8))}
                        endAngle={(180 - (topPerformer * 1.8))}
                        dataKey="value"
                        isAnimationActive={false}
                        cornerRadius={5}
                    >
                         <Cell fill={theme.colors.accent2} stroke={theme.colors.accent2} strokeWidth={2} />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: theme.colors.primary }}>
                    {score.toFixed(0)}%
                </div>
                <div style={{ fontSize: '0.8em', color: theme.colors.lightText }}>Your Score</div>
            </div>
             <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '-30px', fontSize: '10px' }}>
                <div><span style={{color: theme.colors.accent}}>●</span> Avg: {benchmark}%</div>
                <div><span style={{color: theme.colors.accent2}}>●</span> Top: {topPerformer}%</div>
            </div>
        </div>
    );
};

export default BenchmarkGaugeChart;