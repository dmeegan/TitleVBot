/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { FormControl, Select, FormLabel, Input, Flex } from "@chakra-ui/react";

import { tempUses, tempEstablishments } from "../../../tempData/tempUseData";
import { Use } from "../../../types";
import { useStore } from "../../../store/store";

export const DesignFlowInputCard = () => {
  const {
    setEstablishments,
    setProjectUses,
    establishments,
    projectUses,
    currentProjectUse,
    setCurrentProjectUse,
    projectState,
    updateProjectState,
  } = useStore();

  useEffect(() => {
    setProjectUses(tempUses);
    setEstablishments(tempEstablishments);
  }, []);

  useEffect(() => {
    const filteredUses =
      tempUses.filter(
        (projectUse) =>
          projectUse.establishmentTypeId === projectState.establishmentTypeId
      ) !== undefined
        ? tempUses.filter(
            (projectUse) =>
              projectUse.establishmentTypeId ===
              projectState.establishmentTypeId
          )
        : tempUses;
    setProjectUses(filteredUses);
  }, [projectState.establishmentTypeId]);

  useEffect(() => {
    if (!projectState.useId) return;
    let currentUse: Use = projectUses.find(
      (projectUse) => projectUse.useId === projectState.useId
    )!;
    setCurrentProjectUse(currentUse);
  }, [projectState.useId, projectUses]);

  useEffect(() => {
    handleCalcDesignFlow();
  }, [projectState.usePrimaryUnitValue, projectState.useSecondaryUnitValue]);

  const handleCalcDesignFlow = () => {
    if (!currentProjectUse) return;
    const primaryFlowValue: number = currentProjectUse
      ? projectState.usePrimaryUnitValue * currentProjectUse.primaryFlowRate
      : 0;

    const secondaryFlowValue: number = currentProjectUse.secondaryFlowRate
      ? projectState.usePrimaryUnitValue * currentProjectUse.secondaryFlowRate
      : 0;

    const totalFlowValue: number = primaryFlowValue + secondaryFlowValue;

    let updatedProperties = {
      minDesignFlowRate: totalFlowValue,
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
            {projectUses.map((projectUse, i) => (
              <option key={i} value={projectUse.useId}>
                {projectUse.description}
              </option>
            ))}
          </Select>
        </FormControl>
      )}
      {currentProjectUse && (
        <FormControl paddingTop="1">
          <FormLabel id="use-primary-unit-value-input-label">
            Number of {currentProjectUse.primaryUnit}
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
      {currentProjectUse?.secondaryUnit && (
        <FormControl paddingTop="1">
          <FormLabel id="secondary-unit-value-input-label">
            Number of {currentProjectUse.secondaryUnit}
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
