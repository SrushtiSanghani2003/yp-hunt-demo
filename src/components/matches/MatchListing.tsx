import { useEffect, useMemo, useState } from "react";
import ContentHeader from "../Subnavbar";
import { capitalize, formatDate } from "../../config/function";
import { chevronDown, spanishFlag, usaFlag } from "../../icons";

import Pagination from "../ui/pagination";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import { useDebounce } from "../../hooks/useDebounce";
import { useMatchlist } from "../../hooks/useMatches";
import api from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  selectListingState,
  setListingState,
} from "../../redux-toolkit/moduleListingSearchSlice";
import { useScroll } from "../../hooks/ScrollContext";
const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  //   { title: "Image", minWidth: "min-w-28 w-28" },
  { title: "Match Name", minWidth: "min-w-96 w-96" },
  { title: "Tournament ID", minWidth: "min-w-28 w-28" },
  { title: "Tournament Name", minWidth: "min-w-44 w-44" },
  { title: "Date & Time ", minWidth: "min-w-28 w-28" },
  // { title: "Languages", minWidth: "min-w-20 w-20" },
  //   { title: "Action", minWidth: "min-w-28 w-28" },
];
export default function MatchListing() {
  const module = "match";
  const listingState = useSelector(selectListingState(module));
  const [tournamentId, setTournamentId] = useState<any>(
    listingState.filters.tournamentId || "",
  );
  const [page, setPage] = useState(listingState.page || 1);
  const [allMatches, setAllMatches] = useState([]);
  const [searchInput, setSearchInput] = useState<string>(
    listingState.search || "",
  );
  const debouncedSearch = useDebounce(searchInput, 300);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const pathParts = location.pathname.split("/").filter(Boolean);
  const { data: allMatchesData, isFetching } = useMatchlist(
    page,
    debouncedSearch,
    tournamentId,
    false,
  );
  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts.map((part, index) => ({
      id: "/" + pathParts?.slice(0, index + 1).join("/"),
      name: capitalize(part),
    })),
  ];
  const totalPages = useMemo(() => {
    return allMatchesData?.totalPages || 1;
  }, [allMatchesData?.totalPages]);
  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    navigate(id ? `` : `/dashboard`);
  };
  const getAllTournaments = async () => {
    return await api.get("/tournament/getDropdown");
  };

  const { data: allTournaments } = useQuery({
    queryKey: ["matches"],
    queryFn: getAllTournaments,
    refetchOnWindowFocus: false,
  });

  const tournamentOptions = useMemo(
    () =>
      allTournaments?.data?.map((item: any) => ({
        value: item.id,
        label: item.name,
      })) || [],
    [allTournaments],
  );
  useEffect(() => {
    if (allMatchesData?.matches) {
      setAllMatches(allMatchesData?.matches || []);
    }
  }, [allMatchesData]);
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
        filters: { tournamentId },
      }),
    );
  }, [page, searchInput, tournamentId]);
  return (
    <div>
      <div>
        <div
          className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
            isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
          }`}
        >
          <ContentHeader
            title="Matches"
            breadCrumbsItem={breadCrumbsItem}
            onBreadCrumbClick={handleBreadcrumbClick}
            //   onCreate={handleCreate}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </div>
        <div className="container flex justify-end items-center mt-3">
          <div className="relative w-max">
            <select
              id="language"
              value={tournamentId}
              onChange={(e) => {
                setTournamentId(e.target.value);
                setPage(1);
              }}
              className="appearance-none w-full md:p-[7px] p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
            >
              <option value="">All Tournaments</option>

              {tournamentOptions.map((item: any) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
              <img src={chevronDown} />
            </div>
          </div>
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
                        <img
                          src={spanishFlag}
                          alt="flags"
                          className="w-5 h-4"
                        />
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
              ) : allMatches.length === 0 ? (
                <tr>
                  <td colSpan={columns.length}>
                    <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                      No Match data available.
                    </div>
                  </td>
                </tr>
              ) : (
                (allMatches as any[])?.map((matches, index) => {
                  //   const isActive = matches?.status == "published";
                  return (
                    <tr key={matches?.id} className="">
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
                                {/* <PhotoProvider maskOpacity={0.6}>
                                  <td className="text-base cursor-pointer">
                                    <PhotoView
                                      src={concatImgURL(matches.image)}
                                    >
                                      {matches.image ? (
                                        <img
                                          src={concatImgURL(matches.image)}
                                          className="w-20 h-14 object-cover rounded-xl"
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
                                </PhotoProvider> */}
                                <td className="text-base text-left">
                                  <p className="w-96 line-clamp-2">
                                    {matches.match_name?.length > 80
                                      ? `${matches.match_name?.slice(0, 80)}...`
                                      : matches.match_name}
                                  </p>
                                </td>
                                <td className="text-base text-left">
                                  <p>{matches.tournament_id}</p>
                                </td>
                                <td className="text-base text-left">
                                  <p className="w-40 line-clamp-2">
                                    {matches.tournament_name?.length > 80
                                      ? `${matches.tournament_name?.slice(
                                          0,
                                          80,
                                        )}...`
                                      : matches.tournament_name}
                                  </p>
                                </td>
                                <td className="text-base text-left">
                                  {matches?.date_utc && matches?.start_time_utc
                                    ? `${formatDate(matches.date_utc)} ${
                                        matches.start_time_utc
                                      }`
                                    : "-"}
                                </td>
                                {/* <td className="text-base text-left">
                                  <ToggleSwitch
                                    checked={isActive}
                                    onClick={() => {
                                      setStatusModalShow(true);
                                      setCurrentStatus(matches?.status);
                                      setSelectedCategoryId(
                                        String(matches?.id)
                                      );
                                    }}
                                  />
                                </td> */}
                                {/* <td className="">
                                  <div className="flex items-center justify-center gap-3">
                                    <Button
                                      icon={eyeOpenIcon}
                                      backgroundColor="transparent"
                                      className="p-0"
                                    />
                                    <Button
                                      icon={penIcon}
                                      backgroundColor="transparent"
                                      className="p-0"
                                      onClick={() =>
                                        handleEditBroadcast(matches?.id)
                                      }
                                    />
                                    <Button
                                      icon={deleteIcon}
                                      backgroundColor="transparent"
                                      className="p-0"
                                      onClick={() => {
                                        setDeleteShow(true);
                                        setBroadcastTypeId(String(matches?.id));
                                      }}
                                    />
                                  </div>
                                </td> */}
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
        {/* {statusModalShow && (
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
        )} */}
        {/* {deleteShow && (
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
        )} */}
        {allMatches.length !== 0 && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
