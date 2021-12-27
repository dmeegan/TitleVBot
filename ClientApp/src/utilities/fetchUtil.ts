import {
  EffluentLoadingRate,
  Establishment,
  FieldType,
  SoilClass,
  Use,
} from "../types";
import { fetchConfig } from "./fetchConfig";

const baseUrl: string | undefined = process.env.REACT_APP_API_URI_DEV || "";

class Endpoints {
  static readonly UseEndpoint: string = `${baseUrl}/api/Use/`;
  static readonly EstablishmentEndpoint: string = `${baseUrl}/api/Establishment/`;
  static readonly LookupEndpoint: string = `${baseUrl}/api/Lookup/`;
}

export const fetchUseList = () => {
  return fetchConfig<{}, Use[]>(Endpoints.LookupEndpoint + "uses", "GET");
};

export const insertUses = (uses: Use[]) => {
  return fetchConfig<{}, Use[]>(Endpoints.UseEndpoint + "insert", "POST", {
    uses,
  });
};

export const fetchEstablishmentTypesList = () => {
  return fetchConfig<{}, Establishment[]>(
    Endpoints.LookupEndpoint + "establishmentTypes",
    "GET"
  );
};

export const fetchFieldTypes = () => {
  return fetchConfig<{}, FieldType[]>(
    Endpoints.LookupEndpoint + "fieldTypes",
    "GET"
  );
};

export const fetchEffluentLoadingRates = () => {
  return fetchConfig<{}, EffluentLoadingRate[]>(
    Endpoints.LookupEndpoint + "effluentLoadingRates",
    "GET"
  );
};
export const fetchSoilClasses = (numeral?: string) => {
  return fetchConfig<{}, SoilClass[]>(
    Endpoints.LookupEndpoint + `soilClasses/${numeral ? numeral : ""}`,
    "GET"
  );
};

export const insertEstablishmentTypes = (establishments: Establishment[]) => {
  return fetchConfig<{}, Establishment[]>(
    Endpoints.EstablishmentEndpoint + "insert",
    "POST",
    { establishments }
  );
};
