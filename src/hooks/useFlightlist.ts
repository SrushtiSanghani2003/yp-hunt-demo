import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { paths } from "../config/paths";
import { showToast } from "../utils/toastUtils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  downloadFlightTemplate,
  exporflightCSV,
  fetchFlightById,
  getFlightList,
  updateFlightAPI,
} from "../api/flight";
import { resetFlight, type FlightState } from "../redux-toolkit/flightSlice";

export const useFlightlist = (
  page: number,
  search: string,
  status?: string,
  from_date?: string,
  to_date?: string,
  tournamentId?: number | null,
  skip = false,
) => {
  const query = useQuery({
    queryKey: [
      "flight",
      page,
      search,
      status,
      from_date,
      to_date,
      tournamentId,
    ],
    queryFn: () =>
      getFlightList(page, search, status, from_date, to_date, tournamentId),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    enabled: !skip,
  });

  return query;
};
export const useUpdateFlight = (flight: FlightState) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (id: string) => updateFlightAPI(id, flight),
    onSuccess: () => {
      showToast("Flight Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["flight"] });
      dispatch(resetFlight());
      navigate(paths.travelrequest.flight.path);
    },
    onError: (error) => {
      console.error("Flight update failed", error);
    },
  });
};
export const useFlightById = (id: string | undefined) => {
  const isEditMode = Boolean(id);
  return useQuery({
    queryKey: ["flight", id],
    queryFn: () => fetchFlightById(id!),
    enabled: isEditMode,
  });
};
export const useDownloadFlightTemplate = () => {
  return useMutation({
    mutationFn: downloadFlightTemplate,
    onSuccess: (blob) => {
      if (!(blob instanceof Blob)) {
        console.error("Invalid blob", blob);
        showToast("Invalid file received", "error");
        return;
      }

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "flight_template.csv";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      showToast("Template downloaded successfully", "success");
    },
    onError: (error) => {
      console.error(error);
      showToast("Failed to download template", "error");
    },
  });
};
export const useExportCsvFlight = (status: any) => {
  return useMutation({
    mutationFn: () => {
      return exporflightCSV(status);
    },

    onSuccess: (blob) => {
      if (!(blob instanceof Blob)) {
        console.error("Invalid blob", blob);
        showToast("Invalid file received", "error");
        return;
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "flight_export.csv";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      showToast("CSV exported successfully", "success");
    },

    onError: (error) => {
      console.error(error);
      showToast("Failed to export CSV", "error");
    },
  });
};
