import { useEffect, useMemo, useState } from "react";
import {
  // correctIcon,
  deleteIcon,
  // eyeOpenIcon,
  penIcon,
  plusIcon,
  // short_white,
  // sortIcon,
} from "../../icons";
import Button from "../ui/button";
import SearchInput from "../ui/searchInput";
import AddAccount from "./AddAccount";
import DeleteAccount from "./DeleteAccount";
// import EditAccount from "./EditAccount";
import api from "../../lib/api";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryFunctionContext,
} from "@tanstack/react-query";
// import ToggleSwitch from "../ui/switch/ToggleSwitch";
import { showToast } from "../../utils/toastUtils";
import Pagination from "../ui/pagination";
import { useSelector } from "react-redux";
import { selectAdministrationPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { getPermissionAdministrationFlags } from "../sidebar/menuPermissions";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import { useDebounce } from "../../hooks/useDebounce";
import ChangeStatusModal from "../articles/ChangeStatusModal";
const TableSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <tr key={i}>
          <td colSpan={8}>
            <div className="bg-white border border-primary rounded-[15px] p-3 animate-pulse">
              <div className="grid grid-cols-7 gap-4 items-center">
                {[...Array(7)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

const AccountsManagement = () => {
  const [createShow, setCreateShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  // const [editShow, setEditShow] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearch = useDebounce(searchInput, 300);
  const [allAccounts, setAllAccounts] = useState([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  // const { isScrolled } = useScroll();
  const [statusModalShow, setStatusModalShow] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<boolean | undefined>(
    false,
  );
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );

  const menuPermissions = useSelector(selectAdministrationPermissions);
  const { isUpdate, isDelete, isCreate, isChange2FAStatus } =
    getPermissionAdministrationFlags(menuPermissions.account_management);

  const getAllAccounts = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string]>) => {
    const [, currentPage, search] = queryKey; // ignore "allAccounts"

    const params: any = {
      page: currentPage,
      limit: 8,
    };
    if (search?.trim()) {
      params.search = search;
    }
    return await api.get("/admin", { params });
  };

  const { data: allUsers, isLoading } = useQuery({
    queryKey: ["allAccounts", page, debouncedSearch],
    queryFn: getAllAccounts,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return allUsers?.data?.totalPages || 1;
  }, [allUsers?.data?.totalPages]);

  const deleteAccount = async (id: string) => {
    return await api.delete(`/admin/${id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      showToast("Account Deleted", "success");
      queryClient.invalidateQueries({
        queryKey: ["allAccounts"],
        exact: false,
      });
      setDeleteShow(false);
      setSelectedUser(null);
    },
    onError: () => {
      showToast("Failed to delete account", "error");
    },
  });

  const statusChange = async (categoryId: string) => {
    const is_2FA_allowed = currentStatus ? false : true;
    return await api.patch(`/admin/${categoryId}/change2FAStatus`, {
      is_2FA_allowed: is_2FA_allowed,
    });
  };
  const statusChangeMutation = useMutation({
    mutationFn: statusChange,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allAccounts"],
        exact: false,
      });
      showToast("Status Changed", "success");
      setStatusModalShow(false);
      setSelectedAccountId(null);
    },
    onError: () => {
      showToast("Failed to change status", "error");
    },
  });

  useEffect(() => {
    if (allUsers) {
      setAllAccounts(allUsers?.data?.users);
    }
  }, [allUsers]);

  return (
    <>
      <div className="container relative">
        {/* <div
          className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
            isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
          }`}
        > */}
          <div className="lg:flex items-center justify-between ">
            <h2 className="uppercase md:text-xl/5 text-base font-bold">
              Accounts
            </h2>
            <div className="flex flex-col lg:flex-row lg:items-center items-end lg:gap-3 gap-1">
              <Button
                text="Create"
                icon={plusIcon}
                backgroundColor="transparent"
                className={`rounded-lg border border-black px-4 py-2 ${
                  !isCreate ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => setCreateShow(true)}
                disabled={!isCreate}
                textSize=" text-sm"
              />
              {/* <Button
              text="Sort By A - Z"
              icon={short_white}
              className="px-4 py-2 rounded-lg border border-black bg-black text-white"
              backgroundColor="transparent"
              textSize=" text-sm"
            /> */}
              <SearchInput
                placeholder="Local search"
                className="rounded-2xl px-4 py-2"
                value={searchInput}
                onChange={(value: string) => {
                  return setSearchInput(value);
                }}
                onClear={() => setSearchInput("")}
              />
            </div>
          </div>
        {/* </div> */}
        <div className=" overflow-x-auto">
          <table className="min-w-full leading-normal border-spacing-y-[6px]  border-separate">
            <thead>
              <tr>
                <th className="text-black opacity-40 text-base py-3  font-normal xl:min-w-[50px] w-[50px] ">
                  Id
                </th>
                <th className="text-black opacity-40 text-base py-3 text-left   font-normal xl:min-w-[190px] w-[190px] ">
                  Username
                </th>
                <th className="text-black opacity-40 text-base py-3 text-left   font-normal xl:min-w-[220px] w-[220px] ">
                  Name
                </th>
                <th className="text-black opacity-40 py-3 text-left text-base font-normal w-[230px] min-w-[230px]">
                  Email Address
                </th>
                <th className="text-black opacity-40 py-3 text-left text-base font-normal w-[150px] min-w-[150px]">
                  Contact No
                </th>
                {/* <th className="text-black opacity-40 py-3 text-left text-base font-normal w-[120px] min-w-[120px]">
                  Role
                </th> */}
                <th className="text-black opacity-40 py-3 text-center text-base font-normal w-[120px] min-w-[120px]">
                  Allow 2FA
                </th>
                {/* <th className="text-black opacity-40 py-3 text-center text-base font-normal w-[120px] min-w-[120px]">
                  Status
                </th> */}
                <th className="text-black opacity-40 md:pe-5 py-3 text-base font-normal w-[168px] min-w-[168px] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <TableSkeleton />
              ) : !allAccounts || allAccounts.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <p className="border border-primary bg-white rounded-xl text-center py-4 text-gray-500  text-base">
                      No data available
                    </p>
                  </td>
                </tr>
              ) : (
                allAccounts.map((user: any, id: any) => {
                  const fullName = `${user.first_name || ""} ${
                    user.last_name || ""
                  }`.trim();
                  return (
                    <tr key={id}>
                      <td colSpan={8}>
                        <div className=" hover:bg-gray-100 transition bg-white border border-primary rounded-[15px] p-3">
                          <table className="w-full">
                            <thead>
                              <tr>
                                <th className="min-w-[50px] w-[50px]"></th>
                                <th className="min-w-[190px] w-[190px]"></th>
                                <th className="min-w-[220px] w-[220px]"></th>
                                <th className="w-[230px] min-w-[230px]"></th>
                                <th className="w-[150px] min-w-[150px]"></th>
                                {/* <th className="w-[120px] min-w-[120px]"></th> */}
                                <th className="w-[120px] min-w-[120px]"></th>

                                {/* <th className="w-[120px] min-w-[120px] "></th> */}
                                <th className="w-[168px] min-w-[168px] text-center"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="text-left ps-2">{id + 1}</td>
                                <td className=" text-left">
                                  <p className="font-semibold">
                                    {user.username || "N/A"}
                                  </p>
                                </td>
                                <td className=" text-left">
                                  <p className="font-semibold">
                                    {fullName || "N/A"}
                                  </p>
                                </td>
                                <td className="text-left">
                                  {user.email
                                    ? user.email.length > 25
                                      ? `${user.email.slice(0, 25)}...`
                                      : user.email
                                    : "N/A"}
                                </td>

                                {/* Organization */}
                                <td className="text-left">
                                  {user.phone_number || "--"}
                                </td>

                                {/* Role */}
                                {/* <td className="text-left">
                                  {user.role?.code || "N/A"}
                                </td> */}
                                <td className="text-left">
                                  <ToggleSwitch
                                    checked={user?.is_2FA_allowed}
                                    disabled={!isChange2FAStatus}
                                    onClick={() => {
                                      if (!isChange2FAStatus) return;

                                      setCurrentStatus(user?.is_2FA_allowed);
                                      setSelectedAccountId(String(user?.id));
                                      setStatusModalShow(true); // ✅ open confirmation modal
                                    }}
                                  />
                                </td>

                                {/* Status */}
                                {/* <td className="text-left">
                                  <ToggleSwitch checked={user.is_active} />
                                </td> */}

                                {/* Last Edited */}
                                {/* <td className="text-left">23/05/2023</td> */}
                                <td className="">
                                  <div className="flex gap-2 items-left justify-center">
                                    {/* <Button
                                      icon={eyeOpenIcon}
                                      backgroundColor="transparent"
                                      className="md:py-0"
                                    /> */}
                                    <Button
                                      icon={penIcon}
                                      backgroundColor="transparent"
                                      onClick={() => {
                                        setCreateShow(true);
                                        setSelectedUser(user);
                                      }}
                                      // disabled={!isUpdate}
                                      className={`md:py-0 ${
                                        !isUpdate
                                          ? "opacity-50 cursor-not-allowed"
                                          : ""
                                      }`}
                                    />
                                    <Button
                                      icon={deleteIcon}
                                      backgroundColor="transparent"
                                      onClick={() => {
                                        setDeleteShow(true);
                                        setSelectedUser(user);
                                      }}
                                      disabled={!isDelete}
                                      className={`md:py-0 ${
                                        !isDelete
                                          ? "opacity-50 cursor-not-allowed"
                                          : ""
                                      }`}
                                    />
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

      <AddAccount
        show={createShow}
        onClose={() => {
          setCreateShow(false);
          setSelectedUser(null);
        }}
        initialData={selectedUser}
      />
      <DeleteAccount
        show={deleteShow}
        onClose={() => setDeleteShow(false)}
        onDelete={() => {
          if (selectedUser) {
            deleteMutation.mutate(String(selectedUser.id));
          }
        }}
        isLoading={deleteMutation.isPending}
      />
      {statusModalShow && (
        <ChangeStatusModal
          show={statusModalShow}
          onClose={() => setStatusModalShow(false)}
          onSave={() => {
            if (selectedAccountId) {
              statusChangeMutation.mutate(selectedAccountId);
            }
          }}
          isLoading={statusChangeMutation.isPending}
        />
      )}

      {allAccounts.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </>
  );
};

export default AccountsManagement;
