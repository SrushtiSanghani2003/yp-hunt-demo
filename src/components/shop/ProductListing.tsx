import { useDispatch } from "react-redux";
import { capitalize, concatImgURL, formatDate } from "../../config/function";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import ContentHeader from "../Subnavbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
// import { paths } from "../../config/paths";
// import { setLastActiveSubTab } from "../../redux-toolkit/tabSlice";
import { useDeleteProductItem, useProductlist } from "../../hooks/useProduct";
import { useDebounce } from "../../hooks/useDebounce";
import {
  // correctIconGreen,
  deleteIcon,
  eyeOpenIcon,
  // franceFlag,
  mediaIcon,
  penIcon,
  // usaFlag,
} from "../../icons";
import Button from "../ui/button";
import StatusModel from "../StatusModel";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import { showToast } from "../../utils/toastUtils";
import Pagination from "../ui/pagination";
import { resetProduct } from "../../redux-toolkit/productSlice";
// import { deleteIcon, eyeOpenIcon, franceFlag, mediaIcon, penIcon, usaFlag } from "../../icons";
// import Button from "../ui/button";

const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Image/Video", minWidth: "min-w-28 w-28" },
  { title: "Name", minWidth: "min-w-52 w-52" },
  { title: "Categories", minWidth: "min-w-32 w-32" },
  { title: "Pub. Platform", minWidth: "min-w-28 w-28" },
  { title: "Restriction", minWidth: "min-w-32 w-32" },
  { title: "Geo Country", minWidth: "min-w-28 w-28" },
  { title: "Geo Mode", minWidth: "min-w-24 w-24" },
  { title: "Pub./Sche. At", minWidth: "min-w-40 w-40" },
  { title: "Read Time", minWidth: "min-w-24 w-24" },
  { title: "Logged In", minWidth: "min-w-24 w-24" },
  { title: "Verified", minWidth: "min-w-20 w-20" },
  { title: "Over 18", minWidth: "min-w-20 w-20" },
  { title: "Status", minWidth: "min-w-28 w-28" },
  // { title: "Languages", minWidth: "min-w-20 w-20" },
  { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Updated At", minWidth: "min-w-28 w-28" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];
export default function ProductListing() {
  const defaultVisibleColumns = [
    "ID",
    "Image/Video",
    "Name",
    "Image",
    "Categories",
    "Geo Country",
    "Pub./Sche. At",
    "Status",
    "Created At",
    // "Languages",
    "Action",
  ];
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [showDropdown, setShowDropdown] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [dropdownProductId, setDropdownProductId] = useState<number | null>(
    null
  );
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [selectedProductData, setSelectedProductData] = useState({});
  const [selectedProductStatus, setSelectedProductStatus] = useState("");
  const [tempVisibleColumns, setTempVisibleColumns] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<null | {
    id: number;
    title: string;
  }>(null);
  const [draftModal, setDraftModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(searchInput, 300);

  // mutation
  const deleteMutation = useDeleteProductItem();
  // const updateStatusMutation = useUpdateProductStatus(
  //   selectedProduct?.id,
  //   () => {
  //     setShowModal(false);
  //     setDraftModal(false);
  //   }
  // );

  const updateStatus = async (payload: any) => {
    await api.patch(`/product/${selectedProduct?.id}/change-status`, payload);
  };

  const updateStatusMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      showToast("Status Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["product"], exact: false });
      setShowModal(false);
      setDraftModal(false);
    },
    onError: (error) => {
      console.log("Error updating status", error);
    },
  });

  const { data: allProductData, isFetching } = useProductlist(
    page,
    debouncedSearch,
    false
  );

  const totalPages = useMemo(() => {
    return allProductData?.totalPages || 1;
  }, [allProductData?.totalPages]);

  const toggleStatusDropdown = (eventId: number) => {
    setDropdownProductId(dropdownProductId === eventId ? null : eventId);
  };
  const toggleDropdown = () => {
    setTempVisibleColumns([
      ...new Set([...visibleColumns, ...defaultVisibleColumns]),
    ]);
    setShowDropdown((prev) => !prev);
  };
  const applyColumnChanges = () => {
    setVisibleColumns([
      ...new Set([...tempVisibleColumns, ...defaultVisibleColumns]),
    ]);
    setShowDropdown(false);
  };
  const handleTempToggle = (title: string) => {
    if (defaultVisibleColumns.includes(title)) {
      return;
    }
    setTempVisibleColumns((prev) =>
      prev.includes(title)
        ? prev.filter((col) => col !== title)
        : [...prev, title]
    );
  };
  // const handleTranslationClick = async (
  //   ProductId: string,
  //   lang: "en" | "fr"
  // ) => {
  //   navigate(`/shops/product/edit/${ProductId}?lang=${lang}`);
  // };
  const handleCreate = () => {
    dispatch(resetProduct());
    // dispatch(setLastActiveSubTab(paths.shops.product.path));
    // navigate(paths.shops.product.create.path);
  };
  const closeDropdown = () => {
    setTempVisibleColumns([
      ...new Set([...visibleColumns, ...defaultVisibleColumns]),
    ]);
    setShowDropdown(false);
  };
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

  const handleEditProject = (id: number) => {
    if (!id) return;
    // dispatch(setLastActiveSubTab(paths.shops.shop.path || null));
    navigate(`/shops/product/edit/${id}`);
  };
  const handleConfirmDelete = () => {
    if (selectedProduct?.id) {
      deleteMutation.mutate(String(selectedProduct.id));
    }
    setShowDeleteModal(false);
  };

  useEffect(() => {

    if (Array.isArray(allProductData?.products)) {
      setAllProduct(allProductData.products);
    } else {
      setAllProduct([]); // fallback to empty array if undefined or invalid
    }
  }, [allProductData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownProductId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (
      Array.isArray(allProductData?.products) &&
      allProductData.products[0]?.media?.length > 0
    ) {
      // const firstMediaUrl = allProductData.products[0].media[0].media_url;
    }
  }, [allProductData]);

  return (
    <div className="mt-10">
      <ContentHeader
        title="Products"
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
                    {/* {col.title === "Languages" ? (
                      <div className="flex items-center justify-center gap-2">
                        <img src={usaFlag} alt="flags" className="w-6 h-5" />
                        <img src={franceFlag} alt="flags" className="w-5 h-4" />
                      </div>
                    ) : ( */}
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
                    {/* )} */}
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
            ) : allProduct.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No product data available.
                  </div>
                </td>
              </tr>
            ) : (
              (allProduct as any[])?.map((product, index) => {
                const videoUrl = product.hero_video_url;
                // const videoId = videoUrl ? extractYouTubeId(videoUrl) : null;
                const isNativeUrl = videoUrl?.startsWith(
                  "https://ip-cms-api.ypstagingserver.com"
                );
                const categories =
                  product.categories.map((item: any) => item.name).join(", ") ||
                  "No category";

                return (
                  <tr key={product?.id} className="">
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
                                  {isNativeUrl && videoUrl !== null ? (
                                    <video
                                      src={concatImgURL(videoUrl)}
                                      className="w-20 h-14 object-cover rounded-xl"
                                      autoPlay
                                      muted
                                      loop
                                      playsInline
                                    />
                                  ) : // : product.hero_image_url ? (
                                  //   <img
                                  //     src={product.hero_image_url}
                                  //     className="w-20 h-14 object-cover rounded-xl"
                                  //     alt="Video Thumbnail"
                                  //   />
                                  // )
                                  product?.media?.[0]?.media_url ? (
                                    <img
                                      src={concatImgURL(product?.media?.[0]?.media_url)}
                                      className="w-20 h-14 object-cover rounded-xl"
                                      alt="Hero Image"
                                    />
                                  ) : (
                                    <div className="w-20 h-14 bg-f6f6f6 border-0.5 border-primary rounded-xl flex justify-center items-center">
                                      <img src={mediaIcon} alt="Placeholder" />
                                    </div>
                                  )}
                                </td>
                              )}
                              {visibleColumns.includes("Name") && (
                                <td className="text-base text-left">
                                  <p className="w-48">
                                    {product.name.length > 80
                                      ? `${product.name.slice(0, 80)}...`
                                      : product.name}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Categories") && (
                                <td className="text-base text-left">
                                  <p className="w-28">
                                    {categories.length > 25
                                      ? `${categories.slice(0, 25)}...`
                                      : categories}
                                  </p>
                                </td>
                              )}
                              {/* {visibleColumns.includes("Author") && (
                                <td className="text-base text-left">
                                  <p className="w-16">
                                    {product.author_name || "—"}
                                  </p>
                                </td>
                              )} */}
                              {visibleColumns.includes("Pub. Platform") && (
                                <td className="text-base text-left">
                                  {product.publish_platforms?.join(", ") || "—"}
                                </td>
                              )}
                              {visibleColumns.includes("Restriction") && (
                                <td className="text-base text-left">
                                  <p className="w-32">
                                    {product.restriction_type
                                      ?.split("_")
                                      .join(" ") || "None"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Geo Country") && (
                                <td className="text-base text-left">
                                  <p className="w-24">
                                    {product.geo_block_countries?.join(", ") ||
                                      "—"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Geo Mode") && (
                                <td className="text-base text-left">
                                  {product.geo_block_mode || "None"}
                                </td>
                              )}
                              {visibleColumns.includes("Pub./Sche. At") && (
                                <td className="text-base text-left">
                                  <p className="w-36">
                                    {product.published_at ||
                                    product.schedule_at ||
                                    product.scheduled_at ? (
                                      formatDate(
                                        product.published_at
                                          ? product.published_at
                                          : product.schedule_at ||
                                              product.scheduled_at
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
                                  {product.read_time == null
                                    ? "—"
                                    : `${product.read_time} Min`}
                                </td>
                              )}
                              {visibleColumns.includes("Logged In") && (
                                <td className="text-base text-left">
                                  {product.must_be_logged_in ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Verified") && (
                                <td className="text-base text-left">
                                  {product.must_be_verified ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Over 18") && (
                                <td className="text-base text-left">
                                  {product.must_be_over_18 ? "Yes" : "No"}
                                </td>
                              )}
                              {/* {visibleColumns.includes("Sponsor") && (
                                <td className="text-base text-left">
                                  {product.sponsor_name?.length > 30
                                    ? `${product.sponsor_name.slice(0, 27)}...`
                                    : product.sponsor_name || "—"}
                                </td>
                              )} */}
                              {visibleColumns.includes("Status") && (
                                <td
                                  className="text-base relative text-left cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleStatusDropdown(product.id);
                                  }}
                                >
                                  <div
                                    className={`${
                                      product.status === "published"
                                        ? "bg-green-600"
                                        : product.status === "scheduled"
                                        ? "bg-blue-600"
                                        : "bg-primary"
                                    } text-white font-semibold py-1 rounded-lg w-24 flex justify-evenly`}
                                  >
                                    <span className="">
                                      {capitalize(product.status)}
                                    </span>
                                  </div>
                                  {dropdownProductId === product.id && (
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
                                              product.status
                                          )
                                          .map((status) => (
                                            <li
                                              key={status}
                                              className="cursor-pointer px-4 py-2 font-medium hover:bg-primary rounded-xl hover:duration-500 transform transition-all"
                                              onClick={() => {
                                                setSelectedProductData(product);
                                                setSelectedProductStatus(
                                                  status
                                                );
                                                setSelectedProduct({
                                                  id: product.id,
                                                  title: product.title,
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
                                      disabled={product.languages.includes(
                                        "en"
                                      )}
                                      icon={
                                        product.languages.includes("en")
                                          ? correctIconGreen
                                          : penIcon
                                      }
                                      onClick={() =>
                                        handleTranslationClick(
                                          product?.id,
                                          "en"
                                        )
                                      }
                                    />
                                    <Button
                                      backgroundColor="transparent"
                                      className="p-0"
                                      disabled={product.languages.includes(
                                        "fr"
                                      )}
                                      icon={
                                        product.languages.includes("fr")
                                          ? correctIconGreen
                                          : penIcon
                                      }
                                      onClick={() =>
                                        handleTranslationClick(
                                          product?.id,
                                          "fr"
                                        )
                                      }
                                    />
                                  </div>
                                </td>
                              )} */}
                              {visibleColumns.includes("Created At") && (
                                <td className="text-base text-left">
                                  {formatDate(product.created_at)}
                                </td>
                              )}
                              {visibleColumns.includes("Updated At") && (
                                <td className="text-base text-left">
                                  {formatDate(product.updated_at)}
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
                                        handleEditProject(product?.id)
                                      }
                                    />
                                    <Button
                                      icon={deleteIcon}
                                      backgroundColor="transparent"
                                      className="p-0"
                                      onClick={() => {
                                        setSelectedProduct({
                                          id: product?.id,
                                          title: product?.title,
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
      {allProduct.length !== 0 && totalPages > 1 && (
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
          data={selectedProductData}
          selectedStatus={selectedProductStatus}
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
      <DeleteConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedProduct?.title}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
