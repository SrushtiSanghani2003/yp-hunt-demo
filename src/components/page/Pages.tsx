import { useLocation, useNavigate } from "react-router-dom";
import {
  chevronRight,
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
import { useDispatch, useSelector } from "react-redux";
// import { resetArticle } from "../../redux-toolkit/articleSlice";
import ContentHeader from "../Subnavbar";
import {
  capitalize,
  concatImgURL,
  extractYouTubeId,
  formatDate,
} from "../../config/function";
import { showToast } from "../../utils/toastUtils";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import { AnimatePresence, motion } from "framer-motion";
import { resetPage } from "../../redux-toolkit/pageSlice";
import StatusModel from "../StatusModel";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import ChildPage from "./ChildPage";
import { useDebounce } from "../../hooks/useDebounce";
import { PhotoProvider, PhotoView } from "react-photo-view";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { MdOutlineContentCopy } from "react-icons/md";
import { selectMenuPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { getPermissionFlags } from "../sidebar/menuPermissions";
import {
  selectListingState,
  setListingState,
} from "../../redux-toolkit/moduleListingSearchSlice";
import { useScroll } from "../../hooks/ScrollContext";
import { selectLanguage } from "../../redux-toolkit/languageSlice";

// import { MdOutlineContentCopy } from "react-icons/md";

const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Image", minWidth: "min-w-28 w-28" },
  { title: "Title", minWidth: "min-w-72 w-72" },
  { title: "Order", minWidth: "min-w-16 w-16" },
  { title: "Slug", minWidth: "min-w-44 w-44" },
  // { title: "Categories", minWidth: "min-w-32 w-32" },
  { title: "Plat Form", minWidth: "min-w-20 w-20" },
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
  { title: "Languages", minWidth: "min-w-20 w-20" },
  { title: "Status", minWidth: "min-w-28 w-28" },
  { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Updated At", minWidth: "min-w-28 w-28" },

  { title: "Action", minWidth: "min-w-28 w-28" },
];

const Pages = () => {
  const location = useLocation();
  const language = useSelector(selectLanguage);
  const queryClient = useQueryClient();
  const { isScrolled } = useScroll();

  const menuPermissions = useSelector(selectMenuPermissions);
  const {
    isCreate,
    isCopy,
    isDelete,
    isUpdate,
    isChangeStatus,
    isChangeOrder,
  } = getPermissionFlags(menuPermissions.pages);
  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts.map((part, index) => ({
      id: "/" + pathParts.slice(0, index + 1).join("/"),
      name: capitalize(part),
    })),
  ];
  const module = "pages";
  const listingState = useSelector(selectListingState(module));
  const [allPages, setAllPages] = useState([]);
  const [pageItem, setPageItem] = useState(listingState.page);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState<null | {
    id: number;
    title: string;
  }>(null);

  const defaultVisibleColumns = [
    "ID",
    "Title",
    "Image",
    "Pub./Sche. At",
    "Slug",
    "Plat Form",
    "Status",
    "Order",
    "Languages",
    "Action",
  ];
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [tempVisibleColumns, setTempVisibleColumns] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState(listingState.search || "");

  const [expandedPageId, setExpandedPageId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [draftModal, setDraftModal] = useState(false);
  const [dropdownPageId, setDropdownPageId] = useState<number | null>(null);
  const [selectedPageData, setSelectedPageData] = useState({});
  const [selectedPageStatus, setSelectedPageStatus] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(searchInput, 300);

  const togglePage = (id: number) => {
    setExpandedPageId((prev) => (prev === id ? null : id));
  };

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
  const toggleStatusDropdown = (pageId: number) => {
    if (!isChangeStatus) return;
    setDropdownPageId(dropdownPageId === pageId ? null : pageId);
  };
  const getPages = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string, string?]>) => {
    const [, currentPage, language, debouncedSearch] = queryKey;

    const params: Record<string, any> = {
      page: currentPage,
      limit: 8,
      language_code: language,
    };

    if (debouncedSearch?.trim()) {
      params.search = debouncedSearch.trim();
    }
    return await api.get("/pages", { params });
  };

  const { data: pagesData, isFetching } = useQuery({
    queryKey: ["pages", pageItem, language, debouncedSearch],
    queryFn: getPages,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return pagesData?.data?.totalPages || 1;
  }, [pagesData?.data?.totalPages]);

  const handleEditPage = (id: number) => {
    if (!id) return;
    navigate(`/pages/edit/${id}`, {
      state: {
        fromPage: pageItem, // 👈 send current pagination page
        fromSearch: searchInput, // current search
      },
    });
  };

  const handleCopyPage = (id: number) => {
    if (!isCopy) return;
    if (!id) return;
    navigate(`/pages/create`, {
      state: {
        fromPage: pageItem, // 👈 send current pagination page
        fromSearch: searchInput, // current search
        isCopy: true,
        copyPageId: id,
      },
    });
  };

  // const [expandedCategoryIds, setExpandedCategoryIds] = useState<number[]>([]);

  // const toggleCategory = (id: number) => {
  //   setExpandedCategoryIds((prev) =>
  //     prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
  //   );
  // };

  const deletePage = async (id: string) => {
    return await api.delete(`/pages/${id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: deletePage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pages"],
        exact: false,
      });
      showToast("Page deleted successfully", "success");
      setShowDeleteModal(false);
      if (pagesData?.data.pages.length == 1 && pageItem > 1) {
        setPageItem((prev: any) => prev - 1);
      }
      setSelectedPage(null);
      dispatch(resetPage());
    },
    onError: () => {
      console.error("Failed to delete an page");
    },
  });

  const handleConfirmDelete = () => {
    if (selectedPage?.id) {
      deleteMutation.mutate(String(selectedPage.id));
    }
  };

  const handleCreate = () => {
    dispatch(resetPage());
    navigate(paths.pages.create.getHref());
  };

  const updateStatus = async (payload: any) => {
    await api.patch(`/pages/${selectedPage?.id}/change-status`, payload);
  };

  const updateStatusMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      showToast("Status Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["pages"], exact: false });
      setShowModal(false);
      setDraftModal(false);
    },
    onError: (error) => {
      console.log("🚀 ~ Pages ~ error:", error);
    },
  });

  const handleTranslationClick = async (pagesId: string, lang: "en" | "es") => {
    navigate(`/pages/edit/${pagesId}?lang=${lang}`);
  };

  useEffect(() => {
    if (pagesData?.data.pages) {
      setAllPages(pagesData?.data.pages);
    }
  }, [pagesData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownPageId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const firstRender = useRef(true);
  useEffect(() => {
    if (debouncedSearch) {
      setPageItem(1);
    }
  }, [debouncedSearch]);
  useEffect(() => {
    dispatch(
      setListingState({
        module,
        page: pageItem,
        search: searchInput,
      }),
    );
  }, [pageItem, searchInput]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return; // skip first render
    }
    setPageItem(1); // only reset when user types new search
  }, [debouncedSearch]);

  const handleOrderClick = async (
    id: number,
    current_order: number,
    totalDocs: number,
  ) => {
    if (!isChangeOrder) return;
    const { value: new_order, isConfirmed } = await Swal.fire({
      title: "Update Order",
      input: "number",
      inputLabel: "Enter new order number",
      inputValue: current_order,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "Update",
      confirmButtonColor: "#fcd100",
      inputValidator: (value) => {
        if (!value) return "You need to enter a value!";
        if (isNaN(Number(value))) return "Order must be a number!";
        if (parseInt(value) < 1 || parseInt(value) > totalDocs)
          return `Order must be between 1 and ${totalDocs}`;
        return undefined;
      },
    });

    if (isConfirmed && new_order && parseInt(new_order) !== current_order) {
      const payload = { sort_order: parseInt(new_order) };
      try {
        await api.patch(`/common/change-order/Page/${id}`, payload);

        toast.success(`Order updated to ${new_order}`);
        await queryClient.invalidateQueries({
          queryKey: ["pages"],
          exact: false,
        });
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || // backend message
          error?.message || // axios error message
          "Failed to update order"; // fallback

        toast.error(errorMessage);
      }
    }
  };

  return (
    <div>
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <ContentHeader
          title="Pages"
          breadCrumbsItem={breadCrumbsItem}
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
      <div className="container overflow-x-auto my-3 grid grid-cols-1">
        <table className="min-w-full table-fixed border-separate border-spacing-y-2 pb-16">
          <thead className="text-left">
            <tr>
              {columns
                .filter((col) => visibleColumns.includes(col.title))
                .map((col) => (
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
                    {/* <span
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
                    </span> */}
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
            ) : allPages?.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No data available.
                  </div>
                </td>
              </tr>
            ) : (
              (allPages as any[])?.map((page, index) => {
                const videoUrl = page.hero_video_url;
                const videoId = videoUrl ? extractYouTubeId(videoUrl) : null;
                const isImage = page.hero_media.find(
                  (item: any) => item.media_type == "image",
                );
                // const isNative = page.hero_media.find(
                //   (item: any) =>
                //     item.media_type == "video" && item.media_source == "native"
                // );
                const isVideo = page.hero_media.find(
                  (item: any) => item.media_type == "video",
                );
                const categories = page.categories
                  .map((item: any) => item.name)
                  .join(", ") || (
                  <span className="text-gray-400">No category</span>
                );

                return (
                  <tr key={page?.id} className="">
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
                              {visibleColumns.includes("Image") && (
                                <td className="text-base">
                                  <PhotoProvider maskOpacity={0.6}>
                                    {isImage ? (
                                      // <PhotoView src={isImage.media_url}>
                                      <PhotoView
                                        src={concatImgURL(isImage.media_url)}
                                      >
                                        <img
                                          // src={isImage.media_url}
                                          src={concatImgURL(isImage.media_url)}
                                          className="w-20 h-14 object-cover rounded-xl cursor-pointer"
                                          alt="Hero Image"
                                        />
                                      </PhotoView>
                                    ) : isVideo ? (
                                      // <PhotoView src={isVideo.video_thumbnail}>
                                      <PhotoView
                                        src={concatImgURL(
                                          isVideo.video_thumbnail,
                                        )}
                                      >
                                        <img
                                          // src={isVideo.video_thumbnail}
                                          src={concatImgURL(
                                            isVideo.video_thumbnail,
                                          )}
                                          className="w-20 h-14 object-cover rounded-xl cursor-pointer"
                                          alt="YouTube Thumbnail"
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
                              {visibleColumns.includes("Title") && (
                                <td className="text-base text-left">
                                  <div
                                    className="flex items-center justify-between gap-4 cursor-pointer"
                                    onClick={() => togglePage(page?.id)}
                                  >
                                    <p
                                      className={`line-clamp-3 ${
                                        page.children?.length > 0
                                          ? "w-44"
                                          : "w-64"
                                      }`}
                                    >
                                      {page.title?.length > 80
                                        ? `${page.title.slice(0, 80)}...`
                                        : page.title}
                                    </p>
                                    {page.children?.length > 0 && (
                                      <span
                                        className={`transition-transform duration-300 px-4 ${
                                          expandedPageId == page.id
                                            ? "rotate-90"
                                            : "rotate-0"
                                        }`}
                                      >
                                        <img src={chevronRight} alt="Toggle" />
                                      </span>
                                    )}
                                  </div>
                                </td>
                              )}
                              {visibleColumns.includes("Order") && (
                                <td className="text-base text-left">
                                  <p className="w-16 px-4">
                                    <span
                                      className={`${
                                        !isChangeOrder
                                          ? "opacity-50 cursor-not-allowed"
                                          : "cursor-pointer"
                                      }`}
                                      onClick={() =>
                                        handleOrderClick(
                                          page?.id,
                                          page?.sort_order,
                                          // null, // or pass actual parent_id if it's a child
                                          pagesData?.data?.totalDocs ||
                                            pagesData?.data?.length, // total number of pages
                                        )
                                      }
                                    >
                                      {page?.sort_order || "-"}
                                    </span>
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Slug") && (
                                <td className="text-base text-left">
                                  <p className="w-40 line-clamp-2">
                                    {page.slug || "—"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Plat Form") && (
                                <td className="text-base text-left">
                                  <p className="w-16 line-clamp-2 capitalize">
                                    {page.platform_type || "—"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Categories") && (
                                <td className="text-base text-left">
                                  <p className="w-24 line-clamp-3">
                                    {categories?.length > 25
                                      ? `${categories?.slice(0, 25)}...`
                                      : categories}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Author") && (
                                <td className="text-base text-left">
                                  <p className="w-16 break-words line-clamp-3">
                                    {page.author_name || "—"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Pub. Platform") && (
                                <td className="text-base text-left">
                                  {page.publish_platforms?.join(", ") || "—"}
                                </td>
                              )}
                              {visibleColumns.includes("Restriction") && (
                                <td className="text-base text-left">
                                  <p className="w-32">
                                    {page.restriction_type
                                      ?.split("_")
                                      .join(" ") || "None"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Geo Country") && (
                                <td className="text-base text-left">
                                  <p className="w-24 line-clamp-3">
                                    {page.geo_block_country?.join(", ") || "—"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Geo Mode") && (
                                <td className="text-base text-left">
                                  {page.geo_block_mode || "None"}
                                </td>
                              )}
                              {visibleColumns.includes("Pub./Sche. At") && (
                                <td className="text-base text-left">
                                  {page.published_at ||
                                  page.schedule_at ||
                                  page.scheduled_at ? (
                                    formatDate(
                                      page.published_at
                                        ? page.published_at
                                        : page.schedule_at || page.scheduled_at,
                                    )
                                  ) : (
                                    <span className=" text-gray-400">
                                      Not Published
                                    </span>
                                  )}
                                </td>
                              )}
                              {visibleColumns.includes("Read Time") && (
                                <td className="text-base text-left">
                                  {`${page.read_time} Minutes` || "—"}
                                </td>
                              )}
                              {visibleColumns.includes("Logged In") && (
                                <td className="text-base text-left">
                                  {page.must_be_logged_in ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Verified") && (
                                <td className="text-base text-left">
                                  {page.must_be_verified ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Over 18") && (
                                <td className="text-base text-left">
                                  {page.must_be_over_18 ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Sponsor") && (
                                <td className="text-base text-left line-clamp-3">
                                  {page.sponsor_name || "—"}
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
                                      icon={
                                        page.languages.includes("en")
                                          ? correctIconGreen
                                          : penIcon
                                      }
                                      onClick={() =>
                                        handleTranslationClick(page?.id, "en")
                                      }
                                    />
                                    <Button
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isUpdate &&
                                        "opacity-50 cursor-not-allowed"
                                      }`}
                                      icon={
                                        page.languages.includes("es")
                                          ? correctIconGreen
                                          : penIcon
                                      }
                                      onClick={() =>
                                        handleTranslationClick(page?.id, "es")
                                      }
                                      disabled={!isUpdate}
                                    />
                                  </div>
                                </td>
                              )}
                              {visibleColumns.includes("Status") && (
                                <td
                                  className="text-base relative  text-left cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleStatusDropdown(page.id);
                                  }}
                                >
                                  <div
                                    className={`${
                                      page.status === "published"
                                        ? "bg-green-600"
                                        : page.status === "scheduled"
                                          ? "bg-blue-600"
                                          : "bg-primary"
                                    } text-white font-semibold py-1 rounded-lg w-24 flex justify-evenly mx-auto ${
                                      !isChangeStatus
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }`}
                                  >
                                    <span className="">
                                      {capitalize(page.status)}
                                    </span>
                                  </div>
                                  {dropdownPageId === page.id && (
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
                                              page.status,
                                          )
                                          .map((status) => (
                                            <li
                                              key={status}
                                              className="cursor-pointer px-4 py-2 font-medium hover:bg-primary rounded-xl hover:duration-500 transform transition-all"
                                              onClick={() => {
                                                setSelectedPageData(page);
                                                setSelectedPageStatus(status);
                                                setSelectedPage({
                                                  id: page.id,
                                                  title: page.title,
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
                              {visibleColumns.includes("Created At") && (
                                <td className="text-base text-left">
                                  {formatDate(page.created_at)}
                                </td>
                              )}
                              {visibleColumns.includes("Updated At") && (
                                <td className="text-base text-left">
                                  {formatDate(page.updated_at)}
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
                                        !isUpdate && "opacity-50"
                                      }`}
                                      onClick={() => handleEditPage(page?.id)}
                                      disabled={!isUpdate}
                                    />
                                    <span
                                      className={`cursor-pointer ${
                                        !isCopy
                                          ? "opacity-50 cursor-not-allowed"
                                          : ""
                                      }`}
                                      onClick={() => handleCopyPage(page?.id)}
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
                                        setSelectedPage({
                                          id: page?.id,
                                          title: page?.title,
                                        });
                                        setShowDeleteModal(true);
                                      }}
                                      disabled={!isDelete}
                                    />
                                  </div>
                                </td>
                              )}
                            </tr>
                            <tr>
                              <td
                                colSpan={visibleColumns.length}
                                className="p-0"
                              >
                                <AnimatePresence initial={false}>
                                  {expandedPageId == page.id &&
                                    page.children?.length > 0 && (
                                      <motion.div
                                        key="modules"
                                        initial={{ height: 0 }}
                                        animate={{ height: "auto" }}
                                        exit={{ height: 0 }}
                                        transition={{
                                          duration: 0.3,
                                          ease: "easeInOut",
                                        }}
                                        className="px-2 mt-2"
                                      >
                                        {page.children.map(
                                          (child: any, childIndex: number) => (
                                            <ChildPage
                                              key={child.id}
                                              pageChild={child}
                                              childIndex={childIndex}
                                              videoId={videoId}
                                              visibleColumns={visibleColumns}
                                              setShowDeleteModal={
                                                setShowDeleteModal
                                              } // from parent
                                              setSelectedPage={setSelectedPage} // from parent
                                              handleConfirmDelete={
                                                handleConfirmDelete
                                              }
                                              parentId={page.id}
                                              fromPage={pageItem}
                                              fromSearch={searchInput}
                                            />
                                            // <div
                                            //   key={child.id}
                                            //   className="bg-white border border-primary rounded-[15px] p-3 mt-2"
                                            // >
                                            //   <table className="w-full">
                                            //     <tbody>
                                            //       <tr>
                                            //         <td className="w-[50px] text-left"></td>
                                            //         <td className="w-1/2 ps-2">
                                            //           <p className="font-semibold">
                                            //             {child.name}
                                            //           </p>
                                            //         </td>
                                            //         <td className="text-left w-[120px]">
                                            //           {child.deleted_at || "—"}
                                            //         </td>
                                            //         <td className="text-left w-[120px]">
                                            //           <span
                                            //             className={`px-2 py-0.5 rounded-full text-xs ${
                                            //               child.is_active
                                            //                 ? "bg-green-100 text-green-700"
                                            //                 : "bg-red-100 text-red-700"
                                            //             }`}
                                            //           >
                                            //             {child.is_active
                                            //               ? "Active"
                                            //               : "Inactive"}
                                            //           </span>
                                            //         </td>
                                            //         <td className="w-[168px] text-left"></td>
                                            //       </tr>
                                            //     </tbody>
                                            //   </table>
                                            // </div>
                                          ),
                                        )}
                                      </motion.div>
                                    )}
                                </AnimatePresence>
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

      {showModal && (
        <StatusModel
          show={showModal}
          onClose={() => setShowModal(false)}
          data={selectedPageData}
          selectedStatus={selectedPageStatus}
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

      {allPages?.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={pageItem}
          totalPages={totalPages}
          onPageChange={setPageItem}
        />
      )}
    </div>
  );
};

export default Pages;
