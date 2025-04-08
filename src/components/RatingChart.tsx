// src/components/RatingChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  // ScaleOptionsByType, // REMOVED - Not using complex type helper anymore
  // CoreScaleOptions
} from 'chart.js';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import colors from 'tailwindcss/colors';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
);

interface RatingChartProps {
  title: string;
  chartData: ChartData<'line'>;
  lineColor?: string;
  className?: string;
}

// REMOVED - AxisOptions helper type is no longer needed
// type AxisOptions = ScaleOptionsByType<'linear' | 'category'> & CoreScaleOptions & { /* ... title definition ... */ };

const RatingChart: React.FC<RatingChartProps> = ({
    title: chartTitle, chartData, lineColor = '#84cc16', className = ''
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
  const textColor = isDark ? colors.slate[300] : colors.slate[600];
  const axisTitleColor = isDark ? colors.slate[400] : colors.slate[500];
  const titleColor = isDark ? colors.slate[100] : colors.slate[800];
  const pointBgColor = isDark ? '#1e293b' : '#ffffff';

  const themedChartData = {
    ...chartData,
    datasets: chartData.datasets.map(dataset => ({
        ...dataset,
        borderColor: lineColor,
        backgroundColor: lineColor,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointBackgroundColor: pointBgColor,
        pointBorderColor: lineColor,
        pointHoverBackgroundColor: lineColor,
        pointHoverBorderColor: pointBgColor,
        borderWidth: 2,
    })),
   };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false, },
      title: {
        display: true, text: chartTitle, color: titleColor,
        font: {
          size: 16, family: "'Inter', sans-serif",
          weight: 600, // ** FIXED: Use number, not string **
        },
        padding: { top: 5, bottom: 15 }
      },
      tooltip: { /* ... same tooltip options ... */
         backgroundColor: isDark ? 'rgba(45, 55, 72, 0.9)' : 'rgba(255, 255, 255, 0.9)',
         titleColor: isDark ? colors.slate[100] : colors.slate[700],
         bodyColor: isDark ? colors.slate[200] : colors.slate[600],
         borderColor: gridColor,
         borderWidth: 1,
         padding: 10,
         boxPadding: 5,
         usePointStyle: true,
         titleFont: { family: "'Inter', sans-serif", weight: 'bold' },
         bodyFont: { family: "'Inter', sans-serif" },
      }
    },
    scales: {
      // Define scales directly without type assertion
      x: {
          title: { // X-Axis Title
              display: true, text: 'Date', color: axisTitleColor,
              font: { size: 12, family: "'Inter', sans-serif", weight: '500' },
              padding: { top: 10 }
          },
          ticks: {
            color: textColor, font: { family: "'Inter', sans-serif", size: 10 },
            maxRotation: 45, minRotation: 45, autoSkip: true, maxTicksLimit: 10
          },
          grid: { display: false },
          border: { color: gridColor, display: true }
      },
      y: {
          title: { // Y-Axis Title
              display: true, text: 'Rating', color: axisTitleColor,
              font: { size: 12, family: "'Inter', sans-serif", weight: '500' },
              padding: { bottom: 10 }
          },
          ticks: { color: textColor, font: { family: "'Inter', sans-serif" }, padding: 5 },
          grid: { color: gridColor, drawBorder: false },
      }
    },
     interaction: { mode: 'index', intersect: false },
  };

  return (
     <motion.div
        className={`bg-light-card dark:bg-dark-card p-4 rounded-xl shadow-card dark:shadow-card-dark border border-light-border dark:border-dark-border transition-colors duration-300 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
     >
       <div style={{ height: '300px' }}>
          <Line options={options} data={themedChartData} />
       </div>
    </motion.div>
  );
};

export default RatingChart;
