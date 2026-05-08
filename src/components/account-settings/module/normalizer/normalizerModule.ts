import type { ModuleState } from "../../../../redux-toolkit/moduleSlice";

export const normalizeModuleResponse = (data: any): ModuleState => {
  return {
    code: data?.code ?? "",
    module_group_id: data?.module_group?.id ?? null,
    parent_id: data?.parent_id ?? null,
    path: data?.path ?? "",
    icon: data?.icon ?? "",
    status: data?.status ?? "draft",
    published_at: data?.published_at ?? null,
    scheduled_at: data?.scheduled_at ?? null,

    translations: {
      language_code: data?.translations?.language_code ?? "en",
      name: data?.name ?? "",
      description: data?.description ?? null,
    },
  };
};
