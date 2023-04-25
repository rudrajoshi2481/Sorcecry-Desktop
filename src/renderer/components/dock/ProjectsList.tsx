import { SimpleGrid, Box } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";

const projects = [
  { title: "Project 1", description: "Description of project 1" },
  { title: "Project 2", description: "Description of project 2" },
  { title: "Project 3", description: "Description of project 3" },
  { title: "Project 4", description: "Description of project 4" },
];

function ProjectList() {
  return (
    <SimpleGrid columns={[1, 2, 3]} maxW={"60vw"} spacing={4}>
      {projects.map((project, index) => (
        <Box key={index}  border="1px solid green"overflow="hidden">
          <ProjectCard title={project.title} description={project.description} />
        </Box>
      ))}
    </SimpleGrid>
  );
}



export default ProjectList;
