import toast from "react-hot-toast";
import create from "zustand";
import { devtools } from "zustand/middleware";
import {
  ConstraintType,
  EffluentLoadingRate,
  Establishment,
  FieldType,
  ProjectState,
  ProjectStateUpdateParam,
  SoilClass,
  Use,
} from "../types";

interface StoreProps {
  projectUses: Use[];
  setProjectUses: (returnedUses: Use[]) => void;
  currentProjectUse?: Use;
  setCurrentProjectUse: (selectedUse: Use) => void;

  designFlowOutputActive: boolean;
  setDesignFlowOutputActive: (isActive: boolean) => void;

  soilClasses: SoilClass[];
  setSoilClasses: (returnedSoilClasses: SoilClass[]) => void;
  currentSoilClass?: SoilClass;
  setCurrentSoilClass: (selectedSoilClass: SoilClass) => void;

  effluentLoadingRates: EffluentLoadingRate[];
  setEffluentLoadingRates: (
    returnedEffluentLoadingRates: EffluentLoadingRate[]
  ) => void;
  currentEffluentLoadingRate?: EffluentLoadingRate;
  setCurrentEffluentLoadingRate: (
    selectedEffluentLoadingRate: EffluentLoadingRate
  ) => void;

  establishments: Establishment[];
  setEstablishments: (establishmentsReturned: Establishment[]) => void;
  currentEstablishment?: Establishment;
  handleSetCurrentEstablishment: (establishmentSelected: Establishment) => void;

  fieldTypes: FieldType[];
  setFieldTypes: (fieldTypesReturned: FieldType[]) => void;
  currentFieldType?: FieldType;
  handleSetCurrentFieldType: (fieldTypeSelected: FieldType) => void;

  projectState: ProjectState;
  updateProjectState: (updatedProperties: ProjectStateUpdateParam) => void;

  constraintTypes: ConstraintType[];
  setConstraintTypes: (errorTypesReturned: ConstraintType[]) => void;
  handleValidateConstraint: (
    field: keyof ProjectState,
    value: number
  ) => boolean;
}

const store = (set: any, get: any): StoreProps => ({
  projectUses: [],
  setProjectUses: (returnedProjectUses: Use[]) => {
    set({ projectUses: returnedProjectUses });
  },
  currentProjectUse: undefined,
  setCurrentProjectUse: (selectedProjectUse: Use) => {
    set({ currentProjectUse: selectedProjectUse });
  },

  designFlowOutputActive: false,
  setDesignFlowOutputActive: (isActive: boolean) => {
    set({ designFlowOutputActive: isActive });
  },

  soilClasses: [],
  setSoilClasses: (returnedSoilClasses: SoilClass[]) => {
    set({ soilClasses: returnedSoilClasses });
  },
  currentSoilClass: undefined,
  setCurrentSoilClass: (selectedSoilClass: SoilClass) => {
    set({ currentSoilClass: selectedSoilClass });
  },

  effluentLoadingRates: [],
  setEffluentLoadingRates: (effluentLoadingRates: EffluentLoadingRate[]) => {
    set({ effluentLoadingRates: effluentLoadingRates });
  },
  currentEffluentLoadingRate: undefined,
  setCurrentEffluentLoadingRate: (
    selectedEffluentLoadingRate: EffluentLoadingRate
  ) => {
    set({ currentEffluentLoadingRate: selectedEffluentLoadingRate });
  },

  establishments: [],
  setEstablishments: (establishmentsReturned: Establishment[]) => {
    set({ establishments: establishmentsReturned });
  },
  handleSetCurrentEstablishment: (establishmentSelected: Establishment) => {
    set({ currentEstablishment: establishmentSelected });
  },

  fieldTypes: [],
  setFieldTypes: (fieldTypesReturned: FieldType[]) => {
    set({ fieldTypes: fieldTypesReturned });
  },
  handleSetCurrentFieldType: (fieldTypeSelected: FieldType) => {
    set({ currentFieldType: fieldTypeSelected });
  },

  constraintTypes: [],
  setConstraintTypes: (constraintTypesReturned: ConstraintType[]) => {
    set({ constraintTypes: constraintTypesReturned });
  },
  handleValidateConstraint: (
    fieldInEdit: keyof ProjectState,
    value: number
  ) => {
    const constraintsInUse: ConstraintType[] = get().constraintTypes.filter(
      (constraint: ConstraintType) => constraint.field === fieldInEdit
    );
    if (!constraintsInUse) return false;
    let errorMessage: string = "";
    let inError: boolean = false;
    constraintsInUse.forEach((constraint) => {
      switch (constraint.type) {
        case "maximum":
          if (value > constraint.value) {
            errorMessage = `Invalid Input: Per Title V section(s) ${constraint.regulation}, the maximum ${constraint.description} shall be ${constraint.value} ${constraint.unit}`;
            inError = true;
          }
          break;
        case "minimum":
          if (value < constraint.value) {
            errorMessage = `Invalid Input: Per Title V section(s) ${constraint.regulation}, the minimum ${constraint.description} shall be ${constraint.value} ${constraint.unit}`;
            inError = true;
          }
          break;
        default:
          return;
      }
    });
    if (errorMessage !== "") {
      toast.error(errorMessage);
    }
    return inError;
  },

  projectState: new ProjectState(),
  updateProjectState: (updatedProperties: ProjectStateUpdateParam) => {
    const currentProjectState = get().projectState;
    set({
      projectState: {
        ...currentProjectState,
        ...updatedProperties,
      },
    });
  },
});

export const useStore = create(devtools(store, "ProjectStore"));
