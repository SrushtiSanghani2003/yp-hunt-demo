import api from "../lib/api";
import type { AirportState } from "../redux-toolkit/airportSlice";



export const getAirportList = async (
  currentPage: number,
  search?: string
) => {
  const params: Record<string, any> = {
    page: currentPage,
    limit: 8,
  };

  if (search) {
    params.search = search;
  }

  const res = await api.get("/airport", { params });
  return res.data;
};


export const fetchAirportById = (id: string) => {
  return api.get(`/airport/${id}`);
};

export const createAirportAPI = (airport: AirportState) => {
  return api.post("/airport", airport);
};


export const updateAirportAPI = (id: string, airport: AirportState) => {
  return api.put(`/airport/${id}`, airport);
};




