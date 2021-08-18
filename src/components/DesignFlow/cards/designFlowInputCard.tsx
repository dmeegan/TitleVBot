/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { FormControl, Select, FormLabel, Input, Flex } from "@chakra-ui/react";

import { tempUses, tempEstablishments } from "../../../tempData/tempUseData";
import { Use } from "../../../types";
import { useStore } from "../../../store/store";

export const DesignFlowInputCard = () => {
  const {
    handleSetEstablishments,
    setUses,
    establishments,
    uses,
    currentUse,
    handleSetCurrentUse,
    projectState,
    updateProjectState,
  } = useStore();

  useEffect(() => {
    handleSetEstablishments(tempEstablishments);
  }, []);

  useEffect(() => {
    const filteredUses =
      tempUses.filter(
        (use) => use.establishmentTypeId === projectState.establishmentTypeId
      ) !== undefined
        ? tempUses.filter(
            (use) =>
              use.establishmentTypeId === projectState.establishmentTypeId
          )
        : tempUses;
    setUses(filteredUses);
  }, [projectState.establishmentTypeId]);

  useEffect(() => {
    if (!projectState.useId) return;
    let currentUse: Use = uses.find((use) => use.useId === projectState.useId)!;
    handleSetCurrentUse(currentUse);
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
    updateProjectState(updatedProperties);
  };

  return (
    <Flex
      p={4}
      width="100%"
      height="100%"
      justifyContent="flex-start"
      direction="column"
    >
      <FormControl>
        <FormLabel id="establishment-type-select-label">
          Type of Establishment
        </FormLabel>
        <Select
          labelid="establishment-type-select-label"
          id="establishment-type-select"
          placeholder="Select Establishment Type"
          value={
            projectState.establishmentTypeId || "Select a Establishment Type"
          }
          onChange={(event) => {
            let establishmentIdSelected = parseInt(
              event.target.value
            ) as unknown as number;
            let updatedProperties = {
              establishmentTypeId: establishmentIdSelected,
            };
            updateProjectState(updatedProperties);
          }}
        >
          {establishments.map((establishment, i) => (
            <option key={i} value={establishment.establishmentTypeId}>
              {establishment.description}
            </option>
          ))}
        </Select>
      </FormControl>
      {projectState.establishmentTypeId !== null && (
        <FormControl paddingTop="1">
          <FormLabel id="use-type-select-label">Type of Use</FormLabel>
          <Select
            labelid="use-type-select-label"
            id="use-type-select"
            value={projectState.useId || ""}
            placeholder="Select Use Type"
            onChange={(event) => {
              const useIdSelected = parseInt(
                event.target.value
              ) as unknown as number;
              const updatedProperties = {
                useId: useIdSelected,
              };
              updateProjectState(updatedProperties);
            }}
          >
            {uses.map((use, i) => (
              <option key={i} value={use.useId}>
                {use.description}
              </option>
            ))}
          </Select>
        </FormControl>
      )}
      {currentUse && (
        <FormControl paddingTop="1">
          <FormLabel id="use-primary-unit-value-input-label">
            Number of {currentUse.primaryUnit}
          </FormLabel>
          <Input
            id="use-primary-unit-value-input"
            type="number"
            width="100%"
            value={projectState.usePrimaryUnitValue}
            labelid="use-primary-unit-value-input-label"
            onChange={(event) => {
              const primaryUnitInputValue = parseInt(
                event.target.value
              ) as number;
              const updatedProperties = {
                usePrimaryUnitValue: primaryUnitInputValue,
              };
              updateProjectState(updatedProperties);
            }}
          />
        </FormControl>
      )}
      {currentUse?.secondaryUnit && (
        <FormControl paddingTop="1">
          <FormLabel id="secondary-unit-value-input-label">
            Number of {currentUse.secondaryUnit}
          </FormLabel>
          <Input
            id="secondary-unit-value-input"
            labelid="secondary-unit-value-input-label"
            type="number"
            width="100%"
            value={projectState?.useSecondaryUnitValue}
            onChange={(event) => {
              const secondaryUnitInputValue = parseInt(
                event.target.value
              ) as number;

              const updatedProperties = {
                useSecondaryUnitValue: secondaryUnitInputValue,
              };
              updateProjectState(updatedProperties);
            }}
          />
        </FormControl>
      )}
    </Flex>
  );
};
