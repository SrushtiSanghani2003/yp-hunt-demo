import api from "../lib/api";
import type { ShopState } from "../redux-toolkit/shopSlice";

export const getShopList = async (
  currentPage: number,
  name?: string,
  language?: string | null,
) => {
  const params: Record<string, any> = {
    page: currentPage,
    limit: 8,
    language_code: language,
  };
  if (name) {
    params.search = name;
  }

  const res = await api.get("/shop", { params });
  return res.data;
};

export const deleteShopItem = (id: string) => api.delete(`/shop/${id}`);

export const fetchShopById = (id: string, languageCode?: string | null) => {
  return api.get(`/shop/${id}`, {
    params: languageCode ? { language_code: languageCode } : {},
  });
};

export const createShopAPI = (shop: ShopState) => {
  return api.post("/shop", shop);
};

export const updateShopAPI = (id: string, shop: ShopState) => {
  return api.put(`/shop/${id}`, shop);
};
export const updateShopStatus = (id: string, status: boolean) => {
  return api.put(`/shop/${id}/status`, { status });
};
