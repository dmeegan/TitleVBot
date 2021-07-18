import { Grid, Typography } from "@material-ui/core";
import { ProjectState } from "../../../types";

interface DesignFlowOutputCardProps {
  projectState: ProjectState;
}

export const DesignFlowOutputCard = ({
  projectState,
}: DesignFlowOutputCardProps) => {
  return (
    <div className="p-4 rounded-md border-2 border-pink-400">
      <div className="grid grid-cols-2 items-center justify-items-center">
        {projectState.flowRate !== null && (
          <>
            <div className="xs:col-span-2 sm:col-span-2 md:col-span-1 justify-items-center">
              <p className="font-sans font-medium whitespace-nowrap">
                Flow Rate:
              </p>
            </div>
            <div className="xs:col-span-2 sm:col-span-2 md:col-span-1">
              <p className="font-sans">{projectState.flowRate || 0}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
