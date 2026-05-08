import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  downloadAccreditationTemplate,
  exporaccreditationCSV,
  getAccreditationByIdAPI,
  getAccreditationList,
  updateAccreditationAPI,
} from "../api/accreditation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../utils/toastUtils";
import { paths } from "../config/paths";
import {
  resetAccreditation,
  type AccreditationState,
} from "../redux-toolkit/accreditationSlice";

export const useAccreditationlist = (
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
      "accreditation",
      page,
      search,
      status,
      from_date,
      to_date,
      tournamentId,
    ],
    queryFn: () =>
      getAccreditationList(
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
export const useUpdateAccreditation = (announcements: AccreditationState) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (id: string) => updateAccreditationAPI(id, announcements),
    onSuccess: () => {
      showToast("Accreditation Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["accreditation"] });
      dispatch(resetAccreditation());
      navigate(paths.travelrequest.accreditation.path);
    },
    onError: (error) => {
      console.error("Accreditation update failed", error);
    },
  });
};
export const useGetAccreditationById = (id?: string) => {
  return useQuery({
    queryKey: ["accreditation", id],
    queryFn: () => getAccreditationByIdAPI(id as string),
    enabled: !!id,
  });
};
export const useDownloadAccreditationTemplate = () => {
  return useMutation({
    mutationFn: downloadAccreditationTemplate,
    onSuccess: (blob) => {
      if (!(blob instanceof Blob)) {
        console.error("Invalid blob", blob);
        showToast("Invalid file received", "error");
        return;
      }

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "accreditation_template.csv";

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
export const useExportCsvAccreditation = (status: any) => {
  return useMutation({
    mutationFn: () => {
      return exporaccreditationCSV(status);
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
      link.download = "accreditation_export.csv";

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
