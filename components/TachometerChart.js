// components/TachometerChart.js
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const theme = {
    colors: {
        danger: '#D0021B',
        warning: '#F5A623',
        success: '#50E3C2',
        needle: '#1D2951',
        lightText: '#555555',
        background: '#e9ecef'
    }
};

const Needle = ({ cx, cy, radius, angle, color }) => {
    const x1 = cx + radius * Math.cos(-angle * Math.PI / 180);
    const y1 = cy + radius * Math.sin(-angle * Math.PI / 180);
    const x2 = cx - (radius / 10) * Math.cos(-angle * Math.PI / 180 + Math.PI / 2);
    const y2 = cy - (radius / 10) * Math.sin(-angle * Math.PI / 180 + Math.PI / 2);
    const x3 = cx - (radius / 10) * Math.cos(-angle * Math.PI / 180 - Math.PI / 2);
    const y3 = cy - (radius / 10) * Math.sin(-angle * Math.PI / 180 - Math.PI / 2);

    return (
        <g>
            <path d={`M${x2},${y2} L${x1},${y1} L${x3},${y3}`} fill={color} />
            <circle cx={cx} cy={cy} r={radius / 12} fill={theme.colors.background} stroke={color} strokeWidth="2" />
        </g>
    );
};


const TachometerChart = ({ score = 0 }) => {
    const data = [
        { name: 'Needs Development', value: 40, color: theme.colors.danger },
        { name: 'Proficient', value: 30, color: theme.colors.warning },
        { name: 'Strength', value: 30, color: theme.colors.success },
    ];

    const totalValue = data.reduce((acc, entry) => acc + entry.value, 0);
    const angle = 180 * (score / totalValue);

    return (
        <div style={{ width: '100%', height: 180, position: 'relative' }}>
            <ResponsiveContainer>
                <PieChart margin={{ top: 0, right: 0, bottom: 40, left: 0 }}>
                    <Pie
                        data={data}
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        innerRadius="60%"
                        outerRadius="100%"
                        cy="100%"
                        paddingAngle={2}
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Pie
                        data={[{ value: 1 }]}
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        cy="100%"
                        innerRadius={0}
                        outerRadius={0}
                        isAnimationActive={false}
                    >
                        <Cell fill="none" />
                    </Pie>
                    <Needle cx="50%" cy="100%" radius={85} angle={angle} color={theme.colors.needle} />
                </PieChart>
            </ResponsiveContainer>
            <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: theme.colors.needle }}>
                    {score.toFixed(0)}%
                </div>
                <div style={{ fontSize: '0.8em', color: theme.colors.lightText, marginTop: '-5px' }}>
                    Your Score
                </div>
            </div>
        </div>
    );
};

export default TachometerChart;