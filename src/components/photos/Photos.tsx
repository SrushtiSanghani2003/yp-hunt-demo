import { useLocation, useNavigate } from "react-router-dom";

import {
  usaFlag,
  deleteIcon,
  eyeOpenIcon,
  franceFlag,
  mediaIcon,
  penIcon,
  // plusIcon,
} from "../../icons";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../utils/toastUtils";
import { capitalize, concatImgURL, formatDate } from "../../config/function";
import ContentHeader from "../Subnavbar";
import { resetArticle } from "../../redux-toolkit/articleSlice";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import Pagination from "../ui/pagination";
import api from "../../lib/api";
import Button from "../ui/button";
import CreatePhotosAlbum from "./CreatePhotosAlbum";
import AddPhotos, { type PhotosType } from "./AddPhotos";
import { paths } from "../../config/paths";
import StatusModel from "../StatusModel";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import { useDebounce } from "../../hooks/useDebounce";
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
  { title: "Title", minWidth: "min-w-60 w-60" },
  { title: "Pub./Sche. At", minWidth: "min-w-28 w-28" },
  { title: "Slug", minWidth: "min-w-40 w-40" },
  { title: "Status", minWidth: "min-w-28 w-28" },
  { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Updated At", minWidth: "min-w-28 w-28" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];

const Photos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const module = "photos";
  const listingState = useSelector(selectListingState(module));
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
    "Title",
    "Thumbnail",
    "Pub./Sche. At",
    "Created At",
    "Slug",
    "Status",
    "Action",
  ];

  const [allPhotos, setAllPhotos] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [createShow, setCreateShow] = useState(false);
  const [page, setPage] = useState(listingState.page || 1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<null | {
    id: number;
    title: string;
  }>(null);
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [tempVisibleColumns, setTempVisibleColumns] = useState<string[]>(
    defaultVisibleColumns,
  );
  const [editPhotoAlbumData, setEditPhotoAlbumData] = useState<Record<
    string,
    any
  > | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState<string>(
    listingState.search || "",
  );
  const [selectedAlbumId, setSelectedAlbumId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [draftModal, setDraftModal] = useState(false);
  const [dropdownAlbumId, setDropdownAlbumId] = useState<number | null>(null);
  const [selectedAlbumData, setSelectedAlbumData] = useState({});
  const [selectedAlbumStatus, setSelectedAlbumStatus] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(searchInput, 300);
  const menuPermissions = useSelector(selectMenuPermissions);
  const {
    isCreate,
    isDelete,
    isUpdate,
    isChangeStatus,
    isView,
    isUploadPhoto,
  } = getPermissionFlags(menuPermissions.photos);

  const createPhotoAlbum = async (newAlbum: {
    name: string;
    es_name: string;
    thumbnail_url: string;
    category_ids?: number[];
    player_ids?: number[];
    tag_ids?: number[];
  }) => {
    const response = await api.post("/images/albums", newAlbum);
    return response.data;
  };
  const updatePhotoAlbum = async (updatedAlbum: {
    id: string;
    name: string;
    es_name: string;
    thumbnail_url: string;
    category_ids?: number[];
    player_ids?: number[];
    tag_ids?: number[];
  }) => {
    const { id, ...rest } = updatedAlbum;
    const response = await api.put(`/images/albums/${id}`, rest);
    return response.data;
  };
  const createPhotoAlbumMutation = useMutation({
    mutationFn: createPhotoAlbum,
    onSuccess: () => {
      showToast("Photo album created successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["photoAlbums"],
        exact: false,
      });
      setCreateShow(false);
    },
    onError: () => {
      console.error("Failed to create photo album");
    },
  });

  const updatePhotoAlbumMutation = useMutation({
    mutationFn: updatePhotoAlbum,
    onSuccess: () => {
      showToast("Photo album updated successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["photoAlbums"],
        exact: false,
      });
      setEditPhotoAlbumData(null);
      setCreateShow(false);
    },
    onError: () => {
      console.error("Failed to update photo album");
    },
  });

  const createImages = async (images: PhotosType[]) => {
    const res = await api.post("/images", { images });
    return res.data;
  };

  const hadleViewClick = (id: string | number) => {
    navigate(paths.media.photos.view.getHref(id));
  };

  const createImagesMutation = useMutation({
    mutationFn: createImages,
    onSuccess: () => {
      showToast("Images Created in Album", "success");
      setSelectedAlbumId("");
      setShowSidebar(false);
    },
    onError: () => {
      showToast("Failed to create images", "error");
    },
  });

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

  const toggleStatusDropdown = (albumId: number) => {
    if (!isChangeStatus) return;
    setDropdownAlbumId(dropdownAlbumId === albumId ? null : albumId);
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
    setVisibleColumns(tempVisibleColumns);
    setShowDropdown(false);
  };

  const getPhotos = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string?]>) => {
    const [, currentPage, title] = queryKey;

    const params: Record<string, any> = {
      page: currentPage,
      limit: 8,
    };

    if (title) {
      params.album_name = title;
    }

    return await api.get("/images/albums", { params });
  };

  const { data: photoData, isFetching } = useQuery({
    queryKey: ["photoAlbums", page, debouncedSearch],
    queryFn: getPhotos,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return photoData?.data?.totalPages || 1;
  }, [photoData?.data?.totalPages]);

  const deletePhoto = async (id: string) => {
    return api.delete(`/images/albums/${id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: deletePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["photoAlbums"],
        exact: false,
      });
      showToast("Photo deleted successfully", "success");
      setShowDeleteModal(false);
      if (photoData?.data.albums.length == 1 && page > 1) {
        setPage((prev: any) => prev - 1);
      }
      setSelectedPhoto(null);
      dispatch(resetArticle());
    },
    onError: () => {
      console.error("Failed to delete a photo");
    },
  });

  const handleConfirmDelete = () => {
    if (selectedPhoto?.id) {
      deleteMutation.mutate(String(selectedPhoto.id));
    }
  };

  const updateStatus = async (payload: any) => {
    await api.patch(`/images/${selectedPhoto?.id}/change-status`, payload);
  };

  const updateStatusMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      showToast("Status Updated", "success");
      queryClient.invalidateQueries({
        queryKey: ["photoAlbums"],
        exact: false,
      });
      setShowModal(false);
      setDraftModal(false);
    },
    onError: (error) => {
      console.log("🚀 ~ Photos ~ error:", error);
    },
  });

  const handleCreate = () => {
    setCreateShow(true);
  };
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [searchInput]);
  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    navigate(id ? `` : `/dashboard`);
  };
  useEffect(() => {
    if (photoData?.data?.albums) {
      setAllPhotos(photoData.data.albums);
    }
  }, [photoData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownAlbumId(null);
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
          title="Photos"
          breadCrumbsItem={breadCrumbsItem}
          onBreadCrumbClick={handleBreadcrumbClick}
          onCreate={handleCreate}
          disableCreate={!isCreate}
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
                    className={`p-2 ps-0 text-black font-normal  ${col.minWidth}`}
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
            ) : allPhotos?.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No data available.
                  </div>
                </td>
              </tr>
            ) : (
              (allPhotos as any[])?.map((photo, index) => {
                return (
                  <tr key={photo?.id} className="">
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
                                    {photo.thumbnail_url ? (
                                      <PhotoView
                                        src={concatImgURL(photo.thumbnail_url)}
                                      >
                                        <img
                                          // src={photo.thumbnail_url}
                                          src={concatImgURL(
                                            photo.thumbnail_url,
                                          )}
                                          className="w-20 h-14 object-cover rounded-xl cursor-pointer"
                                          alt="Hero Thumbnail"
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
                                <td className="text-base text-left ">
                                  <div className="flex justify-between items-center line-clamp-3">
                                    {photo.name}
                                    <Button
                                      text="Upload"
                                      onClick={() => {
                                        setSelectedAlbumId(photo?.id);
                                        setShowSidebar(true);
                                      }}
                                      backgroundColor="transparent"
                                      disabled={!isUploadPhoto}
                                      // icon={}
                                      iconPosition="end"
                                      textWeight="font-bold"
                                      className={`flex items-center me-4 gap-2 border border-green-600 text-green-600 md:px-4 px-2 md:py-3 py-2 rounded-xl text-sm transition ${
                                        !isUploadPhoto &&
                                        "opacity-50 cursor-not-allowed"
                                      }`}
                                    />
                                  </div>
                                </td>
                              )}
                              {visibleColumns.includes("Pub./Sche. At") && (
                                <td className="text-base text-left">
                                  <div className="flex items-center justify-between">
                                    {photo.published_at || photo.schedule_at ? (
                                      formatDate(
                                        photo.published_at
                                          ? photo.published_at
                                          : photo.schedule_at,
                                      )
                                    ) : (
                                      <span className=" text-gray-400">
                                        Not Published
                                      </span>
                                    )}
                                  </div>
                                </td>
                              )}
                              {visibleColumns.includes("Slug") && (
                                <td className="text-base text-left ">
                                  <div className=" line-clamp-3 ">
                                    {photo.slug}
                                  </div>
                                </td>
                              )}
                              {visibleColumns.includes("Status") && (
                                <td
                                  className="text-base relative  text-left cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleStatusDropdown(photo.id);
                                  }}
                                >
                                  <div
                                    className={`${
                                      photo.status === "published"
                                        ? "bg-green-600"
                                        : photo.status === "scheduled"
                                          ? "bg-blue-600"
                                          : "bg-primary"
                                    } text-white font-semibold py-1 rounded-lg w-24 flex justify-evenly ${
                                      !isChangeStatus
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }`}
                                  >
                                    <span className="">
                                      {capitalize(photo.status)}
                                    </span>
                                  </div>
                                  {dropdownAlbumId === photo.id && (
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
                                              photo.status,
                                          )
                                          .map((status) => (
                                            <li
                                              key={status}
                                              className="cursor-pointer px-4 py-2 font-medium hover:bg-primary rounded-xl hover:duration-500 transform transition-all"
                                              onClick={() => {
                                                setSelectedAlbumData(photo);
                                                setSelectedAlbumStatus(status);
                                                setSelectedPhoto({
                                                  id: photo.id,
                                                  title: photo.title,
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
                                  {formatDate(photo.created_at)}
                                </td>
                              )}
                              {visibleColumns.includes("Updated At") && (
                                <td className="text-base text-left">
                                  {formatDate(photo.updated_at)}
                                </td>
                              )}
                              {visibleColumns.includes("Action") && (
                                <td className="">
                                  <div className="flex items-center justify-center gap-3">
                                    <Button
                                      icon={eyeOpenIcon}
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isView &&
                                        "opacity-50 cursor-not-allowed"
                                      }`}
                                      onClick={() => hadleViewClick(photo.id)}
                                      disabled={!isView}
                                    />
                                    <Button
                                      icon={penIcon}
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isUpdate &&
                                        "opacity-50 cursor-not-allowed"
                                      }`}
                                      onClick={() => {
                                        setEditPhotoAlbumData({
                                          id: photo.id,
                                          name: photo.name,
                                          es_name: photo.es_name,
                                          thumbnailUrl: photo.thumbnail_url,
                                          categories: photo.categories || [],
                                          players: photo.players || [],
                                          tags: photo.tags || [],
                                          type: photo.type,
                                        });
                                        setCreateShow(true);
                                      }}
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
                                        setSelectedPhoto({
                                          id: photo?.id,
                                          title: photo?.name,
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
      {createShow && (
        <CreatePhotosAlbum
          show={createShow}
          onClose={() => {
            setCreateShow(false);
            setEditPhotoAlbumData(null);
          }}
          onCreate={(obj) => createPhotoAlbumMutation.mutate(obj)}
          onUpdate={(obj) => updatePhotoAlbumMutation.mutate(obj)}
          isLoading={
            createPhotoAlbumMutation.isPending ||
            updatePhotoAlbumMutation.isPending
          }
          editData={editPhotoAlbumData}
        />
      )}
      {showSidebar && (
        <AddPhotos
          open={showSidebar}
          onClose={() => setShowSidebar(false)}
          onSubmit={(images) => createImagesMutation.mutate(images)}
          albumId={selectedAlbumId}
          isLoading={createImagesMutation.isPending}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          itemName={selectedPhoto?.title}
          isLoading={deleteMutation.isPending}
        />
      )}

      {showModal && (
        <StatusModel
          show={showModal}
          onClose={() => setShowModal(false)}
          data={selectedAlbumData}
          selectedStatus={selectedAlbumStatus}
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

      {allPhotos?.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default Photos;
