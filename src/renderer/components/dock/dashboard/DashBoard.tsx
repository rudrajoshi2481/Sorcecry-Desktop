import React from 'react';
import { Box, Heading, HStack, Button } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { TaskCard } from './TaskCard';
import DockingForm from './DockingForm';
import { BiArrowBack } from 'react-icons/bi';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
function DashBoard() {
  const { projectId } = useParams();
  return (
    <Box p="3">
      <Box
        p="9"
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <HStack>
          <Link to="/dock">
            <Button variant={'ghost'}>
              <Heading>
                <BiArrowBack />
              </Heading>
            </Button>
          </Link>
          <Heading className="title">Project Name {projectId}</Heading>
        </HStack>
        <HStack>
          <MenuComp />
        </HStack>
      </Box>
      <Box m="3">
        <DockingForm />
      </Box>
    </Box>
  );
}

function MenuComp() {
  return (
    <Menu>
      <MenuButton as={Button}>Menu</MenuButton>
      <MenuList>
        <MenuItem>
          <Link to="/dock/createtask">
            <Button colorScheme="green">Create New Task</Button>
          </Link>
        </MenuItem>
        <MenuItem>Settings</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default DashBoard;
