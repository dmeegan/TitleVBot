import create from "zustand";
import devtools from "zustand";
import {
  Establishment,
  FieldType,
  ProjectState,
  ProjectStateUpdateParam,
  Use,
} from "../types";
import { tempUses, tempEstablishments } from "../tempData/tempUseData";
import { tempFieldTypes } from "../tempData/tempSASData";

interface StoreProps {
  uses: Use[];
  setUses: (usesReturned: Use[]) => void;
  currentUse?: Use;
  handleSetCurrentUse: (useSelected: Use) => void;

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

export const useStore = create<StoreProps>(
  devtools((set: any, get: any) => ({
    uses: tempUses,
    setUses: (usesReturned: Use[]) => {
      set({ uses: usesReturned });
    },
    currentUse: undefined,
    handleSetCurrentUse: (useSelected: Use) => {
      set({ use: useSelected });
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
      set({
        projectState: {
          ...get().projectState,
          ...updatedProperties,
        },
      });
    },
  }))
);
