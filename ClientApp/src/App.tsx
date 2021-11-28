/* eslint-disable react-hooks/exhaustive-deps */
import { ChakraProvider, Flex, SimpleGrid } from "@chakra-ui/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dotenv from "dotenv";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { DesignFlowInputCard } from "./components/DesignFlow/cards/designFlowInputCard";
import { DesignFlowOutputCard } from "./components/DesignFlow/cards/designFlowOutputCard";
import { SASInputCard } from "./components/SAS/SASInputCard";
import { SASOutputCard } from "./components/SAS/SASOutputCard";
import { useStore } from "./store/store";
import { tempConstraints } from "./tempData/tempErrorData";
import { LTAR } from "./types";

let env = dotenv;

const App = () => {
  const {
    projectState,
    updateProjectState,
    currentSoilClass,
    setConstraintTypes,
    designFlowOutputActive,
    setDesignFlowOutputActive,
  } = useStore();

  useEffect(() => {
    projectState.minDesignFlowRate ||
    projectState.usePrimaryUnitValue ||
    projectState.useSecondaryUnitValue
      ? setDesignFlowOutputActive(true)
      : setDesignFlowOutputActive(false);
  }, [
    projectState.minDesignFlowRate,
    projectState.useSecondaryUnitValue,
    projectState.usePrimaryUnitValue,
  ]);

  useEffect(() => {
    setConstraintTypes(tempConstraints);
  }, []);

  useEffect(() => {
    handleCalcAcceptanceRate();
  }, [projectState.soilClassId, projectState.percRate]);

  const handleCalcAcceptanceRate = () => {
    let calcedLtar: LTAR = null;

    if (projectState.percRate && projectState.soilClassId && currentSoilClass) {
      const { acceptanceRates } = currentSoilClass;
      const { percRate } = projectState;

      if (percRate < 5) {
        calcedLtar = acceptanceRates[0];
      } else if (percRate < 8) {
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
      <Toaster position="top-center" />
      <ChakraProvider>
        <SimpleGrid minChildWidth="350px" gap={6} height="100%">
          <Flex
            backgroundColor="#FFFFFF"
            borderRadius="md"
            alignItems="center"
            justifyContent="flex-start"
            minHeight={0.33 * window.innerHeight}
            p={4}
          >
            <DesignFlowInputCard />
            {designFlowOutputActive && <DesignFlowOutputCard />}
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
            <SASOutputCard projectState={projectState} />
          </Flex>
        </SimpleGrid>
      </ChakraProvider>
    </div>
  );
};

export default App;
