import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

// Update the type of 'content' to ReactNode for valid JSX/React content
interface DashboardContentProps {
  content: ReactNode;
}

const DashboardContent = ({ content }: DashboardContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box p={4}>{content}</Box>
    </motion.div>
  );
};

export default DashboardContent;
