/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { ProjectStateUpdateParam } from "../../types";
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
import { useStore } from "../../store/store";

export const SASInputCard = () => {
  const { projectState, updateProjectState, fieldTypes, handleSetFieldTypes } =
    useStore();

  useEffect(() => {
    handleSetFieldTypes(tempFieldTypes);
  }, []);

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
            updateProjectState(updatedProperties);
          }}
        >
          {fieldTypes.map((fieldType, i) => (
            <option key={i} value={fieldType.id}>
              {fieldType.description}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl marginTop="1rem">
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
            updateProjectState(updatedProperties);
          }}
        />
      </FormControl>
      <FormControl marginTop="1rem">
        <RadioGroup
          onChange={(valueSelected) => {
            let updatedProperties: ProjectStateUpdateParam = {
              bedConfigurationId: parseInt(valueSelected),
            };
            updateProjectState(updatedProperties);
          }}
          value={projectState.bedConfigurationId}
        >
          <Stack direction="row">
            <Radio value={1}>Alternating Bed</Radio>
            <Radio value={2}>Single Bed</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <FormControl marginTop="1rem">
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
            updateProjectState(updatedProperties);
          }}
        />
      </FormControl>
    </Flex>
  );
};
