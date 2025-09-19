// components/MarketingRadarChart.js
import React from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables); // Same as before

// This is a direct copy of your working ImperiumRadarChart, with updated colors and scales
const MarketingRadarChart = ({ reportScores }) => {
    const chartRef = React.useRef(null);
    const primaryColor = '#1D2951';
    const accentColor = '#4A90E2';

    React.useEffect(() => {
        if (!chartRef.current || !reportScores || reportScores.length === 0) return;
        const ctx = chartRef.current.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 500);
        gradient.addColorStop(0, 'rgba(74, 144, 226, 0.6)');
        gradient.addColorStop(1, 'rgba(29, 41, 81, 0.8)');

        const chartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: reportScores.map(d => d.dimension),
                datasets: [{
                    label: 'Your Score',
                    data: reportScores.map(d => d.score),
                    backgroundColor: gradient,
                    borderColor: accentColor,
                    borderWidth: 2,
                    pointBackgroundColor: '#FFFFFF',
                    pointBorderColor: primaryColor,
                    pointRadius: 4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
                        grid: { color: 'rgba(0, 0, 0, 0.1)' },
                        pointLabels: { font: { size: 13 }, color: primaryColor },
                        ticks: { color: '#333', backdropColor: 'rgba(255, 255, 255, 0.75)', stepSize: 25 },
                        min: 0,
                        max: 100
                    }
                }
            }
        });
        return () => chartInstance.destroy();
    }, [reportScores, primaryColor, accentColor]);

    return <canvas ref={chartRef} />;
};
export default MarketingRadarChart;