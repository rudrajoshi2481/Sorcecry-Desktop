import { useState,useMemo } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
HStack,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { Slate, Editable, withReact } from "slate-react";
import { createEditor } from "slate";
import { TextEditor } from "./TextEditor";
import {Link} from "react-router-dom"

function DockingForm() {
  const [title, setTitle] = useState("");
  const [proteinsFile, setProteinsFile] = useState(null);
  const [compoundsFile, setCompoundsFile] = useState(null);
  const [description, setDescription] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  const [editor] = useState(() => withReact(createEditor()));

  function handleTitleChange(event:any) {
    setTitle(event.target.value);
  }

  function handleProteinsFileDrop(acceptedFiles:any) {
    setProteinsFile(acceptedFiles[0]);
  }

  function handleCompoundsFileDrop(acceptedFiles:any) {
    setCompoundsFile(acceptedFiles[0]);
  }

  function handleDescriptionChange(value:any) {
    setDescription(value);
  }

  function handleSubmit(event:any) {
    event.preventDefault();
    // Perform docking action
  }

  const { getRootProps: getProteinsRootProps, getInputProps: getProteinsInputProps } = useDropzone({
    onDrop: handleProteinsFileDrop,
    multiple: true,
    accept: {
      'file': ['.pdb',".mol2"],
      // 'text/html': ['.html', '.htm'],
    }
    // accept: [".pdb",".mol2],
  });

  const { getRootProps: getCompoundsRootProps, getInputProps: getCompoundsInputProps } = useDropzone({
    onDrop: handleCompoundsFileDrop,
    multiple: true,
    // accept: ".sdf",
  });

  return (
    <Box padding="4" >
      <HStack><Link to="/dock"><Button variant={"ghost"}>👈</Button></Link><Heading py="3" className="title" >New Docking Task</Heading></HStack>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired marginBottom="4">
          <FormLabel>Title</FormLabel>
          <Input type="text" value={title} onChange={handleTitleChange} />
        </FormControl>
       <HStack>
       <FormControl isRequired marginBottom="4">
          <FormLabel>Proteins File</FormLabel>
          <Box {...getProteinsRootProps()}>
            <Input type="file" {...getProteinsInputProps()} size={"lg"} />
            {proteinsFile && <Box marginTop="2">{proteinsFile}</Box>}
            {/* {proteinsFile && <Box marginTop="2">{proteinsFile.name}</Box>} */}
            {!proteinsFile && (
              <Box height={"100"} border={"1px solid gray"} p="3" maxW="350" marginTop="2" color="gray.400">
                Drop file here or click to upload.
              </Box>
            )}
          </Box>
        </FormControl>
        <FormControl isRequired marginBottom="4">
          <FormLabel>Compounds File</FormLabel>
          <Box {...getCompoundsRootProps()}>
            <Input type="file" {...getCompoundsInputProps()} size={"lg"}/>
            {compoundsFile && <Box marginTop="2">{compoundsFile}</Box>}
            {/* {compoundsFile && <Box marginTop="2">{compoundsFile.name}</Box>} */}
            {!compoundsFile && (
              <Box height={"100"} border={"1px solid gray"} p="3" maxW="350" marginTop="2" color="gray.400">
                Drop file here or click to upload.
              </Box>
            )}
          </Box>
        </FormControl>
       </HStack>
        <FormControl marginBottom="4">
          {/* <FormLabel>Description</FormLabel> */}
          {/* <Textarea value={description} onChange={(event) => handleDescriptionChange(event.target.value)} /> */}
        </FormControl>
        <FormControl isRequired marginBottom="4">
          <FormLabel>Notes</FormLabel>
          {/* <Slate value={description} editor={editor} onChange={(value) => handleDescriptionChange(value)} children={undefined} /> */}
<TextEditor />
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
}

export default DockingForm;
