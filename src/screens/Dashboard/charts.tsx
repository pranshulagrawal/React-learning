import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import { ChartOptions } from "chart.js";

// Define the data for the chart
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Monthly Blog Posts",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ],
};

// Define the chart options with type safety
const options: ChartOptions<"bar"> = {
  animation: {
    duration: 1000,
    easing: "easeInOutBounce", // This must be one of the accepted easing options
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const Charts = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Bar data={data} options={options} />
    </motion.div>
  );
};

export default Charts;
