import type { BroadcastState } from "../../../redux-toolkit/whereToWatchSlice";

export const normalizeBroadcastResponse = (data: any): BroadcastState => {
  return {
    broadcast_url: data.broadcast_url ?? "",
    image: data.image ?? null,
    country_id: Array.isArray(data.countries)
      ? data.countries.map((c: any) => Number(c.id))
      : [],
  };
};
