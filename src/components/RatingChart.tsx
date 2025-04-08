// src/components/RatingChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title, // Make sure Title plugin is imported
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  ScaleOptionsByType, // For Axis title typing
  CoreScaleOptions
} from 'chart.js';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import colors from 'tailwindcss/colors'; // Import colors

// Register Chart.js components including the Title plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title, // Register Title plugin
  Tooltip,
  Legend
);

interface RatingChartProps {
  title: string;
  chartData: ChartData<'line'>; // Use the specific ChartData type
  lineColor?: string; // Optional prop for specific line color
  className?: string;
}

// Helper type for adding title property to scales
type AxisOptions = ScaleOptionsByType<'linear' | 'category'> & CoreScaleOptions & {
    title?: {
        display?: boolean;
        text?: string;
        color?: string;
        font?: { size?: number; family?: string; weight?: string; };
        padding?: { top?: number; bottom?: number; };
    };
};

const RatingChart: React.FC<RatingChartProps> = ({
    title: chartTitle, // Rename prop to avoid conflict with Chart.js Title plugin
    chartData,
    lineColor = '#84cc16', // Default to a Lichess-like green
    className = ''
}) => {
  const { theme } = useTheme(); // Get current theme
  const isDark = theme === 'dark';

  // Define colors based on theme
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'; // Fainter grid
  const textColor = isDark ? colors.slate[300] : colors.slate[600];
  const axisTitleColor = isDark ? colors.slate[400] : colors.slate[500];
  const titleColor = isDark ? colors.slate[100] : colors.slate[800];
  const pointBgColor = isDark ? '#1e293b' : '#ffffff'; // Match card bg (slate-800 / white)

   // Customize dataset colors dynamically
   const themedChartData = {
    ...chartData,
    datasets: chartData.datasets.map(dataset => ({
        ...dataset,
        borderColor: lineColor,
        backgroundColor: lineColor, // Used for point background potentially
        pointRadius: 0, // Hide points by default
        pointHoverRadius: 5, // Show on hover
        pointBackgroundColor: pointBgColor,
        pointBorderColor: lineColor,
        pointHoverBackgroundColor: lineColor,
        pointHoverBorderColor: pointBgColor,
        borderWidth: 2, // Slightly thicker line
    })),
   };

  // Define Chart.js options dynamically based on theme
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to fill container height
    plugins: {
      legend: {
        display: false, // Hide legend, title is enough
      },
      title: {
        display: true,
        text: chartTitle, // Use the title prop
        color: titleColor,
        font: {
          size: 16,
          family: "'Inter', sans-serif", // Using Inter bold for chart title
          weight: '600',
        },
        padding: { top: 5, bottom: 15 }
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(45, 55, 72, 0.9)' : 'rgba(255, 255, 255, 0.9)', // Slightly transparent tooltip
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
      x: { // Cast to AxisOptions to include title
          title: { // X-Axis Title
              display: true,
              text: 'Date',
              color: axisTitleColor,
              font: { size: 12, family: "'Inter', sans-serif", weight: '500' },
              padding: { top: 10 } // Add padding below title
          },
          ticks: {
            color: textColor,
            font: { family: "'Inter', sans-serif", size: 10 }, // Smaller font for rotated labels
            maxRotation: 45, // Rotate labels
            minRotation: 45, // Rotate labels
            autoSkip: true,
            maxTicksLimit: 10 // Adjust as needed for density
          },
          grid: {
            color: gridColor,
            display: false // Hide vertical grid lines
          },
           border: {
             color: gridColor, // Color for the x-axis line
             display: true
           }
      } as AxisOptions, // Assertion needed because 'title' isn't in base ScaleOptionsByType
      y: { // Cast to AxisOptions to include title
          title: { // Y-Axis Title
              display: true,
              text: 'Rating',
              color: axisTitleColor,
              font: { size: 12, family: "'Inter', sans-serif", weight: '500' },
              padding: { bottom: 10 } // Add padding below title
          },
          ticks: {
            color: textColor,
            font: { family: "'Inter', sans-serif" },
            padding: 5 // Padding between ticks and axis title
          },
          grid: {
            color: gridColor,
            drawBorder: false, // Hide y-axis line itself, keep grid
          },
      } as AxisOptions // Assertion needed
    },
     interaction: { // Improve hover interaction
       mode: 'index', // Show tooltip for all datasets at that index
       intersect: false, // Tooltip even if not directly hovering point
     },
  };

  return (
    // Animation using whileInView triggered by parent or self
     <motion.div
        className={`bg-light-card dark:bg-dark-card p-4 rounded-xl shadow-card dark:shadow-card-dark border border-light-border dark:border-dark-border transition-colors duration-300 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% visible
        transition={{ duration: 0.5, ease: "easeOut" }}
     >
       <div style={{ height: '300px' }}> {/* Maintain fixed height */}
          <Line options={options} data={themedChartData} />
       </div>
    </motion.div>
  );
};

export default RatingChart;
