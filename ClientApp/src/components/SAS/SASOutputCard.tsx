import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useStore } from "../../store/store";

export const SASOutputCard = () => {
  const { projectState, SASOutputActive } = useStore();

  return (
    <Flex
      p={4}
      direction="column"
      alignItems="center"
      justifyContent="center"
      width={!SASOutputActive ? "50%" : "100%"}
      borderRadius="md"
      border="1px solid lightgrey"
    >
      <SimpleGrid columns={[1, 1, 2]} gap={1} alignItems="center">
        {projectState.ltar && (
          <>
            <Heading
              fontSize="1rem"
              wordBreak="keep-all"
              height="100%"
              paddingTop="1px"
            >
              Long Term Acceptance Rate:
            </Heading>
            <Text>{projectState.ltar} gallons per day per SF</Text>
          </>
        )}
        {projectState.SASMinSurfaceArea && (
          <>
            <Heading
              fontSize="1rem"
              wordBreak="keep-all"
              height="100%"
              paddingTop="1px"
            >
              Minimum Required SAS Surface Area:
            </Heading>
            <Text>{projectState.SASMinSurfaceArea} SF</Text>
          </>
        )}
        {projectState.SASLength && (
          <>
            <Heading
              fontSize="1rem"
              wordBreak="keep-all"
              height="100%"
              paddingTop="1px"
            >
              SAS Length Provided:
            </Heading>
            <Text>{projectState.SASLength} FT</Text>
          </>
        )}
        {projectState.SASProvOverallWidth && (
          <>
            <Heading
              fontSize="1rem"
              wordBreak="keep-all"
              height="100%"
              paddingTop="1px"
            >
              Overall SAS Width Provided:
            </Heading>
            <Text>{projectState.SASProvOverallWidth} FT</Text>
          </>
        )}
        {projectState.SASProvSurfaceArea && (
          <>
            <Heading
              fontSize="1rem"
              wordBreak="keep-all"
              height="100%"
              paddingTop="1px"
            >
              SAS Square Footage Provided:
            </Heading>
            <Text>{projectState.SASProvSurfaceArea} SF</Text>
          </>
        )}
      </SimpleGrid>
    </Flex>
  );
};
