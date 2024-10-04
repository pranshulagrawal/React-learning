import { motion } from "framer-motion";

const Charts = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    ></motion.div>
  );
};

export default Charts;
