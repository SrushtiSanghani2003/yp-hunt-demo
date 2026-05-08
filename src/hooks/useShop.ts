import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { paths } from "../config/paths";
import { showToast } from "../utils/toastUtils";
import { resetShop, type ShopState } from "../redux-toolkit/shopSlice";
import { useDispatch } from "react-redux";
import {
  createShopAPI,
  deleteShopItem,
  fetchShopById,
  getShopList,
  updateShopAPI,
} from "../api/shop";

export const useShoplist = (
  page: number,
  search: string,
  language: string | null,
  skip = false,
) => {
  const query = useQuery({
    queryKey: ["shop", page, search, language],
    queryFn: () => getShopList(page, search, language),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    enabled: !skip,
  });

  return query;
};

export const useDeleteShopItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteShopItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shop"], exact: false });
    },
  });
};

export const useShopById = (
  id: string | undefined,
  languageCode?: string | null,
) => {
  const isEditMode = Boolean(id);
  return useQuery({
    queryKey: ["shop", id, languageCode],
    queryFn: () => fetchShopById(id!, languageCode),
    enabled: isEditMode,
  });
};

export const useCreateShop = (shop: ShopState, isTranslation: boolean) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: () => {
      const payload = {
        ...shop,
        translation: {
          ...shop.translation,
          auto_translate: isTranslation,
        },
      };

      return createShopAPI(payload);
    },
    onSuccess: () => {
      showToast("shop Created", "success");
      dispatch(resetShop());
      navigate(paths.shop.path);
    },
    onError: (error) => {
      console.error("Error while adding shop", error);
      showToast("Failed to create shop", "error");
    },
  });
};

export const useUpdateShop = (shop: ShopState, isTranslation: boolean) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (id: string) => {
      const payload = {
        ...shop,
        translation: {
          ...shop.translation,
          auto_translate: isTranslation,
        },
      };

      return updateShopAPI(id, payload);
    },
    onSuccess: () => {
      showToast("Shop Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["shop"] });
      dispatch(resetShop());
      navigate(paths.shop.path);
    },
    onError: (error) => {
      console.error("shop update failed", error);
    },
  });
};
