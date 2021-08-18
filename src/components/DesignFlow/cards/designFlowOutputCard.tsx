import { Heading, Text, Flex, SimpleGrid } from "@chakra-ui/react";
import { useStore } from "../../../store/store";

export const DesignFlowOutputCard = () => {
  const { projectState } = useStore();

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
          Flow Per Primary Unit:
        </Heading>
        <Text>{projectState.usePrimaryUnitValue || 0}</Text>
      </SimpleGrid>

      {projectState.useSecondaryUnitValue && (
        <SimpleGrid columns={[1, 1, 2]} gap={1} alignItems="center">
          <Heading
            fontSize="1rem"
            wordBreak="keep-all"
            height="100%"
            paddingTop="1px"
          >
            Flow Per Secondary Unit:
          </Heading>
          <Text>{projectState.useSecondaryUnitValue}</Text>
        </SimpleGrid>
      )}
      {projectState.flowRate && (
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
      )}
    </Flex>
  );
};
