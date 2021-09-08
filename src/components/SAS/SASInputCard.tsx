/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, ReactEventHandler, useEffect } from "react";
import { ProjectStateUpdateParam, SoilClass } from "../../types";
import { tempFieldTypes, tempSoilClasses } from "../../tempData/tempSASData";
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
  const {
    projectState,
    updateProjectState,
    fieldTypes,
    setFieldTypes,
    setCurrentSoilClass,
    soilClasses,
    setSoilClasses,
    handleValidateConstraint,
  } = useStore();

  useEffect(() => {
    setSoilClasses(tempSoilClasses);
    setFieldTypes(tempFieldTypes);
  }, []);

  useEffect(() => {
    handleSetCurrentSoilClass();
  }, [soilClasses, projectState.soilClassId]);

  const handleSetCurrentSoilClass = () => {
    if (!projectState.soilClassId) return;
    let currentSoilClass: SoilClass = soilClasses.find(
      (soilClass) => soilClass.id === projectState.soilClassId
    )!;
    setCurrentSoilClass(currentSoilClass);
  };

  useEffect(() => {
    handleCalReqSasSurfArea();
  }, [projectState.ltar, projectState.minDesignFlowRate]);

  // The following function calculates the required surface area of the SAS (reqSasSurfArea) based on the Long term acceptance rate (LTAR) and the design flow (designFLow).
  const handleCalReqSasSurfArea = () => {
    if (!projectState.ltar || projectState.ltar === "n/a") return;
    const reqSF = Math.ceil(projectState.minDesignFlowRate / projectState.ltar);
    const updatedProperties: ProjectStateUpdateParam = {
      SASMinSurfaceArea: reqSF,
    };
    updateProjectState(updatedProperties);
  };

  useEffect(() => {
    handleCalcTrenchSurfaceAreaPerFoot();
  }, [projectState.SASTrenchHeight, projectState.SASTrenchWidth]);

  // The following function calculates the surface area per linear foot of trench (trenchSurfaceAreaPerFoot) based on the trench hight (trenchHeight) and the trench width (trenchWidth).
  const handleCalcTrenchSurfaceAreaPerFoot = () => {
    if (!projectState.SASTrenchHeight || !projectState.SASTrenchWidth) return;
    const SFPerLF =
      2 * projectState.SASTrenchHeight + projectState.SASTrenchWidth;
    const updatedProperties: ProjectStateUpdateParam = {
      SASTrenchSurfaceAreaPerLF: SFPerLF,
    };
    updateProjectState(updatedProperties);
  };

  useEffect(() => {
    handleCalcSurfaceAreaPerTrench();
  }, [projectState.SASLength, projectState.SASTrenchSurfaceAreaPerLF]);

  // The following function calculates the total surface area per trench (trenchSurfaceArea) based on the surface area per linear foot (trenchSurfaceAreaPerFoot) and the trench length (trenchLength).
  const handleCalcSurfaceAreaPerTrench = () => {
    if (!projectState.SASLength || !projectState.SASTrenchSurfaceAreaPerLF)
      return;
    const surfaceAreaPerTrench =
      projectState.SASTrenchSurfaceAreaPerLF * projectState.SASLength;
    const updatedProperties: ProjectStateUpdateParam = {
      SASTrenchSurfaceAreaPerTrench: surfaceAreaPerTrench,
    };
    updateProjectState(updatedProperties);
  };

  useEffect(() => {
    handleCalcMinTrenchNum();
  }, [
    projectState.SASMinSurfaceArea,
    projectState.SASProvidedSurfaceArea,
    projectState.SASIsTrenches,
  ]);

  // The following function calculates the required number of trenches (minTrenchNum) to achieve the required total SAS surface area (reqSasSurfArea).
  const handleCalcMinTrenchNum = () => {
    if (!projectState.SASMinSurfaceArea) return;
    if (!projectState.SASIsTrenches) {
      const updatedProperties: ProjectStateUpdateParam = {
        SASMinTrenches: null,
      };
      updateProjectState(updatedProperties);
    } else {
      let minTrenches;
      if (!projectState.SASTrenchSurfaceAreaPerTrench) return;
      if (projectState.SASIsAltBed) {
        minTrenches = Math.ceil(
          projectState.SASMinSurfaceArea /
            projectState.SASTrenchSurfaceAreaPerTrench
        );
      } else {
        minTrenches =
          2 *
          Math.ceil(
            projectState.SASMinSurfaceArea /
              projectState.SASTrenchSurfaceAreaPerTrench /
              2
          );
      }
      if (!projectState.SASTrenchSurfaceAreaPerLF) return;
      const recTrenchLength = Math.ceil(
        projectState.SASMinSurfaceArea /
          (minTrenches * projectState.SASTrenchSurfaceAreaPerLF)
      );
      const recTrenchSurfaceArea =
        projectState.SASTrenchSurfaceAreaPerLF * recTrenchLength;
      const updatedProperties: ProjectStateUpdateParam = {
        SASMinTrenches: minTrenches,
        SASRecTrenchLength: recTrenchLength,
        SASRecTrenchSurfaceArea: recTrenchSurfaceArea,
      };
      updateProjectState(updatedProperties);
    }
  };

  useEffect(() => {
    handleReserveConfigurationSelect();
  }, [projectState.SASTrenchWidth, projectState.SASReserveIsBetweenTrenches]);

  const handleReserveConfigurationSelect = () => {
    let reqTrenchSeparation: number;
    if (!projectState.SASTrenchWidth) return;
    if (projectState.SASReserveIsBetweenTrenches) {
      reqTrenchSeparation = 3 * projectState.SASTrenchWidth;
    } else {
      reqTrenchSeparation = 2 * projectState.SASTrenchWidth;
    }
    const updatedProperties: ProjectStateUpdateParam = {
      SASRequiredTrenchSeparation: reqTrenchSeparation,
    };
    updateProjectState(updatedProperties);
  };

  useEffect(() => {
    handleCalcWidths();
  }, [
    projectState.SASTrenchHeight,
    projectState.SASTrenchWidth,
    projectState.SASMinTrenches,
    projectState.SASRequiredTrenchSeparation,
  ]);

  // The following function calculates the overall width of the SAS (sasAreaWidth) based on the number of trenches (recTrenchNum) and the trench width (trenchWidth).
  const handleCalcWidths = () => {
    let SASOverallWidth;
    if (projectState.SASIsTrenches) {
      if (
        !projectState.SASMinTrenches ||
        !projectState.SASTrenchWidth ||
        !projectState.SASRequiredTrenchSeparation ||
        !projectState.SASRecTrenchSurfaceArea
      )
        return;
      const overallSasAreaWidthTrench =
        projectState.SASMinTrenches * projectState.SASTrenchWidth +
        (projectState.SASMinTrenches - 1) *
          projectState.SASRequiredTrenchSeparation;
      if (projectState.SASIsAltBed) {
        SASOverallWidth = overallSasAreaWidthTrench / 2;
      } else {
        SASOverallWidth = overallSasAreaWidthTrench;
      }
      const updatedProperties: ProjectStateUpdateParam = {
        SASProvidedOverallWidth: SASOverallWidth,
      };
      updateProjectState(updatedProperties);
    } else {
      if (!projectState.SASMinSurfaceArea || !projectState.SASLength) return;
      const reqFieldWidth = Math.ceil(
        projectState.SASMinSurfaceArea / projectState.SASLength
      );
      let minSASWidth;
      if (projectState.SASIsAltBed) minSASWidth = reqFieldWidth / 2;
      else {
        minSASWidth = reqFieldWidth;
      }
      const updatedProperties: ProjectStateUpdateParam = {
        SASMinFieldWidth: minSASWidth,
      };
      updateProjectState(updatedProperties);
    }
  };

  const handleCalcSurfaceArea = () => {
    if (!projectState.SASMinTrenches || !projectState.SASRecTrenchSurfaceArea)
      return;
    const provSasSurfaceAreaTrenches =
      projectState.SASMinTrenches * projectState.SASRecTrenchSurfaceArea;
  };

  const handleSelectFieldType = (event: ChangeEvent<HTMLSelectElement>) => {
    const fieldTypeIdSelected = parseInt(event.target.value);
    const isTrenches = fieldTypes.find(
      (fieldType) => fieldType.id === fieldTypeIdSelected
    )?.isTrenches;
    const updatedProperties: ProjectStateUpdateParam = {
      SASFieldTypeId: fieldTypeIdSelected,
      SASIsTrenches: isTrenches,
    };
    updateProjectState(updatedProperties);
  };

  const handleSetTrenchWidth = (event: ChangeEvent<HTMLInputElement>) => {
    let trenchWidthInputValue = parseInt(event.target.value) as number;
    if (handleValidateConstraint("SASTrenchWidth", trenchWidthInputValue)) {
      trenchWidthInputValue = 0;
      return;
    }
    const updatedProperties = {
      SASTrenchWidth: trenchWidthInputValue,
    };
    updateProjectState(updatedProperties);
  };

  const handleSetTrenchHeight = (event: ChangeEvent<HTMLInputElement>) => {
    let trenchHeightInputValue = parseInt(event.target.value) as number;
    if (handleValidateConstraint("SASTrenchHeight", trenchHeightInputValue)) {
      trenchHeightInputValue = 0;
      return;
    }
    const updatedProperties = {
      SASTrenchHeight: trenchHeightInputValue,
    };
    updateProjectState(updatedProperties);
  };

  const handleSetMaxFieldLength = (event: ChangeEvent<HTMLInputElement>) => {
    const maxLengthInputValue = parseInt(event.target.value) as number;
    const updatedProperties = {
      SASMaxLength: maxLengthInputValue,
    };
    updateProjectState(updatedProperties);
  };

  const handleSelectIsAltBed = (valueSelected: string) => {
    const updatedProperties: ProjectStateUpdateParam = {
      SASIsAltBed: parseInt(valueSelected) ? true : false,
    };
    updateProjectState(updatedProperties);
  };

  const handleSetPercRate = (event: ChangeEvent<HTMLInputElement>) => {
    const percRateInputValue = parseInt(event.target.value) as number;
    const updatedProperties = {
      percRate: percRateInputValue,
    };
    updateProjectState(updatedProperties);
  };

  const handleSelectSoilClass = (event: ChangeEvent<HTMLSelectElement>) => {
    const soilClassIdSelected = parseInt(event.target.value);
    const updatedProperties: ProjectStateUpdateParam = {
      soilClassId: soilClassIdSelected,
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
        <FormLabel id="field-type-select-label">Field Type</FormLabel>
        <Select
          labelid="field-type-select-label"
          id="field-type-select"
          value={projectState.SASFieldTypeId}
          placeholder="Select Field Type"
          onChange={handleSelectFieldType}
        >
          {fieldTypes.map((fieldType, i) => (
            <option key={i} value={fieldType.id}>
              {fieldType.description}
            </option>
          ))}
        </Select>
      </FormControl>
      {projectState.SASIsTrenches && (
        <>
          <FormControl marginTop="1rem">
            <FormLabel id="trench-width-id">Proposed Trench Width</FormLabel>
            <Input
              id="trench-width-input"
              labelid="trench-width-id"
              type="number"
              value={projectState.SASTrenchWidth || undefined}
              onChange={handleSetTrenchWidth}
            />
          </FormControl>
          <FormControl marginTop="1rem">
            <FormLabel id="trench-height-id">Proposed Trench Height</FormLabel>
            <Input
              id="trench-height-input"
              labelid="trench-height-id"
              type="number"
              value={projectState.SASTrenchHeight || undefined}
              onChange={handleSetTrenchHeight}
            />
          </FormControl>
        </>
      )}
      <FormControl marginTop="1rem">
        <FormLabel id="max-sas-length-input-id">
          Maximum Desired SAS Length
        </FormLabel>
        <Input
          id="max-sas-length-input"
          labelid="max-sas-length-input-id"
          type="number"
          value={projectState.SASMaxLength || undefined}
          onChange={handleSetMaxFieldLength}
        />
      </FormControl>
      <FormControl marginTop="1rem">
        <RadioGroup
          onChange={handleSelectIsAltBed}
          value={projectState.SASIsAltBed ? 1 : 0}
        >
          <Stack direction="row">
            <Radio value={1}>Alternating Bed</Radio>
            <Radio value={0}>Single Bed</Radio>
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
          onChange={handleSetPercRate}
        />
      </FormControl>
      <FormControl marginTop="1rem">
        <FormLabel id="soil-class-select-label">Soil Class</FormLabel>
        <Select
          labelid="soil-class-select-label"
          id="soil-class-select"
          value={projectState.soilClassId || ""}
          placeholder="Select Soil Class"
          onChange={handleSelectSoilClass}
        >
          {soilClasses.map((fieldType, i) => (
            <option key={i} value={fieldType.id}>
              {fieldType.description}
            </option>
          ))}
        </Select>
      </FormControl>
    </Flex>
  );
};
