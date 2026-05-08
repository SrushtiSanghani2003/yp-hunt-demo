"use client";
import { useEffect, useMemo, useState } from "react";
import ContentHeader from "../Subnavbar";
import { capitalize, concatImgURL, formatDate } from "../../config/function";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteIcon,
  mediaIcon,
  penIcon,
  spanishFlag,
  usaFlag,
} from "../../icons";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Button from "../ui/button";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import { useBroadcastlist } from "../../hooks/useWhereToWatch";
import { useDebounce } from "../../hooks/useDebounce";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import { showToast } from "../../utils/toastUtils";
import Pagination from "../ui/pagination";
import { resetBroadcast } from "../../redux-toolkit/whereToWatchSlice";
import { paths } from "../../config/paths";
import { setLastActiveSubTab } from "../../redux-toolkit/tabSlice";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import { selectMenuPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { getPermissionFlags } from "../sidebar/menuPermissions";
import {
  selectListingState,
  setListingState,
} from "../../redux-toolkit/moduleListingSearchSlice";
import { useScroll } from "../../hooks/ScrollContext";
const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Image", minWidth: "min-w-28 w-28" },
  { title: "Broadcast Url", minWidth: "min-w-64 w-64" },
  { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Status", minWidth: "min-w-28 w-28" },
  // { title: "Languages", minWidth: "min-w-20 w-20" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];
export default function WhereToWatchListing() {
  const module = "wheretowatch";
  const listingState = useSelector(selectListingState(module));
  const [deleteShow, setDeleteShow] = useState(false);
  const [broadcastTypeId, setBroadcastTypeId] = useState<string | null>(null);
  const [page, setPage] = useState(listingState.page || 1);
  const [searchInput, setSearchInput] = useState<string>(
    listingState.search || "",
  );
  const debouncedSearch = useDebounce(searchInput, 300);
  const [allWhereToWatch, setAllWhereToWatch] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const pathParts = location.pathname.split("/").filter(Boolean);
  const queryClient = useQueryClient();
  const [statusModalShow, setStatusModalShow] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const menuPermissions = useSelector(selectMenuPermissions);
  const { isCreate, isDelete, isUpdate, isChangeStatus } = getPermissionFlags(
    menuPermissions.where_to_watch,
  );

  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts.map((part, index) => ({
      id: "/" + pathParts?.slice(0, index + 1).join("/"),
      name: capitalize(part),
    })),
  ];
  const { data: allBroadcastData, isFetching } = useBroadcastlist(
    page,
    debouncedSearch,
    false,
  );
  const statusChange = async (categoryId: string) => {
    const isActive = currentStatus == "draft" ? "published" : "draft";
    return await api.patch(`/broadcast/${categoryId}/change-status`, {
      status: isActive,
    });
  };
  const statusChangeMutation = useMutation({
    mutationFn: statusChange,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["broadcast"],
        exact: false,
      });
      showToast("Status Changed", "success");
      setStatusModalShow(false);
      setSelectedCategoryId(null);
    },
    onError: () => {
      showToast("Failed to change status", "error");
    },
  });

  const totalPages = useMemo(() => {
    return allBroadcastData?.totalPages || 1;
  }, [allBroadcastData?.totalPages]);
  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    navigate(id ? `` : `/dashboard`);
  };
  const deleteEventMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/broadcast/${id}`),
    onSuccess: () => {
      showToast("Broadcast deleted successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["broadcast"],
        exact: false,
      });
      setDeleteShow(false);
      if (allBroadcastData?.data.broadcast.length == 1 && page > 1) {
        setPage((prev: any) => prev - 1);
      }
    },
  });

  const handleEditBroadcast = (id: number) => {
    if (!id) return;
    dispatch(setLastActiveSubTab(paths.wheretowatch.path));
    navigate(`/wheretowatch/edit/${id}`);
  };
  const handleCreate = () => {
    dispatch(resetBroadcast());
    dispatch(setLastActiveSubTab(paths.wheretowatch.path));
    navigate(paths.wheretowatch.create.path);
  };

  useEffect(() => {
    if (allBroadcastData?.broadcast) {
      setAllWhereToWatch(allBroadcastData?.broadcast || []);
    }
  }, [allBroadcastData]);
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
          title="Where To Watch"
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
            ) : allWhereToWatch.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No where to watch data available.
                  </div>
                </td>
              </tr>
            ) : (
              (allWhereToWatch as any[])?.map((broadcast, index) => {
                const isActive = broadcast?.status == "published";
                return (
                  <tr key={broadcast?.id} className="">
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
                              <PhotoProvider maskOpacity={0.6}>
                                <td className="text-base cursor-pointer">
                                  <PhotoView
                                    src={concatImgURL(broadcast.image)}
                                  >
                                    {broadcast.image ? (
                                      <img
                                        src={concatImgURL(broadcast.image)}
                                        className="w-20 h-14 object-contain rounded-xl"
                                        alt="Hero Image"
                                      />
                                    ) : (
                                      <div className="w-20 h-14 bg-f6f6f6 border-0.5 border-primary rounded-xl flex justify-center items-center">
                                        <img
                                          src={mediaIcon}
                                          alt="Placeholder"
                                        />
                                      </div>
                                    )}
                                  </PhotoView>
                                </td>
                              </PhotoProvider>
                              <td className="text-base text-left">
                                <p className="w-64 line-clamp-2 break-words">
                                  {broadcast.broadcast_url
                                    ? broadcast.broadcast_url
                                    : "-"}
                                </p>
                              </td>
                              <td className="text-base text-left">
                                {formatDate(broadcast.created_at)}
                              </td>
                              <td className="text-base text-left">
                                <ToggleSwitch
                                  disabled={!isChangeStatus}
                                  checked={isActive}
                                  onClick={() => {
                                    if (!isChangeStatus) return;
                                    setStatusModalShow(true);
                                    setCurrentStatus(broadcast?.status);
                                    setSelectedCategoryId(
                                      String(broadcast?.id),
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
                                      handleEditBroadcast(broadcast?.id)
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
                                      setDeleteShow(true);
                                      setBroadcastTypeId(String(broadcast?.id));
                                    }}
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
      {statusModalShow && (
        <ChangeStatusModal
          show={statusModalShow}
          onClose={() => setStatusModalShow(false)}
          onSave={() => {
            if (selectedCategoryId) {
              statusChangeMutation.mutate(selectedCategoryId);
            }
          }}
          isLoading={statusChangeMutation.isPending}
        />
      )}
      {deleteShow && (
        <DeleteConfirmModal
          show={deleteShow}
          onClose={() => setDeleteShow(false)}
          onConfirm={() => {
            if (broadcastTypeId) {
              deleteEventMutation.mutate(broadcastTypeId);
            }
          }}
          isLoading={deleteEventMutation.isPending}
        />
      )}
      {allWhereToWatch.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
