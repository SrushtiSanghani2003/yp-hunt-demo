import type {
  AccreditationState,
  AccreditationStatus,
} from "../../../../redux-toolkit/accreditationSlice";

const ALLOWED_STATUS: AccreditationStatus[] = [
  "Pending",
  "Confirmed",
  "Declined",
  "Cancel",
];

export const normalizeAccreditationResponse = (
  data: any,
): AccreditationState => {

  return {
    appuser_id:
      data?.appuser_id !== undefined && data?.appuser_id !== null
        ? Number(data.appuser_id)
        : null,

    tournament_id:
      data?.tournament_id !== undefined && data?.tournament_id !== null
        ? Number(data.tournament_id)
        : null,

    contact_phone_code: data?.contact_phone_code ?? "",
    contact_number: data?.contact_number ?? "",

    first_name: data?.first_name ?? "",
    last_name: data?.last_name ?? "",
    email: data?.email ?? "",

    phone_code: data?.phone_code ?? "",
    phone_number: data?.phone_number ?? "",

    document_type: data?.document_type ?? "",
    image: data?.image ?? "",

    admin_notes: data?.admin_notes ?? null,
    decline_reason: data?.decline_reason || null,

    created_type: data?.created_type ?? "Self",
    book_for: data?.book_for ?? "",
    book_for_id:
      data?.book_for_id !== undefined && data?.book_for_id !== null
        ? Number(data.book_for_id)
        : null,

    created_request_type: data?.created_request_type ?? "Web",
    updated_by:
      data?.updated_by !== undefined && data?.updated_by !== null
        ? Number(data.updated_by)
        : null,

    status: ALLOWED_STATUS.includes(data?.status) ? data.status : "Pending",

    request_on: data?.request_on ?? null,
  };
};
