import { Establishment, Use } from "../types";
import { fetchConfig } from "./fetchConfig";

const baseUrl: string | undefined = process.env.REACT_APP_API_URI_DEV || "";

class Endpoints {
  static readonly UseEndpoint: string = `${baseUrl}/api/Use/`;
  static readonly EstablishmentEndpoint: string = `${baseUrl}/api/Establishment/`;
}

export const fetchUseList = () => {
  return fetchConfig<{}, Use[]>(Endpoints.UseEndpoint + "list", "GET");
};

export const insertUses = (uses: Use[]) => {
  return fetchConfig<{}, Use[]>(Endpoints.UseEndpoint + "insert", "POST", {
    uses,
  });
};

export const fetchEstablishmentTypesList = () => {
  return fetchConfig<{}, Establishment[]>(
    Endpoints.EstablishmentEndpoint + "list",
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
