import { ConstraintType } from "../types";

export const tempConstraints: ConstraintType[] = [
  {
    id: 1,
    field: "SASMaxLength",
    value: 100,
    type: "maximum",
    unit: "feet",
    regulation: "15.251 and 15.252",
    description: "trench or field length",
  },
  {
    id: 2,
    field: "SASTrenchWidth",
    value: 3,
    type: "maximum",
    unit: "feet",
    regulation: "15.251",
    description: "trench width",
  },
  {
    id: 3,
    field: "SASTrenchWidth",
    value: 2,
    type: "minimum",
    unit: "feet",
    regulation: "15.251",
    description: "trench width",
  },
  {
    id: 4,
    field: "SASTrenchHeight",
    value: 2,
    type: "maximum",
    unit: "feet",
    regulation: "15.251",
    description: "trench height",
  },
];
