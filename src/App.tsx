import { useState } from "react";
import { ProjectState } from "./types";
import "tailwindcss/tailwind.css";
import { Grid } from "@material-ui/core";
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

  //   // The following switch statement determines the LTAR using the percolation rate (percRate) and the soil class (soilClass)
  //   switch (soilClass) {
  //     case 'I':
  //         LTAR = soilClassI[soilClassIterator]
  //         break;
  //     case 'II':
  //         LTAR = soilClassII[soilClassIterator]
  //         break;
  //     case 'III':
  //         LTAR = soilClassIII[soilClassIterator]
  //         break;
  //     case 'IV':
  //         LTAR = soilClassIV[soilClassIterator]
  //         break;
  // }

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
        {/* </CustomGridContainer> */}
      </div>
      {/* <Grid container spacing={2} direction="column">
       
      </Grid> */}
    </div>
  );
};

export default App;
