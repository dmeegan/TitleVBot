import { Heading, Text, Flex } from "@chakra-ui/react";
import { useStore } from "../../../store/store";

export const DesignFlowOutputCard = () => {
  const { projectState, currentProjectUse } = useStore();

  return (
    <Flex direction="column" width="100%">
      <Heading fontSize="1.25rem" alignSelf="center">
        Results
      </Heading>
      <Flex
        p={4}
        direction="column"
        justifyContent="flex-start"
        width="100%"
        borderRadius="md"
        border="1px solid lightgrey"
      >
        {currentProjectUse && (
          <Flex alignItems="center">
            <Heading
              fontSize="1rem"
              wordBreak="keep-all"
              height="100%"
              paddingRight="0.5rem"
            >
              Flow Per {currentProjectUse?.primaryUnit}:
            </Heading>
            <Text> {projectState.usePrimaryUnitValue || 0}</Text>
          </Flex>
        )}
        {currentProjectUse && currentProjectUse?.secondaryUnit && (
          <Flex alignItems="center">
            <Heading
              fontSize="1rem"
              wordBreak="keep-all"
              height="100%"
              paddingRight="0.5rem"
            >
              Flow per {currentProjectUse?.secondaryUnit}:{" "}
            </Heading>
            <Text>{projectState.useSecondaryUnitValue || 0}</Text>
          </Flex>
        )}
        <Flex alignItems="center">
          <Heading
            fontSize="1rem"
            wordBreak="keep-all"
            height="100%"
            paddingRight="0.5rem"
          >
            Minimum Design Flow Rate:
          </Heading>
          <Text>{projectState.minDesignFlowRate || 0}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
