import { useDispatch, useSelector } from "react-redux";
import { capitalize } from "../../config/function";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import ContentHeader from "../Subnavbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { paths } from "../../config/paths";
import { useDebounce } from "../../hooks/useDebounce";
import Pagination from "../ui/pagination";
import Button from "../ui/button";
import { deleteIcon, penIcon, spanishFlag, usaFlag } from "../../icons";
import { useAirportList } from "../../hooks/useAirport";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import { showToast } from "../../utils/toastUtils";
import { resetAirport } from "../../redux-toolkit/airportSlice";
import { setLastActiveSubTab } from "../../redux-toolkit/tabSlice";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import { selectMenuPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { getPermissionFlags } from "../sidebar/menuPermissions";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import {
  selectListingState,
  setListingState,
} from "../../redux-toolkit/moduleListingSearchSlice";
import { useScroll } from "../../hooks/ScrollContext";

const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Airport Name", minWidth: "min-w-96 w-96" },
  // { title: "Short Code", minWidth: "min-w-32 w-32" },
  { title: "City", minWidth: "min-w-32 w-32" },
  { title: "Country", minWidth: "min-w-32 w-32" },
  // { title: "Latitude", minWidth: "min-w-24 w-24" },
  // { title: "Longitude", minWidth: "min-w-24 w-24" },
  // { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Status", minWidth: "min-w-28 w-28" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];

export default function AirportListing() {
  const { isScrolled } = useScroll();
  const [airports, setAirports] = useState<any[]>([]);
  const module = "airports";
  const listingState = useSelector(selectListingState(module));
  const [page, setPage] = useState(listingState.page || 1);
  const [searchInput, setSearchInput] = useState(listingState.search || "");
  const [selectedPage, setSelectedPage] = useState<null | {
    id: number;
    title: string;
  }>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [statusModalShow, setStatusModalShow] = useState(false);
  const debouncedSearch = useDebounce(searchInput, 300);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentStatus, setCurrentStatus] = useState<number | null>(null);
  const menuPermissions = useSelector(selectMenuPermissions);
  const { isUpdate, isDelete, isCreate, isChangeStatus } = getPermissionFlags(
    menuPermissions.airport,
  );
  const { data, isFetching } = useAirportList(page, debouncedSearch, false);
  const totalPages = useMemo(() => data?.totalPages || 1, [data]);

  const handleEdit = (id: number) => {
    dispatch(setLastActiveSubTab(paths.airport.path));
    navigate(`/airport/edit/${id}`);
  };

  const handleCreate = () => {
    dispatch(resetAirport());
    dispatch(setLastActiveSubTab(paths.airport.path));
    navigate(paths.airport.create.path);
  };

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/airport/${id}`),
    onSuccess: () => {
      showToast("Airport deleted successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["airport"], exact: false });
      setShowDeleteModal(false);
      if (data?.airports == 1 && page > 1) {
        setPage((prev: any) => prev - 1);
      }
    },
  });
  const statusChange = async (tournamentId: string) => {
    const isActive = currentStatus == 0 ? 1 : 0;
    return await api.patch(`airport/${tournamentId}/status`, {
      is_active: isActive,
    });
  };

  const statusChangeMutation = useMutation({
    mutationFn: statusChange,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["airport"],
        exact: false,
      });
      showToast("Status Changed", "success");
      setStatusModalShow(false);
      setSelectedPage({
        id: 0,
        title: "",
      });
    },
    onError: () => {
      showToast("Failed to change status", "error");
    },
  });

  const handleConfirmDelete = () => {
    if (selectedPage?.id) {
      deleteMutation.mutate(String(selectedPage.id));
    }
  };

  useEffect(() => {
    if (data?.airports) {
      setAirports(data?.airports);
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts.map((part, index) => ({
      id: "/" + pathParts.slice(0, index + 1).join("/"),
      name: capitalize(part),
    })),
  ];
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
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <ContentHeader
          title="Airport"
          breadCrumbsItem={breadCrumbsItem}
          onBreadCrumbClick={(id, index) => {
            dispatch(popToIndex(index));
            navigate(id ? "" : "/dashboard");
          }}
          onCreate={handleCreate}
          disableCreate={!isCreate}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </div>
      <div className="container overflow-x-auto my-3">
        <table className="min-w-full table-fixed border-separate border-spacing-y-2 ">
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
            ) : airports.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No Airport data available.
                  </div>
                </td>
              </tr>
            ) : (
              (airports as any[])?.map((item, index) => {
                //   const isActive = item?.status == "published";
                return (
                  <tr key={item?.airport_id}>
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
                                <p className="w-80 line-clamp-2">
                                  {item.airport_name?.length > 80
                                    ? `${item.airport_name?.slice(0, 80)}...`
                                    : item.airport_name}
                                </p>
                              </td>
                              <td className="text-base text-left">
                                <p className="w-28 line-clamp-2">
                                  {item.city_name?.length > 80
                                    ? `${item.city_name?.slice(0, 80)}...`
                                    : item.city_name}
                                </p>
                              </td>
                              <td className="text-base text-left">
                                <p className="w-28 line-clamp-2">
                                  {item.country_name?.length > 80
                                    ? `${item.country_name?.slice(0, 80)}...`
                                    : item.country_name}
                                </p>
                              </td>
                              <td className="text-base relative  text-left cursor-pointer">
                                <ToggleSwitch
                                  disabled={!isChangeStatus}
                                  checked={item?.status === "Active"}
                                  onClick={() => {
                                    if (!isChangeStatus) return;
                                    setStatusModalShow(true);
                                    setCurrentStatus(
                                      item?.status === "Active" ? 0 : 1,
                                    );
                                    setSelectedPage({
                                      id: item?.airport_id,
                                      title: item?.airport_name,
                                    });
                                  }}
                                />
                              </td>
                              <td>
                                <div className="flex items-center justify-center gap-3">
                                  <Button
                                    icon={penIcon}
                                    backgroundColor="transparent"
                                    className={`p-0 ${
                                      !isUpdate &&
                                      "opacity-50 cursor-not-allowed"
                                    }`}
                                    onClick={() => handleEdit(item?.airport_id)}
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
                                      setSelectedPage({
                                        id: item?.airport_id,
                                        title: item?.airport_name,
                                      });
                                      setShowDeleteModal(true);
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

      {showDeleteModal && (
        <DeleteConfirmModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          itemName={selectedPage?.title}
          isLoading={deleteMutation.isPending}
        />
      )}

      {statusModalShow && (
        <ChangeStatusModal
          show={statusModalShow}
          onClose={() => setStatusModalShow(false)}
          onSave={() => {
            if (selectedPage?.id) {
              const id = (selectedPage?.id).toString();
              statusChangeMutation.mutate(id);
            }
          }}
          isLoading={statusChangeMutation.isPending}
        />
      )}

      {airports.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
