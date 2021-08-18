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

export class ProjectState {
  establishmentTypeId: number | null = null;
  useId: number | null = null;
  usePrimaryUnitValue: number = 0;
  useSecondaryUnitValue?: number;
  flowRate: number = 0;
  soilClass: SoilClass | null = null;
  ltar: LTAR | null = null;
  percRate: number | null = null;
  fieldTypeId: number | null = null;
  sasMaxLength: number | null = null;
  bedConfigurationId: number = 1;
}

export type ProjectStateUpdateParam = {
  [P in keyof ProjectState]?: ProjectState[P];
};

export interface FieldType {
  id: number;
  description: string;
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

export type NOT_APPLICABLE = "n/a";

export type LTAR = number | NOT_APPLICABLE;
