import { Box, Text, Badge, Icon, Flex, IconButton } from "@chakra-ui/react";
import { FaPlay, FaStop } from "react-icons/fa";

export function TaskCard({ task }:any) {
  const { name, status, startTime, endTime } = {name:"Olaparib",status:"running",startTime:Date(),endTime:"asd"};

  return (
    <Box
      p={4}
      maxW={"40%"}
      // shadow="md"
      borderWidth="1px"
      borderRadius="md"
      bg="white"
      width="100%"
      display="flex"
      flexDirection="column"
    >
      <Flex alignItems="center" mb={2}>
        <Text fontWeight="bold" mr={2}>
          {name}
        </Text>
        {status === "running" ? (
          <Badge colorScheme="green">Running</Badge>
        ) : (
          <Badge colorScheme="red">Stopped</Badge>
        )}
      </Flex>
      <Flex alignItems="center" mb={2}>
        <Icon as={FaPlay} color="gray.500" mr={2} />
        <Text fontSize="sm" color="gray.500">
          {new Date(startTime).toLocaleString()}
        </Text>
      </Flex>
      {status === "stopped" && (
        <Flex alignItems="center" mb={2}>
          <Icon as={FaStop} color="gray.500" mr={2} />
          <Text fontSize="sm" color="gray.500">
            {new Date(endTime).toLocaleString()}
          </Text>
        </Flex>
      )}
      <IconButton
        icon={status === "running" ? <FaStop /> : <FaPlay />}
        aria-label={status === "running" ? "Stop task" : "Start task"}
        variant="outline"
        colorScheme={status === "running" ? "red" : "green"}
        onClick={() => console.log("Button clicked")}
      />
    </Box>
  );
}
