/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { NOT_APPLICABLE, ProjectState } from "./types";
import { DesignFlowInputCard } from "./components/DesignFlow/cards/designFlowInputCard";
import { DesignFlowOutputCard } from "./components/DesignFlow/cards/designFlowOutputCard";
import { Flex, ChakraProvider } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";

const App = () => {
  const [projectState, setProjectState] = useState<ProjectState>(
    new ProjectState()
  );
  const handleUpdateProject = (
    updatedProperties: { [P in keyof ProjectState]?: ProjectState[P] }
  ) => {
    setProjectState({ ...projectState, ...updatedProperties });
  };

  useEffect(() => {
    handleCalcAcceptanceRate();
  }, [projectState.soilClass, projectState.percRate]);

  const handleCalcAcceptanceRate = () => {
    let useLtar: number | null | NOT_APPLICABLE = null;

    if (projectState.percRate && projectState.soilClass) {
      const { acceptanceRates } = projectState.soilClass;
      const { percRate } = projectState;

      if (percRate < 5) {
        useLtar = acceptanceRates[0];
      } else if (projectState.percRate < 8) {
        useLtar = acceptanceRates[Math.ceil(percRate - 5)];
      } else if (percRate < 30) {
        useLtar = acceptanceRates[3 + Math.ceil((percRate - 8) / 5)];
      } else if (percRate <= 60) {
        useLtar = acceptanceRates[8 + Math.ceil((percRate - 30) / 10)];
      }

      handleUpdateProject({ ltar: useLtar });
    }
  };

  return (
    <div className="App">
      <ChakraProvider>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <Flex
            backgroundColor="#FFFFFF"
            borderRadius="md"
            direction="row"
            alignItems="center"
            justifyContent="center"
            w={{ base: "33%", xs: "100%" }}
          >
            <DesignFlowInputCard
              projectState={projectState}
              handleUpdateProject={handleUpdateProject}
            />
            <DesignFlowOutputCard projectState={projectState} />
          </Flex>
          <Flex
            backgroundColor="#FFFFFF"
            borderRadius="md"
            direction="row"
            alignItems="center"
            justifyContent="center"
            w={{ base: "33%", xs: "100%" }}
          ></Flex>
        </Grid>
      </ChakraProvider>
    </div>
  );
};

export default App;
