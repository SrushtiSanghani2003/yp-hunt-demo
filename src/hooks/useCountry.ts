import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCountryAPI, fetchCountryById, getCountryList, updateCountryAPI } from "../api/country";
import { resetCountry, type CountryState } from "../redux-toolkit/countrySlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../utils/toastUtils";
import { paths } from "../config/paths";

export const useCountrylist = (page: number, search: string, skip = false) => {
  const query = useQuery({
    queryKey: ["country", page, search],
    queryFn: () => getCountryList(page, search),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    enabled: !skip,
  });

  return query;
};
export const useCountryById = (
  id: string | undefined,
  languageCode?: string | null,
) => {
  const isEditMode = Boolean(id);
  return useQuery({
    queryKey: ["country", id, languageCode],
    queryFn: () => fetchCountryById(id!, languageCode),
    enabled: isEditMode,
  });
};

export const useCreateCountry = (country: CountryState) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: () => createCountryAPI(country),
    onSuccess: () => {
      showToast("country Created", "success");
      dispatch(resetCountry());
      navigate(paths.country.path);
    },
    onError: (error) => {
      console.error("Error while adding country", error);
      showToast("Failed to create country", "error");
    },
  });
};

export const useUpdateCountry = (country: CountryState) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (id: string) => updateCountryAPI(id, country),
    onSuccess: () => {
      showToast("Country Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["country"] });
      dispatch(resetCountry());
      navigate(paths.country.path);
    },
    onError: (error) => {
      console.error("country update failed", error);
    },
  });
};
