import { Heading, Text, Flex, SimpleGrid } from "@chakra-ui/react";
import { ProjectState } from "../../types";

interface DesignFlowOutputCardProps {
  projectState: ProjectState;
}

export const DesignFlowOutputCard = ({
  projectState,
}: DesignFlowOutputCardProps) => {
  return (
    <Flex
      p={4}
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      borderRadius="md"
      border="1px solid lightgrey"
    >
      <SimpleGrid columns={[1, 1, 2]} gap={1} alignItems="center">
        <Heading
          fontSize="1rem"
          wordBreak="keep-all"
          height="100%"
          paddingTop="1px"
        >
          Flow Rate:
        </Heading>
        <Text>{projectState.flowRate || 0}</Text>
      </SimpleGrid>
    </Flex>
  );
};
