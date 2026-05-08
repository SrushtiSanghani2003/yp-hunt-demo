import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalize, formatDate } from "../../config/function";
import api from "../../lib/api";
import { useDebounce } from "../../hooks/useDebounce";
import Pagination from "../ui/pagination";
import ContentHeader from "../Subnavbar";
import Button from "../ui/button";
import {
  chevronDown,
  correctIconGreen,
  deleteIcon,
  penIcon,
  spanishFlag,
  usaFlag,
} from "../../icons";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import { showToast } from "../../utils/toastUtils";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { selectMenuPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { getPermissionFlags } from "../sidebar/menuPermissions";
import {
  selectListingState,
  setListingState,
} from "../../redux-toolkit/moduleListingSearchSlice";
import { useScroll } from "../../hooks/ScrollContext";
import { selectLanguage } from "../../redux-toolkit/languageSlice";

const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Event Code", minWidth: "min-w-24 w-24" },
  { title: "Name", minWidth: "min-w-60 w-60" },
  { title: "Start Date", minWidth: "min-w-44 w-44" },
  { title: "End Date", minWidth: "min-w-44 w-44" },
  { title: "Languages", minWidth: "min-w-20 w-20" },
  { title: "Status", minWidth: "min-w-28 w-28" },
  //   { title: "Completed", minWidth: "min-w-28 w-28" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];

const TournamentsList = () => {
  const location = useLocation();
  const { isScrolled } = useScroll();
  const language = useSelector(selectLanguage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const module = "tournament";
  const listingState = useSelector(selectListingState(module));
  const queryClient = useQueryClient();
  const [page, setPage] = useState(listingState.page || 1);
  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts.map((part, index) => ({
      id: "/" + pathParts.slice(0, index + 1).join("/"),
      name: capitalize(part),
    })),
  ];
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i,
  );

  const [year, setYear] = useState<any>(
    listingState.filters.year ?? currentYear,
  );
  const [searchInput, setSearchInput] = useState(listingState.search || "");
  const [allTournaments, setAllTournaments] = useState([]);
  const debouncedSearch = useDebounce(searchInput, 300);
  const [statusModalShow, setStatusModalShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<number | null>(null);
  const [selectedTournamentId, setSelectedTournamentId] = useState<
    string | null
  >(null);
  const menuPermissions = useSelector(selectMenuPermissions);
  const {
    isDelete,
    isUpdate,
    isChangeStatus,
    isTransportDetails,
    isTournamentInfo,
  } = getPermissionFlags(menuPermissions.tournaments);

  const getAllTournaments = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string, string, string?]>) => {
    const [, currentPage, debouncedSearch, language, year] = queryKey;
    const params: Record<string, any> = {
      page: currentPage,
      limit: 8,
      language_code: language,
    };

    if (year != "") {
      params.year = Number(year);
    }

    if (debouncedSearch?.trim()) {
      params.search = debouncedSearch;
    }
    return api.get("/tournament", { params });
  };

  const { data: allTournamentsData, isFetching } = useQuery({
    queryKey: ["allTournaments", page, debouncedSearch, language, year],
    queryFn: getAllTournaments,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return allTournamentsData?.data?.totalPages;
  }, [allTournamentsData?.data?.totalPages]);

  const statusChange = async (tournamentId: string) => {
    const isActive = currentStatus == 0 ? 1 : 0;
    return await api.patch(`tournament/${tournamentId}/change-status`, {
      is_active: isActive,
    });
  };

  const statusChangeMutation = useMutation({
    mutationFn: statusChange,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allTournaments"],
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

  const deleteTournament = async (id: string) => {
    return await api.delete(`tournament/${id}`);
  };

  const deleteTournamentMutation = useMutation({
    mutationFn: deleteTournament,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allTournaments"],
        exact: false,
      });
      showToast("Tournament Deleted Successfully", "success");
      setDeleteShow(false);
      if (allTournamentsData?.data?.tournamentslength == 1 && page > 1) {
        setPage((prev: any) => prev - 1);
      }
      setSelectedTournamentId(null);
    },
    onError: () => {
      showToast("Failed to delete tournament", "error");
    },
  });

  const handleConfirmDelete = () => {
    if (selectedTournamentId) {
      deleteTournamentMutation.mutate(String(selectedTournamentId));
    }
  };

  const handleEditTournament = (id: string) => {
    navigate(`/tournaments/edit/${id}`);
  };
  const handleEditTournamentInfo = (id: string) => {
    navigate(`/tournaments/info/edit/${id}`);
  };
  const handleTournamentTransport = (id: string) => {
    navigate(`/tournaments/transport/${id}`);
  };

  const handleTranslationClick = async (
    tournamentId: string,
    lang: "en" | "es",
  ) => {
    navigate(`/tournaments/edit/${tournamentId}?lang=${lang}`);
  };

  useEffect(() => {
    if (allTournamentsData) {
      setAllTournaments(allTournamentsData?.data?.tournaments);
    }
  }, [allTournamentsData]);
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
        filters: { year },
      }),
    );
  }, [page, searchInput, year]);
  return (
    <>
      <div>
        <div
          className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
            isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
          }`}
        >
          <ContentHeader
            title="All Tournaments"
            breadCrumbsItem={breadCrumbsItem}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </div>
        <div className="container flex justify-end items-center">
          <div className="relative w-32">
            <select
              id="language"
              value={year ?? ""}
              onChange={(e) => {
                setYear(e.target.value);
                setPage(1);
              }}
              className="appearance-none w-full md:p-[7px] p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
              <option value="">All</option>
            </select>

            <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
              <img src={chevronDown} />
            </div>
          </div>
        </div>

        <div className="container overflow-x-auto my-3 grid grid-cols-1">
          <table className="min-w-full table-fixed border-separate border-spacing-y-2">
            <thead className="text-left">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.title}
                    className={`py-2 text-black font-normal   ${col.minWidth}`}
                  >
                    {col.title === "Languages" ? (
                      <div className="flex items-center justify-center gap-2">
                        <img
                          src={usaFlag}
                          alt="flags"
                          className="w-6 h-4 object-cover"
                        />
                        <img
                          src={spanishFlag}
                          alt="flags"
                          className="w-6 h-4 object-cover"
                        />
                      </div>
                    ) : (
                      <span
                        className={`${
                          col.title === "Action" || col.title === "Status"
                            ? "flex items-center justify-center gap-1"
                            : col.title === "Title"
                              ? "text-start"
                              : "text-left"
                        } opacity-40 break-words whitespace-normal block  ${
                          col.title === "ID" ? "" : ""
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
                        <div className="animate-pulse bg-white border border-primary rounded-2xl py-4 px-2">
                          <div className="flex w-full gap-1">
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
              ) : allTournaments?.length === 0 ? (
                <tr>
                  <td colSpan={columns.length}>
                    <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                      No data available.
                    </div>
                  </td>
                </tr>
              ) : (
                (allTournaments as any[])?.map((tournament, index) => {
                  return (
                    <tr key={tournament?.id} className="">
                      <td colSpan={columns.length}>
                        <div className="hover:bg-gray-100 transition bg-white border border-primary rounded-xl py-2">
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
                                  <div className="w-24  gap-4 cursor-pointer">
                                    <p className="line-clamp-3">
                                      {tournament?.event_code}
                                    </p>
                                  </div>
                                </td>
                                <td className="text-base text-left">
                                  <p className="w-60 ">{tournament?.name}</p>
                                </td>
                                <td className="text-base text-left">
                                  <p className="w-44">
                                    {formatDate(tournament?.start_date_utc)}
                                  </p>
                                </td>
                                <td className="text-base text-left">
                                  <p className="w-44 ">
                                    {formatDate(tournament?.end_date_utc)}
                                  </p>
                                </td>

                                <td className="">
                                  <div className="flex items-center justify-center gap-2">
                                    <Button
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isUpdate &&
                                        "opacity-50 cursor-not-allowed"
                                      }`}
                                      icon={
                                        tournament?.languages?.includes("en")
                                          ? correctIconGreen
                                          : penIcon
                                      }
                                      onClick={() =>
                                        handleTranslationClick(
                                          tournament?.id,
                                          "en",
                                        )
                                      }
                                      disabled={!isUpdate}
                                    />
                                    <Button
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isUpdate &&
                                        "opacity-50 cursor-not-allowed"
                                      }`}
                                      icon={
                                        tournament?.languages?.includes("es")
                                          ? correctIconGreen
                                          : penIcon
                                      }
                                      onClick={() =>
                                        handleTranslationClick(
                                          tournament?.id,
                                          "es",
                                        )
                                      }
                                      disabled={!isUpdate}
                                    />
                                  </div>
                                </td>
                                <td className="text-base relative  text-left cursor-pointer">
                                  <ToggleSwitch
                                    disabled={!isChangeStatus}
                                    checked={tournament.is_active}
                                    onClick={() => {
                                      if (!isChangeStatus) return;
                                      setStatusModalShow(true);
                                      setCurrentStatus(tournament?.is_active);
                                      setSelectedTournamentId(
                                        String(tournament?.id),
                                      );
                                    }}
                                  />
                                </td>

                                {/* <td className="text-base text-left">
                                  {formatDate(tournament.created_at)}
                                </td> */}
                                <td>
                                  <div className="flex items-center justify-center gap-3">
                                    {/* Edit Button */}
                                    <div className="relative group">
                                      <Button
                                        // icon={atomIcon}
                                        iconLucide="BusFront"
                                        backgroundColor="transparent"
                                        className={`p-0 ${
                                          !isTransportDetails &&
                                          "opacity-50 cursor-not-allowed"
                                        }`}
                                        onClick={() =>
                                          handleTournamentTransport(
                                            tournament?.id,
                                          )
                                        }
                                        disabled={!isTransportDetails}
                                      />
                                      <span
                                        className="absolute -top-7 left-1/2 -translate-x-1/2 
        scale-0 group-hover:scale-100 transition 
        bg-black text-white text-xs px-2 py-1 rounded w-max"
                                      >
                                        Tournament Transport Details
                                      </span>
                                    </div>
                                    <div className="relative group">
                                      <Button
                                        // icon={info_edit}
                                        iconLucide="Info"
                                        backgroundColor="transparent"
                                        className={`p-0 ${
                                          !isTournamentInfo &&
                                          "opacity-50 cursor-not-allowed"
                                        }`}
                                        onClick={() =>
                                          handleEditTournamentInfo(
                                            tournament?.id,
                                          )
                                        }
                                        disabled={!isTournamentInfo}
                                      />
                                      <span
                                        className="absolute -top-7 left-1/2 -translate-x-1/2 
        scale-0 group-hover:scale-100 transition 
        bg-black text-white text-xs px-2 py-1 rounded w-max"
                                      >
                                        Tournament Info Edit
                                      </span>
                                    </div>
                                    <div className="relative group">
                                      <Button
                                        icon={penIcon}
                                        backgroundColor="transparent"
                                        className={`p-0 ${
                                          !isUpdate &&
                                          "opacity-50 cursor-not-allowed"
                                        }`}
                                        onClick={() =>
                                          handleEditTournament(tournament?.id)
                                        }
                                        disabled={!isUpdate}
                                      />
                                      <span
                                        className="absolute -top-7 left-1/2 -translate-x-1/2 
        scale-0 group-hover:scale-100 transition 
        bg-black text-white text-xs px-2 py-1 rounded"
                                      >
                                        Edit
                                      </span>
                                    </div>
                                    {/* Delete Button */}
                                    <div className="relative group">
                                      <Button
                                        icon={deleteIcon}
                                        backgroundColor="transparent"
                                        className={`p-0 ${
                                          !isDelete &&
                                          "opacity-50 cursor-not-allowed"
                                        }`}
                                        onClick={() => {
                                          setSelectedTournamentId(
                                            String(tournament?.id),
                                          );
                                          setDeleteShow(true);
                                        }}
                                        disabled={!isDelete}
                                      />
                                      <span
                                        className="absolute -top-7 left-1/2 -translate-x-1/2 
        scale-0 group-hover:scale-100 transition 
        bg-black text-white text-xs px-2 py-1 rounded"
                                      >
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
      {deleteShow && (
        <DeleteConfirmModal
          show={deleteShow}
          onClose={() => setDeleteShow(false)}
          onConfirm={handleConfirmDelete}
          isLoading={deleteTournamentMutation.isPending}
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
      {allTournaments.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </>
  );
};

export default TournamentsList;
