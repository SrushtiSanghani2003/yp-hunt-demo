import type { ModuleGroupState } from "../../../../redux-toolkit/moduleGroupSlice";

export const normalizeModuleGroupResponse = (data: any): ModuleGroupState => {
  return {
    code: data?.code ?? "",
    icon: data?.icon ?? "",
    status: typeof data?.status === "number" ? data.status : 1,

    order: typeof data?.order === "number" ? data.order : 1,

    translations: {
      language_code: data?.translations?.language_code ?? "en",
      name: data?.translations?.name ?? data?.name ?? "",
      description: data?.translations?.description ?? data?.description ?? null,
    },
  };
};
