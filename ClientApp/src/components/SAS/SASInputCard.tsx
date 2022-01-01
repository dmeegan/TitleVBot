/* eslint-disable react-hooks/exhaustive-deps */
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
import { ChangeEvent, useEffect } from "react";
import { useStore } from "../../store/store";
import { ProjectStateUpdateParam, SoilClass } from "../../types";
import {
  fetchEffluentLoadingRates,
  fetchFieldTypes,
  fetchSoilClasses,
} from "../../utilities/fetchUtil";

export const SASInputCard = () => {
  const {
    projectState,
    updateProjectState,
    fieldTypes,
    setFieldTypes,
    setCurrentSoilClass,
    soilClasses,
    setSoilClasses,
    setEffluentLoadingRates,
    handleValidateConstraint,
  } = useStore();

  // useEffect(() => {
  //   setSoilClasses(tempSoilClasses);
  //   setFieldTypes(tempFieldTypes);
  // }, []);

  useEffect(() => {
    Promise.all([
      fetchFieldTypes(),
      fetchEffluentLoadingRates(),
      fetchSoilClasses(),
    ]).then(([fieldTypesRes, effluentLoadingRatesRes, soilClassRes]) => {
      setFieldTypes(fieldTypesRes);
      setEffluentLoadingRates(effluentLoadingRatesRes);
      setSoilClasses(soilClassRes);
    });
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
    if (
      !projectState.ltar ||
      projectState.ltar === "n/a" ||
      !projectState.minDesignFlowRate
    )
      return;
    const reqSF = Math.ceil(projectState.minDesignFlowRate / projectState.ltar);
    const updatedProperties: ProjectStateUpdateParam = {
      SASMinSurfaceArea: reqSF,
    };
    updateProjectState(updatedProperties);
  };

  useEffect(() => {
    handleCalcTrenchSurfaceAreaPerFoot();
  }, [projectState.SASProvTrenchHeight, projectState.SASProvTrenchWidth]);

  // The following function calculates the surface area per linear foot of trench (trenchSurfaceAreaPerFoot) based on the trench hight (trenchHeight) and the trench width (trenchWidth).
  const handleCalcTrenchSurfaceAreaPerFoot = () => {
    if (!projectState.SASProvTrenchHeight || !projectState.SASProvTrenchWidth)
      return;
    const SFPerLF =
      2 * projectState.SASProvTrenchHeight + projectState.SASProvTrenchWidth;
    const updatedProperties: ProjectStateUpdateParam = {
      SASProvTrenchSurfaceAreaPerLF: SFPerLF,
    };
    updateProjectState(updatedProperties);
  };

  useEffect(() => {
    handleCalcSurfaceAreaPerTrench();
  }, [projectState.SASLength, projectState.SASProvTrenchSurfaceAreaPerLF]);

  // The following function calculates the total surface area per trench (trenchSurfaceArea) based on the surface area per linear foot (trenchSurfaceAreaPerFoot) and the trench length (trenchLength).
  const handleCalcSurfaceAreaPerTrench = () => {
    if (!projectState.SASLength || !projectState.SASProvTrenchSurfaceAreaPerLF)
      return;
    const surfaceAreaPerTrench =
      projectState.SASProvTrenchSurfaceAreaPerLF * projectState.SASLength;
    const updatedProperties: ProjectStateUpdateParam = {
      SASProvTrenchSurfaceAreaPerTrench: surfaceAreaPerTrench,
    };
    updateProjectState(updatedProperties);
  };

  useEffect(() => {
    handleCalcMinTrenchNum();
  }, [
    projectState.SASMinSurfaceArea,
    projectState.SASProvSurfaceArea,
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
      if (!projectState.SASProvTrenchSurfaceAreaPerTrench) return;
      if (projectState.SASIsAltBed) {
        minTrenches = Math.ceil(
          projectState.SASMinSurfaceArea /
            projectState.SASProvTrenchSurfaceAreaPerTrench
        );
      } else {
        minTrenches =
          2 *
          Math.ceil(
            projectState.SASMinSurfaceArea /
              projectState.SASProvTrenchSurfaceAreaPerTrench /
              2
          );
      }
      if (!projectState.SASProvTrenchSurfaceAreaPerLF) return;
      const recTrenchLength = Math.ceil(
        projectState.SASMinSurfaceArea /
          (minTrenches * projectState.SASProvTrenchSurfaceAreaPerLF)
      );
      const recTrenchSurfaceArea =
        projectState.SASProvTrenchSurfaceAreaPerLF * recTrenchLength;
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
  }, [
    projectState.SASProvTrenchWidth,
    projectState.SASReserveIsBetweenTrenches,
  ]);

  const handleReserveConfigurationSelect = () => {
    let reqTrenchSeparation: number;
    if (!projectState.SASProvTrenchWidth) return;
    if (projectState.SASReserveIsBetweenTrenches) {
      reqTrenchSeparation = 3 * projectState.SASProvTrenchWidth;
    } else {
      reqTrenchSeparation = 2 * projectState.SASProvTrenchWidth;
    }
    const updatedProperties: ProjectStateUpdateParam = {
      SASReqTrenchSeparation: reqTrenchSeparation,
    };
    updateProjectState(updatedProperties);
  };

  useEffect(() => {
    handleCalcWidths();
  }, [
    projectState.SASProvTrenchHeight,
    projectState.SASProvTrenchWidth,
    projectState.SASMinTrenches,
    projectState.SASReqTrenchSeparation,
  ]);

  // The following function calculates the overall width of the SAS (sasAreaWidth) based on the number of trenches (recTrenchNum) and the trench width (trenchWidth).
  const handleCalcWidths = () => {
    let SASOverallWidth;
    if (projectState.SASIsTrenches) {
      if (
        !projectState.SASMinTrenches ||
        !projectState.SASProvTrenchWidth ||
        !projectState.SASReqTrenchSeparation ||
        !projectState.SASRecTrenchSurfaceArea
      )
        return;
      const overallSasAreaWidthTrench =
        projectState.SASMinTrenches * projectState.SASProvTrenchWidth +
        (projectState.SASMinTrenches - 1) * projectState.SASReqTrenchSeparation;
      if (projectState.SASIsAltBed) {
        SASOverallWidth = overallSasAreaWidthTrench / 2;
      } else {
        SASOverallWidth = overallSasAreaWidthTrench;
      }
      const updatedProperties: ProjectStateUpdateParam = {
        SASProvOverallWidth: SASOverallWidth,
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

  useEffect(() => {
    handleCalcSurfaceArea();
  }, [
    projectState.SASIsTrenches,
    projectState.SASProvTrenches,
    projectState.SASProvTrenchSurfaceAreaPerTrench,
  ]);

  const handleCalcSurfaceArea = () => {
    let provSurfaceArea: number = 0;
    if (projectState.SASIsTrenches) {
      if (
        !projectState.SASProvTrenches ||
        !projectState.SASProvTrenchSurfaceAreaPerTrench
      )
        return;
      provSurfaceArea =
        projectState.SASProvTrenches *
        projectState.SASProvTrenchSurfaceAreaPerTrench;
    } else {
      if (!projectState.SASLength || !projectState.SASProvOverallWidth) return;
      provSurfaceArea =
        projectState.SASLength * projectState.SASProvOverallWidth;
    }
    const updatedProperties: ProjectStateUpdateParam = {
      SASProvSurfaceArea: provSurfaceArea,
    };
    updateProjectState(updatedProperties);
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
    if (handleValidateConstraint("SASProvTrenchWidth", trenchWidthInputValue)) {
      trenchWidthInputValue = 0;
      return;
    }
    const updatedProperties = {
      SASProvTrenchWidth: trenchWidthInputValue,
    };
    updateProjectState(updatedProperties);
  };

  const handleSetTrenchHeight = (event: ChangeEvent<HTMLInputElement>) => {
    let trenchHeightInputValue = parseInt(event.target.value) as number;
    if (
      handleValidateConstraint("SASProvTrenchHeight", trenchHeightInputValue)
    ) {
      trenchHeightInputValue = 0;
      return;
    }
    const updatedProperties = {
      SASProvTrenchHeight: trenchHeightInputValue,
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
              value={projectState.SASProvTrenchWidth || undefined}
              onChange={handleSetTrenchWidth}
            />
          </FormControl>
          <FormControl marginTop="1rem">
            <FormLabel id="trench-height-id">Proposed Trench Height</FormLabel>
            <Input
              id="trench-height-input"
              labelid="trench-height-id"
              type="number"
              value={projectState.SASProvTrenchHeight || undefined}
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
