export interface Use {
  useId: number;
  establishmentTypeId: number;
  description: string;
  primaryFlowRate: number;
  secondaryFlowRate?: number;
  primaryUnit: string;
  secondaryUnit?: string;
  minDesignFlow?: number;
}

export interface Establishment {
  establishmentTypeId: number;
  description: string;
}

export interface ConstraintType {
  id: number;
  field: keyof ProjectState;
  value: number;
  unit: string;
  regulation: string;
  type: string;
  description: string;
}

export class ProjectState {
  establishmentTypeId: number | null = null;
  useId: number | null = null;
  usePrimaryUnitValue: number = 0;
  useSecondaryUnitValue: number = 0;
  minDesignFlowRate: number | null = null;
  provDesignFlowRate: number = 0;
  soilClassId: number | null = null;
  ltar: LTAR = null;
  percRate: number | null = null;
  SASFieldTypeId: number = 1;
  SASMaxLength: number | null = null;
  SASIsAltBed: boolean = true;
  SASMinSurfaceArea: number | null = null;
  SASMinFieldWidth: number | null = null;
  SASLength: number | null = null;
  SASFieldWidth: number | null = null;
  SASProvSurfaceArea: number | null = null;
  SASProvOverallWidth: number | null = null;
  SASProvTrenchHeight: number | null = null;
  SASProvTrenchWidth: number | null = null;
  SASProvTrenchSurfaceAreaPerLF: number | null = null;
  SASProvTrenchSurfaceAreaPerTrench: number | null = null;
  SASMinTrenches: number | null = null;
  SASProvTrenches: number | null = null;
  SASIsTrenches: boolean = true;
  SASRecTrenchLength: number | null = null;
  SASRecTrenchSurfaceArea: number | null = null;
  SASReserveIsBetweenTrenches: boolean = true;
  SASReqTrenchSeparation: number | null = null;
}

export type ProjectStateUpdateParam = {
  [P in keyof ProjectState]?: ProjectState[P];
};

export interface FieldType {
  id: number;
  description: string;
  isTrenches: boolean;
}

export interface SoilClass {
  id: number;
  numeral: string;
  description: string;
  acceptanceRates: LTAR[];
}

export interface ConfigurationType {
  id: number;
  description: string;
}

export const NOT_APPLICABLE = "n/a";

export type LTAR = number | null | typeof NOT_APPLICABLE;
