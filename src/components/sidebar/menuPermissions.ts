export type PermissionMap = {
  [permissionCode: string]: boolean | undefined;
};

export type ModulePermission = {
  module_name: string;
  permissions: PermissionMap;
};

export type MenuPermissionsState = {
  sidebarMenus: {
    [moduleCode: string]: ModulePermission;
  };
  administrationMenus: {
    [moduleCode: string]: ModulePermission;
  };
};

type ApiPermission = {
  code: string;
  permitted: boolean;
};

type ApiModule = {
  module_code: string;
  module_name: string;
  permissions: ApiPermission[];
  parent_id: number;
};

export const mapMenuPermissions = (
  modules: ApiModule[],
): MenuPermissionsState => {
  const result: MenuPermissionsState = {
    sidebarMenus: {},
    administrationMenus: {},
  };

  modules.forEach((module) => {
    const target =
      module?.parent_id === 2
        ? result.administrationMenus
        : result.sidebarMenus;

    target[module.module_code] = {
      module_name: module.module_name,
      permissions: {},
    };

    module.permissions.forEach((perm) => {
      target[module.module_code].permissions[perm.code] = perm.permitted;
    });
  });

  return result;
};

export const getPermissionFlags = (moduleData?: ModulePermission) => {
  const permissions = moduleData?.permissions ?? {};

  return {
    isList: !!permissions.list,
    isExport: !!permissions.export,
    isUpdate: !!permissions.edit,
    isCreate: !!permissions.create,
    isChangeStatus: !!permissions.change_status,
    isChangeOrder: !!permissions.change_order,
    isDelete: !!permissions.delete,
    isTransportDetails: !!permissions.edit_transport_details,
    isView: !!permissions.view,
    isCopy: !!permissions.copy,
    isUpload: !!permissions.upload,
    isUploadPhoto: !!permissions.upload_photos,
    isChangePassword: !!permissions.change_password,
    isChange2FAStatus: !!permissions.change_2fa_status,
    isTournamentInfo: !!permissions.edit_tournament_info,
  };
};
export const getPermissionAdministrationFlags = (
  moduleData?: ModulePermission,
) => {
  const permissions = moduleData?.permissions ?? {};

  return {
    isList: !!permissions.list,
    isExport: !!permissions.export,
    isUpdate: !!permissions.edit,
    isCreate: !!permissions.create,
    isChangeStatus: !!permissions.change_status,
    isChangeOrder: !!permissions.change_order,
    isDelete: !!permissions.delete,
    isTransportDetails: !!permissions.edit_transport_details,
    isView: !!permissions.view,
    isCopy: !!permissions.copy,
    isUpload: !!permissions.upload,
    isUploadPhoto: !!permissions.upload_photos,
    isChangePassword: !!permissions.change_password,
    isChange2FAStatus: !!permissions.change_2fa_status,
    isTournamentInfo: !!permissions.edit_tournament_info,
  };
};
