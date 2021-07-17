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
}

export interface fieldType {
  id: number;
  description: string;
}

export interface SoilClass {
  id: number;
  numeral: string;
  description: string;
  acceptanceRates: LTAR[];
}

type NOT_APPLICABLE = "n/a";

type LTAR = number | NOT_APPLICABLE;
