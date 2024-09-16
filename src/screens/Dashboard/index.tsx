import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <Flex>
      <Sidebar />
      <Box p="4" flex="1" className="content-area">
        {/* Add dynamic routing for content below */}
        <h1>Welcome to Admin Dashboard</h1>
      </Box>
    </Flex>
  );
};

export default Dashboard;
