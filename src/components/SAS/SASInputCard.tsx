/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ProjectState, ProjectStateUpdateParam } from "../../types";
import { FieldType } from "../../types";
import { tempFieldTypes } from "../../tempData/tempSASData";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";

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
    <Flex
      p={4}
      width="100%"
      height="100%"
      justifyContent="flex-start"
      direction="column"
    >
      <FormControl>
        <FormLabel id="field-type-select-label">Field Type</FormLabel>
        <Select
          labelid="field-type-select-label"
          id="field-type-select"
          value={projectState.fieldTypeId || ""}
          placeholder="Select Field Type"
          onChange={(event) => {
            let fieldTypeIdSelected = parseInt(event.target.value);
            let updatedProperties: ProjectStateUpdateParam = {
              fieldTypeId: fieldTypeIdSelected,
            };
            handleUpdateProject(updatedProperties);
          }}
        >
          {fieldTypes.map((fieldType, i) => (
            <option key={i} value={fieldType.id}>
              {fieldType.description}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel id="max-sas-length-input-id">
          Maximum Desired SAS Length
        </FormLabel>
        <Input
          id="max-sas-length-input"
          labelid="max-sas-length-input-id"
          type="number"
          value={projectState.sasMaxLength || undefined}
          onChange={(event) => {
            let maxLengthInputValue = parseInt(event.target.value) as number;
            let updatedProperties = {
              sasMaxLength: maxLengthInputValue,
            };
            handleUpdateProject(updatedProperties);
          }}
        />
      </FormControl>
      <FormControl component="fieldset">
        <RadioGroup
          onChange={(valueSelected) => {
            let updatedProperties: ProjectStateUpdateParam = {
              bedConfigurationId: parseInt(valueSelected),
            };
            handleUpdateProject(updatedProperties);
          }}
          value={projectState.bedConfigurationId}
        >
          <Stack direction="row">
            <Radio value={1}>Alternating Bed</Radio>
            <Radio value={2}>Single Bed</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id="perc-rate-input-label">Percolation Rate</FormLabel>
        <Input
          id="perc-rate-input"
          type="number"
          value={projectState.percRate || ""}
          labelid="perc-rate-input-label"
          onChange={(event) => {
            let percRateInputValue = parseInt(event.target.value) as number;
            let updatedProperties = {
              percRate: percRateInputValue,
            };
            handleUpdateProject(updatedProperties);
          }}
        />
      </FormControl>
    </Flex>
  );
};
