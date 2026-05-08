import api from "../lib/api";
import type { CountryState } from "../redux-toolkit/countrySlice";

export const getCountryList = async (currentPage: number, name?: string) => {
  const params: Record<string, any> = {
    page: currentPage,
    limit: 8,
  };
  if (name) {
    params.search = name;
  }

  const res = await api.get("/countries", { params });
  return res.data;
};
export const fetchCountryById = (id: string, languageCode?: string | null) => {
  return api.get(`/countries/${id}`, {
    params: languageCode ? { language_code: languageCode } : {},
  });
};

export const createCountryAPI = (shop: CountryState) => {
  return api.post("/countries", shop);
};

export const updateCountryAPI = (id: string, shop: CountryState) => {
  return api.put(`/countries/${id}`, shop);
};
