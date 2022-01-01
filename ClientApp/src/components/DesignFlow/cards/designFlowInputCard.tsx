/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useStore } from "../../../store/store";
import { ProjectStateUpdateParam, Use } from "../../../types";
import {
  fetchEstablishmentTypesList,
  fetchUseList,
} from "../../../utilities/fetchUtil";

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
    designFlowOutputActive,
  } = useStore();

  useEffect(() => {
    Promise.all([fetchUseList(), fetchEstablishmentTypesList()]).then(
      ([usesRes, estTypeRes]) => {
        setProjectUses(usesRes);
        setEstablishments(estTypeRes);
      }
    );
  }, []);

  useEffect(() => {}, [projectState.establishmentTypeId]);

  useEffect(() => {
    if (!projectState.useId) return;
    let currentUse: Use = projectUses.find(
      (projectUse) => projectUse.useId === projectState.useId
    )!;
    setCurrentProjectUse(currentUse);
  }, [projectState.useId, projectUses]);

  useEffect(() => {
    handleMinCalcDesignFlow();
  }, [projectState.usePrimaryUnitValue, projectState.useSecondaryUnitValue]);

  const handleMinCalcDesignFlow = () => {
    let calcdMinDesignFlow: number | null = null;
    if (!currentProjectUse) {
      let updatedProperties: ProjectStateUpdateParam = {
        minDesignFlowRate: null,
      };
      updateProjectState(updatedProperties);
      return;
    }

    const primaryFlowValue: number =
      projectState.usePrimaryUnitValue !== undefined
        ? projectState.usePrimaryUnitValue * currentProjectUse.primaryFlowRate
        : 0;

    const secondaryFlowValue: number = currentProjectUse.secondaryFlowRate
      ? projectState.usePrimaryUnitValue * currentProjectUse.secondaryFlowRate
      : 0;

    calcdMinDesignFlow = primaryFlowValue + secondaryFlowValue;

    if (calcdMinDesignFlow === 0) return;
    let updatedProperties: ProjectStateUpdateParam = {
      minDesignFlowRate: calcdMinDesignFlow,
    };

    updateProjectState(updatedProperties);
  };

  const handleSetEstablishment = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let establishmentIdSelected = event.target.value
      ? (parseInt(event.target.value) as unknown as number)
      : null;
    let updatedProperties: ProjectStateUpdateParam = {
      establishmentTypeId: establishmentIdSelected,
    };
    updateProjectState(updatedProperties);
  };

  const handleSetUse = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const useIdSelected = parseInt(event.target.value) as unknown as number;
    const updatedProperties: ProjectStateUpdateParam = {
      useId: useIdSelected,
    };
    updateProjectState(updatedProperties);
  };

  const handleSetPrimaryUnitInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const primaryUnitInputValue =
      event.target.value !== "" ? parseInt(event.target.value) : undefined;

    const updatedProperties: ProjectStateUpdateParam = {
      usePrimaryUnitValue: primaryUnitInputValue,
    };
    updateProjectState(updatedProperties);
  };

  const handleSetSecondaryUnitInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const secondaryUnitInputValue = parseInt(event.target.value) as number;

    const updatedProperties: ProjectStateUpdateParam = {
      useSecondaryUnitValue: secondaryUnitInputValue,
    };
    updateProjectState(updatedProperties);
  };

  const handleSetDesignFlowRate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let designFlowInputValue = parseInt(event.target.value) as number;
    const updatedProperties: ProjectStateUpdateParam = {
      provDesignFlowRate: designFlowInputValue,
    };
    updateProjectState(updatedProperties);
  };

  const handleValidateDesignFlow = () => {
    if (!projectState.minDesignFlowRate) return;
    let errorText: string = "";
    if (projectState.provDesignFlowRate < projectState.minDesignFlowRate) {
      errorText = `Please enter a design flow rate greater than or equal to ${projectState.minDesignFlowRate}.`;
    } else if (!projectState.provDesignFlowRate) {
      errorText = "Please enter a design flow rate.";
    }
    if (errorText !== "") {
      toast.error(errorText);
      const updatedProperties: ProjectStateUpdateParam = {
        provDesignFlowRate: undefined,
      };
      updateProjectState(updatedProperties);
    }
  };

  const filteredUses =
    projectUses.filter(
      (projectUse) =>
        projectUse.establishmentTypeId === projectState.establishmentTypeId
    ) !== undefined
      ? projectUses.filter(
          (projectUse) =>
            projectUse.establishmentTypeId === projectState.establishmentTypeId
        )
      : projectUses;

  return (
    <Flex
      p={4}
      width={!designFlowOutputActive ? "50%" : "100%"}
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
          onChange={handleSetEstablishment}
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
            onChange={handleSetUse}
          >
            {filteredUses.map((projectUse, i) => (
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
            onChange={handleSetPrimaryUnitInputValue}
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
            onChange={handleSetSecondaryUnitInputValue}
          />
        </FormControl>
      )}
      {projectState.minDesignFlowRate && (
        <FormControl paddingTop="1">
          <FormLabel id="design-flow-input-label">
            Design Flow Rate (GPD)
          </FormLabel>
          <Input
            id="design-flow-input"
            labelid="design-flow-input-label"
            type="number"
            width="100%"
            value={projectState?.provDesignFlowRate}
            onChange={handleSetDesignFlowRate}
            onBlur={handleValidateDesignFlow}
          />
        </FormControl>
      )}
    </Flex>
  );
};
