import { ConfigurationType, FieldType, SoilClass } from "../types";

export const tempFieldTypes: FieldType[] = [
  { id: 1, description: "Trenches" },
  { id: 2, description: "Bed" },
];

export const tempConfigurationTypes: ConfigurationType[] = [
  { id: 1, description: "Alternating Bed System" },
  { id: 2, description: "Single Bed System" },
];

export const soilClasses: SoilClass[] = [
  {
    id: 1,
    numeral: "I",
    description: "Sands, Loamy Sands",
    acceptanceRates: [
      0.74,
      0.7,
      0.68,
      0.66,
      "n/a",
      "n/a",
      "n/a",
      "n/a",
      "n/a",
      "n/a",
      "n/a",
      "n/a",
    ],
  },
  {
    id: 2,
    numeral: "II",
    description: "Sandy Loams, Loams",
    acceptanceRates: [
      0.6,
      0.6,
      0.6,
      0.6,
      0.6,
      0.56,
      0.53,
      0.4,
      0.33,
      "n/a",
      "n/a",
      "n/a",
    ],
  },
  {
    id: 3,
    numeral: "III",
    description: "Silt Loams, Sandy Clay Loams with less than 27% clay, Silt",
    acceptanceRates: [
      "n/a",
      "n/a",
      "n/a",
      "n/a",
      "n/a",
      0.37,
      0.34,
      0.33,
      0.29,
      0.25,
      0.2,
      0.15,
    ],
  },
  {
    id: 4,
    numeral: "IV",
    description:
      "Clays, Silty Clay Loams, Sandy Clay Loams with 27% or more Clay, Clay Loams and Silty Clays",
    acceptanceRates: [
      "n/a",
      "n/a",
      "n/a",
      "n/a",
      "n/a",
      "n/a",
      "n/a",
      "n/a",
      "n/a",
      "n/a",
      0.2,
      0.15,
    ],
  },
];
