import { Box, Image } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const Card = ({  title, description }:any) => {
  return (
    <Link to={`/dock/${"123"}`}>
      <Box minH={"150"}    overflow="hidden">

        <Box  p="6">
          <Box display="flex" alignItems="baseline">
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
            >
              {title}
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {description}
          </Box>
        </Box>
      </Box>
</Link>
  );
};

export default Card;


// import { Box, Text, Image } from "@chakra-ui/react";
// import { Link } from 'react-router-dom';
// function ProjectCard(props:any) {
//   return (
//     <Link to={`/dock/${"123"}`}>
//     <Box>
//       {/* <Image src={props.imageUrl} alt={props.title} objectFit="cover" h="200px" /> */}
//       <Box p="6">
//         <Text fontSize="xl" fontWeight="semibold" mb="2">
//           {props.title}
//         </Text>
//         <Text fontSize="md" color="gray.600">
//           {props.description}
//         </Text>
//       </Box>
//     </Box>
//     </Link>
//   );
// }

// export default ProjectCard;
