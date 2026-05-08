import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { clearUserDetails } from "../redux-toolkit/userDetailSlice";
import { resetToken } from "../redux-toolkit/tempTokenSlice";
import { persistor } from "../redux-toolkit/store";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const logOut = async () => {
    await api.post("/auth/logout", {}, { withCredentials: true });
  };

  return useMutation({
    mutationFn: logOut,
    onSuccess: async() => {
      await persistor.purge()
      queryClient.clear(); // optional but recommended
      dispatch(clearUserDetails());
      dispatch(resetToken());
      navigate("/auth/login", { replace: true });
    },
  });
};
