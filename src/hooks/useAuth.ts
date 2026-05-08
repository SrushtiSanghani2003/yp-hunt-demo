import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";


export const useAuth = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const res = await api.get("/auth/me");
        return res.data;
      } catch (error) {
        return null;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
