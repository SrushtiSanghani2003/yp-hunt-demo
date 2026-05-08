import { useDispatch, useSelector } from "react-redux";
import { capitalize, concatImgURL, formatDate } from "../../config/function";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import ContentHeader from "../Subnavbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { paths } from "../../config/paths";
import { useDebounce } from "../../hooks/useDebounce";
import Pagination from "../ui/pagination";
import Button from "../ui/button";
import {
  correctIconGreen,
  deleteIcon,
  mediaIcon,
  penIcon,
  spanishFlag,
  usaFlag,
} from "../../icons";
import { useShoplist } from "../../hooks/useShop";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import { showToast } from "../../utils/toastUtils";
import { resetShop } from "../../redux-toolkit/shopSlice";
import { setLastActiveSubTab } from "../../redux-toolkit/tabSlice";
import { PhotoProvider, PhotoView } from "react-photo-view";
import StatusModel from "../StatusModel";
import ChangeStatusModal from "../articles/ChangeStatusModal";
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
  { title: "Image", minWidth: "min-w-28 w-28" },
  { title: "Description", minWidth: "min-w-60 w-60" },
  { title: "Sponsor Image", minWidth: "min-w-28 w-28" },
  { title: "Pub./Sche. At", minWidth: "min-w-28 w-28" },
  { title: "Languages", minWidth: "min-w-20 w-20" },
  { title: "Status", minWidth: "min-w-28 w-28" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];
