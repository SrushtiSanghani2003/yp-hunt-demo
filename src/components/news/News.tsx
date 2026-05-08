import { useLocation, useNavigate } from "react-router-dom";
import {
  correctIconGreen,
  // correctIconGreen,
  deleteIcon,
  // franceFlag,
  mediaIcon,
  penIcon,
  spanishFlag,
  usaFlag,
  // usaFlag,
} from "../../icons";
import Button from "../ui/button";
import { paths } from "../../config/paths";
import { useEffect, useMemo, useRef, useState } from "react";
import api from "../../lib/api";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import Pagination from "../ui/pagination";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { resetNews } from "../../redux-toolkit/newsSlice";
import ContentHeader from "../Subnavbar";
import {
  capitalize,
  concatImgURL,
  // extractYouTubeId,
  formatDate,
} from "../../config/function";
import { showToast } from "../../utils/toastUtils";
import { resetTags } from "../../redux-toolkit/tagSlice";
import StatusModel from "../StatusModel";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import { useDebounce } from "../../hooks/useDebounce";
import { setLastActiveSubTab } from "../../redux-toolkit/tabSlice";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { MdOutlineContentCopy } from "react-icons/md";
import { selectMenuPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { getPermissionFlags } from "../sidebar/menuPermissions";
import {
  selectListingState,
  setListingState,
} from "../../redux-toolkit/moduleListingSearchSlice";
import { useScroll } from "../../hooks/ScrollContext";
import { selectLanguage } from "../../redux-toolkit/languageSlice";
// import Lottie from "lottie-react";
// import loadingAnimation from "../../assets/animation/article-news-empty.json";

const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Image/Video", minWidth: "min-w-28 w-28" },
  { title: "Title", minWidth: "min-w-64 w-64" },
  // { title: "Categories", minWidth: "min-w-28 w-28" },
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
  { title: "Sponsor", minWidth: "min-w-28 w-28" },
  { title: "Status", minWidth: "min-w-24 w-24" },
  { title: "Languages", minWidth: "min-w-24 w-24" },
  { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Updated At", minWidth: "min-w-28 w-28" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];

const News = () => {
  const location = useLocation();
  const language = useSelector(selectLanguage);
  const queryClient = useQueryClient();
  const pathParts = location.pathname
    .split("/")
    .filter(Boolean)
    .map(capitalize);
  // const breadCrumbsItem = ["Home", ...pathParts];
  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts.map((part, index) => ({
      id: "/" + pathParts.slice(0, index + 1).join("/"),
      name: capitalize(part),
    })),
  ];

  const module = "news";
  const listingState = useSelector(selectListingState(module));
  const [allNews, setAllNews] = useState([]);
  const [page, setPage] = useState(listingState.page || 1);
  const { isScrolled } = useScroll();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState<null | {
    id: number;
    title: string;
  }>(null);
  const defaultVisibleColumns = [
    "ID",
    "Title",
    "Image/Video",
    // "Author",
    "Pub./Sche. At",
    // "Categories",
    // "Sponsor",
    // "Geo Country",
    "Status",
    "Languages",
    "Action",
  ];
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [tempVisibleColumns, setTempVisibleColumns] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState(listingState.search || "");

  const [showModal, setShowModal] = useState(false);
  const [draftModal, setDraftModal] = useState(false);
  const [dropdownNewsId, setDropdownNewsId] = useState<number | null>(null);
  const [selectedNewsData, setSelectedNewsData] = useState({});
  const [selectedNewsStatus, setSelectedNewsStatus] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuPermissions = useSelector(selectMenuPermissions);
  const { isCreate, isUpdate, isChangeStatus, isCopy, isDelete } =
    getPermissionFlags(menuPermissions.news);

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
  const debouncedSearch = useDebounce(searchInput, 300);

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
  const toggleStatusDropdown = (newsId: number) => {
    if (!isChangeStatus) return;
    setDropdownNewsId(dropdownNewsId === newsId ? null : newsId);
  };
  const getNews = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string, string?]>) => {
    const [, currentPage, language, title] = queryKey;
    const params: Record<string, any> = {
      page: currentPage,
      limit: 8,
      language_code: language,
    };
    if (title) {
      params.title = title;
    }
    if (debouncedSearch?.trim()) {
      params.search = debouncedSearch.trim();
    }
    return await api.get("/news", { params });
  };

  const { data: newsData, isFetching } = useQuery({
    queryKey: ["news", page, language, debouncedSearch],
    queryFn: getNews,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return newsData?.data?.totalPages || 1;
  }, [newsData?.data?.totalPages]);

  const handleEditNews = (id: number) => {
    if (!id) return;
    dispatch(setLastActiveSubTab(paths.media.news.path));
    navigate(`/media/news/edit/${id}`, {
      state: {
        fromPage: page, // 👈 send current pagination page
        fromSearch: searchInput, // current search
      },
    });
  };

  const handleCopyNews = (id: number) => {
    if (!isCopy) return;
    if (!id) return;
    navigate(`/media/news/create`, {
      state: {
        fromPage: page, // 👈 send current pagination page
        fromSearch: searchInput, // current search
        isCopy: true,
        copyNewsId: id,
      },
    });
  };

  const deleteNews = async (id: string) => {
    return api.delete(`/news/${id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news", page] });
      showToast("News deleted successfully", "success");
      setShowDeleteModal(false);
      if (newsData?.data.news.length == 1 && page > 1) {
        setPage((prev: any) => prev - 1);
      }
      setSelectedNews(null);
      dispatch(resetNews());
    },
    onError: () => {
      console.error("Failed to delete news");
    },
  });

  const handleConfirmDelete = () => {
    if (selectedNews?.id) {
      deleteMutation.mutate(String(selectedNews.id));
    }
  };

  const handleCreate = () => {
    dispatch(resetNews());
    dispatch(setLastActiveSubTab(paths.media.news.path));
    navigate(paths.media.news.create.getHref());
  };

  const handleTranslationClick = async (newsId: string, lang: "en" | "es") => {
    navigate(`/media/news/edit/${newsId}?lang=${lang}`);
  };

  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    navigate(id ? `` : `/dashboard`);
  };
  const updateStatus = async (payload: any) => {
    await api.patch(`/news/${selectedNews?.id}/change-status`, payload);
  };

  const updateStatusMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      showToast("Status Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["news"], exact: false });
      setShowModal(false);
      setDraftModal(false);
    },
    onError: (error) => {
      console.log("🚀 ~ News ~ error:", error);
    },
  });

  useEffect(() => {
    if (newsData?.data?.news) {
      setAllNews(newsData.data.news);
    }
  }, [newsData]);

  useEffect(() => {
    dispatch(resetTags());
  }, []);

  // const handleViewNews = (slug: string) => {
  //   const webSiteURL = `${import.meta.env.VITE_APP_WEBSITE_URL}/news/${slug}`;
  //   window.open(webSiteURL, "_blank");
  // };
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownNewsId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <ContentHeader
          title="News"
          breadCrumbsItem={breadCrumbsItem}
          onCreate={handleCreate}
          onBreadCrumbClick={handleBreadcrumbClick}
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
      <div className="container overflow-x-auto my-3 ">
        <table className="min-w-full table-fixed border-separate border-spacing-y-2 pb-16">
          <thead className="text-left">
            <tr>
              {columns
                .filter((col) => visibleColumns.includes(col.title))
                .map((col) => (
                  <th
                    key={col.title}
                    className={`py-2  text-black font-normal ${col.minWidth}`}
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
                {[...Array(5)].map((_, i) => (
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
            ) : allNews?.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No data available.
                  </div>
                  {/* <div className="flex items-center justify-center mt-28">
                    <Lottie
                      animationData={loadingAnimation}
                      style={{ width: "30%" }}
                    />
                  </div> */}
                </td>
              </tr>
            ) : (
              (allNews as any[])?.map((news, index) => {
                // const videoUrl = news.hero_video_url;
                // const videoId = videoUrl ? extractYouTubeId(videoUrl) : null;
                // const isNativeUrl = videoUrl?.startsWith(
                //   "https://ip-cms-api.ypstagingserver.com"
                // );
                const categories = news.categories
                  .map((item: any) => item.name)
                  .join(", ") || (
                  <span className="text-gray-400">No category</span>
                );

                return (
                  <tr key={news?.id} className="">
                    <td colSpan={visibleColumns.length}>
                      <div className="hover:bg-gray-100 transition bg-white border border-primary rounded-[15px] py-2 max-h-fit h-24">
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
                              {visibleColumns.includes("Image/Video") && (
                                <td className="text-base">
                                  <PhotoProvider maskOpacity={0.6}>
                                    {news.hero_image_url ? (
                                      <PhotoView
                                        src={concatImgURL(news.hero_image_url)}
                                      >
                                        <img
                                          // src={news.hero_image_url}
                                          src={concatImgURL(
                                            news.hero_image_url,
                                          )}
                                          className="w-20 h-14 object-cover rounded-xl cursor-pointer"
                                          alt="Video Thumbnail"
                                        />
                                      </PhotoView>
                                    ) : news.hero_media_thumbnail ? (
                                      <PhotoView
                                        src={concatImgURL(
                                          news.hero_media_thumbnail,
                                        )}
                                      >
                                        <img
                                          // src={news.hero_media_thumbnail}
                                          src={concatImgURL(
                                            news.hero_media_thumbnail,
                                          )}
                                          className="w-20 h-14 object-cover rounded-xl cursor-pointer"
                                          alt="Hero Image"
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
                                  <p className="w-60 line-clamp-3">
                                    {news.title?.length > 80
                                      ? `${news.title?.slice(0, 80)}...`
                                      : news.title}
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
                              {visibleColumns.includes("Author") && (
                                <td className="text-base text-left">
                                  <p className="w-16 break-words line-clamp-3">
                                    {news.author_name || "Unknown"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Pub. Platform") && (
                                <td className="text-base text-left">
                                  {news.publish_platforms?.join(", ") || "-"}
                                </td>
                              )}
                              {visibleColumns.includes("Restriction") && (
                                <td className="text-base text-left">
                                  <p className="w-32">
                                    {news.restriction_type
                                      ?.split("_")
                                      .join(" ") || "None"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Geo Country") && (
                                <td className="text-base text-left relative group">
                                  <p className="w-24 line-clamp-3">
                                    {news.geo_block_countries?.join(", ") ||
                                      "—"}
                                  </p>

                                  {news.geo_block_countries?.length > 9 && (
                                    <div className="absolute left-0 top-full mt-2 z-10 bg-black text-white text-xs p-2 rounded-lg max-w-xs opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 pointer-events-none transition- duration-300 ease-out">
                                      {news.geo_block_countries.join(", ")}
                                    </div>
                                  )}
                                </td>
                              )}
                              {visibleColumns.includes("Geo Mode") && (
                                <td className="text-base text-left">
                                  {news.geo_block_mode || "None"}
                                </td>
                              )}
                              {visibleColumns.includes("Pub./Sche. At") && (
                                <td className="text-base text-left">
                                  <p className=" w-36">
                                    {news.published_at ||
                                    news.schedule_at ||
                                    news.scheduled_at ? (
                                      formatDate(
                                        news.published_at
                                          ? news.published_at
                                          : news.schedule_at ||
                                              news.scheduled_at,
                                      )
                                    ) : (
                                      <span className=" text-gray-400">
                                        Not Published
                                      </span>
                                    )}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Read Time") && (
                                <td className="text-base text-left">
                                  {news.read_time == null
                                    ? "—"
                                    : `${news.read_time} Minutes`}
                                </td>
                              )}
                              {visibleColumns.includes("Logged In") && (
                                <td className="text-base text-left">
                                  {news.must_be_logged_in ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Verified") && (
                                <td className="text-base text-left">
                                  {news.must_be_verified ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Over 18") && (
                                <td className="text-base text-left">
                                  {news.must_be_over_18 ? "Yes" : "No"}
                                </td>
                              )}

                              {visibleColumns.includes("Sponsor") && (
                                <td className="text-base text-left line-clamp-3">
                                  {news.sponsor_name?.length > 30
                                    ? `${news.sponsor_name.slice(0, 27)}...`
                                    : news.sponsor_name || "—"}
                                </td>
                              )}
                              {visibleColumns.includes("Status") && (
                                <td
                                  className="text-base relative  text-left cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleStatusDropdown(news.id);
                                  }}
                                >
                                  <div
                                    className={`${
                                      news.status === "published"
                                        ? "bg-green-600"
                                        : news.status === "scheduled"
                                          ? "bg-blue-600"
                                          : "bg-primary"
                                    } text-white font-semibold py-1 rounded-lg w-28 flex justify-evenly ${
                                      !isChangeStatus
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }`}
                                  >
                                    <span className="">
                                      {capitalize(news.status)}
                                    </span>
                                    {/* <img
                                      src={chevronRight}
                                      alt=""
                                      className={`transition-transform duration-200 ${
                                        dropdownArticleId === article.id
                                          ? "rotate-90"
                                          : ""
                                      }`}
                                    /> */}
                                  </div>
                                  {dropdownNewsId === news.id && (
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
                                              news.status,
                                          )
                                          .map((status) => (
                                            <li
                                              key={status}
                                              className="cursor-pointer px-4 py-2 font-medium hover:bg-primary rounded-xl hover:duration-500 transform transition-all"
                                              onClick={() => {
                                                setSelectedNewsData(news);
                                                setSelectedNewsStatus(status);
                                                setSelectedNews({
                                                  id: news.id,
                                                  title: news.title,
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
                                  <div className="flex items-center justify-center gap-2 ">
                                    <Button
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isUpdate &&
                                        "opacity-50 cursor-not-allowed"
                                      }`}
                                      disabled={!isUpdate}
                                      icon={
                                        news.languages.includes("en")
                                          ? correctIconGreen
                                          : penIcon
                                      }
                                      onClick={() =>
                                        handleTranslationClick(news?.id, "en")
                                      }
                                    />
                                    <Button
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isUpdate &&
                                        "opacity-50 cursor-not-allowed"
                                      }`}
                                      disabled={!isUpdate}
                                      icon={
                                        news.languages.includes("es")
                                          ? correctIconGreen
                                          : penIcon
                                      }
                                      onClick={() =>
                                        handleTranslationClick(news?.id, "es")
                                      }
                                    />
                                  </div>
                                </td>
                              )}
                              {visibleColumns.includes("Created At") && (
                                <td className="text-base text-left">
                                  {formatDate(news.created_at)}
                                </td>
                              )}
                              {visibleColumns.includes("Updated At") && (
                                <td className="text-base text-left">
                                  {formatDate(news.updated_at)}
                                </td>
                              )}

                              {visibleColumns.includes("Action") && (
                                <td className="">
                                  <div className="flex items-center justify-center gap-3">
                                    {/* <Button
                                      icon={eyeOpenIcon}
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isView &&
                                        "opacity-50 cursor-not-allowed"
                                      }`}
                                      onClick={() => handleViewNews(news?.slug)}
                                      disabled={!isView}
                                    /> */}
                                    <Button
                                      icon={penIcon}
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isUpdate &&
                                        "opacity-50 cursor-not-allowed"
                                      }`}
                                      onClick={() => handleEditNews(news?.id)}
                                      disabled={!isUpdate}
                                    />
                                    <span
                                      className={`p-0 ${
                                        !isCopy
                                          ? "opacity-50 cursor-not-allowed"
                                          : "cursor-pointer"
                                      }`}
                                      onClick={() => handleCopyNews(news?.id)}
                                    >
                                      <MdOutlineContentCopy />
                                    </span>
                                    <Button
                                      icon={deleteIcon}
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isDelete &&
                                        "opacity-50 cursor-not-allowed"
                                      }`}
                                      onClick={() => {
                                        setSelectedNews({
                                          id: news?.id,
                                          title: news?.title,
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
      <DeleteConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedNews?.title}
        isLoading={deleteMutation.isPending}
      />
      {showModal && (
        <StatusModel
          show={showModal}
          onClose={() => setShowModal(false)}
          data={selectedNewsData}
          selectedStatus={selectedNewsStatus}
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
      {allNews?.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default News;
