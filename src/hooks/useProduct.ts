import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// import { useNavigate } from "react-router-dom";
// import { paths } from "../config/paths";
import { showToast } from "../utils/toastUtils";
import { useDispatch } from "react-redux";
import {
  createProductAPI,
  deleteProductItem,
  fetchProductById,
  getProductList,
  updateProductAPI,
} from "../api/product";
import { resetProduct, type ProductState } from "../redux-toolkit/productSlice";

export const useProductlist = (page: number, search: string, skip = false) => {
  const query = useQuery({
    queryKey: ["product", page, search],
    queryFn: () => getProductList(page, search),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    enabled: !skip,
  });

  return query;
};

export const useDeleteProductItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"], exact: false });
    },
  });
};

export const useProductById = (
  id: string | undefined,
  languageCode?: string | null
) => {
  const isEditMode = Boolean(id);
  return useQuery({
    queryKey: ["product", id, languageCode],
    queryFn: () => fetchProductById(id!, languageCode),
    enabled: isEditMode,
  });
};

export const useCreateProduct = (product: ProductState) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: () => createProductAPI(product),
    onSuccess: () => {
      showToast("Product Created", "success");
      dispatch(resetProduct());
      // navigate(paths.shops.product.path);
    },
    onError: (error) => {
      console.error("Error while adding shop", error);
      showToast("Failed to create product", "error");
    },
  });
};

export const useUpdateProduct = (product: ProductState) => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (id: string) => updateProductAPI(id, product),
    onSuccess: () => {
      showToast("Product Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["product"] });
      dispatch(resetProduct());
      // navigate(paths.shops.product.path);
    },
    onError: (error) => {
      console.error("product update failed", error);
    },
  });
};

// export const useUpdateProductStatus = (
//   id: string | number | undefined,
//   onClose?: () => void
// ) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (payload: { status: boolean }) => {
//       if (!id) throw new Error("Product ID is required");
//       return updateProductStatus(id, payload);
//     },

//     onSuccess: () => {
//       showToast("Status Updated", "success");
//       queryClient.invalidateQueries({ queryKey: ["product"] });
//       if (onClose) onClose(); // optional: to close modal
//     },

//     onError: (error) => {
//       console.error("Error updating product status:", error);
//       showToast("Failed to update status", "error");
//     },
//   });
// };
