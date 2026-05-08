import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContentHeader from "../../Subnavbar";
import { capitalize, concatImgURL, formatDate } from "../../../config/function";
import { popToIndex } from "../../../redux-toolkit/breadcrumbSlice";
import Button from "../../ui/button";
import {
  arrowdowncutout,
  arrowupcutout,
  chevronDown,
  eyeOpenIcon,
  mediaIcon,
  penIcon,
  spanishFlag,
  usaFlag,
} from "../../../icons";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useDebounce } from "../../../hooks/useDebounce";
import Pagination from "../../ui/pagination";
import {
  selectListingState,
  setListingState,
} from "../../../redux-toolkit/moduleListingSearchSlice";
import FlightView from "./FlightView";
import {
  useDownloadFlightTemplate,
  useExportCsvFlight,
  useFlightlist,
} from "../../../hooks/useFlightlist";
import { selectMenuPermissions } from "../../../redux-toolkit/menuPermissionsSlice";
import { getPermissionFlags } from "../../sidebar/menuPermissions";
import { paths } from "../../../config/paths";
import { useScroll } from "../../../hooks/ScrollContext";
import TravelFilterModal from "../TravelFilterModal ";
import ExportConfirmModal from "../ExportConfirmModal";
import DownloadTemplateConfirmModal from "../DownloadTemplateConfirmModal";
const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Request ID", minWidth: "min-w-16 w-16" },
  { title: "Image", minWidth: "min-w-28 w-28" },
  { title: "Requested For", minWidth: "min-w-40 w-40" },
  { title: "Requested By", minWidth: "min-w-40 w-40" },
  { title: "Request Date & Time", minWidth: "min-w-32 w-32" },
  { title: "Status", minWidth: "min-w-28 w-28" },
  { title: "Tournament", minWidth: "min-w-28 w-28" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];
const getStatusBadge = (status?: string) => {
  const baseClass =
    "px-3 py-1 rounded-xl text-xs font-medium capitalize inline-flex items-center justify-center w-fit";

  switch (status?.toLowerCase()) {
    case "pending":
      return (
        <span className={`${baseClass} bg-yellow-100 text-yellow-700`}>
          Pending
        </span>
      );

    case "confirmed":
    case "approved":
      return (
        <span className={`${baseClass} bg-green-100 text-green-700`}>
          Confirmed
        </span>
      );

    case "declined":
      return (
        <span className={`${baseClass} bg-red-100 text-red-700`}>Declined</span>
      );

    case "cancel":
    case "cancelled":
      return (
        <span className={`${baseClass} bg-gray-200 text-gray-700`}>
          Cancelled
        </span>
      );

    default:
      return (
        <span className={`${baseClass} bg-gray-100 text-gray-500`}>-</span>
      );
  }
};

