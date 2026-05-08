import type { CountryState } from "../../../redux-toolkit/countrySlice";

export const normalizeCountryResponse = (data: any): CountryState => ({
  name: data?.name ?? "",
  iso2: data?.iso2 ?? "",
  iso3: data?.iso3 ?? "",
  phonecode: data?.phonecode ?? "",
});
