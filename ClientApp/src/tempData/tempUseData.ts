import { Establishment } from "../types";

export const tempEstablishments: Establishment[] = [
  { establishmentTypeId: 1, description: "Residential" },
  { establishmentTypeId: 2, description: "Commercial" },
  { establishmentTypeId: 3, description: "Institutional" },
  { establishmentTypeId: 4, description: "Schools" },
];

// const uses = [
//   {
//     useId: 1,
//     establishmentTypeId: 1,
//     description: "Bed & Breakfast, without restaurant open to the public",
//     primaryFlowRate: 110,
//     primaryUnit: "bedrooms",
//   },

//   {
//     useId: 2,
//     establishmentTypeId: 1,
//     description: "Bed & Breakfast, with restaurant open to the public",
//     primaryFlowRate: 110,
//     primaryUnit: "bedrooms",
//   },

//   {
//     useId: 3,
//     establishmentTypeId: 1,
//     description: "Camp, resident, mess hall, washroom and toilets",
//     primaryFlowRate: 35,
//     primaryUnit: "persons",
//   },

//   {
//     useId: 4,
//     establishmentTypeId: 1,
//     description: "Camp, day, washroom and toilets",
//     primaryFlowRate: 10,
//     primaryUnit: "persons",
//   },

//   {
//     useId: 5,
//     establishmentTypeId: 1,
//     description: "Camp, day, mess hall, washroom and toilets",
//     primaryFlowRate: 13,
//     primaryUnit: "persons",
//   },

//   {
//     useId: 6,
//     establishmentTypeId: 1,
//     description: "Campground, showers and toilets",
//     primaryFlowRate: 90,
//     primaryUnit: "sites",
//   },

//   {
//     useId: 7,
//     establishmentTypeId: 1,
//     description: "Family Dwelling, Single",
//     primaryFlowRate: 110,
//     primaryUnit: "bedrooms",
//   },

//   {
//     useId: 8,
//     establishmentTypeId: 1,
//     description: "Family Dwelling, Multiple",
//     primaryFlowRate: 110,
//     primaryUnit: "bedrooms",
//   },

//   {
//     useId: 9,
//     establishmentTypeId: 1,
//     description: "Family Mobile Home Park",
//     primaryFlowRate: 300,
//     primaryUnit: "mobile homes",
//   },

//   {
//     useId: 10,
//     establishmentTypeId: 1,
//     description: "Motel, Hotel, Boarding House",
//     primaryFlowRate: 110,
//     primaryUnit: "bedrooms",
//   },

//   {
//     useId: 11,
//     establishmentTypeId: 1,
//     description: "Retirement Mobile Home Park",
//     primaryFlowRate: 150,
//     primaryUnit: "sites",
//   },

//   {
//     useId: 12,
//     establishmentTypeId: 1,
//     description: "Housing for the Elderly",
//     primaryFlowRate: 150,
//     primaryUnit: "two bedroom units",
//   },

//   {
//     useId: 13,
//     establishmentTypeId: 1,
//     description: "Work or Construction Camp",
//     primaryFlowRate: 50,
//     primaryUnit: "persons",
//   },

//   {
//     useId: 14,
//     establishmentTypeId: 2,
//     description: "Airport",
//     primaryFlowRate: 5,
//     primaryUnit: "passengers",
//   },

//   {
//     useId: 15,
//     establishmentTypeId: 2,
//     description: "Barber Shop/Beauty Salon",
//     primaryFlowRate: 100,
//     primaryUnit: "chairs",
//   },

//   {
//     useId: 16,
//     establishmentTypeId: 2,
//     description: "Bowling Alley",
//     primaryFlowRate: 100,
//     primaryUnit: "alleys",
//   },

//   {
//     useId: 17,
//     establishmentTypeId: 2,
//     description: "Country Club, with dining room",
//     primaryFlowRate: 10,
//     primaryUnit: "seats",
//   },

//   {
//     useId: 18,
//     establishmentTypeId: 2,
//     description: "Country Club, snack bar or lunch room",
//     primaryFlowRate: 10,
//     primaryUnit: "seats",
//   },

//   {
//     useId: 19,
//     establishmentTypeId: 2,
//     description: "Country Club, lockers and showers",
//     primaryFlowRate: 20,
//     primaryUnit: "lockers",
//   },

//   {
//     useId: 20,
//     establishmentTypeId: 2,
//     description: "Doctors Office",
//     primaryFlowRate: 250,
//     primaryUnit: "doctors",
//   },

