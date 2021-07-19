/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { NOT_APPLICABLE, ProjectState } from "./types";
import "tailwindcss/tailwind.css";
import { DesignFlowInputCard } from "./components/DesignFlow/cards/designFlowInputCard";
import { DesignFlowOutputCard } from "./components/DesignFlow/cards/designFlowOutputCard";

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
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-xl grid grid-cols-12 gap-4 items-center">
          <div className="xs:col-span-12 sm:col-span-7">
            <DesignFlowInputCard
              projectState={projectState}
              handleUpdateProject={handleUpdateProject}
            />
          </div>
          <div className="xs:col-span-12 sm:col-span-5">
            <DesignFlowOutputCard projectState={projectState} />
          </div>
        </div>
        <div className="p-4 bg-white rounded-xl grid grid-cols-12 gap-4 items-center">
          <div className="xs:col-span-12 sm:col-span-7"></div>
          <div className="xs:col-span-12 sm:col-span-5"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
