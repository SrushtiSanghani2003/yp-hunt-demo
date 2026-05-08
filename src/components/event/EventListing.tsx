import { useEffect, useMemo, useRef, useState } from "react";
import ContentHeader from "../Subnavbar";
import { capitalize, concatImgURL, formatDate } from "../../config/function";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import Button from "../ui/button";
import {
  deleteIcon,
  franceFlag,
  mediaIcon,
  penIcon,
  usaFlag,
} from "../../icons";
import { paths } from "../../config/paths";
import api from "../../lib/api";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import { showToast } from "../../utils/toastUtils";
import Pagination from "../ui/pagination";
import StatusModel from "../StatusModel";
import { useDebounce } from "../../hooks/useDebounce";
import { resetEvent } from "../../redux-toolkit/eventsSlice";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import { setLastActiveSubTab } from "../../redux-toolkit/tabSlice";
import { PhotoProvider, PhotoView } from "react-photo-view";

const columns = [
  { title: "Id", minWidth: "min-w-8 w-8" },
  { title: "Image", minWidth: "min-w-28 w-28" },
  { title: "Events Name", minWidth: "min-w-52 w-52" },
  { title: "Event Type", minWidth: "min-w-28 w-28" },
  { title: "Categories", minWidth: "min-w-32 w-32" },
  // { title: "Author", minWidth: "min-w-20 w-20" },
  { title: "Pub. Platform", minWidth: "min-w-28 w-28" },
  // { title: "Restriction", minWidth: "min-w-32 w-32" },
  // { title: "Geo Country", minWidth: "min-w-28 w-28" },
  // { title: "Geo Mode", minWidth: "min-w-24 w-24" },
  { title: "Pub./Sche. At", minWidth: "min-w-36 w-36" },
  // { title: "Read Time", minWidth: "min-w-24 w-24" },
  // { title: "Logged In", minWidth: "min-w-20 w-20" },
  // { title: "Verified", minWidth: "min-w-20 w-20" },
  // { title: "Over 18", minWidth: "min-w-20 w-20" },
  { title: "Sponsor", minWidth: "min-w-28 w-28" },
  { title: "Status", minWidth: "min-w-28 w-28" },
  // { title: "Languages", minWidth: "min-w-20 w-20" },
  { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Updated At", minWidth: "min-w-28 w-28" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];
export default function EventListing() {
  const defaultVisibleColumns = [
    "Id",
    "Events Name",
    "Event Type",
    "Image",
    // "Author",
    "Categories",
    // "Geo Country",
    "Status",
    // "Languages",
    "Action",
  ];

  const location = useLocation();
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownEventId, setDropdownEventId] = useState<number | null>(null);
  const [searchInput, setSearchInput] = useState(
    location.state?.restoreSearch || ""
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [allEvents, setAllEvents] = useState([]);
  const [page, setPage] = useState(location.state?.restorePage || 1);

  const [deleteShow, setDeleteShow] = useState(false);
  const [eventTypeId, setEventTypeId] = useState<string | null>(null);
  const [selectedEventData, setSelectedEventData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [draftModal, setDraftModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<null | {
    id: number;
    title: string;
  }>(null);
  const [selectedEventStatus, setSelectedEventStatus] = useState("");
  const [tempVisibleColumns, setTempVisibleColumns] = useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const debouncedSearch = useDebounce(searchInput, 300);
  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts.map((part, index) => ({
      id: "/" + pathParts.slice(0, index + 1).join("/"),
      name: capitalize(part),
    })),
  ];

  const getEvent = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string?]>) => {
    const [, currentPage, searchInput] = queryKey;
    const params: Record<string, any> = { page: currentPage, limit: 8 };
    if (searchInput?.trim()) {
      params.title = searchInput;
    }
    const res = await api.get("/event", { params });
    return res.data;
  };
  const { data: allEventData, isFetching } = useQuery({
    queryKey: ["event", page, debouncedSearch],
    queryFn: getEvent,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return allEventData?.totalPages || 1;
  }, [allEventData?.totalPages]);

  const deleteEventMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/event/${id}`),
    onSuccess: () => {
      showToast("Event Type deleted successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["event"],
        exact: false,
      });
      setDeleteShow(false);
    },
  });

  const updateStatus = async (payload: any) => {
    await api.patch(`/event/${selectedEvent?.id}/change-status`, payload);
  };
  const updateStatusMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      showToast("Status Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["event"], exact: false });
      setShowModal(false);
      setDraftModal(false);
    },
    onError: (error) => {
      console.log("Error updating status", error);
    },
  });

  const handleEditEvent = (id: number) => {
    if (!id) return;
    dispatch(setLastActiveSubTab(paths.events.event.path));
    navigate(`/events/event/edit/${id}`, {
      state: {
        fromPage: page, // 👈 send current pagination page
        fromSearch: searchInput, // current search
      },
    });
  };

  const applyColumnChanges = () => {
    setVisibleColumns([
      ...new Set([...tempVisibleColumns, ...defaultVisibleColumns]),
    ]);
    setShowDropdown(false);
  };
  const handleTempToggle = (title: string) => {
    if (defaultVisibleColumns.includes(title)) {
      return; // Do nothing if trying to toggle a default column
    }
    setTempVisibleColumns((prev) =>
      prev.includes(title)
        ? prev.filter((col) => col !== title)
        : [...prev, title]
    );
  };

  // const handleTranslationClick = async (eventId: string, lang: "en" | "fr") => {
  //   navigate(`/events/event/edit/${eventId}?lang=${lang}`);
  // };
  const toggleStatusDropdown = (eventId: number) => {
    setDropdownEventId(dropdownEventId === eventId ? null : eventId);
  };

  const toggleDropdown = () => {
    setTempVisibleColumns([
      ...new Set([...visibleColumns, ...defaultVisibleColumns]),
    ]);
    setShowDropdown((prev) => !prev);
  };
  const closeDropdown = () => {
    // Reset tempVisibleColumns to current visibleColumns, ensuring defaults are included
    setTempVisibleColumns([
      ...new Set([...visibleColumns, ...defaultVisibleColumns]),
    ]);
    setShowDropdown(false);
  };
  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    navigate(id ? `` : `/dashboard`);
  };
  const handleCreate = () => {
    dispatch(resetEvent());
    dispatch(setLastActiveSubTab(paths.events.event.path));
    navigate(paths.events.event.create.path);
  };
  useEffect(() => {
    if (allEventData) {
      setAllEvents(allEventData?.data);
    }
  }, [allEventData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownEventId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return; // skip first render
    }
    setPage(1); // only reset when user types new search
  }, [debouncedSearch]);

  return (
    <div className="mt-10">
      <ContentHeader
        title="Events"
        breadCrumbsItem={breadCrumbsItem}
        onBreadCrumbClick={handleBreadcrumbClick}
        onCreate={handleCreate}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        showDropdown={showDropdown}
        toggleDropdown={toggleDropdown}
        closeDropdown={closeDropdown}
        columns={columns}
        tempVisibleColumns={tempVisibleColumns}
        handleTempToggle={handleTempToggle}
        applyColumnChanges={applyColumnChanges}
        defaultVisibleColumns={defaultVisibleColumns}
      />

      <div className="overflow-x-auto my-3">
        <table className="min-w-full table-fixed border-separate border-spacing-y-2 pb-16">
          <thead className="text-left">
            <tr>
              {columns
                .filter((col) => visibleColumns.includes(col.title))
                .map((col) => (
                  <th
                    key={col.title}
                    className={`p-2 ps-0 text-black font-normal ${col.minWidth}`}
                  >
                    {col.title === "Languages" ? (
                      <div className="flex items-center justify-center gap-2">
                        <img src={usaFlag} alt="flags" className="w-6 h-5" />
                        <img src={franceFlag} alt="flags" className="w-5 h-4" />
                      </div>
                    ) : (
                      <span
                        className={`${
                          col.title === "Action"
                            ? "flex items-center justify-center gap-1"
                            : ""
                        } opacity-40 break-words whitespace-normal block text-left  ${
                          col.title === "Id" ? "" : ""
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
                    <td colSpan={columns?.length}>
                      <div className="animate-pulse bg-white border  border-primary rounded-2xl p-4">
                        <div className="flex w-full gap-4">
                          {columns
                            .filter((col) => visibleColumns.includes(col.title))
                            .map((col, j) => (
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
            ) : allEvents?.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No data available.
                  </div>
                </td>
              </tr>
            ) : (
              (allEvents as any[])?.map((event, index) => {
                // const videoId = event.hero_video_url
                //   ? extractYouTubeId(event.hero_video_url)
                //   : null;
                const categories =
                  event.categories.map((item: any) => item.name).join(", ") ||
                  "—";

                return (
                  <tr key={event?.id} className="">
                    <td colSpan={visibleColumns.length}>
                      <div className="hover:bg-gray-100 transition bg-white border border-primary rounded-xl py-2 max-h-fit  h-24">
                        <table className="w-full">
                          <thead>
                            <tr>
                              {columns
                                .filter((col) =>
                                  visibleColumns.includes(col.title)
                                )
                                .map((col) => (
                                  <th
                                    key={col.title}
                                    className={`${col.minWidth}`}
                                  ></th>
                                ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {visibleColumns.includes("Id") && (
                                <td className="text-base text-left ps-3">
                                  {index + 1}
                                </td>
                              )}
                              {visibleColumns.includes("Image") && (
                                <td className="text-base">
                                  <PhotoProvider maskOpacity={0.6}>
                                    {event.image ? (
                                      <PhotoView
                                        src={concatImgURL(event?.image)}
                                      >
                                        <img
                                          src={concatImgURL(event?.image)}
                                          className="w-20 h-14 object-cover rounded-xl cursor-pointer"
                                          alt="Membership Image"
                                        />
                                      </PhotoView>
                                    ) : (
                                      <div className="w-20 h-14 bg-[#f6f6f6] border border-primary rounded-xl flex justify-center items-center">
                                        <img
                                          src={mediaIcon}
                                          alt="Placeholder"
                                        />
                                      </div>
                                    )}
                                  </PhotoProvider>
                                </td>
                              )}
                              {visibleColumns.includes("Events Name") && (
                                <td className="text-base text-left">
                                  <p className="w-48 line-clamp-3">
                                    {event?.title?.length > 80
                                      ? `${event.title.slice(0, 80)}...`
                                      : event.title}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Event Type") && (
                                <td className="text-base text-left">
                                  <p className="w-28">
                                    {event?.event_type_name || "—"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Categories") && (
                                <td className="text-base text-left">
                                  <p className="w-24 line-clamp-3">
                                    {categories?.name?.length > 25
                                      ? `${categories?.name?.slice(0, 25)}...`
                                      : categories}
                                  </p>
                                </td>
                              )}
                              {/* {visibleColumns.includes("Author") && (
                                <td className="text-base text-left">
                                  <p className="w-16 line-clamp-3">
                                    {event.author_name || "—"}
                                  </p>
                                </td>
                              )} */}
                              {visibleColumns.includes("Pub. Platform") && (
                                <td className="text-base text-left">
                                  {event.publish_platforms?.join(", ") || "—"}
                                </td>
                              )}
                              {/* {visibleColumns.includes("Restriction") && (
                                <td className="text-base text-left">
                                  <p className="w-32">
                                    {event.restriction_type
                                      ?.split("_")
                                      .join(" ") || "None"}
                                  </p>
                                </td>
                              )} */}
                              {/* {visibleColumns.includes("Geo Country") && (
                                <td className="text-base text-left relative group">
                                  <p className="w-24 line-clamp-3">
                                    {event.geo_block_countries?.join(", ") ||
                                      "—"}
                                  </p>

                                  {event.geo_block_countries?.length > 9 && (
                                    <div className="absolute left-0 top-full mt-2 z-10 bg-black text-white text-xs p-2 rounded-lg max-w-xs opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 pointer-events-none transition- duration-300 ease-out">
                                      {event.geo_block_countries.join(", ")}
                                    </div>
                                  )}
                                </td>
                              )} */}
                              {/* {visibleColumns.includes("Geo Mode") && (
                                <td className="text-base text-left">
                                  {event.geo_block_mode || "—"}
                                </td>
                              )} */}
                              {visibleColumns.includes("Pub./Sche. At") && (
                                <td className="text-base text-left">
                                  <p className="w-3/4">
                                    {event.published_at ||
                                    event.schedule_at ||
                                    event.scheduled_at ? (
                                      formatDate(
                                        event.published_at
                                          ? event.published_at
                                          : event.schedule_at ||
                                              event.scheduled_at
                                      )
                                    ) : (
                                      <span className=" text-gray-400">
                                        Not Published
                                      </span>
                                    )}
                                  </p>
                                </td>
                              )}
                              {/* {visibleColumns.includes("Read Time") && (
                                <td className="text-base text-left">
                                  {event.read_time
                                    ? `${event.read_time} Minutes`
                                    : "—"}
                                </td>
                              )} */}
                              {/* {visibleColumns.includes("Logged In") && (
                                <td className="text-base text-left">
                                  {event.must_be_logged_in ? "Yes" : "No"}
                                </td>
                              )} */}
                              {/* {visibleColumns.includes("Verified") && (
                                <td className="text-base text-left">
                                  {event.must_be_verified ? "Yes" : "No"}
                                </td>
                              )} */}
                              {/* {visibleColumns.includes("Over 18") && (
                                <td className="text-base text-left">
                                  {event.must_be_over_18 ? "Yes" : "No"}
                                </td>
                              )} */}
                              {visibleColumns.includes("Sponsor") && (
                                <td className="text-base text-left">
                                  {event.sponsor_name || "—"}
                                </td>
                              )}
                              {visibleColumns.includes("Status") && (
                                <td
                                  className="text-base relative  text-left cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleStatusDropdown(event.id);
                                  }}
                                >
                                  <div
                                    className={`${
                                      event.status === "published"
                                        ? "bg-green-600"
                                        : event.status === "scheduled"
                                        ? "bg-blue-600"
                                        : "bg-primary"
                                    } text-white font-semibold py-1 rounded-lg w-24 flex justify-evenly`}
                                  >
                                    <span className="">
                                      {capitalize(event.status)}
                                    </span>
                                  </div>
                                  {dropdownEventId === event.id && (
                                    <div
                                      ref={dropdownRef}
                                      className="absolute z-10 mt-2 w-28 bg-white border border-primary rounded-xl  shadow-lg duration-500 transform transition-all"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <ul className="py-1 text-sm text-gray-700 px-1">
                                        {["Draft", "Published", "Scheduled"]
                                          .filter(
                                            (status) =>
                                              status.toLowerCase() !==
                                              event.status
                                          )
                                          .map((status) => (
                                            <li
                                              key={status}
                                              className="cursor-pointer px-4 py-2 font-medium hover:bg-primary rounded-xl hover:duration-500 transform transition-all"
                                              onClick={() => {
                                                setSelectedEventData(event);
                                                setSelectedEventStatus(status);
                                                setSelectedEvent({
                                                  id: event.id,
                                                  title: event.title,
                                                });
                                                if (status !== "Draft") {
                                                  setShowModal(true);
                                                } else {
                                                  setDraftModal(true);
                                                }
                                              }}
                                            >
                                              {status}
                                            </li>
                                          ))}
                                      </ul>
                                    </div>
                                  )}
                                </td>
                              )}
                              {/* {visibleColumns.includes("Languages") && (
                                <td className="">
                                  <div className="flex items-center justify-center gap-2">
                                    <Button
                                      backgroundColor="transparent"
                                      className="p-0"
                                      // disabled={event.languages.includes(
                                      //   "en"
                                      // )}
                                      icon={
                                        event.languages.includes("en")
                                          ? correctIconGreen
                                          : penIcon
                                      }
                                      onClick={() =>
                                        handleTranslationClick(event?.id, "en")
                                      }
                                    />
                                    <Button
                                      backgroundColor="transparent"
                                      className="p-0"
                                      // disabled={event.languages.includes(
                                      //   "fr"
                                      // )}
                                      icon={
                                        event.languages.includes("fr")
                                          ? correctIconGreen
                                          : penIcon
                                      }
                                      onClick={() =>
                                        handleTranslationClick(event?.id, "fr")
                                      }
                                    />
                                  </div>
                                </td>
                              )} */}
                              {visibleColumns.includes("Created At") && (
                                <td className="text-base text-left">
                                  {formatDate(event.created_at)}
                                </td>
                              )}
                              {visibleColumns.includes("Updated At") && (
                                <td className="text-base text-left">
                                  {formatDate(event.updated_at)}
                                </td>
                              )}
                              {visibleColumns.includes("Action") && (
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
                                      className="p-0"
                                      onClick={() => handleEditEvent(event?.id)}
                                    />
                                    <Button
                                      icon={deleteIcon}
                                      backgroundColor="transparent"
                                      className="p-0"
                                      onClick={() => {
                                        setDeleteShow(true);
                                        setEventTypeId(String(event?.id));
                                      }}
                                    />
                                  </div>
                                </td>
                              )}
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
            if (eventTypeId) {
              deleteEventMutation.mutate(eventTypeId);
            }
          }}
          isLoading={deleteEventMutation.isPending}
        />
      )}
      {allEvents?.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
      {showModal && (
        <StatusModel
          show={showModal}
          onClose={() => setShowModal(false)}
          data={selectedEventData}
          selectedStatus={selectedEventStatus}
          onSave={(payload: any) => updateStatusMutation.mutate(payload)}
          isLoading={updateStatusMutation.isPending}
        />
      )}
      {draftModal && (
        <ChangeStatusModal
          show={draftModal}
          onClose={() => setDraftModal(false)}
          onSave={(payload: any) => updateStatusMutation.mutate(payload)}
          isLoading={updateStatusMutation.isPending}
        />
      )}
    </div>
  );
}
