import { useLocation, useNavigate } from "react-router-dom";
import {
  // chevronRight,
  correctIconGreen,
  deleteIcon,
  // downarrow,
  eyeOpenIcon,
  franceFlag,
  mediaIcon,
  penIcon,
  usaFlag,
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
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useDispatch } from "react-redux";
import { resetArticle } from "../../redux-toolkit/articleSlice";
import ContentHeader from "../Subnavbar";
import {
  capitalize,
  concatImgURL,
  // extractYouTubeId,
  formatDate,
} from "../../config/function";
import { showToast } from "../../utils/toastUtils";
// import BentoModal from "../blocks/bentobox/BentoModal";
import StatusModel from "../StatusModel";
import ChangeStatusModal from "./ChangeStatusModal";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import { useDebounce } from "../../hooks/useDebounce";
import { setLastActiveSubTab } from "../../redux-toolkit/tabSlice";
import { PhotoProvider, PhotoView } from "react-photo-view";

const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Image/Video", minWidth: "min-w-28 w-28 " },
  { title: "Title", minWidth: "min-w-64 w-64" },
  { title: "Categories", minWidth: "min-w-28 w-28" },
  { title: "Author", minWidth: "min-w-20 w-20" },
  { title: "Pub. Platform", minWidth: "min-w-28  w-28" },
  { title: "Restriction", minWidth: "min-w-32 w-32" },
  { title: "Geo Country", minWidth: "min-w-28  w-28" },
  { title: "Geo Mode", minWidth: "min-w-24 w-24" },
  { title: "Pub./Sche. At", minWidth: "min-w-36 w-36" },
  { title: "Read Time", minWidth: "min-w-24 w-24" },
  { title: "Logged In", minWidth: "min-w-20 w-20" },
  { title: "Verified", minWidth: "min-w-20 w-20" },
  { title: "Over 18", minWidth: "min-w-20 w-20" },
  { title: "Sponsor", minWidth: "min-w-28 w-28" },
  { title: "Status", minWidth: "min-w-24 w-24" },
  { title: "Languages", minWidth: "min-w-20 w-20" },
  { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Updated At", minWidth: "min-w-28 w-28" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];

const Articles = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts.map((part, index) => ({
      id: "/" + pathParts.slice(0, index + 1).join("/"),
      name: capitalize(part),
    })),
  ];

  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    navigate(id ? `` : `/dashboard`);
  };

  const [allArticles, setAllArticles] = useState([]);
  const [page, setPage] = useState(1);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<null | {
    id: number;
    title: string;
  }>(null);
  const [createLoading, setCreateLoading] = useState(false);

  const defaultVisibleColumns = [
    "ID",
    "Title",
    "Image/Video",
    "Author",
    "Pub./Sche. At",
    "Categories",
    "Geo Country",
    "Status",
    "Languages",
    "Action",
  ];
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [tempVisibleColumns, setTempVisibleColumns] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [draftModal, setDraftModal] = useState(false);
  const [dropdownArticleId, setDropdownArticleId] = useState<number | null>(
    null
  );
  const [selectedArticleData, setSelectedArticleData] = useState({});
  const [selectedArticleStatus, setSelectedArticleStatus] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        : [...prev, title]
    );
  };

  const applyColumnChanges = () => {
    setVisibleColumns([
      ...new Set([...tempVisibleColumns, ...defaultVisibleColumns]),
    ]);
    setShowDropdown(false);
  };
  const toggleStatusDropdown = (articleId: number) => {
    setDropdownArticleId(dropdownArticleId === articleId ? null : articleId);
  };

  const getArticles = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string?]>) => {
    const [, currentPage, title] = queryKey;

    const params: Record<string, any> = {
      page: currentPage,
      limit: 8,
    };

    if (title) {
      params.title = title;
    }
    return await api.get("/articles", { params });
  };

  const { data: articleData, isFetching } = useQuery({
    queryKey: ["articles", page, debouncedSearch],
    queryFn: getArticles,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return articleData?.data?.totalPages || 1;
  }, [articleData?.data?.totalPages]);

  const handleEditArticle = (id: number) => {
    if (!id) return;
    dispatch(setLastActiveSubTab(paths.media.articles.path || null));
    navigate(`/media/articles/edit/${id}`);
  };

  const deleteArticle = async (id: string) => {
    return api.delete(`/articles/${id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles", page],
        exact: false,
      });
      showToast("Article deleted successfully", "success");
      setShowDeleteModal(false);
      setSelectedArticle(null);
      dispatch(resetArticle());
    },
    onError: () => {
      console.error("Failed to delete an article");
    },
  });

  const handleConfirmDelete = () => {
    if (selectedArticle?.id) {
      deleteMutation.mutate(String(selectedArticle.id));
    }
  };

  const handleCreate = () => {
    if (createLoading) return;
    setCreateLoading(true);
    dispatch(resetArticle());
    dispatch(setLastActiveSubTab(paths.media.articles.path || null));
    navigate(paths.media.articles.create.getHref());
  };

  const updateStatus = async (payload: any) => {
    await api.patch(`/articles/${selectedArticle?.id}/change-status`, payload);
  };

  const updateStatusMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      showToast("Status Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["articles"], exact: false });
      setShowModal(false);
      setDraftModal(false);
    },
    onError: (error) => {
      console.log("Error updating status", error);
    },
  });

  const handleTranslationClick = async (
    articleId: string,
    lang: "en" | "fr"
  ) => {
    navigate(`/media/articles/edit/${articleId}?lang=${lang}`);
  };

  useEffect(() => {
    if (articleData?.data?.articles) {
      setAllArticles(articleData.data.articles);
    }
  }, [articleData]);

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [searchInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownArticleId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setCreateLoading(false);
  }, [location.pathname]);

  return (
    <div className="mt-10">
      <ContentHeader
        title="Articles"
        breadCrumbsItem={breadCrumbsItem}
        onBreadCrumbClick={handleBreadcrumbClick}
        onTempelate={() => console.log("From Template")}
        onCreate={handleCreate}
        onCreateLoading={createLoading}
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
            ) : allArticles.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No article data available.
                  </div>
                </td>
              </tr>
            ) : (
              (allArticles as any[])?.map((article, index) => {
                // const videoUrl = article.hero_video_url;
                // const videoId = videoUrl ? extractYouTubeId(videoUrl) : null;
                // const isNativeUrl = videoUrl?.startsWith(
                //   "https://ip-cms-api.ypstagingserver.com"
                // );
                const categories =
                  article.categories.map((item: any) => item.name).join(", ") ||
                  "No category";

                return (
                  <tr key={article?.id} className="">
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
                              {visibleColumns.includes("ID") && (
                                <td className="text-base text-left ps-3">
                                  {index + 1}
                                </td>
                              )}
                              {visibleColumns.includes("Image/Video") && (
                                <td className="text-base">
                                  <PhotoProvider maskOpacity={0.6}>
                                    {article.hero_image_url ? (
                                      <PhotoView src={concatImgURL(article.hero_image_url)}>
                                        <img
                                          src={concatImgURL(article.hero_image_url)}
                                          className="w-20 h-14 object-cover rounded-xl cursor-pointer"
                                          alt="Video Thumbnail"
                                        />
                                      </PhotoView>
                                    ) : article.hero_media_thumbnail ? (
                                      <PhotoView
                                        src={article.hero_media_thumbnail}
                                      >
                                        <img
                                          src={article.hero_media_thumbnail}
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
                                    {article.title.length > 80
                                      ? `${article.title.slice(0, 80)}...`
                                      : article.title}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Categories") && (
                                <td className="text-base text-left">
                                  <p className="w-24 line-clamp-3">
                                    {categories.length > 25
                                      ? `${categories.slice(0, 25)}...`
                                      : categories}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Author") && (
                                <td className="text-base text-left">
                                  <p className="w-16 break-words line-clamp-3">
                                    {article.author_name || "—"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Pub. Platform") && (
                                <td className="text-base text-left">
                                  {article.publish_platforms?.join(", ") || "—"}
                                </td>
                              )}
                              {visibleColumns.includes("Restriction") && (
                                <td className="text-base text-left">
                                  <p className="w-32">
                                    {article.restriction_type
                                      ?.split("_")
                                      .join(" ") || "None"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Geo Country") && (
                                <td className="text-base text-left relative group">
                                  <p className="w-24 line-clamp-3">
                                    {article.geo_block_countries?.join(", ") ||
                                      "—"}
                                  </p>

                                  {article.geo_block_countries?.length > 9 && (
                                    <div className="absolute left-0 top-full mt-2 z-10 bg-black text-white text-xs p-2 rounded-lg max-w-xs opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 pointer-events-none transition- duration-300 ease-out">
                                      {article.geo_block_countries.join(", ")}
                                    </div>
                                  )}
                                </td>
                              )}
                              {visibleColumns.includes("Geo Mode") && (
                                <td className="text-base text-left">
                                  {article.geo_block_mode || "None"}
                                </td>
                              )}
                              {visibleColumns.includes("Pub./Sche. At") && (
                                <td className="text-base text-left">
                                  <p className="w-3/4">
                                    {article.published_at ||
                                    article.schedule_at ||
                                    article.scheduled_at ? (
                                      formatDate(
                                        article.published_at
                                          ? article.published_at
                                          : article.schedule_at ||
                                              article.scheduled_at
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
                                <td className="text-base capitalize text-left">
                                  {article.read_time == null
                                    ? "—"
                                    : `${article.read_time} Minutes`}
                                </td>
                              )}
                              {visibleColumns.includes("Logged In") && (
                                <td className="text-base text-left">
                                  {article.must_be_logged_in ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Verified") && (
                                <td className="text-base text-left">
                                  {article.must_be_verified ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Over 18") && (
                                <td className="text-base text-left">
                                  {article.must_be_over_18 ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Sponsor") && (
                                <td className="text-base text-left">
                                  {article.sponsor_name?.length > 30
                                    ? `${article.sponsor_name.slice(0, 27)}...`
                                    : article.sponsor_name || "—"}
                                </td>
                              )}
                              {visibleColumns.includes("Status") && (
                                <td
                                  className="text-base  relative text-left cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleStatusDropdown(article.id);
                                  }}
                                >
                                  <div
                                    className={`${
                                      article.status === "published"
                                        ? "bg-green-600"
                                        : article.status === "scheduled"
                                        ? "bg-blue-600"
                                        : "bg-primary"
                                    } text-white font-semibold py-1 rounded-lg w-24 flex justify-evenly`}
                                  >
                                    <span className="">
                                      {capitalize(article.status)}
                                    </span>
                                  </div>
                                  {dropdownArticleId === article.id && (
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
                                              article.status
                                          )
                                          .map((status) => (
                                            <li
                                              key={status}
                                              className="cursor-pointer px-4 py-2 font-medium hover:bg-primary rounded-xl hover:duration-500 transform transition-all"
                                              onClick={() => {
                                                setSelectedArticleData(article);
                                                setSelectedArticleStatus(
                                                  status
                                                );
                                                setSelectedArticle({
                                                  id: article.id,
                                                  title: article.title,
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
                                      className="p-0"
                                      // disabled={article.languages.includes(
                                      //   "en"
                                      // )}
                                      icon={
                                        article.languages.includes("en")
                                          ? correctIconGreen
                                          : penIcon
                                      }
                                      onClick={() =>
                                        handleTranslationClick(
                                          article?.id,
                                          "en"
                                        )
                                      }
                                    />
                                    <Button
                                      backgroundColor="transparent"
                                      className="p-0"
                                      // disabled={article.languages.includes(
                                      //   "fr"
                                      // )}
                                      icon={
                                        article.languages.includes("fr")
                                          ? correctIconGreen
                                          : penIcon
                                      }
                                      onClick={() =>
                                        handleTranslationClick(
                                          article?.id,
                                          "fr"
                                        )
                                      }
                                    />
                                  </div>
                                </td>
                              )}
                              {visibleColumns.includes("Created At") && (
                                <td className="text-base text-left">
                                  {formatDate(article.created_at)}
                                </td>
                              )}
                              {visibleColumns.includes("Updated At") && (
                                <td className="text-base text-left">
                                  {formatDate(article.updated_at)}
                                </td>
                              )}
                              {visibleColumns.includes("Action") && (
                                <td className="">
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
                                        handleEditArticle(article?.id)
                                      }
                                    />
                                    <Button
                                      icon={deleteIcon}
                                      backgroundColor="transparent"
                                      className="p-0"
                                      onClick={() => {
                                        setSelectedArticle({
                                          id: article?.id,
                                          title: article?.title,
                                        });
                                        setShowDeleteModal(true);
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

      <DeleteConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedArticle?.title}
        isLoading={deleteMutation.isPending}
      />

      {showModal && (
        <StatusModel
          show={showModal}
          onClose={() => setShowModal(false)}
          data={selectedArticleData}
          selectedStatus={selectedArticleStatus}
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
      {allArticles.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default Articles;
