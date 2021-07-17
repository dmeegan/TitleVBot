import { useEffect, useState } from "react";
import { InputCard } from "../../../styles/styledComponents";
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@material-ui/core";
import {
  uses as tempUses,
  establishments as tempEstablishments,
} from "../../../tempData/tempUseData";
import { Establishment, Use, ProjectState } from "../../../types";

interface DesignFlowInputCardProps {
  projectState: ProjectState;
  handleUpdateProject: (
    updatedProperties: { [P in keyof ProjectState]?: ProjectState[P] }
  ) => void;
}

export const DesignFlowInputCard = ({
  projectState,
  handleUpdateProject,
}: DesignFlowInputCardProps) => {
  const [uses, setUses] = useState<Use[]>([]);
  const [currentUse, setCurrentUse] = useState<Use | null>(null);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);

  useEffect(() => {
    const filteredUses = projectState.establishmentTypeId
      ? tempUses.filter(
          (use) => use.establishmentTypeId === projectState.establishmentTypeId
        )
      : tempUses;
    setUses(filteredUses);
    setEstablishments(tempEstablishments);
  }, [projectState.establishmentTypeId]);

  useEffect(() => {
    if (!projectState.useId) return;
    let currentUse: Use = uses.find((use) => use.useId === projectState.useId)!;
    setCurrentUse(currentUse);
  }, [projectState.useId, uses]);

  useEffect(() => {
    handleCalcDesignFlow();
  }, [projectState.usePrimaryUnitValue, projectState.useSecondaryUnitValue]);

  const handleCalcDesignFlow = () => {
    if (!currentUse) return;
    const primaryFlowValue: number = currentUse
      ? projectState.usePrimaryUnitValue * currentUse.primaryFlowRate
      : 0;
    const secondaryFlowValue: number = currentUse.secondaryFlowRate
      ? projectState.usePrimaryUnitValue * currentUse.secondaryFlowRate
      : 0;
    const totalFlowValue: number = primaryFlowValue + secondaryFlowValue;
    let updatedProperties = {
      flowRate: totalFlowValue,
    };
    handleUpdateProject(updatedProperties);
  };

  return (
    <InputCard elevation={0}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl style={{ width: "100%" }}>
            <InputLabel shrink id="establishment-type-select-label">
              Type of Establishment
            </InputLabel>
            <Select
              labelId="establishment-type-select-label"
              id="establishment-type-select"
              value={
                projectState.establishmentTypeId !== null
                  ? projectState.establishmentTypeId
                  : ""
              }
              onChange={(event) => {
                let establishmentIdSelected = event.target.value as number;
                let updatedProperties = {
                  establishmentTypeId: establishmentIdSelected,
                };
                handleUpdateProject(updatedProperties);
              }}
            >
              {establishments.map((establishment, i) => (
                <MenuItem key={i} value={establishment.establishmentTypeId}>
                  {establishment.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {projectState.establishmentTypeId !== null && (
          <Grid item xs={12}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel shrink id="use-type-select-label">
                Type of Use
              </InputLabel>
              <Select
                labelId="use-type-select-label"
                id="use-type-select"
                displayEmpty={true}
                value={projectState.useId !== null ? projectState.useId : ""}
                onChange={(event) => {
                  let useIdSelected = event.target.value as number;
                  let updatedProperties = {
                    useId: useIdSelected,
                  };
                  handleUpdateProject(updatedProperties);
                }}
              >
                {uses.map((use, i) => (
                  <MenuItem key={i} value={use.useId}>
                    {use.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        {currentUse && (
          <Grid item xs={12}>
            <TextField
              type="number"
              value={projectState.usePrimaryUnitValue}
              label={`Number of ${currentUse.primaryUnit}`}
              onChange={(event) => {
                let primaryUnitInputValue = parseInt(
                  event.target.value
                ) as number;
                let updatedProperties = {
                  usePrimaryUnitValue: primaryUnitInputValue,
                };
                handleUpdateProject(updatedProperties);
              }}
            />
          </Grid>
        )}
        {currentUse?.secondaryUnit && (
          <Grid item xs={12}>
            <TextField
              type="number"
              value={projectState.useSecondaryUnitValue || ""}
              label={`Number of ${currentUse.secondaryUnit}`}
              onChange={(event) => {
                let secondaryUnitInputValue = parseInt(
                  event.target.value
                ) as number;
                let updatedProperties = {
                  useSecondaryUnitValue: secondaryUnitInputValue,
                };
                handleUpdateProject(updatedProperties);
              }}
            />
          </Grid>
        )}
      </Grid>
    </InputCard>
  );
};
