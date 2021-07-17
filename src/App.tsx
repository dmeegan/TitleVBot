import { useState } from "react";
import { ProjectState } from "./types";
import { Grid } from "@material-ui/core";
import { CustomGridContainer } from "./styles/styledComponents";
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
      <Grid container spacing={2} direction="column">
        <CustomGridContainer
          item
          container
          spacing={2}
          xs={12}
          sm={6}
          alignItems="center"
        >
          <Grid item xs={12} sm={7}>
            <DesignFlowInputCard
              projectState={projectState}
              handleUpdateProject={handleUpdateProject}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <DesignFlowOutputCard projectState={projectState} />
          </Grid>
        </CustomGridContainer>
      </Grid>
    </div>
  );
};

export default App;