export default function FlightListing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const module = "flight";
  const listingState = useSelector(selectListingState(module));
  const [page, setPage] = useState(listingState.page);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [fromDate, setFromDate] = useState(listingState.filters.fromDate || "");
  const [toDate, setToDate] = useState(listingState.filters.toDate || "");
  const [tournamentId, setTournamentId] = useState<number | null>(
    listingState.filters.tournamentId || null,
  );
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const isFilterActive = !!fromDate || !!toDate || !!tournamentId;
  const [search, setSearch] = useState(listingState.search);
  const debouncedSearch = useDebounce(search, 300);
  const [selectedFlightId, setSelectedFlightId] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [status, setStatus] = useState(listingState.filters.status || "");
  const menuPermissions = useSelector(selectMenuPermissions);
  const { mutate: downloadTemplate, isPending } = useDownloadFlightTemplate();
  const { mutate: exportCSV, isPending: exportCsvPanding } =
    useExportCsvFlight(status);
  const { isUpdate, isView } = getPermissionFlags(menuPermissions.flight);
  const [allFlight, setAllFlight] = useState([]);
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
  const handleDownloadConfirm = () => {
    downloadTemplate();
    setShowDownloadModal(false);
  };
  const handleExportConfirm = () => {
    exportCSV(status);
    setShowExportModal(false);
  };
  const { data: allFlightData, isFetching } = useFlightlist(
    page,
    debouncedSearch,
    status,
    fromDate,
    toDate,
    tournamentId,
    false,
  );

  const totalPages = useMemo(() => {
    return allFlightData?.totalPages || 1;
  }, [allFlightData?.totalPages]);

  const handleFlight = (id: number) => {
    if (!id) return;
    navigate(`/travelrequest/flight/edit/${id}`);
  };
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
        search,
        filters: { status, fromDate, toDate, tournamentId },
      }),
    );
  }, [page, search, status, fromDate, toDate, tournamentId]);
  useEffect(() => {
    if (allFlightData?.flights) {
      setAllFlight(allFlightData.flights || []);
    }
  }, [allFlightData]);

  return (
    <div>
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <ContentHeader
          title="Flight"
          breadCrumbsItem={breadCrumbsItem}
          onBreadCrumbClick={handleBreadcrumbClick}
          // onCreate={handleCreate}
          // disableCreate={!isCreate}
          toggleFilter={() => setShowFilterModal(true)}
          isFilterActive={isFilterActive}
          searchInput={search}
          setSearchInput={setSearch}
        />
      </div>
      <div className="container">
        <div className="flex justify-end items-center mt-3 gap-3">
          <Button
            text={"Download Template"}
            className="!px-4 md:!py-2.5"
            onClick={() => setShowDownloadModal(true)}
            disabled={isPending}
            isLoading={isPending}
            icon={arrowdowncutout}
          />
          <Button
            text={"Upload CSV"}
            className="!px-4 md:!py-2.5"
            onClick={() => navigate(paths.travelrequest.flight.uploadCsv.path)}
            icon={arrowupcutout}
          />

          <Button
            text={"Export CSV"}
            className="!px-4 md:!py-2.5"
            onClick={() => setShowExportModal(true)}
            disabled={exportCsvPanding}
            isLoading={exportCsvPanding}
            icon={arrowdowncutout}
          />
          <div className="relative w-40">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1); // status change thay tyare page reset
              }}
              className="appearance-none w-full md:p-[7px] p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
            >
              <option value="">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="declined">Declined</option>
              <option value="cancel">Cancel</option>
            </select>

            <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
              <img src={chevronDown} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto my-3">
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
              ) : allFlight.length === 0 ? (
                <tr>
                  <td colSpan={columns.length}>
                    <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                      No Flight data available.
                    </div>
                  </td>
                </tr>
              ) : (
                (allFlight as any[])?.map((flight, index) => {
                  const isConfirmed =
                    flight?.status?.toLowerCase() === "confirmed";

                  return (
                    <tr key={flight?.flight_id} className="">
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
                                  {flight.flight_id}
                                </td>
                                <PhotoProvider maskOpacity={0.6}>
                                  <td className="text-base cursor-pointer">
                                    <PhotoView
                                      src={concatImgURL(
                                        flight.requested_for_image,
                                      )}
                                    >
                                      {flight.requested_for_image ? (
                                        <img
                                          src={concatImgURL(
                                            flight.requested_for_image,
                                          )}
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
                                </PhotoProvider>
                                <td className="text-base text-left">
                                  <p className="w-36 line-clamp-2">
                                    {flight.requested_for_name
                                      ? flight.requested_for_name
                                      : "-"}
                                  </p>
                                </td>
                                <td className="text-base text-left">
                                  <p className="w-36 line-clamp-2">
                                    {flight.requested_by_name
                                      ? flight.requested_by_name
                                      : "-"}
                                  </p>
                                </td>

                                <td className="text-base text-left">
                                  {formatDate(flight.requested_on)}
                                </td>

                                <td className="text-base text-center">
                                  {getStatusBadge(flight.status)}
                                </td>
                                <td className="text-base text-left">
                                  <p className="w-28 line-clamp-2">
                                    {flight.tournament_name
                                      ? flight.tournament_name
                                      : "-"}
                                  </p>
                                </td>
                                <td className="">
                                  <div className="flex items-center justify-center gap-3">
                                    <Button
                                      icon={eyeOpenIcon}
                                      backgroundColor="transparent"
                                      onClick={() => {
                                        setSelectedFlightId(flight?.flight_id);
                                        setShowSidebar(true);
                                      }}
                                      className={
                                        !isView
                                          ? "opacity-50 cursor-not-allowed"
                                          : ""
                                      }
                                      disabled={!isView}
                                    />
                                    <Button
                                      icon={penIcon}
                                      backgroundColor="transparent"
                                      onClick={() =>
                                        handleFlight(flight?.flight_id)
                                      }
                                      disabled={!isUpdate || !isConfirmed}
                                      className={
                                        !isConfirmed || !isUpdate
                                          ? "opacity-50 cursor-not-allowed"
                                          : ""
                                      }
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
      {showSidebar && (
        <FlightView
          open={showSidebar}
          onClose={() => setShowSidebar(false)}
          flightId={selectedFlightId}
        />
      )}
      {allFlight.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
      {showFilterModal && (
        <TravelFilterModal
          travelmodule="Flight"
          show={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          defaultFromDate={fromDate}
          defaultToDate={toDate}
          defaultTournamentId={tournamentId}
          onApply={({ fromDate, toDate, tournamentId }) => {
            setFromDate(fromDate);
            setToDate(toDate);
            setTournamentId(tournamentId);
            setPage(1);
          }}
        />
      )}
      {showExportModal && (
        <ExportConfirmModal
          show={showExportModal}
          onClose={() => setShowExportModal(false)}
          onConfirm={handleExportConfirm}
          moduleName="Flight"
          status={status}
          isLoading={exportCsvPanding}
        />
      )}
      {showDownloadModal && (
        <DownloadTemplateConfirmModal
          show={showDownloadModal}
          onClose={() => setShowDownloadModal(false)}
          onConfirm={handleDownloadConfirm}
          moduleName="Flight"
          isLoading={isPending}
        />
      )}
    </div>
  );
}
