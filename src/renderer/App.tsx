import { MemoryRouter as Router, Routes, Route,Link } from 'react-router-dom';
import {useState } from "react"
import './App.css';
import  {ChakraProvider,Box,Heading,Button,VStack,Container, HStack, Divider, Text, Input} from "@chakra-ui/react"
import Dock from './components/dock/Dock';
import DashBoard from './components/dock/dashboard/DashBoard';
import DockingForm from './components/dock/dashboard/DockingForm';
import { MolecularViewer } from './components/dock/MoleculeViewer';
import { TextEditor } from './components/dock/dashboard/TextEditor';


function Hello() {


  return (
    <Box p="16">
      <VStack maxW={"xl"} justifyContent={"flex-start"} alignItems={"flex-start"} py="9">
      <Heading className='title' fontSize={"6xl"} fontWeight={"bold"}>Sorcery Dock 🦚</Heading>
      <Text my="3" > Commodo enim dolor sit incididunt sit et do consequat aliquip occaecat est elit et aliquip. Consequat reprehenderit dolor non culpa eu laborum reprehenderit do consectetur eu ullamco aute. Reprehenderit amet velit nisi qui nostrud eu eu velit adipisicing qui id est ullamco fugiat. Cillum laborum reprehenderit minim occaecat eiusmod duis deserunt adipisicing elit labore. Tempor laboris qui qui ipsum non exercitation. Ut reprehenderit eu id Lorem. </Text>
      <Link to="/dock"><Button my="3" borderRadius={"0"} colorScheme='green' variant={"outline"}>Docking Projects</Button></Link>
      </VStack>
      <Box >

        <Divider />
        <Heading  className='title' py="9">Molecular Visualizer 🧪 </Heading>

    <VStack justifyContent={"center"} border="1px dashed green">

    <MolecularViewer pdbFile={`https://files.rcsb.org/view/7aad.pdb`} />

    </VStack>
      </Box>
      <Box mt="9">
      <Heading  className='title' py="9">Sorcery Book 🍕</Heading>
        <HStack   >
        <TextEditor />
        </HStack>
      </Box>
      <Box>

      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <ChakraProvider>
      {/* <Container maxW={"container.xl"}> */}
      <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/dock" element={<Dock />} />
        <Route path="/dock/:projectId" element={<DashBoard />} />
        <Route path="/dock/createtask" element={<DockingForm />} />
      </Routes>
    </Router>
      {/* </Container> */}
    </ChakraProvider>
  );
}
