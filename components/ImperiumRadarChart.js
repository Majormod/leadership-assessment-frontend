// components/ImperiumRadarChart.js
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ImperiumRadarChart = ({ reportScores }) => {
    const chartRef = useRef(null);

    // New brand colors for the chart
    const lighterBlue = '#0575E6';
    const darkerBlue = '#021B79';

    useEffect(() => {
        if (!chartRef.current || !reportScores) return;

        const ctx = chartRef.current.getContext('2d');
        
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(5, 117, 230, 0.7)'); // Lighter blue at 70% opacity
        gradient.addColorStop(1, 'rgba(2, 27, 121, 0.7)');   // Darker blue at 70% opacity

        const chartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: reportScores.map(d => d.dimension),
                datasets: [{
                    label: 'Leadership Strengths',
                    data: reportScores.map(d => d.score),
                    backgroundColor: gradient,
                    borderColor: lighterBlue,
                    borderWidth: 3,
                    pointBackgroundColor: '#FFFFFF',
                    pointBorderColor: darkerBlue,
                    pointHoverBackgroundColor: darkerBlue,
                    pointHoverBorderColor: '#FFFFFF',
                    pointRadius: 5,
                    pointHoverRadius: 8,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: darkerBlue,
                        titleFont: { size: 16, weight: 'bold', family: 'Helvetica Neue' },
                        bodyFont: { size: 14, family: 'Helvetica Neue' },
                        padding: 15,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.r !== null) {
                                    label += context.parsed.r.toFixed(1) + ' / 10';
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
                        grid: { color: 'rgba(0, 0, 0, 0.1)' },
                        pointLabels: {
                            font: {
                                size: 14,
                                family: "'Helvetica Neue', sans-serif",
                                weight: 'bold',
                            },
                            color: '#0f0c29' // Use the new heading color for labels
                        },
                        ticks: {
                            color: '#333333',
                            backdropColor: 'rgba(255, 255, 255, 0.75)',
                            stepSize: 2,
                            font: {
                                weight: 'bold'
                            }
                        },
                        min: 0,
                        max: 10,
                    }
                }
            }
        });

        return () => chartInstance.destroy();
    }, [reportScores, lighterBlue, darkerBlue]);

    return <canvas ref={chartRef} />;
};

export default ImperiumRadarChart;