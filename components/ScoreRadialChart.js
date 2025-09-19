// components/ScoreRadialChart.js
import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

const theme = {
    colors: {
        yourScore: '#1D2951',      // Deep Navy
        benchmark: '#B0B0B0',       // Grey for the background benchmark
    }
};

const ScoreRadialChart = ({ score }) => {
    if (score === undefined || score === null) return null;

    const data = [{ name: 'Score', value: score }];

    return (
        <div style={{ width: '180px', height: '180px', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    innerRadius="70%"
                    outerRadius="90%"
                    data={data}
                    startAngle={90}
                    endAngle={-270}
                    barSize={20}
                >
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar
                        background
                        dataKey="value"
                        cornerRadius={10}
                        fill={theme.colors.yourScore}
                    />
                </RadialBarChart>
            </ResponsiveContainer>
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                textAlign: 'center', fontFamily: theme.fonts.heading
            }}>
                <span style={{ fontSize: '2.5em', color: theme.colors.primary, fontWeight: 'bold' }}>{score.toFixed(0)}</span>
                <span style={{ fontSize: '1.5em', color: theme.colors.primary }}>%</span>
            </div>
        </div>
    );
};

export default ScoreRadialChart;