import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  downloadTransportationTemplate,
  exportTransportationCSV,
  fetchTransportationById,
  getTransportationList,
  updatetransportationAPI,
} from "../api/Transportation";
import {
  resetTransportation,
  type TransportationState,
} from "../redux-toolkit/transportationSlice";
import { paths } from "../config/paths";
import { showToast } from "../utils/toastUtils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export const useTransportationlist = (
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
      "transportation",
      page,
      search,
      status,
      from_date,
      to_date,
      tournamentId,
    ],
    queryFn: () =>
      getTransportationList(
        page,
        search,
        status,
        from_date,
        to_date,
        tournamentId,
      ),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    enabled: !skip,
  });

  return query;
};
export const useUpdateTransportation = (
  transportation: TransportationState,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (id: string) => updatetransportationAPI(id, transportation),
    onSuccess: () => {
      showToast("Transportation Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["transportation"] });
      dispatch(resetTransportation());
      navigate(paths.travelrequest.transportation.path);
    },
    onError: (error) => {
      console.error("Transportation update failed", error);
    },
  });
};
export const useTransportationById = (id: string | undefined) => {
  const isEditMode = Boolean(id);
  return useQuery({
    queryKey: ["transportation", id],
    queryFn: () => fetchTransportationById(id!),
    enabled: isEditMode,
  });
};
export const useDownloadTransportationTemplate = () => {
  return useMutation({
    mutationFn: downloadTransportationTemplate,
    onSuccess: (blob) => {
      if (!(blob instanceof Blob)) {
        console.error("Invalid blob", blob);
        showToast("Invalid file received", "error");
        return;
      }

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "transportation_template.csv";

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
export const useExportCsv = (status: any) => {
  return useMutation({
    mutationFn: () => {
      return exportTransportationCSV(status);
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
      link.download = "transportation_export.csv";

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
