import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  // Debugging logs
  console.log('Rendering LineChart with:', { 
    coinHistory, 
    hasHistory: !!coinHistory?.data?.history 
  });

  if (!coinHistory) return <div>Waiting for API response...</div>;
  if (!coinHistory.data?.history) return <div>No price history available</div>;

  const chartData = {
    labels: coinHistory.data.history.map(h => 
      new Date(h.timestamp * 1000).toLocaleDateString()
    ),
    datasets: [{
      label: `${coinName} Price`,
      data: coinHistory.data.history.map(h => parseFloat(h.price)),
      borderColor: '#0071bd',
      borderWidth: 2
    }]
  };

  return (
    <div style={{ height: '400px', marginTop: '20px' }}>
      <Line 
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => `$${context.parsed.y.toLocaleString()}`
              }
            }
          }
        }}
      />
    </div>
  );
};

export default LineChart;