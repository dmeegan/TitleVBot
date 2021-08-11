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
    <Flex p={4} direction="column" width="100%">
      <FormControl width="100%">
        <FormLabel id="establishment-type-select-label">
          Type of Establishment
        </FormLabel>
        <Select
          labelId="establishment-type-select-label"
          id="establishment-type-select"
          width="max"
          value={
            projectState.establishmentTypeId !== null
              ? projectState.establishmentTypeId
              : ""
          }
          onChange={(event) => {
            let establishmentIdSelected = event.target
              .value as unknown as number;
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
        <FormControl width="100%">
          <FormLabel shrink id="use-type-select-label">
            Type of Use
          </FormLabel>
          <Select
            labelId="use-type-select-label"
            id="use-type-select"
            displayEmpty={true}
            value={projectState.useId !== null ? projectState.useId : ""}
            onChange={(event) => {
              let useIdSelected = event.target.value as unknown as number;
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
        <Input
          type="number"
          width="100%"
          value={projectState.usePrimaryUnitValue}
          label={`Number of ${currentUse.primaryUnit}`}
          onChange={(event) => {
            let primaryUnitInputValue = parseInt(event.target.value) as number;
            let updatedProperties = {
              usePrimaryUnitValue: primaryUnitInputValue,
            };
            handleUpdateProject(updatedProperties);
          }}
        />
      )}
      {currentUse?.secondaryUnit && (
        <Input
          type="number"
          width="100%"
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
      )}
    </Flex>
  );
};
