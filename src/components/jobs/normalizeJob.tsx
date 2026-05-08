import type { jobState } from "../../redux-toolkit/jobSlice";

export const normalizeJobresponse = (
  data: any,
  languageCode: string | null
): jobState => {
  const formatDate = (isoString: string | null) => {
    if (!isoString) return "";
    return isoString.split("T")[0];
  };
  return {
    status: data.status ?? "draft",
    scheduled_at: data.scheduled_at ?? null,
    published_at: data.published_at ?? null,
    closing_date: formatDate(data.closing_date) ?? "",

    translation: {
      language_code: languageCode || "en",
      title: data?.translation.title ?? "",
      location: data?.translation.location ?? "",
      salary: data?.translation.salary ?? "",
      description: data?.translation.description ?? "",
      job_role: data?.translation.job_role?.map((r: any) => ({
        title: r.title ?? "",
        description: r.description ?? "",
      })) ?? [
        {
          title: "",
          description: "",
        },
      ],
      job_form: data?.translation.job_form ?? [],
    },

    category_ids: data.category_ids ?? [],
  };
};
