import { useQuery } from "@tanstack/react-query";
import { getMatchList } from "../api/matches";

export const useMatchlist = (
  page: number,
  search: string,
  tournamentId: number,
  skip = false
) => {
  const query = useQuery({
    queryKey: ["matches", page, search, tournamentId],
    queryFn: () => getMatchList(page, search, tournamentId),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    enabled: !skip,
  });

  return query;
};
