import { getReactIcon } from "./iconResolver";
import type { MENU_CONFIG } from "./sidebarConfig";

type AppPermission = {
  code: string;
  id: number;
  name: string;
  permitted: boolean;
};

type ApiModule = {
  module_id: number;
  module_code: string;
  module_name: string;
  icon: string;
  permissions: AppPermission[];
  group: {
    icon: string;
    group_id: number;
    group_code: string;
    group_name: string;
  } | null;
};

export type SidebarTab = {
  label: string;
  icon: any;
  path: string;
  subTabs?: {
    label: string;
    icon: any;
    path: string;
  }[];
};

const hasListPermission = (permissions: any[] = []) => {
  return permissions.some((p) => p.code === "list" && p.permitted === true);
};

export const buildSidebarFromApi = (
  apiData: ApiModule[],
  menuConfig: typeof MENU_CONFIG,
): SidebarTab[] => {
  const sidebar: SidebarTab[] = [];
  const groupIndexMap = new Map<string, number>();

  apiData.forEach((module) => {
    const { module_code, module_name, group, permissions } = module;

    // ❌ Skip module if LIST permission is not allowed
    if (!hasListPermission(permissions)) return;

    // 🟦 GROUPED MODULES (SUB TABS)
    if (group) {
      const groupKey = group.group_code;
      const groupConfig = menuConfig[groupKey];
      const childPath = groupConfig?.children?.[module_code];

      if (!groupConfig || !childPath) return;

      // Create parent at FIRST occurrence (order preserved)
      if (!groupIndexMap.has(groupKey)) {
        sidebar.push({
          label: group.group_name,
          icon: getReactIcon(group.icon || "FiCircle"),
          path: groupConfig.path,
          subTabs: [],
        });

        groupIndexMap.set(groupKey, sidebar.length - 1);
      }

      // Add sub tab
      const parentIndex = groupIndexMap.get(groupKey)!;
      sidebar[parentIndex].subTabs!.push({
        label: module_name,
        icon: getReactIcon(module.icon || "FiCircle"),
        path: childPath,
      });
    }

    // STANDALONE MODULES
    else {
      const config = menuConfig[module_code];
      if (!config) return;

      sidebar.push({
        label: module_name,
        icon: getReactIcon(module.icon || "FiCircle"),
        path: config.path,
      });
    }
  });

  // Optional safety: remove empty groups (no visible subTabs)
  return sidebar.filter((item) => !item.subTabs || item.subTabs.length > 0);
};
