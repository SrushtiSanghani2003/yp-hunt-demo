import { useNavigate } from "react-router-dom";
import { capitalize } from "../../config/function";
import ContentHeader from "../Subnavbar";
import { useDispatch, useSelector } from "react-redux";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import Button from "../ui/button";
import { deleteIcon, penIcon, spanishFlag, usaFlag } from "../../icons";
import { useAnnouncementslist } from "../../hooks/useAnnouncement";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import { showToast } from "../../utils/toastUtils";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import Pagination from "../ui/pagination";
import { paths } from "../../config/paths";
import { resetAnnouncements } from "../../redux-toolkit/announcementsSlice";
import { selectMenuPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { getPermissionFlags } from "../sidebar/menuPermissions";
import {
  selectListingState,
  setListingState,
} from "../../redux-toolkit/moduleListingSearchSlice";
import { useScroll } from "../../hooks/ScrollContext";
const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Tournament Name", minWidth: "min-w-72 w-72" },
  //   { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Status", minWidth: "min-w-28 w-28" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];
const STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
} as const;
export default function AnnouncementListing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const queryClient = useQueryClient();
  const module = "announcement";
  const listingState = useSelector(selectListingState(module));
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [deleteShow, setDeleteShow] = useState(false);
  const [searchInput, setSearchInput] = useState<string>(
    listingState.search || "",
  );
  const [page, setPage] = useState(listingState.page || 1);
  const debouncedSearch = useDebounce(searchInput, 300);
  const [statusModalShow, setStatusModalShow] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<number | string | null>(
    null,
  );
  const [selectedAnnouncementsId, setSelectedAnnouncementsId] = useState<
    string | null
  >(null);

  const menuPermissions = useSelector(selectMenuPermissions);
  const { isUpdate, isDelete, isChangeStatus, isCreate } = getPermissionFlags(
    menuPermissions.announcements,
  );
  const handleEditAnnouncements = (id: number) => {
    if (!id) return;
    navigate(`/announcements/edit/${id}`);
  };

  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts.map((part, index) => ({
      id: "/" + pathParts?.slice(0, index + 1).join("/"),
      name: capitalize(part),
    })),
  ];
  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    navigate(id ? `` : `/dashboard`);
  };
  const { data: allAnnouncementData, isFetching } = useAnnouncementslist(
    page,
    debouncedSearch,
    false,
  );

  const statusChange = async (AnnouncementsId: string) => {
    const updatedStatus =
      currentStatus === STATUS.ACTIVE ? STATUS.INACTIVE : STATUS.ACTIVE;

    return api.patch(`announcements/${AnnouncementsId}/status`, {
      status: updatedStatus,
    });
  };

  const statusChangeMutation = useMutation({
    mutationFn: statusChange,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcements"],
        exact: false,
      });
      showToast("Status Changed", "success");
      setStatusModalShow(false);
      setSelectedAnnouncementsId(null);
    },
    onError: () => {
      showToast("Failed to change status", "error");
    },
  });
  const deleteAnnouncements = async (id: string) => {
    return await api.delete(`announcements/${id}`);
  };
  const deleteAnnouncementsMutation = useMutation({
    mutationFn: deleteAnnouncements,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcements"],
        exact: false,
      });
      showToast("Announcements Deleted Successfully", "success");
      setDeleteShow(false);
      if (allAnnouncementData?.announcements == 1 && page > 1) {
        setPage((prev: any) => prev - 1);
      }
      setSelectedAnnouncementsId(null);
    },
    onError: () => {
      showToast("Failed to delete Announcements", "error");
    },
  });
  const handleConfirmDelete = () => {
    if (selectedAnnouncementsId) {
      deleteAnnouncementsMutation.mutate(String(selectedAnnouncementsId));
    }
  };
  const totalPages = useMemo(() => {
    return allAnnouncementData?.totalPages;
  }, [allAnnouncementData?.totalPages]);
  const handleCreate = () => {
    dispatch(resetAnnouncements());
    navigate(paths.announcements.create.path);
  };
  useEffect(() => {
    if (allAnnouncementData?.announcements) {
      setAllAnnouncements(allAnnouncementData.announcements || []);
    }
  }, [allAnnouncementData]);
  useEffect(() => {
    if (debouncedSearch) {
      setPage(1);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    dispatch(
      setListingState({
        module,
        page,
        search: searchInput,
      }),
    );
  }, [page, searchInput]);
  return (
    <div>
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <ContentHeader
          title="Announcement"
          breadCrumbsItem={breadCrumbsItem}
          onBreadCrumbClick={handleBreadcrumbClick}
          onCreate={handleCreate}
          disableCreate={!isCreate}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </div>
      <div className="container overflow-x-auto my-3">
        <table className="min-w-full table-fixed border-separate border-spacing-y-2">
          <thead className="text-left">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.title}
                  className={`p-2 ps-0 text-black font-normal ${col.minWidth}`}
                >
                  {col.title === "Languages" ? (
                    <div className="flex items-center justify-center gap-2">
                      <img src={usaFlag} alt="flags" className="w-6 h-5" />
                      <img src={spanishFlag} alt="flags" className="w-5 h-4" />
                    </div>
                  ) : (
                    <span
                      className={`${
                        col.title === "Action" || col.title === "Status"
                          ? "flex items-center justify-center gap-1"
                          : ""
                      } opacity-40 break-words whitespace-normal block text-left  ${
                        col.title === "ID" ? "ps-2" : ""
                      }`}
                    >
                      {col.title}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isFetching ? (
              <>
                {[...Array(8)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={columns.length}>
                      <div className="animate-pulse bg-white border  border-primary rounded-2xl p-4">
                        <div className="flex w-full gap-4">
                          {columns.map((col, j) => (
                            <div
                              key={j}
                              className={`${col.minWidth} h-5 bg-gray-200 rounded`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ) : allAnnouncements.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No announcements data available.
                  </div>
                </td>
              </tr>
            ) : (
              (allAnnouncements as any[])?.map((announcements, index) => {
                return (
                  <tr key={announcements?.id} className="">
                    <td colSpan={columns.length}>
                      <div className="hover:bg-gray-100 transition bg-white border border-primary rounded-xl py-2 max-h-fit  h-24">
                        <table className="w-full">
                          <thead>
                            <tr>
                              {columns.map((col) => (
                                <th
                                  key={col.title}
                                  className={`${col.minWidth}`}
                                ></th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-base text-left ps-3">
                                {index + 1}
                              </td>
                              <td className="text-base text-left">
                                <p className="w-72 line-clamp-1">
                                  {announcements.tournament_name}
                                </p>
                              </td>
                              <td className="text-base relative  text-left cursor-pointer">
                                <ToggleSwitch
                                  disabled={!isChangeStatus}
                                  checked={
                                    announcements.status === STATUS.ACTIVE
                                  }
                                  onClick={() => {
                                    if (!isChangeStatus) return;
                                    setStatusModalShow(true);
                                    setCurrentStatus(announcements?.status);
                                    setSelectedAnnouncementsId(
                                      String(announcements?.id),
                                    );
                                  }}
                                />
                              </td>
                              <td className="">
                                <div className="flex items-center justify-center gap-3">
                                  {/* <Button
                                      icon={eyeOpenIcon}
                                      backgroundColor="transparent"
                                      className="p-0"
                                    /> */}
                                  <Button
                                    icon={penIcon}
                                    backgroundColor="transparent"
                                    className={`p-0 ${
                                      !isUpdate &&
                                      "opacity-50 cursor-not-allowed"
                                    }`}
                                    onClick={() =>
                                      handleEditAnnouncements(announcements?.id)
                                    }
                                    disabled={!isUpdate}
                                  />
                                  <Button
                                    icon={deleteIcon}
                                    backgroundColor="transparent"
                                    className={`p-0 ${
                                      !isDelete &&
                                      "opacity-50 cursor-not-allowed"
                                    }`}
                                    onClick={() => {
                                      setSelectedAnnouncementsId(
                                        String(announcements?.id),
                                      );
                                      setDeleteShow(true);
                                    }}
                                    disabled={!isDelete}
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
      {deleteShow && (
        <DeleteConfirmModal
          show={deleteShow}
          onClose={() => setDeleteShow(false)}
          onConfirm={handleConfirmDelete}
          isLoading={deleteAnnouncementsMutation.isPending}
        />
      )}
      {statusModalShow && (
        <ChangeStatusModal
          show={statusModalShow}
          onClose={() => setStatusModalShow(false)}
          onSave={() => {
            if (selectedAnnouncementsId) {
              statusChangeMutation.mutate(selectedAnnouncementsId);
            }
          }}
          isLoading={statusChangeMutation.isPending}
        />
      )}
      {allAnnouncements.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
