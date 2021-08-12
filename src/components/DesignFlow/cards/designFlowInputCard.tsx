/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Flex, FormControl, Select, FormLabel, Input } from "@chakra-ui/react";

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
    setEstablishments(tempEstablishments);
  }, []);

  useEffect(() => {
    console.log(
      tempUses.filter(
        (use) => use.establishmentTypeId === projectState.establishmentTypeId
      )
    );
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
    <Flex p={4} direction="column" width="100%">
      <FormControl>
        <FormLabel id="establishment-type-select-label">
          Type of Establishment
        </FormLabel>
        <Select
          labelid="establishment-type-select-label"
          id="establishment-type-select"
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
            handleUpdateProject(updatedProperties);
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
        <FormControl>
          <FormLabel id="use-type-select-label">Type of Use</FormLabel>
          <Select
            labelid="use-type-select-label"
            id="use-type-select"
            value={projectState.useId || ""}
            onChange={(event) => {
              let useIdSelected = parseInt(
                event.target.value
              ) as unknown as number;
              console.log(useIdSelected);
              let updatedProperties = {
                useId: useIdSelected,
              };
              handleUpdateProject(updatedProperties);
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
        <FormControl>
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
              let primaryUnitInputValue = parseInt(
                event.target.value
              ) as number;
              let updatedProperties = {
                usePrimaryUnitValue: primaryUnitInputValue,
              };
              handleUpdateProject(updatedProperties);
            }}
          />
        </FormControl>
      )}
      {currentUse?.secondaryUnit && (
        <FormControl>
          <FormLabel id="secondary-unit-value-input-label">
            Number of {currentUse.secondaryUnit}
          </FormLabel>
          <Input
            id="secondary-unit-value-input"
            labelid="secondary-unit-value-input-label"
            type="number"
            width="100%"
            value={projectState.useSecondaryUnitValue || ""}
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
        </FormControl>
      )}
    </Flex>
  );
};
