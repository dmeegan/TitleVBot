import { Grid, Heading, Text, Flex, Spacer } from "@chakra-ui/react";
import { ProjectState } from "../../../types";

interface DesignFlowOutputCardProps {
  projectState: ProjectState;
}

export const DesignFlowOutputCard = ({
  projectState,
}: DesignFlowOutputCardProps) => {
  return (
    <Flex p={4} direction="column" alignItems="center" width="100%">
      {projectState.flowRate !== null && (
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={1}
          alignItems="center"
          width="100%"
        >
          <Heading fontSize="1rem">Flow Rate:</Heading>
          <Text>{projectState.flowRate || 0}</Text>
        </Grid>
      )}
    </Flex>
  );
};
