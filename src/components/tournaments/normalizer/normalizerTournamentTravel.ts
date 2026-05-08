import type { TournamentTravelState } from "../../../redux-toolkit/tournamentTravelSlice";

const toCapitalCase = (value: string) =>
  value
    .toLowerCase()
    .split(" ")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

export const normalizeTournamentTravelResponse = (
  data: any[]
): TournamentTravelState => {
  return {
    travels: Array.isArray(data)
      ? data.map((item) => ({
          type: item?.type ? toCapitalCase(String(item.type)) : "", // ✅ FIX

          title: item?.title ?? "",

          hotel_address: item?.hotel_address ?? "",
          hotel_address_map_url: item?.hotel_address_map_url ?? "",
          contact_details: item?.contact_details ?? "",
        }))
      : [],
  };
};
