import type {
  TransportationState,
  TransportationStatus,
} from "../../../../redux-toolkit/transportationSlice";

const ALLOWED_STATUS: TransportationStatus[] = [
  "Pending",
  "Confirmed",
  "Declined",
  "Cancel",
];

export const normalizeTransportationResponse = (
  data: any
): TransportationState => {
  return {
    tournament_id:
      data?.tournament_id !== undefined && data?.tournament_id !== null
        ? Number(data.tournament_id)
        : null,

    phone_code: data?.phone_code ?? "",
    contact_number: data?.contact_number ?? "",

    pick_up: data?.pick_up ?? "",
    pick_up_latitude: data?.pick_up_latitude ?? "",
    pick_up_longitude: data?.pick_up_longitude ?? "",

    drop_off: data?.drop_off ?? "",
    drop_off_latitude: data?.drop_off_latitude ?? "",
    drop_off_longitude: data?.drop_off_longitude ?? "",

    from_id:
      data?.from?.travel_detail_id !== undefined && data.from !== null
        ? Number(data?.from.travel_detail_id)
        : null,

    to_id:
      data?.to?.travel_detail_id !== undefined && data.to !== null
        ? Number(data.to.travel_detail_id)
        : null,

    date: data?.date ?? null,
    time: data?.time ?? null,

    specific_requirements: data?.specific_requirements ?? null,

    reg_no: data?.reg_no ?? null,
    contact_details: data?.contact_details ?? null,
    admin_notes: data?.admin_notes ?? null,

    decline_reason: data?.decline_reason ?? null,

    passengers: data?.passengers?.toString() ?? "1",
    bags: data?.bags?.toString() ?? "0",

    status: ALLOWED_STATUS.includes(data?.status) ? data.status : "Pending",
  };
};
