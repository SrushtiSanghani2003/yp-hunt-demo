import type { PortalUserState } from "../../../redux-toolkit/portalUserSlice";

export const normalizePortalUserResponse = (data: any): PortalUserState => {
  return {
    role: data?.role ?? 4,

    first_name: data?.first_name ?? "",
    last_name: data?.last_name ?? "",

    email: data?.email ?? "",

    phone_number: data?.phone_number ?? "",

    // if backend returns player array → map id
    player_ids: Array.isArray(data?.player)
      ? data.player.map((p: any) => p.id)
      : Array.isArray(data?.player_ids)
        ? data.player_ids
        : [],

    // if backend returns team array → map id
    team_ids: Array.isArray(data?.team)
      ? data.team.map((t: any) => t.id)
      : Array.isArray(data?.team_ids)
        ? data.team_ids
        : [],
  };
};
