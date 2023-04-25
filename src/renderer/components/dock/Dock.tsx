import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, HStack, Button } from '@chakra-ui/react';
import ProjectList from './ProjectsList';
import { BiArrowBack } from 'react-icons/bi';
function Dock() {
  return (
    <Box p="2">
      <HStack alignItems={'center'} p="9">
        <Box>
        <Link to="/">
          <Button variant={'link'} pr="3">
            <Heading>
              <BiArrowBack />
            </Heading>
          </Button>
        </Link>
        </Box>
        <Box>
        <Heading className="title">Docking Projects</Heading>
        </Box>
      </HStack>
      <Box m="6">
        <ProjectList />
      </Box>
    </Box>
  );
}

export default Dock;
