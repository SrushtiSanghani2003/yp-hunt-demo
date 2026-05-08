import type { AllUserState } from "../../../redux-toolkit/allUserSlice";

export const normalizeAllUserResponse = (data: any): AllUserState => {
  return {
    role: data.role ?? 4,

    // players array hoy to id map, nahi hoy to empty
    player_ids: Array.isArray(data?.player)
      ? data.player.map((p: any) => p.id)
      : Array.isArray(data?.player_ids)
        ? data.player_ids
        : [],
  };
};
