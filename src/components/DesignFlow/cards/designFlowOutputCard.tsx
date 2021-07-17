import { OutputCard } from "../../../styles/styledComponents";
import { Grid, Typography } from "@material-ui/core";
import { ProjectState } from "../../../types";

interface DesignFlowOutputCardProps {
  projectState: ProjectState;
}

export const DesignFlowOutputCard = ({
  projectState,
}: DesignFlowOutputCardProps) => {
  return (
    <OutputCard variant="outlined">
      <Grid container spacing={2}>
        {projectState.flowRate !== null && (
          <Grid container item spacing={2} justifyContent="center">
            <Grid item>
              <Typography variant="subtitle2" noWrap={true}>
                Flow Rate:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {projectState.flowRate || 0}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </OutputCard>
  );
};
