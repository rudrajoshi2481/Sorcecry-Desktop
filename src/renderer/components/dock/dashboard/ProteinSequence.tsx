import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

function ProteinSequence({ sequence }:any) {
  return (
    <Flex  >
      {sequence?.map((residue:any, index:any) => (
        <Box  key={index} w="10px" h="20px" bg="gray.200" textAlign="center">
          <Text  fontSize="sm">{residue}</Text>
        </Box>
       ))}

    </Flex>
  );
}

export default ProteinSequence;


// import React, { useState, useEffect } from 'react';
// // import * as SaguaroViewer from '@rcsb/rcsb-saguaro';


// function MyComponent() {
//   const [sequence, setSequence] = useState('');

// // const {}

//   return (
//     <SaguaroViewer
//     sequence="MGMDFERDRLHPFLGGTLDWQKALFVRFVDLPSFEQIGVYKGLEILGLPDNVHVGGKLVNIFPGDTDVRSGKLRSWQEGVVRMRADPSGAVTVEEVEPLVDWLEEAAVKTPLFTHLNGQVVSVEGVRLALEENPEYLRVVGYAGAPAAAPVAPVEGAYGQLGPASVLVTAAEKAWAGK"
//     width={800}
//     height={600}
//   />
//   );
// }

// export default MyComponent;







