import { Box, Text } from "@chakra-ui/react";

const DashboardWidgets = () => {
  return (
    <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <Box className="bg-blue-500 p-4 rounded-lg">
        <Text color="white">Total Posts</Text>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          350
        </Text>
      </Box>

      <Box className="bg-green-500 p-4 rounded-lg">
        <Text color="white">Active Users</Text>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          1200
        </Text>
      </Box>

      <Box className="bg-red-500 p-4 rounded-lg">
        <Text color="white">New Comments</Text>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          84
        </Text>
      </Box>
    </Box>
  );
};

export default DashboardWidgets;
