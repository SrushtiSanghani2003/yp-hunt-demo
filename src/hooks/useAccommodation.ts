import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  downloadAccommodationTemplate,
  exporaccommodationCSV,
  getAccommodationByIdAPI,
  getAccommodationList,
  updateAccommodationAPI,
} from "../api/accommodation";
import {
  resetAccommodation,
  type AccommodationState,
} from "../redux-toolkit/accommodationSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../utils/toastUtils";
import { paths } from "../config/paths";

export const useAccommodationlist = (
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
      "accommodation",
      page,
      search,
      status,
      from_date,
      to_date,
      tournamentId,
    ],
    queryFn: () =>
      getAccommodationList(
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
export const useUpdateAccommodation = (announcements: AccommodationState) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (id: string) => updateAccommodationAPI(id, announcements),
    onSuccess: () => {
      showToast("Accommodation Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["accommodation"] });
      dispatch(resetAccommodation());
      navigate(paths.travelrequest.accommodation.path);
    },
    onError: (error) => {
      console.error("Accommodation update failed", error);
    },
  });
};
export const useGetAccommodationById = (id?: string) => {
  return useQuery({
    queryKey: ["accommodation", id],
    queryFn: () => getAccommodationByIdAPI(id as string),
    enabled: !!id,
  });
};
export const useDownloadAccommodationTemplate = () => {
  return useMutation({
    mutationFn: downloadAccommodationTemplate,
    onSuccess: (blob) => {
      if (!(blob instanceof Blob)) {
        console.error("Invalid blob", blob);
        showToast("Invalid file received", "error");
        return;
      }

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "accommodation_template.csv";

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
export const useExportCsvAccommodation = (status: any) => {
  return useMutation({
    mutationFn: () => {
      return exporaccommodationCSV(status);
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
      link.download = "accommodation_export.csv";

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
