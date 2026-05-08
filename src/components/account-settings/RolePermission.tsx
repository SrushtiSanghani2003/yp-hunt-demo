import { useEffect, useState } from "react";
import { chevronRight, correctIcon } from "../../icons";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import { AnimatePresence, motion } from "framer-motion";
import { showToast } from "../../utils/toastUtils";
import { useScroll } from "../../hooks/ScrollContext";

const columns = [
  { title: "Id", width: "min-w-8 w-8" },
  { title: "Module", width: "min-w-72 w-72" },
  { title: "Common Permission", width: "min-w-52 w-52" },
];

const PermissionsTable = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { isScrolled } = useScroll();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [modules, setModules] = useState<any[]>([]);

  /* ---------------- API ---------------- */
  const getPermissionsByRoleIdAPI = (roleId: number) =>
    api.get(`/permissions/list/${roleId}`);

  const { data, isLoading } = useQuery({
    queryKey: ["permissions", id],
    queryFn: () => getPermissionsByRoleIdAPI(Number(id)),
    enabled: !!id,
    select: (res) => res?.data,
  });
  const updatePermissionsAPI = (roleId: number, payload: any[]) => {
    return api.patch(`/permissions/list/${roleId}`, payload);
  };
  const useUpdatePermissions = (roleId: number) => {
    return useMutation({
      mutationFn: (payload: any[]) => updatePermissionsAPI(roleId, payload),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["dynamicSideMenu"],
          exact: false,
        });
        showToast("Permissions updated successfully", "success");
        navigate("/account/roles");
      },

      onError: (error: any) => {
        showToast(
          error?.response?.data?.message || "Failed to update permissions",
          "error",
        );
      },
    });
  };
  const buildPermissionsPayload = () => {
    return modules.map((module) => ({
      module_id: module.module_id,
      permissions: module.permissions.map((perm: any) => ({
        id: perm.id,
        permitted: perm.permitted,
      })),
    }));
  };

  const { mutate: updatePermissions, isPending } = useUpdatePermissions(
    Number(id),
  );
  const handleSave = () => {
    const payload = buildPermissionsPayload();

    updatePermissions(payload);
  };

  useEffect(() => {
    if (data) setModules(data);
  }, [data]);

  /* ---------------- HANDLERS ---------------- */
  const toggleExpand = (moduleId: number) => {
    setExpanded((prev) => (prev === moduleId ? null : moduleId));
  };

  const togglePermission = (moduleId: number, permissionId: number) => {
    setModules((prev) =>
      prev.map((module) =>
        module.module_id === moduleId
          ? {
              ...module,
              permissions: module.permissions.map((perm: any) =>
                perm.id === permissionId
                  ? { ...perm, permitted: !perm.permitted }
                  : perm,
              ),
            }
          : module,
      ),
    );
  };

  /* ---------------- UI ---------------- */
  return (
    <div>
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Role Permission Builder"
          onSaveTemplateTitle="Back"
          onSaveTemplate={() => navigate("/account/roles")}
          onSubmit={handleSave}
          onSubmitLoading={isPending}
          isToggleVisible
          saveButtonText="Save"
        />
      </div>
      <div className="container overflow-x-auto my-4">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.title}
                  className={`text-start opacity-40 py-2 font-normal whitespace-normal  ${
                    col.width
                  } ${
                    col.title === "Common Permission"
                      ? "text-end"
                      : col.title === "Id"
                        ? " ps-3"
                        : ""
                  }`}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td colSpan={columns.length}>
                      <div className="bg-white border border-primary rounded-xl p-3 animate-pulse">
                        {/* Module row skeleton */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-4 bg-gray-300 rounded"></div>
                            <div className="w-72 h-4 bg-gray-300 rounded"></div>
                          </div>
                          <div className="w-52  flex justify-end">
                            <div className="w-5 h-5 bg-gray-300 rounded"></div>
                          </div>
                        </div>

                        {/* Permissions skeleton */}
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <div
                              key={idx}
                              className="w-full h-6 bg-gray-300 rounded-lg"
                            ></div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              : modules.map((module, index) => {
                  const hasPermissions = module.permissions.length > 0;
                  return (
                    <tr key={module.module_id}>
                      <td colSpan={columns.length}>
                        <div className="bg-white border border-primary rounded-xl pe-3 py-3">
                          {/* Module Info Row */}
                          <div className="flex items-center justify-between gap-5">
                            <div className="flex items-center gap-5">
                              <span className="w-11 min-w-11 ps-3">
                                {index + 1}
                              </span>
                              <span
                                className={`w-72 font-semibold flex items-center justify-between gap-2  ${
                                  hasPermissions ? "cursor-pointer" : " "
                                }`}
                                onClick={() => {
                                  if (!hasPermissions) return;
                                  toggleExpand(module.module_id);
                                }}
                              >
                                {module.module_name}
                                {module.permissions?.length > 0 && (
                                  <img
                                    src={chevronRight}
                                    className={`transition-transform duration-300 ${
                                      expanded === module.module_id
                                        ? "rotate-90"
                                        : ""
                                    }`}
                                  />
                                )}
                              </span>
                            </div>

                            <span
                              className={`${
                                module.parent_id == 1
                                  ? "bg-gray-400/50"
                                  : "bg-primary/60"
                              } text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-lg`}
                            >
                              {module.parent_id == 1
                                ? "Sidebar"
                                : "Administration"}
                            </span>

                            <div className="ml-auto flex items-center justify-end w-52">
                              {module.permissions?.length > 0 && (
                                <div className="flex items-center justify-end w-52">
                                  {module.permissions?.length > 0 && (
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="checkbox"
                                        id={`module-${module.module_id}`}
                                        className="peer hidden"
                                        checked={module.permissions.every(
                                          (p: any) => p.permitted,
                                        )}
                                        onChange={(e) => {
                                          const checked = e.target.checked;

                                          setModules((prev) =>
                                            prev.map((m) =>
                                              m.module_id === module.module_id
                                                ? {
                                                    ...m,
                                                    permissions:
                                                      m.permissions.map(
                                                        (p: any) => ({
                                                          ...p,
                                                          permitted: checked,
                                                        }),
                                                      ),
                                                  }
                                                : m,
                                            ),
                                          );

                                          setExpanded(
                                            checked ? module.module_id : null,
                                          );
                                        }}
                                      />

                                      <label
                                        htmlFor={`module-${module.module_id}`}
                                        className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded cursor-pointer
                   peer-checked:bg-black peer-checked:border-black"
                                      >
                                        {module.permissions.every(
                                          (p: any) => p.permitted,
                                        ) && (
                                          <img
                                            src={correctIcon}
                                            alt="checked"
                                            className="w-3 h-3"
                                          />
                                        )}
                                      </label>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Expanded Permissions */}
                          <AnimatePresence initial={false}>
                            {expanded === module.module_id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                                className="mt-3 ps-3"
                              >
                                <div className="bg-f6f6f6 border border-primary rounded-xl p-3">
                                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                    {module.permissions.map((perm: any) => (
                                      <label
                                        key={perm.id}
                                        className="flex items-center gap-2 bg-white border border-primary rounded-lg px-3 py-2 cursor-pointer"
                                      >
                                        <input
                                          type="checkbox"
                                          id={`perm-${perm.id}`}
                                          className="peer hidden"
                                          checked={perm.permitted}
                                          onChange={() =>
                                            togglePermission(
                                              module.module_id,
                                              perm.id,
                                            )
                                          }
                                        />

                                        <label
                                          htmlFor={`perm-${perm.id}`}
                                          className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded cursor-pointer
               peer-checked:bg-black peer-checked:border-black"
                                        >
                                          {perm.permitted && (
                                            <img
                                              src={correctIcon}
                                              alt="checked"
                                              className="w-3 h-3"
                                            />
                                          )}
                                        </label>

                                        <label
                                          htmlFor={`perm-${perm.id}`}
                                          className="text-sm font-medium cursor-pointer"
                                        >
                                          {perm.name}
                                        </label>
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionsTable;
