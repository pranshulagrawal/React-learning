import { Box, Flex, IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";
import { SidebarItem } from "../SideBarItem"; // Separate sidebar items

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <Flex>
      <motion.div
        initial={{ width: isOpen ? "250px" : "80px" }}
        animate={{ width: isOpen ? "250px" : "80px" }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 text-white min-h-screen"
      >
        <IconButton
          icon={<FiMenu />}
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          mt={4}
        />
        {isOpen && (
          <Box>
            <SidebarItem name="Dashboard" route="/dashboard" />
            <SidebarItem name="Posts" route="/posts" />
            <SidebarItem name="Users" route="/users" />
          </Box>
        )}
      </motion.div>
    </Flex>
  );
};

export default Sidebar;
