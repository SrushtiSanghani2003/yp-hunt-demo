import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDocumentationAPI,
  getDocumentationByIdAPI,
  getDocumentationList,
  updateDocumentationAPI,
} from "../api/documentation";
import {
  resetDocuments,
  type DocumentsState,
} from "../redux-toolkit/documentationSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../utils/toastUtils";
import { paths } from "../config/paths";

export const useDocumentationlist = (
  page: number,
  search: string,
  skip = false,
) => {
  const query = useQuery({
    queryKey: ["documentation", page, search],
    queryFn: () => getDocumentationList(page, search),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    enabled: !skip,
  });

  return query;
};
export const useCreateDocumentation = (documents: DocumentsState) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: () => createDocumentationAPI(documents),
    onSuccess: () => {
      showToast("Documentation Created", "success");
      dispatch(resetDocuments());
      navigate(paths.documentation.path);
    },
    onError: (error) => {
      console.error("Error while adding Documentation", error);
      showToast("Failed to create Documentation", "error");
    },
  });
};
export const useUpdateDocumentation = (documents: DocumentsState) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (id: string) => updateDocumentationAPI(id, documents),
    onSuccess: () => {
      showToast("Documentation Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["documentation"] });
      dispatch(resetDocuments());
      navigate(paths.documentation.path);
    },
    onError: (error) => {
      console.error("documentation update failed", error);
    },
  });
};
export const useGetDocumentsById = (id?: string) => {
  return useQuery({
    queryKey: ["documentation", id],
    queryFn: () => getDocumentationByIdAPI(id as string),
    enabled: !!id,
  });
};
