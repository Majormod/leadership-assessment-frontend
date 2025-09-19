// components/ReportCharts.js - Radar chart fix
import React from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler
);

export const ComparisonBarChart = ({ score, industryStandard, title, id }) => {
  const data = {
    labels: [title],
    datasets: [
      {
        label: 'Your Score',
        data: [score],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Industry Standard',
        data: [industryStandard],
        backgroundColor: 'rgba(230, 230, 230, 0.7)',
        borderColor: 'rgba(200, 200, 200, 1)',
        borderWidth: 1,
      },
    ],
  };
  const options = { indexAxis: 'y', responsive: true, maintainAspectRatio: false, scales: { x: { beginAtZero: true, max: 10 } }, plugins: { legend: { position: 'top' } } };
  return <Bar id={id} options={options} data={data} />;
};

export const LeadershipRadarChart = ({ radarData, id }) => {
    const data = {
      labels: radarData.labels,
      datasets: [{
          label: 'Your Score',
          data: radarData.scores,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        },
      ],
    };
    const options = { responsive: true, maintainAspectRatio: false, scales: { r: { angleLines: { display: true }, suggestedMin: 0, suggestedMax: 10, pointLabels: { font: { size: 12 } }, ticks: { backdropColor: 'white', stepSize: 2 } } }, plugins: { legend: { display: false } }, 
    layout: {
        padding: 20
    }
  };
    return <Radar id={id} data={data} options={options}/>;
};

// components/ReportCharts.js

// ... (your existing imports and ComparisonBarChart / LeadershipRadarChart components are unchanged)

// --- ADD THIS NEW COMPONENT AT THE END OF THE FILE ---
export const ImperiumRadarChart = ({ radarData }) => {
  const data = {
    labels: radarData.labels,
    datasets: [{
      label: 'Your Leadership Score',
      data: radarData.scores,
      backgroundColor: 'rgba(0, 51, 102, 0.2)', // A darker, more professional blue
      borderColor: 'rgba(0, 51, 102, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(0, 51, 102, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 51, 102, 1)'
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 10,
        pointLabels: {
          font: {
            size: 14, // Larger labels for readability
            weight: 'bold'
          }
        },
        ticks: {
          backdropColor: 'white',
          stepSize: 2
        }
      }
    },
    plugins: {
      legend: {
        display: false // The chart is self-explanatory
      }
    },
    layout: {
      padding: 20
    }
  };

  return <Radar data={data} options={options} />;
};