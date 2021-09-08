import { Heading, Text, Flex, SimpleGrid } from "@chakra-ui/react";
import { ProjectState } from "../../types";

interface SASOutputCardProps {
  projectState: ProjectState;
}

export const SASOutputCard = ({ projectState }: SASOutputCardProps) => {
  return (
    <Flex direction="column" width="100%">
      <Heading fontSize="1.25rem" alignSelf="center">
        Results
      </Heading>
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
          {projectState.SASProvidedOverallWidth && (
            <>
              <Heading
                fontSize="1rem"
                wordBreak="keep-all"
                height="100%"
                paddingTop="1px"
              >
                Overall SAS Width Provided:
              </Heading>
              <Text>{projectState.SASProvidedOverallWidth} FT</Text>
            </>
          )}
          {projectState.SASProvidedSurfaceArea && (
            <>
              <Heading
                fontSize="1rem"
                wordBreak="keep-all"
                height="100%"
                paddingTop="1px"
              >
                SAS Square Footage Provided:
              </Heading>
              <Text>{projectState.SASProvidedSurfaceArea} SF</Text>
            </>
          )}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};
