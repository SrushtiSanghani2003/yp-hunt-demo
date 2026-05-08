import api from "../lib/api";

export const getMatchList = async (
  currentPage: number,
  name?: string,
  tournamentId?: string | number
) => {
  const params: Record<string, any> = {
    page: currentPage,
    limit: 8,
  };

  if (tournamentId) {
    params.tournament_id = Number(tournamentId);
  }

  if (name) {
    params.search = name;
  }

  const res = await api.get("/match", { params });
  return res.data;
};
