/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Switch,
  FormLabel,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import { ProjectState } from "../../types";
import { FieldType } from "../../types";
import { tempFieldTypes } from "../../tempData/tempSASData";

interface SASInputCardProps {
  projectState: ProjectState;
  handleUpdateProject: (
    updatedProperties: { [P in keyof ProjectState]?: ProjectState[P] }
  ) => void;
}

export const SASInputCard = ({
  projectState,
  handleUpdateProject,
}: SASInputCardProps) => {
  const [fieldTypes, setFieldTypes] = useState<FieldType[]>([]);
  const [currentFieldType, setCurrentFieldType] = useState<FieldType>();

  useEffect(() => {
    setFieldTypes(tempFieldTypes);
  }, []);

  useEffect(() => {
    if (!projectState.fieldTypeId) return;
    let currentFieldType: FieldType = fieldTypes.find(
      (fieldType) => fieldType.id === projectState.fieldTypeId
    )!;
    setCurrentFieldType(currentFieldType);
  }, [projectState.fieldTypeId, fieldTypes]);

  return (
    <div className="p-4 rounded-md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl style={{ width: "100%" }}>
            <InputLabel shrink id="field-type-select-label">
              Field Type
            </InputLabel>
            <Select
              labelId="field-type-select-label"
              id="field-type-select"
              value={
                projectState.fieldTypeId !== null
                  ? projectState.fieldTypeId
                  : ""
              }
              onChange={(event) => {
                let fieldTypeIdSelected = event.target.value as number;
                let updatedProperties = {
                  establishmentTypeId: fieldTypeIdSelected,
                };
                handleUpdateProject(updatedProperties);
              }}
            >
              {fieldTypes.map((fieldType, i) => (
                <MenuItem key={i} value={fieldType.id}>
                  {fieldType.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="number"
            value={projectState.sasMaxLength}
            label="Maximum Desired SAS Length"
            onChange={(event) => {
              let maxLengthInputValue = parseInt(event.target.value) as number;
              let updatedProperties = {
                sasMaxLength: maxLengthInputValue,
              };
              handleUpdateProject(updatedProperties);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Are you using an Alternating Bed System?
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={projectState.isAlternatingBed}
                    onChange={(event) => {
                      let isAltBedSwitchValue = event.target.checked as boolean;
                      let updatedProperties = {
                        isAlternatingBed: isAltBedSwitchValue,
                      };
                      handleUpdateProject(updatedProperties);
                    }}
                  />
                }
                label="Yes"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="number"
            value={projectState.percRate || ""}
            label="Percolation Rate"
            onChange={(event) => {
              let percRateInputValue = parseInt(event.target.value) as number;
              let updatedProperties = {
                percRate: percRateInputValue,
              };
              handleUpdateProject(updatedProperties);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
