import { useLocation, useNavigate } from "react-router-dom";

import {
  usaFlag,
  deleteIcon,
  mediaIcon,
  penIcon,
  spanishFlag,
  correctIconGreen,
} from "../../icons";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  capitalize,
  concatImgURL,
  // extractYouTubeId,
  formatDate,
} from "../../config/function";
import ContentHeader from "../Subnavbar";
import Pagination from "../ui/pagination";
import api from "../../lib/api";
import Button from "../ui/button";
import { paths } from "../../config/paths";
import { resetVideo } from "../../redux-toolkit/videoSlice";
import { showToast } from "../../utils/toastUtils";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import StatusModel from "../StatusModel";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import { useDebounce } from "../../hooks/useDebounce";
import { setLastActiveSubTab } from "../../redux-toolkit/tabSlice";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { selectMenuPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { getPermissionFlags } from "../sidebar/menuPermissions";
import {
  selectListingState,
  setListingState,
} from "../../redux-toolkit/moduleListingSearchSlice";
import { useScroll } from "../../hooks/ScrollContext";

const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Thumbnail", minWidth: "min-w-28 w-28" },
  { title: "Title", minWidth: "min-w-72 w-72" },
  // { title: "Categories", minWidth: "min-w-28 w-28" },
  { title: "Type", minWidth: "min-w-28 w-28" },
  // { title: "Author", minWidth: "min-w-20 w-20" },
  // { title: "Pub. Platform", minWidth: "min-w-28 w-28" },
  // { title: "Restriction", minWidth: "min-w-32 w-32" },
  // { title: "Geo Country", minWidth: "min-w-28 w-28" },
  // { title: "Geo Mode", minWidth: "min-w-24 w-24" },
  { title: "Pub./Sche. At", minWidth: "min-w-36 w-36" },
  // { title: "Read Time", minWidth: "min-w-24 w-24" },
  // { title: "Logged In", minWidth: "min-w-20 w-20" },
  // { title: "Verified", minWidth: "min-w-20 w-20" },
  // { title: "Over 18", minWidth: "min-w-20 w-20" },
  // { title: "Sponsor", minWidth: "min-w-28 w-28" },
  { title: "Status", minWidth: "min-w-28 w-28" },
  { title: "Languages", minWidth: "min-w-20 w-20" },
  { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Updated At", minWidth: "min-w-28 w-28" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];

const Videos = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts.map((part, index) => ({
      id: "/" + pathParts.slice(0, index + 1).join("/"),
      name: capitalize(part),
    })),
  ];

  const defaultVisibleColumns = [
    "ID",
    "Thumbnail",
    "Title",
    // "Author",
    "Pub./Sche. At",
    "Type",
    // "Sponsor",
    // "Geo Country",
    "Status",
    "Languages",
    "Action",
  ];
  const module = "videos";
  const listingState = useSelector(selectListingState(module));
  const [allVideos, setAllVideos] = useState([]);
  const [page, setPage] = useState(listingState.page || 1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<null | {
    id: number;
    title: string;
  }>(null);
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [tempVisibleColumns, setTempVisibleColumns] = useState<string[]>(
    defaultVisibleColumns,
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState(listingState.search || "");
  const [showModal, setShowModal] = useState(false);
  const [draftModal, setDraftModal] = useState(false);
  const [dropdownVideoId, setDropdownVideoId] = useState<number | null>(null);
  const [selectedVideoData, setSelectedVideoData] = useState({});
  const [selectedVideoStatus, setSelectedVideoStatus] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(searchInput, 300);

  const menuPermissions = useSelector(selectMenuPermissions);

  const { isCreate, isDelete, isUpdate, isChangeStatus } = getPermissionFlags(
    menuPermissions.videos,
  );

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

  const toggleStatusDropdown = (videoId: number) => {
    if (!isChangeStatus) return;
    setDropdownVideoId(dropdownVideoId === videoId ? null : videoId);
  };

  const handleTempToggle = (title: string) => {
    if (defaultVisibleColumns.includes(title)) {
      return; // Do nothing if trying to toggle a default column
    }
    setTempVisibleColumns((prev) =>
      prev.includes(title)
        ? prev.filter((col) => col !== title)
        : [...prev, title],
    );
  };

  const applyColumnChanges = () => {
    setVisibleColumns([
      ...new Set([...tempVisibleColumns, ...defaultVisibleColumns]),
    ]);
    setShowDropdown(false);
  };

  const getVideos = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string?]>) => {
    const [, currentPage, debouncedSearch] = queryKey;

    const params: Record<string, any> = {
      page: currentPage,
      limit: 8,
    };

    if (debouncedSearch?.trim()) {
      params.search = debouncedSearch.trim();
    }
    return await api.get("/videos/", { params });
  };

  const { data: allVideosData, isFetching } = useQuery({
    queryKey: ["videoAlbums", page, debouncedSearch],
    queryFn: getVideos,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });
  const totalPages = useMemo(() => {
    return allVideosData?.data?.totalPages || 1;
  }, [allVideosData?.data?.totalPages]);

  const handleTranslationClick = async (videoId: string, lang: "en" | "es") => {
    navigate(`/media/videos/edit/${videoId}?lang=${lang}`);
  };

  const handleEditVideo = (id: number) => {
    if (!id) return;
    dispatch(setLastActiveSubTab(paths.media.videos.path));
    navigate(`/media/videos/edit/${id}`, {
      state: {
        fromPage: page, // 👈 send current pagination page
        fromSearch: searchInput, // current search
      },
    });
  };

  const deleteVideo = async (id: string) => {
    return api.delete(`/videos/${id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videoAlbums", page],
        exact: false,
      });
      showToast("Video deleted successfully", "success");
      setShowDeleteModal(false);
      if (allVideosData?.data.videos.length == 1 && page > 1) {
        setPage((prev: any) => prev - 1);
      }
      setSelectedVideo(null);
      dispatch(resetVideo());
    },
    onError: () => {
      console.error("Failed to delete a video");
    },
  });

  const handleConfirmDelete = () => {
    if (selectedVideo?.id) {
      deleteMutation.mutate(String(selectedVideo.id));
    }
  };

  const handleCreate = () => {
    dispatch(resetVideo());
    dispatch(setLastActiveSubTab(paths.media.videos.path));
    navigate(paths.media.videos.create.getHref());
  };

  const updateStatus = async (payload: any) => {
    await api.patch(`/videos/${selectedVideo?.id}/change-status`, payload);
  };

  const updateStatusMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      showToast("Status Updated", "success");
      queryClient.invalidateQueries({
        queryKey: ["videoAlbums"],
        exact: false,
      });
      setShowModal(false);
      setDraftModal(false);
    },
    onError: (error) => {
    console.log("🚀 ~ Videos ~ error:", error)
    },
  });

  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    navigate(id ? `` : `/dashboard`);
  };
  // const handleTranslationClick = async (videoId: string, lang: "en" | "fr") => {
  //   navigate(`/media/videos/edit/${videoId}?lang=${lang}`);
  // };

  useEffect(() => {
    if (allVideosData?.data?.videos) {
      setAllVideos(allVideosData.data.videos);
    }
  }, [allVideosData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVideoId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          title="Videos"
          breadCrumbsItem={breadCrumbsItem}
          onBreadCrumbClick={handleBreadcrumbClick}
          onCreate={handleCreate}
          disableCreate={!isCreate}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          /** PROPS FOR FILTER VIEW **/
          showDropdown={showDropdown}
          toggleDropdown={toggleDropdown}
          closeDropdown={closeDropdown}
          columns={columns}
          tempVisibleColumns={tempVisibleColumns}
          handleTempToggle={handleTempToggle}
          applyColumnChanges={applyColumnChanges}
          defaultVisibleColumns={defaultVisibleColumns}
        />
      </div>

      <div className="container overflow-x-auto my-3">
        <table className="min-w-full table-fixed border-separate border-spacing-y-2 pb-16">
          <thead className="text-left">
            <tr>
              {columns
                .filter((col) => visibleColumns.includes(col.title))
                .map((col) => (
                  <th
                    key={col.title}
                    className={`p-2 ps-0 text-black font-normal text-base ${col.minWidth}`}
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
                          col.title === "Action"
                            ? "flex items-center justify-center gap-1"
                            : ""
                        } opacity-40 break-words whitespace-normal block text-left ${
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
                      <div className="animate-pulse bg-white border border-primary rounded-2xl p-4">
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
            ) : allVideos?.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No data available.
                  </div>
                </td>
              </tr>
            ) : (
              (allVideos as any[])?.map((video, index) => {
                // const videoUrl = video.video_url;
                // const videoId = videoUrl ? extractYouTubeId(videoUrl) : null;
                // const isNativeUrl = videoUrl?.startsWith(
                //   "https://ip-cms-api.ypstagingserver.com"
                // );
                const categories =
                  video.categories.map((item: any) => item.name).join(", ") ||
                  "-";

                return (
                  <tr key={video?.id} className="">
                    <td colSpan={visibleColumns.length}>
                      <div className="hover:bg-gray-100 transition bg-white border border-primary rounded-xl py-2">
                        <table className="w-full">
                          <thead>
                            <tr>
                              {columns
                                .filter((col) =>
                                  visibleColumns.includes(col.title),
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
                              {visibleColumns.includes("ID") && (
                                <td className="text-base text-left ps-3">
                                  {index + 1}
                                </td>
                              )}
                              {visibleColumns.includes("Thumbnail") && (
                                <td className="text-base text-left ">
                                  <PhotoProvider maskOpacity={0.6}>
                                    {video.video_thumbnail ? (
                                      <PhotoView
                                        src={concatImgURL(
                                          video.video_thumbnail,
                                        )}
                                      >
                                        <img
                                          // src={video.video_thumbnail}
                                          src={concatImgURL(
                                            video.video_thumbnail,
                                          )}
                                          className="w-20 h-14 object-cover rounded-xl cursor-pointer"
                                          alt="Thumbnail"
                                        />
                                      </PhotoView>
                                    ) : (
                                      <div className="w-20 h-14 bg-f6f6f6 border-0.5 border-primary rounded-xl flex justify-center items-center">
                                        <img
                                          src={mediaIcon}
                                          alt="Placeholder"
                                        />
                                      </div>
                                    )}
                                  </PhotoProvider>
                                </td>
                              )}
                              {visibleColumns.includes("Title") && (
                                <td className="text-base text-left">
                                  <p className="w-64 line-clamp-3">
                                    {video.title?.length > 80
                                      ? `${video.title?.slice(0, 80)}...`
                                      : video.title}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Categories") && (
                                <td className="text-base text-left">
                                  <p className="w-24 line-clamp-3">
                                    {categories?.length > 25
                                      ? `${categories.slice(0, 25)}...`
                                      : categories}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Type") && (
                                <td className="text-base text-left">
                                  <p className="w-24 capitalize">
                                    {video.type}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Author") && (
                                <td className="text-base text-left break-words">
                                  <p className="w-16 line-clamp-3">
                                    {video.author_name || "—"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Pub. Platform") && (
                                <td className="text-base text-left">
                                  {video.publish_platforms?.join(", ") || "—"}
                                </td>
                              )}
                              {visibleColumns.includes("Restriction") && (
                                <td className="text-base text-left">
                                  <p className="w-32">
                                    {video.restriction_type
                                      ?.split("_")
                                      .join(" ") || "None"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Geo Country") && (
                                <td className="text-base text-left relative group">
                                  <p className="w-24 line-clamp-3">
                                    {video.geo_block_countries?.join(", ") ||
                                      "—"}
                                  </p>

                                  {video.geo_block_countries?.length > 9 && (
                                    <div className="absolute left-0 top-full mt-2 z-10 bg-black text-white text-xs p-2 rounded-lg max-w-xs opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 pointer-events-none transition- duration-300 ease-out">
                                      {video.geo_block_countries.join(", ")}
                                    </div>
                                  )}
                                </td>
                              )}
                              {visibleColumns.includes("Geo Mode") && (
                                <td className="text-base text-left">
                                  {video.geo_block_mode || "None"}
                                </td>
                              )}
                              {visibleColumns.includes("Pub./Sche. At") && (
                                <td className="text-base text-left">
                                  {video.published_at ||
                                  video.schedule_at ||
                                  video.scheduled_at ? (
                                    formatDate(
                                      video.published_at
                                        ? video.published_at
                                        : video.schedule_at ||
                                            video.scheduled_at,
                                    )
                                  ) : (
                                    <span className=" text-gray-400 my-auto">
                                      Not Published
                                    </span>
                                  )}
                                </td>
                              )}
                              {visibleColumns.includes("Read Time") && (
                                <td className="text-base text-left">
                                  {video.read_time == null
                                    ? "—"
                                    : `${video.read_time} Minutes`}
                                </td>
                              )}
                              {visibleColumns.includes("Logged In") && (
                                <td className="text-base text-left">
                                  {video.must_be_logged_in ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Verified") && (
                                <td className="text-base text-left">
                                  {video.must_be_verified ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Over 18") && (
                                <td className="text-base text-left">
                                  {video.must_be_over_18 ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Sponsor") && (
                                <td className="text-base text-left line-clamp-3">
                                  {video.sponsor_name || "—"}
                                </td>
                              )}
                              {visibleColumns.includes("Status") && (
                                <td
                                  className="text-base relative  text-left cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleStatusDropdown(video.id);
                                  }}
                                >
                                  <div
                                    className={`${
                                      video.status === "published"
                                        ? "bg-green-600"
                                        : video.status === "scheduled"
                                          ? "bg-blue-600"
                                          : "bg-primary"
                                    } text-white font-semibold py-1 rounded-lg w-24 flex justify-evenly ${
                                      !isChangeStatus
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }`}
                                  >
                                    <span className="">
                                      {capitalize(video.status)}
                                    </span>
                                  </div>
                                  {dropdownVideoId === video.id && (
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
                                              video.status,
                                          )
                                          .map((status) => (
                                            <li
                                              key={status}
                                              className="cursor-pointer px-4 py-2 font-medium hover:bg-primary rounded-xl hover:duration-500 transform transition-all"
                                              onClick={() => {
                                                setSelectedVideoData(video);
                                                setSelectedVideoStatus(status);
                                                setSelectedVideo({
                                                  id: video.id,
                                                  title: video.title,
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
                              {visibleColumns.includes("Languages") && (
                                <td className="">
                                  <div className="flex items-center justify-center gap-2">
                                    <Button
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isUpdate &&
                                        "opacity-50 cursor-not-allowed"
                                      }`}
                                      // disabled={news.languages.includes("en")}
                                      icon={
                                        video.languages.includes("en")
                                          ? correctIconGreen
                                          : penIcon
                                      }
                                      onClick={() =>
                                        handleTranslationClick(video?.id, "en")
                                      }
                                      disabled={!isUpdate}
                                    />
                                    <Button
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isUpdate &&
                                        "opacity-50 cursor-not-allowed"
                                      }`}
                                      // disabled={video.languages.includes("en")}
                                      icon={
                                        video.languages.includes("es")
                                          ? correctIconGreen
                                          : penIcon
                                      }
                                      onClick={() =>
                                        handleTranslationClick(video?.id, "es")
                                      }
                                      disabled={!isUpdate}
                                    />
                                  </div>
                                </td>
                              )}
                              {visibleColumns.includes("Created At") && (
                                <td className="text-base text-left">
                                  {formatDate(video.created_at)}
                                </td>
                              )}
                              {visibleColumns.includes("Updated At") && (
                                <td className="text-base text-left">
                                  {formatDate(video.updated_at)}
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
                                      className={`p-0 ${
                                        !isUpdate &&
                                        "opacity-50 cursor-not-allowed"
                                      }`}
                                      onClick={() => handleEditVideo(video?.id)}
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
                                        setSelectedVideo({
                                          id: video?.id,
                                          title: video?.title,
                                        });
                                        setShowDeleteModal(true);
                                      }}
                                      disabled={!isDelete}
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

      {showDeleteModal && (
        <DeleteConfirmModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          itemName={selectedVideo?.title}
          isLoading={deleteMutation.isPending}
        />
      )}

      {showModal && (
        <StatusModel
          show={showModal}
          onClose={() => setShowModal(false)}
          data={selectedVideoData}
          selectedStatus={selectedVideoStatus}
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

      {allVideos?.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default Videos;
