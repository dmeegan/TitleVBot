import create from "zustand";
import { devtools } from "zustand/middleware";
import {
  Establishment,
  FieldType,
  ProjectState,
  ProjectStateUpdateParam,
  SoilClass,
  Use,
} from "../types";
import { tempUses, tempEstablishments } from "../tempData/tempUseData";
import { tempSoilClasses, tempFieldTypes } from "../tempData/tempSASData";

interface StoreProps {
  projectUses: Use[];
  setProjectUses: (returnedUses: Use[]) => void;
  currentProjectUse?: Use;
  setCurrentProjectUse: (selectedUse: Use) => void;

  soilClasses: SoilClass[];
  setSoilClasses: (returnedSoilClasses: SoilClass[]) => void;
  currentSoilClass?: SoilClass;
  setCurrentSoilClass: (selectedSoilClass: SoilClass) => void;

  establishments: Establishment[];
  handleSetEstablishments: (establishmentsReturned: Establishment[]) => void;
  currentEstablishment?: Establishment;
  handleSetCurrentEstablishment: (establishmentSelected: Establishment) => void;

  fieldTypes: FieldType[];
  handleSetFieldTypes: (fieldTypesReturned: FieldType[]) => void;
  currentFieldType?: FieldType;
  handleSetCurrentFieldType: (fieldTypeSelected: FieldType) => void;

  projectState: ProjectState;
  updateProjectState: (updatedProperties: ProjectStateUpdateParam) => void;
}

const store = (set: any, get: any): StoreProps => ({
  projectUses: tempUses,
  setProjectUses: (returnedProjectUses: Use[]) => {
    set({ projectUses: returnedProjectUses });
  },
  currentProjectUse: undefined,
  setCurrentProjectUse: (selectedProjectUse: Use) => {
    set({ currentProjectUse: selectedProjectUse });
  },

  soilClasses: tempSoilClasses,
  setSoilClasses: (returnedSoilClasses: SoilClass[]) => {
    set({ soilClasses: returnedSoilClasses });
  },
  currentSoilClass: undefined,
  setCurrentSoilClass: (selectedSoilClass: SoilClass) => {
    set({ currentSoilClass: selectedSoilClass });
  },

  establishments: tempEstablishments,
  handleSetEstablishments: (establishmentsReturned: Establishment[]) => {
    set({ establishments: establishmentsReturned });
  },
  handleSetCurrentEstablishment: (establishmentSelected: Establishment) => {
    set({ currentEstablishment: establishmentSelected });
  },

  fieldTypes: tempFieldTypes,
  handleSetFieldTypes: (fieldTypesReturned: FieldType[]) => {
    set({ fieldTypes: fieldTypesReturned });
  },
  handleSetCurrentFieldType: (fieldTypeSelected: FieldType) => {
    set({ currentFieldType: fieldTypeSelected });
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
