import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PrecipChartProps {
  data: number[]; // Array of precipitation values
}

export default function PrecipChart({ data }: PrecipChartProps) {
  const chartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), // Hour labels
    datasets: [
      {
        label: "Precipitation (mm)",
        data: Array.from({ length: 24 }, (_, i) => data[i] || 0), // Fill missing hours with 0
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue bars
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Hourly Precipitation",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
