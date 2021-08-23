/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { NOT_APPLICABLE } from "./types";
import { DesignFlowInputCard } from "./components/DesignFlow/cards/designFlowInputCard";
import { DesignFlowOutputCard } from "./components/DesignFlow/cards/designFlowOutputCard";
import { Flex, ChakraProvider, SimpleGrid } from "@chakra-ui/react";
import { SASInputCard } from "./components/SAS/SASInputCard";
import { useStore } from "./store/store";

const App = () => {
  const { projectState, updateProjectState, currentSoilClass } = useStore();

  useEffect(() => {
    handleCalcAcceptanceRate();
  }, [projectState.soilClassId, projectState.percRate]);

  const handleCalcAcceptanceRate = () => {
    let calcedLtar: number | null | NOT_APPLICABLE = null;

    if (projectState.percRate && projectState.soilClassId && currentSoilClass) {
      const { acceptanceRates } = currentSoilClass;
      const { percRate } = projectState;

      if (percRate < 5) {
        calcedLtar = acceptanceRates[0];
      } else if (projectState.percRate < 8) {
        calcedLtar = acceptanceRates[Math.ceil(percRate - 5)];
      } else if (percRate < 30) {
        calcedLtar = acceptanceRates[3 + Math.ceil((percRate - 8) / 5)];
      } else if (percRate <= 60) {
        calcedLtar = acceptanceRates[8 + Math.ceil((percRate - 30) / 10)];
      }

      updateProjectState({ ltar: calcedLtar });
    }
  };

  return (
    <div className="App">
      <ChakraProvider>
        <SimpleGrid minChildWidth="350px" gap={6} height="100%">
          <Flex
            backgroundColor="#FFFFFF"
            borderRadius="md"
            alignItems="center"
            justifyContent="center"
            minHeight={0.33 * window.innerHeight}
            p={4}
          >
            <DesignFlowInputCard />
            <DesignFlowOutputCard />
          </Flex>
          <Flex
            backgroundColor="#FFFFFF"
            borderRadius="md"
            alignItems="center"
            justifyContent="center"
            minHeight={0.33 * window.innerHeight}
            p={4}
          >
            <SASInputCard />
          </Flex>
        </SimpleGrid>
      </ChakraProvider>
    </div>
  );
};

export default App;
