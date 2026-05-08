import { useEffect, useRef, useState } from "react";
import { folderIcon, moreIcon } from "../../icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContentMedia,
  setFiles,
  setFolders,
  setTotalFilesPages,
  setTotalFoldersPages,
} from "../../redux-toolkit/contentLibrarySlice";
import Button from "../ui/button";
import { showToast } from "../../utils/toastUtils";
import DeleteMediaModal from "./DeleteMediaModal";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  concatImgURL,
  extractFileType,
  formatFileSize,
} from "../../config/function";
// import ViewImageModal from "./ViewImageModal";
import Pagination from "../ui/pagination";
import {
  pushCrumb,
  selectBreadCrumbs,
} from "../../redux-toolkit/breadcrumbSlice";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animation/content-library-empty.json";
import FolderCreate from "./FolderCreate";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { FileText } from "lucide-react";
import { selectMenuPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { getPermissionFlags } from "../sidebar/menuPermissions";

export type OutletContextType = {
  debouncedSearch: string;
  viewMode: "grid" | "list";
};

export default function AllContentMedia() {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | {
    id: string;
    mediaType: "file" | "folder";
  }>(null);
  const [copied, setCopied] = useState(false);
  const { crumbs } = useSelector(selectBreadCrumbs);
  // const [showImage, setShowImage] = useState(false);
  // const [selectedImg, setSelectedImg] = useState<string>("");
  const [folderPage, setFolderPage] = useState(1);
  const [filePage, setFilePage] = useState(1);
  const [folderCreateShow, setFolderCreateShow] = useState(false);
  const [folderData, setFolderData] = useState<Record<string, string> | null>(
    null,
  );
  const menuPermissions = useSelector(selectMenuPermissions);
  const { isCopy, isDelete, isUpdate } = getPermissionFlags(
    menuPermissions.content_library,
  );
  const dropdownWrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { debouncedSearch, viewMode } = useOutletContext<OutletContextType>();

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { folders, files, totalFoldersPages, totalFilesPages } =
    useSelector(selectContentMedia);

  const isListView = viewMode === "list";
  const folderLimit = isListView ? 100 : files.length > 0 ? 5 : 30;
  const fileLimit = isListView ? 100 : folders.length > 0 ? 20 : 30;

  const getAllContentMedia = async ({ queryKey }: { queryKey: any }) => {
    const [_key, folderPage, filePage, searchTitle, folderLimit, fileLimit] =
      queryKey;

    const params: Record<string, any> = {
      folder_page: folderPage,
      folder_limit: folderLimit,
      file_page: filePage,
      file_limit: fileLimit,
    };
    if (searchTitle) {
      params.search = searchTitle;
    }
    return await api.get("/content-library/root", {
      params,
    });
  };

  const { data: allContentMediaData } = useQuery({
    queryKey: [
      "all-content-media",
      folderPage,
      filePage,
      debouncedSearch,
      folderLimit,
      fileLimit,
    ],
    queryFn: getAllContentMedia,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });

  const deleteFile = async (id: string) => {
    return await api.delete(`/content-library/files/${id}`);
  };
  const deleteFolder = async (id: string) => {
    return await api.delete(`/content-library/folders/${id}`);
  };

  const deleteFileMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      showToast("File Deleted", "success");
      queryClient.invalidateQueries({
        queryKey: ["all-content-media"],
        exact: false,
      });
      setDeleteModalVisible(false);
      setSelectedItem(null);
    },
    onError: () => {
      showToast("Failed to delete file", "error");
    },
  });
  const deleteFolderMutation = useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      showToast("Folder Deleted", "success");
      queryClient.invalidateQueries({
        queryKey: ["all-content-media"],
        exact: false,
      });
      setDeleteModalVisible(false);
      setSelectedItem(null);
    },
    onError: () => {
      showToast("Failed to delete folder", "error");
    },
  });

  useEffect(() => {
    if (allContentMediaData) {
      dispatch(setFolders(allContentMediaData?.data?.folders || []));
      dispatch(setFiles(allContentMediaData?.data?.files || []));
      dispatch(
        setTotalFoldersPages(allContentMediaData?.data?.folderTotalPages || 1),
      );
      dispatch(
        setTotalFilesPages(allContentMediaData?.data?.fileTotalPages || 1),
      );
    }
  }, [allContentMediaData]);

  const copyToClipboard = (url: string) => {
    if (!isCopy) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setActiveMenuId(null);
    }, 1000);
  };

  const handleDeleteFile = (id: string) => {
    if (id) {
      deleteFileMutation.mutate(id);
    }
  };

  const handleDeleteFolder = (id: string) => {
    if (id) {
      deleteFolderMutation.mutate(id);
    }
  };

  // const handleImageView = (item: any) => {
  //   if (item) {
  //     setSelectedImg(item.storage_url);
  //     setShowImage(true);
  //   }
  // };

  const handleDeleteMedia = () => {
    if (!selectedItem) return;
    if (selectedItem.mediaType === "file") {
      handleDeleteFile(selectedItem.id);
    } else {
      handleDeleteFolder(selectedItem.id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownWrapperRef.current &&
        !dropdownWrapperRef.current.contains(event.target as Node)
      ) {
        setActiveMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFolderClick = (item: { id: string; name: string }) => {
    const lastCrumb = crumbs[crumbs.length - 1];

    if (lastCrumb?.id !== item.id) {
      dispatch(pushCrumb({ id: item.id, name: item.name }));
    }

    navigate(`/contentmedia/${item.id}`);
  };

  useEffect(() => {
    setFolderPage(1);
    setFilePage(1);
    setActiveMenuId(null);
  }, [viewMode]);

  useEffect(() => {
    if (folderPage != 1 || filePage !== 1) {
      setFolderPage(1);
      setFilePage(1);
    }
  }, [debouncedSearch]);

  return (
    <>
      {/* {isLoading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      )} */}
      {viewMode === "grid" ? (
        <div className="mt-4 flex flex-col gap-3">
          {folders.length > 0 || files.length > 0 ? (
            <>
              {folders.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold">Folders</h2>
                  <div className="mb-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-4 gap-2">
                    {/* Folders First */}
                    {folders.map((item: any) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl shadow-md"
                      >
                        <div
                          className="p-2 flex flex-col items-center justify-center cursor-pointer"
                          onClick={() => handleFolderClick(item)}
                        >
                          <img
                            src={folderIcon}
                            alt="Folder"
                            className="md:w-28 w-20 md:h-40 h-20"
                          />
                        </div>
                        <div className="flex justify-between">
                          <div className="py-2 md:py-3 md:ps-3 ps-2">
                            <p className="text-[10px] md:text-sm text-gray-700 truncate lg:w-32 md:w-24 w-16 font-medium">
                              {item.name}
                            </p>
                          </div>
                          <div className="flex items-center relative p-2">
                            <Button
                              icon={moreIcon}
                              imageclassName="md:w-5 w-4"
                              backgroundColor="transparent"
                              className="p-0 md:p-0"
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                setActiveMenuId((prev) =>
                                  prev === item.id ? null : item.id,
                                );
                              }}
                            />
                            {activeMenuId === item.id && (
                              <div
                                ref={dropdownWrapperRef}
                                className="absolute right-3 top-10 bg-white shadow-md rounded-md border z-10 min-w-[140px]"
                              >
                                <ul className="text-sm text-gray-700 py-1 px-2">
                                  <li
                                    className={`cursor-pointer hover:bg-gray-100 px-2 py-1 rounded ${
                                      !isUpdate
                                        ? "opacity-50 !cursor-not-allowed"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      if (!isUpdate) return;
                                      (setFolderCreateShow(true),
                                        setFolderData({
                                          id: item.id,
                                          name: item.name,
                                        }));
                                      setActiveMenuId(null);
                                    }}
                                  >
                                    Edit Folder
                                  </li>
                                  <li
                                    className={`cursor-pointer hover:bg-gray-100 px-2 py-1 rounded ${
                                      !isDelete
                                        ? "opacity-50 !cursor-not-allowed"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      if (!isDelete) return;
                                      setSelectedItem({
                                        id: item.id,
                                        mediaType: "folder",
                                      });
                                      setActiveMenuId(null);
                                      setDeleteModalVisible(true);
                                    }}
                                  >
                                    Delete Folder
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {totalFoldersPages > 1 && (
                    <Pagination
                      currentPage={folderPage}
                      onPageChange={setFolderPage}
                      totalPages={totalFoldersPages}
                    />
                  )}
                </div>
              )}

              {/* <div className=""></div> */}

              {files.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold">Files</h2>
                  <PhotoProvider maskOpacity={0.7}>
                    <div className="mb-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-4 gap-2">
                      {/* Files Next */}
                      {files.map((item: any) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-2xl shadow-md"
                        >
                          <div className="relative p-2">
                            {item.mime_type?.startsWith("image") ? (
                              <PhotoView src={item.storage_url}>
                                <img
                                  // src={item.storage_url}
                                  src={concatImgURL(item.uploaded_url)}
                                  alt={item.alt_text || item.file_name}
                                  className="w-full md:h-40 h-28 object-cover rounded-2xl cursor-pointer"
                                />
                              </PhotoView>
                            ) : item.mime_type?.startsWith("video") ? (
                              <video
                                controls
                                src={concatImgURL(item.storage_url)}
                                className="w-full md:h-40 h-28 object-cover rounded-2xl"
                              />
                            ) : item.mime_type === "application/pdf" ? (
                              <div className="flex flex-col items-center justify-center h-28 md:h-40 bg-gray-100 rounded-2xl cursor-pointer">
                                <a
                                  href={item.storage_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex flex-col items-center justify-center"
                                >
                                  <FileText
                                    size={70}
                                    className="text-red-500"
                                  />
                                </a>
                              </div>
                            ) : (
                              <p className="text-sm text-red-500">
                                Unsupported file
                              </p>
                            )}
                            {/* {item.mime_type?.startsWith("image") ? (
                              <PhotoView src={item.storage_url}>
                                <img
                                  src={item.storage_url}
                                  alt={item.alt_text || item.file_name}
                                  className="w-full md:h-40 h-28 object-cover rounded-2xl cursor-pointer"
                                  // onClick={() => handleImageView(item)}
                                />
                              </PhotoView>
                            ) : item.mime_type?.startsWith("video") ? (
                              <video
                                controls
                                src={item.storage_url}
                                className="w-full md:h-40 h-28 object-cover rounded-2xl"
                              />
                            ) : (
                              <p className="text-sm text-red-500">
                                Unsupported file
                              </p>
                            )} */}
                          </div>
                          <div className="flex justify-between">
                            <div className="md:py-3 py-2 md:ps-3 p-2">
                              <p className="md:text-sm text-xs text-gray-700 truncate font-medium lg:w-32 md:w-24 w-16">
                                {item.file_name}
                              </p>
                              <p className="md:text-xs text-[8px] text-gray-500">
                                {extractFileType(item.mime_type)} |{" "}
                                {formatFileSize(item.size)}
                              </p>
                            </div>
                            <div className="relative p-2 flex items-center">
                              <Button
                                icon={moreIcon}
                                imageclassName="md:w-5 w-4"
                                backgroundColor="transparent"
                                className="p-0 md:p-0"
                                onMouseDown={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuId((prev) =>
                                    prev === item.id ? null : item.id,
                                  );
                                }}
                              />
                              {activeMenuId === item.id && (
                                <div
                                  ref={dropdownWrapperRef}
                                  className="absolute right-3 top-10 bg-white shadow-md rounded-md border z-10 min-w-[140px]"
                                >
                                  <ul className="text-sm text-gray-700 py-1 px-2">
                                    <li
                                      className={`cursor-pointer hover:bg-gray-100 px-2 py-1 rounded ${
                                        !isCopy
                                          ? "opacity-50 !cursor-not-allowed"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        copyToClipboard(
                                          concatImgURL(item.storage_url),
                                        )
                                      }
                                    >
                                      {copied ? "Copied" : "Copy URL"}
                                    </li>
                                    <li
                                      className={`cursor-pointer hover:bg-gray-100 px-2 py-1 rounded ${
                                        !isDelete
                                          ? "opacity-50 !cursor-not-allowed"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        if (!isDelete) return;
                                        setSelectedItem({
                                          id: item.id,
                                          mediaType: "file",
                                        });
                                        setActiveMenuId(null);
                                        setDeleteModalVisible(true);
                                      }}
                                    >
                                      Delete
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </PhotoProvider>

                  {totalFilesPages > 1 && (
                    <Pagination
                      currentPage={filePage}
                      onPageChange={setFilePage}
                      totalPages={totalFilesPages}
                    />
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center mt-4">
              <Lottie
                animationData={loadingAnimation}
                style={{ width: "25%" }}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-4">
          {/* Folders */}
          {folders.length > 0 || files.length > 0 ? (
            <>
              {folders.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md flex items-center cursor-pointer"
                  onClick={() => handleFolderClick(item)}
                >
                  <div className="p-2">
                    <img
                      src={folderIcon}
                      alt="Folder"
                      className="md:w-20 w-10 md:h-20 h-10 object-contain"
                    />
                  </div>
                  <div className="flex-1 sm:p-3">
                    <p className="text-sm text-gray-700 truncate w-40">
                      {item.name}
                    </p>
                  </div>
                  <div className="relative p-3" ref={dropdownWrapperRef}>
                    <Button
                      icon={moreIcon}
                      backgroundColor="transparent"
                      className="p-0 md:p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId((prev) =>
                          prev === item.id ? null : item.id,
                        );
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                      }}
                    />
                    {activeMenuId === item.id && (
                      <div
                        ref={dropdownWrapperRef}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="absolute right-3 top-10 bg-white shadow-md rounded-md border z-50 min-w-[140px]"
                      >
                        <ul className="text-sm text-gray-700 py-1 px-2">
                          <li
                            className={`cursor-pointer hover:bg-gray-100 px-2 py-1 rounded ${
                              !isUpdate ? "opacity-50 !cursor-not-allowed" : ""
                            }`}
                            onClick={(e) => {
                              if (!isUpdate) return;
                              e.stopPropagation();
                              (setFolderCreateShow(true),
                                setFolderData({
                                  id: item.id,
                                  name: item.name,
                                }));
                              setActiveMenuId(null);
                            }}
                          >
                            Edit Folder
                          </li>
                          <li
                            className={`cursor-pointer hover:bg-gray-100 px-2 py-1 rounded ${
                              !isDelete ? "opacity-50 !cursor-not-allowed" : ""
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isDelete) return;
                              e.stopPropagation();
                              setSelectedItem({
                                id: item.id,
                                mediaType: "folder",
                              });
                              setActiveMenuId(null);
                              setDeleteModalVisible(true);
                            }}
                          >
                            Delete Folder
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Files */}
              <PhotoProvider maskOpacity={0.5}>
                {files.map((item:any) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-md flex items-center"
                  >
                    <div className="p-2">
                      {item.mime_type?.startsWith("image") ? (
                        <PhotoView src={item.storage_url}>
                          <img
                            // src={item.storage_url}
                            src={concatImgURL(item.uploaded_url)}
                            alt={item.alt_text || item.file_name}
                            className="md:w-20 w-10 md:h-20 h-10 object-cover rounded-2xl cursor-pointer"
                            // onClick={() => handleImageView(item)}
                          />
                        </PhotoView>
                      ) : item.mime_type?.startsWith("video") ? (
                        <video
                          src={concatImgURL(item.storage_url)}
                          className="md:w-20 w-10 md:h-20 h-10 object-cover rounded-2xl"
                        />
                      ) : item.mime_type === "application/pdf" ? (
                        <>
                          <div className="flex flex-col items-center justify-center md:w-20 w-10 h-10 md:h-20 bg-gray-100 rounded-2xl cursor-pointer">
                            <FileText size={35} className="text-red-500" />
                          </div>
                        </>
                      ) : (
                        <p className="text-xs text-red-500">Unsupported</p>
                      )}
                    </div>
                    <div className="flex-1 sm:p-3">
                      <p className="text-sm text-gray-700 truncate w-40">
                        {item.file_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {extractFileType(item.mime_type)} |{" "}
                        {formatFileSize(item.size)}
                      </p>
                    </div>
                    <div className="relative p-3">
                      <Button
                        icon={moreIcon}
                        backgroundColor="transparent"
                        className="p-0 md:p-0"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          setActiveMenuId((prev) =>
                            prev === item.id ? null : item.id,
                          );
                        }}
                      />
                      {activeMenuId === item.id && (
                        <div
                          ref={dropdownWrapperRef}
                          className="absolute right-3 top-10 bg-white shadow-md rounded-md border z-10 min-w-[140px]"
                        >
                          <ul className="text-sm text-gray-700 py-1 px-2">
                            <li
                              className={`cursor-pointer hover:bg-gray-100 px-2 py-1 rounded ${
                                !isCopy ? "opacity-50 !cursor-not-allowed" : ""
                              }`}
                              onClick={(e) => {
                                (e.stopPropagation(),
                                  copyToClipboard(item.storage_url));
                              }}
                            >
                              {copied ? "Copied" : "Copy URL"}
                            </li>
                            <li
                              className={`cursor-pointer hover:bg-gray-100 px-2 py-1 rounded ${
                                !isDelete
                                  ? "opacity-50 !cursor-not-allowed"
                                  : ""
                              }`}
                              onClick={(e) => {
                                if (!isDelete) return;
                                e.stopPropagation();
                                setSelectedItem({
                                  id: item.id,
                                  mediaType: "file",
                                });
                                setActiveMenuId(null);
                                setDeleteModalVisible(true);
                              }}
                            >
                              Delete
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </PhotoProvider>
            </>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              No data found.
            </div>
          )}
        </div>
      )}

      {deleteModalVisible && (
        <DeleteMediaModal
          show={deleteModalVisible}
          onClose={() => {
            setDeleteModalVisible(false);
            setSelectedItem(null);
          }}
          mediaType={selectedItem?.mediaType ?? "file"}
          onDelete={handleDeleteMedia}
          isLoading={
            deleteFileMutation.isPending || deleteFolderMutation.isPending
          }
        />
      )}
      {/* {showImage && (
        <ViewImageModal
          show={showImage}
          onClose={() => setShowImage(false)}
          imgUrl={selectedImg ?? ""}
        />
      )} */}
      {folderCreateShow && (
        <FolderCreate
          show={folderCreateShow}
          onClose={() => {
            setFolderCreateShow(false);
            setFolderData(null);
          }}
          data={folderData}
        />
      )}
    </>
  );
}
