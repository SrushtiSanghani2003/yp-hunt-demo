import type {
  FlightState,
  FlightStatus,
} from "../../../../redux-toolkit/flightSlice";

const ALLOWED_STATUS: FlightStatus[] = [
  "Pending",
  "Confirmed",
  "Declined",
  "Cancel",
];

export const normalizeFlightResponse = (data: any): FlightState => {
  return {
    tournaments_id:
      data?.tournaments_id !== undefined && data?.tournaments_id !== null
        ? Number(data?.tournaments_id)
        : null,

    from_airport_id:
      data?.from_airport_id !== undefined && data?.from_airport_id !== null
        ? Number(data.from_airport_id)
        : null,

    to_airport_id:
      data?.to_airport_id !== undefined && data?.to_airport_id !== null
        ? Number(data.to_airport_id)
        : null,

    travel_date: data?.travel_date ?? null,
    travel_time: data?.travel_time ?? null,

    return_date: data?.return_date ?? null,
    return_time: data?.return_time ?? null,

    name: data?.name ?? "",
    email: data?.email ?? "",
    passport_number: data?.passport_number ?? "",

    birth_date: data?.birth_date ?? null,
    religion: data?.religion ?? "",
    nationality: data?.nationality ?? "",
    visit_type: data?.visit_type ?? "",

    special_requests: data?.special_requests ?? "",

    time: data?.time ?? null,
    airline: data?.airline ?? "",
    booking_provider: data?.booking_provider ?? "",
    booking_reference: data?.booking_reference ?? "",

    admin_notes: data?.admin_notes ?? null,
    ticket: data?.ticket ?? null,
    decline_reason: data?.decline_reason ?? null,

    status: ALLOWED_STATUS.includes(data?.status) ? data.status : "Pending",
  };
};
