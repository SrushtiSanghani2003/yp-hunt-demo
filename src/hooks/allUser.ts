import { useMutation, useQuery } from "@tanstack/react-query";
import { getAppUserById, updateAppUser } from "../api/alluser";
import { showToast } from "../utils/toastUtils";

export const useGetAppUser = (id?: string) => {
  return useQuery({
    queryKey: ["appuser", id],
    queryFn: () => getAppUserById(id as string),
    enabled: !!id,
  });
};

export const useUpdateAppUser = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateAppUser(id, payload),

    onSuccess: () => {
      showToast("User updated successfully", "success");
    },

    onError: (error: any) => {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error",
      );
    },
  });
};
