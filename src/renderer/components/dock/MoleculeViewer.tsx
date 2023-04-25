import React, { useEffect, useRef } from 'react';
import * as NGL from 'ngl';
import ProteinSequence from './dashboard/ProteinSequence';
import { Box, VStack } from '@chakra-ui/react';

export const MolecularViewer = ({ pdbFile }: any) => {
  // export const  MolecularViewer = () => {
  const stageRef: any = useRef(null);

  const [proteinSequence, setproteinSequence] = React.useState('');

  useEffect(() => {
    const stage: any = new NGL.Stage(stageRef.current);
    stage.loadFile(pdbFile).then(function (component: any) {
      // component.addRepresentation('cartoon', { color: 'spectrum' });

      component.addRepresentation('cartoon');
      stage.autoView();
      //

      setproteinSequence(component.structure.getSequence());
    });

    stage.setSpin(true);
    stage.viewer.renderer.setClearColor(0xffffff, 1);
    stage.viewer.requestRender();

    return () => {
      stage.dispose();
    };
  }, [pdbFile]);

  return (
<>
        <div ref={stageRef} style={{ width: '80%', height: '600px' }} />
        <Box m="9" overflowX={"scroll"} >
        <ProteinSequence sequence={proteinSequence} />
        </Box>


        </>
  );
};

//
//  import { Box, Text } from '@chakra-ui/react';
// import React, { Suspense } from 'react';

// export const MolstarViewer = () => {
//   const options = {
//         pdbId: "1crn",
//         showSequence: true,
//         hideControls: true,
//         backgroundColor: "#000000",
//         backgroundOpacity: 0.5,
//         selectionColor: "#FF0000",
//         selectionOpacity: 0.5,
//         highlightStyle: "tube",
//         highlightColor: "#00FF00",
//         highlightOpacity: 0.5,
//         quality: "medium",
//         antialias: true,
//         cameraType: "perspective",
//         cameraPosition: [50, 50, 50],
//         cameraTarget: [0, 0, 0],
//         cameraFov: 40,
//         cameraClipNear: 0.1,
//         cameraClipFar: 100,
//       };
//   return (
//     <Box>

//       <Text>Working</Text>
//       {/* <Suspense fallback={<Text>Loading</Text>}> */}
//         <Fold
//  {...options}
//           // hide-controls={showControls ? 'true' : 'false'}
//         />
//       {/* </Suspense> */}
//     </Box>
//   );
// };

// // import React, { useEffect } from "react";

// // function MolstarViewer() {
// //   useEffect(() => {
// //     // Create the Mol* app
// //     const app = new MolStar.App(document.getElementById("molstar-container"));

// const Fold = (props: any) =>
//   React.createElement(
//     'pdbe-molstar',
//     // "molstar",
//     props,
//     [props.children]
//   );

// //     // Load the PDB structure
// //     app.loadPdb("1crn");

// //     // Add a representation for the protein
// //     app.addRepresentation("cartoon", { colorScheme: "chain-id" });

// //     // Add a representation for the ligand
// //     app.addRepresentation("ball-and-stick", { sele: "ligand" });

// //     // Fit the structure to the viewport
// //     app.stage.autoView();

// //     return () => {
// //       // Clean up the app when the component is unmounted
// //       app.destroy();
// //     };
// //   }, []);

// //   return <div id="molstar-container" style={{ height: "500px" }} />;
// // }

// // export default MolstarViewer;

// // import React from "react";
// // import * as Molstar from "molstar-react";

// // function App() {
// //   const options = {
// //     pdbId: "1crn",
// //     showSequence: true,
// //     hideControls: true,
// //     backgroundColor: "#000000",
// //     backgroundOpacity: 0.5,
// //     selectionColor: "#FF0000",
// //     selectionOpacity: 0.5,
// //     highlightStyle: "tube",
// //     highlightColor: "#00FF00",
// //     highlightOpacity: 0.5,
// //     quality: "medium",
// //     antialias: true,
// //     cameraType: "perspective",
// //     cameraPosition: [50, 50, 50],
// //     cameraTarget: [0, 0, 0],
// //     cameraFov: 40,
// //     cameraClipNear: 0.1,
// //     cameraClipFar: 100,
// //   };

// //   return (
// //     <div>
// //       <MolstarViewer {...options} />
// //     </div>
// //   );
// // }

// // export default App;
