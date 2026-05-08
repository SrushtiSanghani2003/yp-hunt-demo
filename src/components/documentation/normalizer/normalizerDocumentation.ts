import type { DocumentItem, DocumentsState } from "../../../redux-toolkit/documentationSlice";


export const normalizeDocumentsResponse = (data: any): DocumentsState => ({
  tournaments_id: data?.tournaments_id ?? null,

  status:
    data?.status === "Active" || data?.status === "Inactive"
      ? data.status
      : "Inactive",

  documents: Array.isArray(data?.documents)
    ? data.documents.map(
        (item: any): DocumentItem => ({
          title: item?.title ?? "",
          files: item?.files ?? "",
          type: item?.type ?? "",
          extension: item?.extension ?? "",
          display_order:
            typeof item?.display_order === "number" ? item.display_order : 0,
        })
      )
    : [],
});
