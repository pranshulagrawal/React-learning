import { Box, Text, Link as ChakraLink, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Assuming you are using react-router for navigation

interface SidebarItemProps {
  name: string;
  route: string;
}

export const SidebarItem = ({ name, route }: SidebarItemProps) => {
  return (
    <ChakraLink
      as={Link}
      to={route}
      style={{ textDecoration: "none" }}
      _hover={{ textDecoration: "none" }}
    >
      <Flex
        p="4"
        align="center"
        cursor="pointer"
        _hover={{ bg: "gray.700" }}
        borderRadius="md"
      >
        <Box>
          <Text color="white" fontWeight="bold">
            {name}
          </Text>
        </Box>
      </Flex>
    </ChakraLink>
  );
};
