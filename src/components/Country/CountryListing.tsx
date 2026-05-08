import { useDispatch, useSelector } from "react-redux";
import { capitalize, formatDate } from "../../config/function";
import ContentHeader from "../Subnavbar";
import { useNavigate } from "react-router-dom";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import { useScroll } from "../../hooks/ScrollContext";
import { useEffect, useMemo, useState } from "react";
import { selectListingState, setListingState } from "../../redux-toolkit/moduleListingSearchSlice";
import { deleteIcon, penIcon, spanishFlag, usaFlag } from "../../icons";
import Button from "../ui/button";
import { useCountrylist } from "../../hooks/useCountry";
import Pagination from "../ui/pagination";
import { useDebounce } from "../../hooks/useDebounce";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import api from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../utils/toastUtils";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import { resetCountry } from "../../redux-toolkit/countrySlice";
import { setLastActiveSubTab } from "../../redux-toolkit/tabSlice";
import { paths } from "../../config/paths";
import { getPermissionFlags } from "../sidebar/menuPermissions";
import { selectMenuPermissions } from "../../redux-toolkit/menuPermissionsSlice";
const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Name", minWidth: "min-w-60 w-60" },
  { title: "ISO2", minWidth: "min-w-28 w-28" },
  { title: "ISO3", minWidth: "min-w-28 w-28" },
  { title: "Phonecode", minWidth: "min-w-28 w-28" },
  { title: "Status", minWidth: "min-w-28 w-28" },
  { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];
export default function CountryListing() {
  const module = "country";
  const { isScrolled } = useScroll();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const listingState = useSelector(selectListingState(module));
  const [allCountry, setAllCountry] = useState([]);
  const [deleteShow, setDeleteShow] = useState(false);
  const menuPermissions = useSelector(selectMenuPermissions);
  const { isCreate, isDelete, isUpdate, isChangeStatus } = getPermissionFlags(
    menuPermissions.country,
  );
  const [shopTypeId, setShopTypeId] = useState<string | null>(null);
  const [page, setPage] = useState(listingState.page || 1);
  const [searchInput, setSearchInput] = useState<string>(
    listingState.search || "",
  );
  const [statusModalShow, setStatusModalShow] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<number | null>(null);
  const [selectedTournamentId, setSelectedTournamentId] = useState<
    string | null
  >(null);
  const debouncedSearch = useDebounce(searchInput, 300);
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
  const { data: allCountryData, isFetching } = useCountrylist(
    page,
    debouncedSearch,
    false,
  );
  const totalPages = useMemo(() => {
    return allCountryData?.totalPages || 1;
  }, [allCountryData?.totalPages]);

  const statusChange = async (tournamentId: string) => {
    const isActive = currentStatus == 0 ? 1 : 0;
    return await api.patch(`countries/${tournamentId}`, {
      flag: isActive,
    });
  };

  const statusChangeMutation = useMutation({
    mutationFn: statusChange,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["country"],
        exact: false,
      });
      showToast("Status Changed", "success");
      setStatusModalShow(false);
      setSelectedTournamentId(null);
    },
    onError: () => {
      showToast("Failed to change status", "error");
    },
  });
  const deleteEventMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/countries/${id}`),
    onSuccess: () => {
      showToast("Country deleted successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["country"],
        exact: false,
      });
      setDeleteShow(false);
      if (allCountryData?.data.length == 1 && page > 1) {
        setPage((prev: any) => prev - 1);
      }
    },
  });
  const handleEditCountry = (id: number) => {
    if (!id) return;
    dispatch(setLastActiveSubTab(paths.country.path));
    navigate(`/country/edit/${id}`);
  };
  const handleCreate = () => {
    dispatch(resetCountry());
    dispatch(setLastActiveSubTab(paths.country.path));
    navigate(paths.country.create.path);
  };
  useEffect(() => {
    if (allCountryData?.data) {
      setAllCountry(allCountryData?.data || []);
    }
  }, [allCountryData]);
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
          title="Country"
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
            ) : allCountry.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No county data available.
                  </div>
                </td>
              </tr>
            ) : (
              (allCountry as any[])?.map((county, index) => {
                return (
                  <tr key={county?.id} className="">
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
                                <p className=" line-clamp-2">
                                  {county.name ? county.name : "-"}
                                </p>
                              </td>{" "}
                              <td className="text-base text-left">
                                <p className=" line-clamp-1">
                                  {county.iso2 ? county.iso2 : "-"}
                                </p>
                              </td>
                              <td className="text-base text-left">
                                <p className=" line-clamp-1">
                                  {county.iso3 ? county.iso3 : "-"}
                                </p>
                              </td>{" "}
                              <td className="text-base text-left">
                                <p className=" line-clamp-1">
                                  {county.phonecode ? county.phonecode : "-"}
                                </p>
                              </td>
                              <td className="text-base relative  text-left cursor-pointer">
                                <ToggleSwitch
                                  disabled={!isChangeStatus}
                                  checked={county.flag}
                                  onClick={() => {
                                    if (!isChangeStatus) return;
                                    setStatusModalShow(true);
                                    setCurrentStatus(county?.flag);
                                    setSelectedTournamentId(String(county?.id));
                                  }}
                                />
                              </td>
                              <td className="text-base text-left">
                                {formatDate(county.created_at)}
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
                                      handleEditCountry(county?.id)
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
                                      setShopTypeId(String(county?.id));
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
          onConfirm={() => {
            if (shopTypeId) {
              deleteEventMutation.mutate(shopTypeId);
            }
          }}
          isLoading={deleteEventMutation.isPending}
        />
      )}
      {statusModalShow && (
        <ChangeStatusModal
          show={statusModalShow}
          onClose={() => setStatusModalShow(false)}
          onSave={() => {
            if (selectedTournamentId) {
              statusChangeMutation.mutate(selectedTournamentId);
            }
          }}
          isLoading={statusChangeMutation.isPending}
        />
      )}
      {allCountry.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