//   {
//     useId: 21,
//     establishmentTypeId: 2,
//     description: "Dentist Office",
//     primaryFlowRate: 200,
//     primaryUnit: "dentists",
//   },

//   {
//     useId: 22,
//     establishmentTypeId: 2,
//     description:
//       "Factory, Industrial Plant, Warehouse or Dry Storage Space without Cafeteria",
//     primaryFlowRate: 15,
//     primaryUnit: "persons",
//   },

//   {
//     useId: 23,
//     establishmentTypeId: 2,
//     description:
//       "Factory, Industrial Plant, Warehouse or Dry Storage Space with Cafeteria",
//     primaryFlowRate: 20,
//     primaryUnit: "persons",
//   },

//   {
//     useId: 24,
//     establishmentTypeId: 2,
//     description: "Gasoline Station",
//     primaryFlowRate: 75,
//     primaryUnit: "islands",
//   },

//   {
//     useId: 25,
//     establishmentTypeId: 2,
//     description: "Kennel/Veterinary Office",
//     primaryFlowRate: 50,
//     primaryUnit: "kennels",
//   },

//   {
//     useId: 26,
//     establishmentTypeId: 2,
//     description: "Lounge, Tavern",
//     primaryFlowRate: 20,
//     primaryUnit: "seats",
//   },

//   {
//     useId: 27,
//     establishmentTypeId: 2,
//     description: "Marina",
//     primaryFlowRate: 10,
//     primaryUnit: "slips",
//   },

//   {
//     useId: 28,
//     establishmentTypeId: 2,
//     description: "Movie Theater",
//     primaryFlowRate: 5,
//     primaryUnit: "seats",
//   },

//   {
//     useId: 29,
//     establishmentTypeId: 2,
//     description: "Non-single family/automatic clothes washer",
//     primaryFlowRate: 400,
//     primaryUnit: "washing machines",
//   },

//   {
//     useId: 30,
//     establishmentTypeId: 2,
//     description: "Office building",
//     primaryFlowRate: 75,
//     primaryUnit: "1000 sq.ft.",
//   },

//   {
//     useId: 31,
//     establishmentTypeId: 2,
//     description: "Retail Store",
//     primaryFlowRate: 50,
//     primaryUnit: "1000 sq.ft.",
//   },

//   {
//     useId: 32,
//     establishmentTypeId: 2,
//     description: "Restaurant",
//     primaryFlowRate: 35,
//     primaryUnit: "seats",
//   },

//   {
//     useId: 33,
//     establishmentTypeId: 2,
//     description: "Restaurant, thruway service area",
//     primaryFlowRate: 150,
//     primaryUnit: "seats",
//   },

//   {
//     useId: 34,
//     establishmentTypeId: 2,
//     description: "Restaurant, Fast Food",
//     primaryFlowRate: 20,
//     primaryUnit: "seats",
//   },

//   {
//     useId: 35,
//     establishmentTypeId: 2,
//     description: "Restaurant, kitchen flow [for sizing grease trap only]",
//     primaryFlowRate: 15,
//     primaryUnit: "seats",
//   },

//   {
//     useId: 36,
//     establishmentTypeId: 2,
//     description: "Service Station [no gas]",
//     primaryFlowRate: 150,
//     primaryUnit: "bays",
//   },

//   {
//     useId: 37,
//     establishmentTypeId: 2,
//     description: "Skating Rink",
//     primaryFlowRate: 5,
//     primaryUnit: "seats",
//   },

//   {
//     useId: 38,
//     establishmentTypeId: 2,
//     description: "Supermarkets",
//     primaryFlowRate: 97,
//     primaryUnit: "1000 sq.ft.",
//   },

//   {
//     useId: 39,
//     establishmentTypeId: 2,
//     description: "Swimming Pool",
//     primaryFlowRate: 10,
//     primaryUnit: "persons",
//   },

//   {
//     useId: 40,
//     establishmentTypeId: 2,
//     description: "Tennis Club",
//     primaryFlowRate: 250,
//     primaryUnit: "court",
//   },

//   {
//     useId: 41,
//     establishmentTypeId: 2,
//     description: "Theater, Auditorium",
//     primaryFlowRate: 3,
//     primaryUnit: "seats",
//   },

//   {
//     useId: 42,
//     establishmentTypeId: 2,
//     description: "Trailer, dump station",
//     primaryFlowRate: 75,
//     primaryUnit: "trailers",
//   },

