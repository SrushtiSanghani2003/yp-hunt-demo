import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { paths } from "../config/paths";
import { showToast } from "../utils/toastUtils";
import {
  resetAirport,
  type AirportState,
} from "../redux-toolkit/airportSlice";
import { useDispatch } from "react-redux";
import {
  createAirportAPI,
  fetchAirportById,
  getAirportList,
  updateAirportAPI,
} from "../api/airport";


export const useAirportList = (
  page: number,
  search: string,
  skip = false
) => {
  return useQuery({
    queryKey: ["airport", page, search],
    queryFn: () => getAirportList(page, search),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    enabled: !skip,
  });
};





export const useAirportById = (id: string | undefined) => {
  const isEditMode = Boolean(id);

  return useQuery({
    queryKey: ["airport", id],
    queryFn: () => fetchAirportById(id!),
    enabled: isEditMode,
  });
};


export const useCreateAirport = (airport: AirportState) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const payload = {
    airport_name: airport.airport_name,
    short_code: airport.short_code,
    city_name: airport.city_name,
    state_name: airport.state_name,
    country_name: airport.country_name,
    latitude: airport.latitude,
    longitude: airport.longitude
  };

  return useMutation({
    mutationFn: () => createAirportAPI(payload as AirportState),
    onSuccess: () => {
      showToast("Airport Created", "success");
      dispatch(resetAirport());
      navigate(paths.airport.path);
    },
    onError: (error) => {
      console.error("Error while creating airport", error);
      showToast("Failed to create airport", "error");
    },
  });
};


export const useUpdateAirport = (airport: AirportState) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (id: string) => updateAirportAPI(id, airport),
    onSuccess: () => {
      showToast("Airport Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["airport"] });
      dispatch(resetAirport());
      navigate(paths.airport.path);
    },
    onError: (error) => {
      console.error("Airport update failed", error);
      showToast("Failed to update airport", "error");
    },
  });
};
