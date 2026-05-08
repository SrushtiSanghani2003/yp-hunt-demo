import api from "../lib/api";
import type { ProductState } from "../redux-toolkit/productSlice";

export const getProductList = async (currentPage: number, name?: string) => {
  const params: Record<string, any> = {
    page: currentPage,
    limit: 8,
  };
  if (name) {
    params.name = name;
  }

  const res = await api.get("/product", { params });
  return res.data;
};

export const deleteProductItem = (id: string) =>
  api.delete(`/product/${id}`);

export const fetchProductById = (id: string, languageCode?: string | null) => {
  return api.get(`/product/${id}`, {
    params: languageCode ? { language_code: languageCode } : {},
  });
};

export const createProductAPI = (product: ProductState) => {
  return api.post("/product", product);
};

export const  updateProductAPI = (id: string, product: ProductState) => {
  return api.put(`/product/${id}`, product);
};
// export const updateProductStatus = (id: string, status: boolean) => {
//   return api.put(`/product/${id}/status`, { status });
// };
// api/product.ts
// export const updateProductStatus = (
//   id: string,
//   payload: { status: boolean }
// ) => {
//   return api.put(`/product/${id}/change-status`, payload);
// };
