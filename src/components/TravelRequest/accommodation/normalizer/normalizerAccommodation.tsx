import type {
  AccommodationState,
  AccommodationStatus,
} from "../../../../redux-toolkit/accommodationSlice";

const ALLOWED_STATUS: AccommodationStatus[] = [
  "Pending",
  "Confirmed",
  "Declined",
  "Cancel",
];

export const normalizeAccommodationResponse = (
  data: any
): AccommodationState => {

  return {
    tournament_id:
      data?.tournament_id !== undefined && data?.tournament_id !== null
        ? Number(data.tournament_id)
        : null,

    phone_code: data?.phone_code ?? "",
    contact_number: data?.contact_number ?? "",

    check_in: data?.check_in ?? null,
    check_out: data?.check_out ?? null,

    specific_requirements: data?.specific_requirements ?? null,

    travel_detail_id:
      data?.travel_detail_id !== undefined && data?.travel_detail_id !== null
        ? Number(data.travel_detail_id)
        : null,

    hotel_name: data?.hotel_name ?? "",
    hotel_address: data?.hotel_address ?? "",
    hotel_address_map_url: data?.hotel_address_map_url ?? "",

    contact_details: data?.contact_details ?? null,
    admin_notes: data?.admin_notes ?? null,
    decline_reason: data?.decline_reason ?? null,

    guests: data?.guests?.toString() ?? "1",
    rooms: data?.rooms?.toString() ?? "1",
    room_type: data?.room_type ?? "",

    status: ALLOWED_STATUS.includes(data?.status) ? data.status : "Pending",
  };
};