export default function ShopListing() {
  const module = "shop";
  const listingState = useSelector(selectListingState(module));
  const [deleteShow, setDeleteShow] = useState(false);
  const [shopTypeId, setShopTypeId] = useState<string | null>(null);
  const [allShops, setAllShops] = useState([]);
  const [page, setPage] = useState(listingState.page || 1);
  const [searchInput, setSearchInput] = useState<string>(
    listingState.search || "",
  );
  const debouncedSearch = useDebounce(searchInput, 300);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const { isScrolled } = useScroll();
  const queryClient = useQueryClient();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownShopId, setDropdownShopId] = useState<number | null>(null);
  const [selectedShopData, setSelectedShopData] = useState({});
  const [selectedShopStatus, setSelectedShopStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [draftModal, setDraftModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState<null | {
    id: number;
    title: string;
  }>(null);
  const menuPermissions = useSelector(selectMenuPermissions);
  const { isCreate, isDelete, isUpdate, isChangeStatus } = getPermissionFlags(
    menuPermissions.shop,
  );
  // const handleTranslationClick = async (shopId: string, lang: "en" | "fr") => {
  //   navigate(`/shops/shop/edit/${shopId}?lang=${lang}`);
  // };
  const handleEditShop = (id: number) => {
    if (!id) return;
    // dispatch(setLastActiveSubTab(paths.shops.shop.path));
    dispatch(setLastActiveSubTab(paths.shop.path));
    navigate(`/shop/edit/${id}`);
  };
  const { data: allShopData, isFetching  } = useShoplist(
    page,
    debouncedSearch,
    language,
    false,
  );

  const totalPages = useMemo(() => {
    return allShopData?.totalPages || 1;
  }, [allShopData?.totalPages]);

  const handleTranslationClick = async (shopId: string, lang: "en" | "es") => {
    navigate(`/shop/edit/${shopId}?lang=${lang}`);
  };

  const deleteEventMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/shop/${id}`),
    onSuccess: () => {
      showToast("Shop deleted successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["shop"],
        exact: false,
      });
      setDeleteShow(false);
      if (allShopData?.data.shops.length == 1 && page > 1) {
        setPage((prev: any) => prev - 1);
      }
    },
  });
  const updateStatus = async (payload: any) => {
    await api.patch(`/shop/${selectedShop?.id}/change-status`, payload);
  };

  const updateStatusMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      showToast("Status Updated", "success");
      queryClient.invalidateQueries({
        queryKey: ["shop"],
        exact: false,
      });
      setShowModal(false);
      setDraftModal(false);
    },
    onError: (error) => {
      console.log("🚀 ~ ShopListing ~ error:", error);
    },
  });
  const toggleStatusDropdown = (videoId: number) => {
    if (!isChangeStatus) return;
    setDropdownShopId(dropdownShopId === videoId ? null : videoId);
  };

  const handleCreate = () => {
    dispatch(resetShop());
    // dispatch(setLastActiveSubTab(paths.shops.shop.path));
    dispatch(setLastActiveSubTab(paths.shop.path));
    // navigate(paths.shops.shop.create.path);
    navigate(paths.shop.create.path);
  };
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

  useEffect(() => {
    if (allShopData?.shops) {
      setAllShops(allShopData.shops || []);
    }
  }, [allShopData]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownShopId(null);
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
          title="Shop"
          breadCrumbsItem={breadCrumbsItem}
          onBreadCrumbClick={handleBreadcrumbClick}
          onCreate={handleCreate}
          disableCreate={!isCreate}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </div>

      <div className="container overflow-x-auto my-3">
        <table className="min-w-full table-fixed border-separate border-spacing-y-2 pb-16">
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
            ) : allShops.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No shop data available.
                  </div>
                </td>
              </tr>
            ) : (
              (allShops as any[])?.map((shop, index) => {
                return (
                  <tr key={shop?.id} className="">
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
                              <PhotoProvider maskOpacity={0.6}>
                                <td className="text-base cursor-pointer">
                                  <PhotoView
                                    src={concatImgURL(shop.shop_image_url)}
                                  >
                                    {shop.shop_image_url ? (
                                      <img
                                        src={concatImgURL(shop.shop_image_url)}
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
                                <p className=" line-clamp-1">
                                  {shop.description ? shop.description : "-"}
                                </p>
                              </td>
                              <PhotoProvider maskOpacity={0.6}>
                                <td className="text-base cursor-pointer">
                                  <PhotoView
                                    src={concatImgURL(shop.sponsor_logo_url)}
                                  >
                                    {shop.sponsor_logo_url ? (
                                      <img
                                        src={concatImgURL(
                                          shop.sponsor_logo_url,
                                        )}
                                        className="w-20 h-14 object-contain rounded-xl bg-black"
                                        alt="sponsor image"
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
                                <p className="w-3/4">
                                  {shop.published_at ||
                                  shop.schedule_at ||
                                  shop.scheduled_at ? (
                                    formatDate(
                                      shop.published_at
                                        ? shop.published_at
                                        : shop.schedule_at || shop.scheduled_at,
                                    )
                                  ) : (
                                    <span className=" text-gray-400">
                                      Not Published
                                    </span>
                                  )}
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
                                      shop.languages.includes("en")
                                        ? correctIconGreen
                                        : penIcon
                                    }
                                    onClick={() =>
                                      handleTranslationClick(shop?.id, "en")
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
                                      shop.languages.includes("es")
                                        ? correctIconGreen
                                        : penIcon
                                    }
                                    onClick={() =>
                                      handleTranslationClick(shop?.id, "es")
                                    }
                                    disabled={!isUpdate}
                                  />
                                </div>
                              </td>
                              <td
                                className="text-base relative  text-left cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleStatusDropdown(shop.id);
                                }}
                              >
                                <div
                                  className={`${
                                    shop.status === "published"
                                      ? "bg-green-600"
                                      : shop.status === "scheduled"
                                        ? "bg-blue-600"
                                        : "bg-primary"
                                  } text-white font-semibold py-1 rounded-lg w-24 flex justify-evenly ${
                                    !isChangeStatus
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                  }`}
                                >
                                  <span className="">
                                    {capitalize(shop.status)}
                                  </span>
                                </div>
                                {dropdownShopId === shop.id && (
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
                                            shop.status,
                                        )
                                        .map((status) => (
                                          <li
                                            key={status}
                                            className="cursor-pointer px-4 py-2 font-medium hover:bg-primary rounded-xl hover:duration-500 transform transition-all"
                                            onClick={() => {
                                              setSelectedShopData(shop);
                                              setSelectedShopStatus(status);
                                              setSelectedShop({
                                                id: shop.id,
                                                title: shop.title,
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
                                    onClick={() => handleEditShop(shop?.id)}
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
                                      setShopTypeId(String(shop?.id));
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
      {showModal && (
        <StatusModel
          show={showModal}
          onClose={() => setShowModal(false)}
          data={selectedShopData}
          selectedStatus={selectedShopStatus}
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
      {allShops.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