//   {
//     useId: 43,
//     establishmentTypeId: 3,
//     description: "Place of worship, without kitchen",
//     primaryFlowRate: 3,
//     primaryUnit: "seats",
//   },

//   {
//     useId: 44,
//     establishmentTypeId: 3,
//     description: "Place of worship, with kitchen",
//     primaryFlowRate: 6,
//     primaryUnit: "seats",
//   },

//   {
//     useId: 45,
//     establishmentTypeId: 3,
//     description: "Correctional Facility",
//     primaryFlowRate: 200,
//     primaryUnit: "beds",
//   },

//   {
//     useId: 46,
//     establishmentTypeId: 3,
//     description: "Function Hall",
//     primaryFlowRate: 15,
//     primaryUnit: "seats",
//   },

//   {
//     useId: 47,
//     establishmentTypeId: 3,
//     description: "Gymnasium",
//     primaryFlowRate: 25,
//     secondaryFlowRate: 3,
//     primaryUnit: "participants",
//     secondaryUnit: "spectator",
//   },

//   {
//     useId: 48,
//     establishmentTypeId: 3,
//     description: "Hospital",
//     primaryFlowRate: 200,
//     primaryUnit: "beds",
//   },

//   {
//     useId: 49,
//     establishmentTypeId: 3,
//     description: "Nursing Home/Rest Home",
//     primaryFlowRate: 150,
//     primaryUnit: "beds",
//   },

//   {
//     useId: 50,
//     establishmentTypeId: 3,
//     description: "Assisted Living Facilities",
//     primaryFlowRate: 150,
//     primaryUnit: "beds",
//   },

//   {
//     useId: 51,
//     establishmentTypeId: 3,
//     description: "Public Park, toilet waste only",
//     primaryFlowRate: 5,
//     primaryUnit: "persons",
//   },

//   {
//     useId: 52,
//     establishmentTypeId: 3,
//     description: "Public Park, bathhouse, showers and flush toilets",
//     primaryFlowRate: 10,
//     primaryUnit: "persons",
//   },

//   {
//     useId: 53,
//     establishmentTypeId: 3,
//     description: "Day Care Facility",
//     primaryFlowRate: 10,
//     primaryUnit: "persons",
//   },

//   {
//     useId: 54,
//     establishmentTypeId: 3,
//     description: "Day Care Facility",
//     primaryFlowRate: 10,
//     primaryUnit: "persons",
//   },

//   {
//     useId: 55,
//     establishmentTypeId: 4,
//     description: "Elementary School, without cafeteria, gymnasium or showers",
//     primaryFlowRate: 5,
//     primaryUnit: "persons",
//   },

//   {
//     useId: 56,
//     establishmentTypeId: 4,
//     description:
//       "Elementary School, with cafeteria, but no gymnasium or showers",
//     primaryFlowRate: 8,
//     primaryUnit: "persons",
//   },

//   {
//     useId: 57,
//     establishmentTypeId: 4,
//     description: "Elementary School, with cafeteria, gymnasium and showers",
//     primaryFlowRate: 10,
//     primaryUnit: "persons",
//   },

//   {
//     useId: 58,
//     establishmentTypeId: 4,
//     description:
//       "Secondary/Middle School, without cafeteria, gymnasium or showers",
//     primaryFlowRate: 10,
//     primaryUnit: "persons",
//   },

//   {
//     useId: 59,
//     establishmentTypeId: 4,
//     description:
//       "Secondary/Middle School, with cafeteria, but no gymnasium or showers",
//     primaryFlowRate: 15,
//     primaryUnit: "persons",
//   },

//   {
//     useId: 60,
//     establishmentTypeId: 4,
//     description:
//       "Secondary/Middle School, with cafeteria, gymnasium and showers",
//     primaryFlowRate: 20,
//     primaryUnit: "persons",
//   },

//   {
//     useId: 61,
//     establishmentTypeId: 4,
//     description: "Boarding Schools, Colleges",
//     primaryFlowRate: 65,
//     primaryUnit: "persons",
//   },
// ];

// export const tempUses: Use[] = uses.map((use) => {
//   return {
//     ...use,
//     secondaryFlowRate: use.secondaryFlowRate ? use.secondaryFlowRate : null,
//     secondaryUnit: use.secondaryUnit ? use.secondaryUnit : null,
//     minDesignFlow: null,
//   };
// });
