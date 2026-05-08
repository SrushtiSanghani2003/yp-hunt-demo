import { useEffect, useMemo, useState } from "react";
import {
  // correctIcon,
  deleteIcon,
  penIcon,
  plusIcon,
  rolepermissions,
  // short_white,
  // sortIcon,
} from "../../icons";
// import SearchInput from "../ui/searchInput";
import api from "../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../ui/button";
import DeleteRoleModal from "./DeleteRoleModel";
import AddRole from "./AddRole";
import { useNavigate } from "react-router-dom";
import Pagination from "../ui/pagination";
import { showToast } from "../../utils/toastUtils";
import { formatDate } from "../../config/function";
import SearchInput from "../ui/searchInput";
import { useDebounce } from "../../hooks/useDebounce";

export interface Role {
  id: number;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  deleted_at: string | null;
  translations: {
    name: string;
    description?: string;
    language_code?: string;
  }[];
}

const RoleManagement = () => {
  const [createShow, setCreateShow] = useState<boolean>(false);
  const [deleteShow, setDeleteShow] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearch = useDebounce(searchInput, 300);
  const [selectedRoleId, setSelectedRoleId] = useState<string | number | null>(
    null,
  );
  const navigate = useNavigate();
  // const { isScrolled } = useScroll();
  const [roles, setRoles] = useState<Role[]>([]);
  const queryClient = useQueryClient();
  const selectedRole = roles?.find((role) => role?.id === selectedRoleId);
  const [page, setPage] = useState(1);

  const getAllRoles = async ({ queryKey }: any) => {
    const [_key, debouncedSearch, page] = queryKey;
    const params: Record<string, string> = { page };
    if (debouncedSearch.trim()) {
      params.search = debouncedSearch;
    }

    const response = await api.get("/roles", { params });
    return response.data;
  };

  const { data: allRoleData } = useQuery({
    queryKey: ["roles", debouncedSearch, page],
    queryFn: getAllRoles,
    refetchOnWindowFocus: false,
  });
  const totalPages = useMemo(() => {
    return allRoleData?.totalPages || 1;
  }, [allRoleData?.totalPages]);

  const createRole = async (newRole: { name: string }) => {
    const response = await api.post("/roles", {
      code: newRole.name,
      translations: [
        { language_code: "en", name: newRole.name, description: "" },
      ],
    });
    return response.data;
  };

  const deleteRole = async (id: string) => {
    return await api.delete(`/roles/${id}`);
  };

  const editRole = async ({ id, name }: { id: string; name: string }) => {
    const response = await api.put(`/roles/${id}`, {
      code: name, // same as create
      translations: [
        {
          language_code: "en",
          name: name,
          description: "", // you can fill with existing description if needed
        },
      ],
    });
    return response.data;
  };

  const createRoleMutation = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"], exact: false });
      setCreateShow(false);
      showToast("Role Create", "success");
    },
    onError: () => {
      alert("Failed to create role");
    },
  });

  const deleteRoleMutation = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      setDeleteShow(false);
      setSelectedRoleId(null);
      showToast("Role Delete", "success");
    },
    onError: () => {
      alert("Failed to delete role");
    },
  });

  const editRoleMutation = useMutation({
    mutationFn: editRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      setCreateShow(false);
      setSelectedRoleId(null);
      showToast("Role Updated", "success");
    },
    onError: () => {
      alert("Failed to update role");
    },
  });

  useEffect(() => {
    if (allRoleData) {
      setRoles(allRoleData?.roles);
    }
  }, [allRoleData]);
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);
  return (
    <>
      <div className="container relative pt-6 md:pt-0">
        {/* <div
          className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
            isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
          }`}
        > */}
        <div className="lg:flex items-center justify-between ">
          <h2 className="uppercase lg:text-xl/5 text-base font-bold">Roles</h2>
          <div className="flex flex-col lg:flex-row lg:items-center items-end lg:gap-3 gap-1">
            <SearchInput
              placeholder="Local search"
              className="rounded-2xl px-4 py-2"
              value={searchInput}
              onChange={(value: string) => setSearchInput(value)}
              onClear={() => setSearchInput("")}
            />
            <Button
              text="Module"
              icon={rolepermissions}
              className="px-4 py-2 rounded-lg border border-transparent  bg-primary text-black"
              backgroundColor="transparent"
              onClick={() => {
                navigate("/account/module");
              }}
              imageclassName="text-white"
              textSize="text-sm"
            />
            <Button
              text="Group Module"
              icon={rolepermissions}
              className="px-4 py-2 rounded-lg border border-transparent  bg-primary text-black"
              backgroundColor="transparent"
              onClick={() => {
                navigate("/account/groupmodule");
              }}
              imageclassName="text-white"
              textSize="text-sm"
            />
            <Button
              text="Create"
              icon={plusIcon}
              backgroundColor="transparent"
              className="rounded-lg border border-black px-4 py-2"
              onClick={() => setCreateShow(true)}
              textSize="text-sm"
            />
          </div>
        </div>
        {/* </div> */}
        <div className=" overflow-x-auto">
          <table className="min-w-full leading-normal border-spacing-y-[6px] border-separate">
            <thead>
              <tr>
                <th className="text-black opacity-40 py-3 text-center text-base font-normal w-[50px] min-w-[50px]">
                  ID
                </th>
                <th
                  style={{ width: "50%" }}
                  className="text-black opacity-40 text-base py-3 text-left font-normal min-w-[488px] w-[488px]"
                >
                  Name
                </th>
                <th className="text-black opacity-40 py-3 text-start text-base font-normal w-[120px] min-w-[120px]">
                  Date Created
                </th>
                <th className="text-black opacity-40 pe-5 py-3 text-base font-normal w-[168px] min-w-[168px] text-end">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {!roles || roles.length === 0 ? (
                <tr>
                  <td colSpan={4}>
                    <p className="border border-primary bg-white rounded-xl text-center py-4 text-gray-500  text-base">
                      No data available
                    </p>
                  </td>
                </tr>
              ) : (
                roles.length > 0 &&
                roles.map((role: any, index) => {
                  return (
                    <tr key={index}>
                      <td colSpan={4}>
                        <div className="text-sfpro_regular hover:bg-gray-100 transition bg-white border border-primary rounded-[15px] py-3">
                          <table className="w-full">
                            <thead>
                              <tr>
                                <th className="w-[50px] min-w-[50px]"></th>
                                <th className="min-w-[488px] w-1/2"></th>
                                <th className="w-[120px] min-w-[120px]"></th>
                                <th className="w-[168px] min-w-[168px] text-center"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="text-center">{index + 1}</div>
                                </td>
                                <td className="text-center">
                                  <div className="flex items-center gap-4">
                                    <p className="font-semibold">
                                      {role?.code}
                                    </p>
                                  </div>
                                </td>
                                <td className="text-center">
                                  <p className="w-max">
                                    {formatDate(role.created_at)}
                                  </p>
                                </td>
                                <td>
                                  <div
                                    className="flex gap-2 justify-end action-button pe-3"
                                    role="group"
                                  >
                                    {/* Role Permissions Button */}
                                    <div className="relative group">
                                      <Button
                                        icon={rolepermissions}
                                        backgroundColor="transparent"
                                        className="md:py-0"
                                        onClick={() =>
                                          navigate(
                                            `/account/roles/rolepermission/${role.id}`,
                                          )
                                        }
                                      />
                                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Role Permissions
                                      </span>
                                    </div>

                                    {/* Edit Button */}
                                    <div className="relative group">
                                      <Button
                                        icon={penIcon}
                                        backgroundColor="transparent"
                                        className="md:py-0"
                                        onClick={() => {
                                          setSelectedRoleId(role?.id);
                                          setCreateShow(true);
                                        }}
                                      />
                                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Edit Role
                                      </span>
                                    </div>

                                    {/* Delete Button */}
                                    <div className="relative group">
                                      <Button
                                        icon={deleteIcon}
                                        backgroundColor="transparent"
                                        className="md:py-0"
                                        onClick={() => {
                                          setSelectedRoleId(role?.id);
                                          setDeleteShow(true);
                                        }}
                                      />
                                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Delete
                                      </span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      {roles.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
      <AddRole
        show={createShow}
        onClose={() => {
          setCreateShow(false);
          setSelectedRoleId(null);
        }}
        onCreate={(newRoleData: { name: string }) =>
          createRoleMutation.mutate(newRoleData)
        }
        initialValue={selectedRole?.translations?.[0]?.name || ""}
        onUpdate={(updatedName: string) =>
          editRoleMutation.mutate({
            id: String(selectedRoleId)!,
            name: updatedName,
          })
        }
        isLoading={editRoleMutation.isPending || createRoleMutation.isPending}
      />
      <DeleteRoleModal
        show={deleteShow}
        onClose={() => setDeleteShow(false)}
        onDelete={() => {
          if (selectedRoleId !== undefined && selectedRoleId !== null) {
            deleteRoleMutation.mutate(String(selectedRoleId));
          }
        }}
        isLoading={deleteRoleMutation.isPending}
      />
    </>
  );
};

export default RoleManagement;
