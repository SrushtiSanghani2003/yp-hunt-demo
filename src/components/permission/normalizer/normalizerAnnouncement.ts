import type {
  AnnouncementsState,
  AnnouncementItem,
} from "../../../redux-toolkit/announcementsSlice";

export const normalizeAnnouncementsResponse = (
  data: any
): AnnouncementsState => ({
  tournaments_id: data?.tournaments_id ?? null,

  status:
    data?.status === "Active" || data?.status === "Inactive"
      ? data.status
      : "Inactive",

  announcements: Array.isArray(data?.announcements)
    ? data.announcements.map(
        (item: any): AnnouncementItem => ({
          title: item?.title ?? "",
          description: item?.description ?? "",
          date: item?.date ?? "",
        })
      )
    : [],
});
