import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { cropIcon, folderIcon, gridIcon, list } from "../../icons";
import BreadCrump from "../ui/breadCrumb";
import Button from "../ui/button";
import SearchInput from "../ui/searchInput";
import SidebarDialog from "../ui/sidebarDialog/SidebarDialog";
import api from "../../lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  blobUrlToFile,
  // blobUrlToFile,
  concatImgURL,
  // blobUrlToFile,
  // dataURLtoFile,
  extractFileType,
  formatFileSize,
} from "../../config/function";
import Pagination from "../ui/pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  popToIndex,
  pushCrumb,
  resetCrumbs,
  selectBreadCrumbs,
} from "../../redux-toolkit/breadcrumbSlice";
import animation404 from "../../assets/animation/tiger.json";
import Lottie from "lottie-react";
// import ImageCropModal from "./ImageCropModal";
import "react-advanced-cropper/dist/style.css";
import "react-advanced-cropper/dist/themes/corners.css";
import ImageCrop from "./ImageCrop";
import { useDebounce } from "../../hooks/useDebounce";
import VideoThumbnailGenerator from "./VideoThumbnailGenerator";
import { FileText } from "lucide-react";
import { env } from "../../config/env";

const mediaTabs = [
  { id: "content-library", name: "Content Library" },
  { id: "dam", name: "DAM" },
];

const ContentLibrary = ({
  open,
  onClose,
  uploadType,
  onSelect,
  mediaFilter,
  onThumbnailSelect,
  withoutThumbnail,
}: {
  open: boolean;
  onClose: () => void;
  uploadType?: string;
  onSelect?: (url: string) => void;
  mediaFilter?: "image" | "video" | "document" | "all";
  onThumbnailSelect?: (url: string) => void;
  withoutThumbnail?: boolean;
}) => {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isVideoFlow, setIsVideoFlow] = useState(false);

  const [searchInput, setSearchInput] = useState<string>("");
  const [allContentData, setAllContentData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>("");
  const [viewMode, setViewMode] = useState<"grid" | "list" | string>("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [onCropImage, setOnCropImage] = useState(true);
  const [selectedImgURL, setSelectedImgURL] = useState("");
  const [selectedFileObj, setSelectedFileObj] = useState<File | string>("");
  const [onVideoThumbnail, setOnVideoThumbnail] = useState(false);
  const [selectedNativeVideoURL, setSelectedNativeVideoURL] = useState<
    string | null
  >(null);
  const [selectedThumbnailFileObj, setSelectedThumbnailFileObj] = useState<
    File | string
  >("");
  const [activeMediaType, setActiveMediaType] = useState<
    "content-library" | "dam" | string
  >("content-library");
  void setActiveMediaType;

  const [loadingIframe, setLoadingIframe] = useState(true);

  // const [isVideoUploaded, setIsVideoUploaded] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { crumbs } = useSelector(selectBreadCrumbs);

  const combinedContents = [...mediaList, ...allContentData];

  const debouncedSearch = useDebounce(searchInput, 300);
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  };

  const damMediaType = useMemo(() => {
    return mediaFilter == "document" ? "pdf" : mediaFilter;
  }, [mediaFilter]);

  useEffect(() => {
    console.log("🚀 ~ ContentLibrary ~ damMediaType:", damMediaType);
  }, [damMediaType]);

  const uploadVideoFile = async (file: File | string | any) => {
    const formData = new FormData();
    formData.append("file", file);
    return await api.post(`/articles/upload/hero`, formData);
  };

  const videoUploadMediaMutation = useMutation({
    mutationFn: uploadVideoFile,
    onMutate: () => {
      setIsUploading(true);
      // setIsVideoUploaded(true);
    },
    onSuccess: (data) => {
      const url = data?.data?.[0].url;
      onSelect?.(url);
      setIsUploading(false); // ✅ FINAL STOP
      setIsVideoFlow(false);
      // setIsVideoUploaded(false);
      setSelectedNativeVideoURL(url);
      onClose();
    },
    onError: (err) => {
      setIsUploading(false);
      // setIsVideoUploaded(false);
      console.error("Upload failed", err);
    },
  });

  const uploadFile = async (file: File | string) => {
    const formData = new FormData();
    formData.append("file", file);

    return await api.post(`/articles/upload/${uploadType}`, formData);
  };

  const uploadMutation = useMutation({
    mutationFn: uploadFile,
    onMutate: () => {
      setIsUploading(true);
    },

    onSuccess: (data) => {
      setSelectedFileObj("");
      const imgUrl = data?.data?.[0].url;
      if (imgUrl && onSelect && !onThumbnailSelect) {
        onSelect(imgUrl);
        onClose();
      }

      if (imgUrl && onThumbnailSelect && selectedNativeVideoURL) {
        // onSelect?.(selectedNativeVideoURL);
        onThumbnailSelect(imgUrl);
        // onClose();
      }

      if (
        Array.isArray(mediaList) &&
        mediaList.length > 0 &&
        !videoUploadMediaMutation.isPending
      ) {
        onThumbnailSelect?.(imgUrl);
        onClose();
      }
      if (!isVideoFlow && !videoUploadMediaMutation.isPending) {
        setIsUploading(false);
        onClose();
      }
    },
    onError: (err) => {
      setIsUploading(false);
      console.error("Upload failed", err);
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    if (file) {
      const newUrl = URL.createObjectURL(file);
      const mime_type = file.type;
      const file_name = file.name;
      const size = file.size;

      const newMediaItem = {
        id: `temp-${Date.now()}`,
        type: "file" as const,
        file,
        storage_url: newUrl,
        uploaded_url: newUrl,
        file_name,
        mime_type,
        size,
      };

      setMediaList((prevList) => [newMediaItem, ...prevList]);
    }
  };

  const handleSelect = (imgUrl: string, file: File | string) => {
    if (onSelect && file) {
      uploadMutation.mutate(file);
    } else if (imgUrl) {
      onSelect?.(imgUrl);
      onClose();
    }
  };

  const handleViewMode = (mode: string) => {
    if (onCropImage) {
      setOnCropImage(false);
    }
    setViewMode(mode);
    setCurrentPage(1);
  };

  const handleCropModal = (url: string) => {
    setOnCropImage(true);
    setSearchInput("");
    // setSelectedFileObj(file);
    setSelectedImgURL(url);
  };

  const handleVideoThumbnail = async (
    videoUrl: string,
    videoFileObj: File | string | any,
  ) => {
    if (withoutThumbnail) {
      // If it's a blob URL, do NOT pass it
      if (videoUrl.startsWith("blob:")) {
        const uploaded =
          await videoUploadMediaMutation.mutateAsync(videoFileObj);
        const realUrl = uploaded?.data?.[0]?.url;
        onSelect?.(realUrl);
        return;
      }

      onSelect?.(concatImgURL(videoUrl));
      return;
    }
    // if (onThumbnailSelect) {
    //   setSelectedNativeVideoURL(videoUrl);
    //   setOnVideoThumbnail(true);
    // } else {
    //   // onSelect?.(videoUrl);
    //   uploadMutation.mutate(videoFileObj);
    // }
    // videoUploadMediaMutation.mutate(videoFileObj);
    // setSelectedNativeVideoURL(videoUrl);

    setSelectedNativeVideoURL(videoUrl);
    setOnVideoThumbnail(true);
  };

  const handleConfirm = async () => {
    if (selectedFileObj) {
      uploadMutation.mutate(selectedFileObj);
    }
    if (selectedThumbnailFileObj) {
      setIsVideoFlow(true); // ✅ ADD
      setIsUploading(true);
      uploadMutation.mutate(selectedThumbnailFileObj);
      if (selectedNativeVideoURL) {
        const videoFile = await blobUrlToFile(
          selectedNativeVideoURL,
          "localVideo.mp4",
          "video/mp4",
        );
        videoUploadMediaMutation.mutate(videoFile);
      }
    }
  };

  // ------------------------------------ //

  const getAllContentMedia = async ({ queryKey }: { queryKey: any }) => {
    const [_key, viewMode, currentPage, selectedFolderId, debouncedSearch] =
      queryKey;
    const isListView = viewMode === "list";

    const contentLimit = isListView ? 100 : 21;

    const params: Record<string, any> = {
      page: currentPage,
      limit: contentLimit,
    };
    if (selectedFolderId) {
      params.folder_id = selectedFolderId;
    }
    if (debouncedSearch) {
      params.search = debouncedSearch;
    }

    return await api.get("/content-library/browse", {
      params,
    });
  };

  const { data: allContents } = useQuery({
    queryKey: [
      "content-library",
      viewMode,
      currentPage,
      selectedFolderId,
      debouncedSearch,
    ],
    queryFn: getAllContentMedia,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });

  // const handleFolderClick = (item: any) => {
  //   setSelectedFolderId(item.id);
  //   dispatch(pushCrumb({ id: item.id, name: item.name }));
  // };
  const handleFolderClick = (item: { id: string; name: string }) => {
    const lastCrumb = crumbs[crumbs.length - 1];

    if (lastCrumb?.id !== item.id) {
      setSelectedFolderId(item.id);
      dispatch(pushCrumb({ id: item.id, name: item.name }));
    }

    // navigate(`/contentmedia/${item.id}`);
  };

  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    setSelectedFolderId(id);
  };

  useEffect(() => {
    if (allContents) {
      setAllContentData(allContents?.data?.items);
      setTotalPages(allContents?.data?.totalPages);
    }
  }, [allContents]);

  useEffect(() => {
    dispatch(resetCrumbs());
  }, []);

  useEffect(() => {
    if ((searchInput !== "" && onCropImage) || (open && onCropImage)) {
      setOnCropImage(false);
    }
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchInput, open]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log("🚀 ~ handleMessage ~ event:", event);
      if (event?.data?.payload) return;
      // 🔐 Always verify origin (IMPORTANT in production)
      if (event.origin !== "https://dam.premierpadel.com")
        return;

      const imageUrl = event.data?.imageUrl;
      const typeFile = event.data?.type === "file";

      if (imageUrl && typeFile) {
        onSelect?.(imageUrl);
        setTimeout(() => {
          onClose();
        }, 500);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <SidebarDialog
        title="Content Library"
        open={open}
        onClose={onClose}
        {...(onCropImage && selectedFileObj
          ? { onSubmit: handleConfirm }
          : onThumbnailSelect && selectedThumbnailFileObj
            ? { onSubmit: handleConfirm }
            : {})}
        className="md:mb-5 relative"
      >
        <div>
          <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
            Select Media Type
          </label>
          <div className="mb-6">
            <div className="flex w-full bg-gray-100 rounded-2xl p-1">
              {mediaTabs.map((tab: any) => {
                const isActive = activeMediaType === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (activeMediaType !== tab.id) {
                        setActiveMediaType(tab.id);
                        setLoadingIframe(true);
                      }
                    }}
                    className={`flex-1 py-2 md:text-sm text-xs font-medium rounded-xl transition-all duration-200
            ${isActive ? "bg-primary text-black shadow-sm" : ""}`}
                  >
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {activeMediaType === "content-library" ? (
          <>
            {isUploading && (
              <div className="absolute inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
                  <p className="text-white text-sm mt-2">Uploading...</p>
                </div>
              </div>
            )}
            <div
              className={`${isUploading ? "pointer-events-none opacity-50" : ""}`}
            >
              {!onCropImage && !onVideoThumbnail && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <SearchInput
                      placeholder="Search by ..."
                      searchWidth="md:w-sp320 w-48"
                      // width="320px"
                      className="px-4 py-2 rounded-2xl text-xs/3"
                      value={searchInput}
                      onChange={(value: string) => setSearchInput(value)}
                    />
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        text="Choose File"
                        textSize="md:text-sm text-xs"
                        className="px-3 py-2"
                        onClick={handleButtonClick}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-8">
                    {/* <Button icon={homeIcon} backgroundColor="transparent" /> */}
                    <BreadCrump
                      items={crumbs}
                      onItemClick={handleBreadcrumbClick}
                      className="mb-5"
                    />
                    <div className="flex justify-end items-center ">
                      <div className="w-max rounded-lg border-primary border flex">
                        <button
                          type="button"
                          className={`text-3xl p-1 rounded-lg ${
                            viewMode === "grid"
                              ? "bg-primary relative border-r border-fcd100"
                              : ""
                          }`}
                          onClick={() => handleViewMode("grid")}
                        >
                          <img src={gridIcon} alt="" className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          className={`text-3xl p-1 rounded-lg ${
                            viewMode === "list"
                              ? "bg-primary relative border-l border-fcd100"
                              : ""
                          }`}
                          onClick={() => handleViewMode("list")}
                        >
                          <img src={list} alt="" className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {onCropImage ? (
                <>
                  <ImageCrop
                    imageUrl={selectedImgURL}
                    setFileObj={setSelectedFileObj}
                    disableOnCrop={() => setOnCropImage(false)}
                  />
                </>
              ) : onVideoThumbnail ? (
                <>
                  <VideoThumbnailGenerator
                    videoUrl={selectedNativeVideoURL}
                    onBack={() => setOnVideoThumbnail(false)}
                    setThumbnailFileObj={setSelectedThumbnailFileObj}
                  />
                </>
              ) : (
                <>
                  {viewMode === "grid" ? (
                    <div className="my-4 flex flex-col gap-9">
                      <div className="flex flex-col gap-2">
                        {combinedContents.length === 0 ? (
                          <div className="flex flex-col my-44 items-center justify-center text-center text-gray-500">
                            <Lottie animationData={animation404} loop={true} />
                            <p className="text-sm font-medium">
                              No content found
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Try uploading files or creating folders.
                            </p>
                          </div>
                        ) : (
                          <div className="mb-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 md:gap-4 gap-2">
                            {combinedContents.map((item) =>
                              item.type === "folder" ? (
                                <div
                                  key={item.id}
                                  className="bg-white rounded-2xl shadow-md"
                                >
                                  <div className="p-2 flex flex-col items-center justify-center cursor-pointer">
                                    <img
                                      src={folderIcon}
                                      alt="Folder"
                                      className="w-20 md:h-24 h-20"
                                      onClick={() => handleFolderClick(item)}
                                    />
                                  </div>
                                  <div className="flex justify-between">
                                    <div className="py-2 ps-3">
                                      <p className="text-xs text-gray-700 truncate lg:w-32 w-24">
                                        {item.name}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  key={item.id}
                                  className="bg-white rounded-2xl shadow-md"
                                >
                                  <div
                                    className={`group relative p-2 rounded-2xl transition-all ${
                                      (mediaFilter === "image" &&
                                        !item.mime_type?.startsWith("image")) ||
                                      (mediaFilter === "video" &&
                                        !item.mime_type?.startsWith("video")) ||
                                      (mediaFilter === "document" &&
                                        item.mime_type !== "application/pdf")
                                        ? "opacity-50 cursor-not-allowed pointer-events-none"
                                        : "cursor-pointer"
                                    }`}
                                    onClick={() => {
                                      const isImage =
                                        item.mime_type?.startsWith("image");
                                      const isVideo =
                                        item.mime_type?.startsWith("video");
                                      const isPdf =
                                        item.mime_type === "application/pdf";
                                      if (
                                        (mediaFilter === "image" && !isImage) ||
                                        (mediaFilter === "video" && !isVideo) ||
                                        (mediaFilter === "document" && !isPdf)
                                      ) {
                                        return;
                                      }
                                      // handleSelect(item.storage_url, item.file);
                                      if (
                                        (mediaFilter === "image" ||
                                          mediaFilter === "all") &&
                                        isImage
                                      ) {
                                        // handleSelect(item.storage_url, item.file);
                                        handleSelect(
                                          item.uploaded_url,
                                          item.file,
                                        );
                                      } else if (
                                        (mediaFilter === "video" ||
                                          mediaFilter === "all") &&
                                        isVideo
                                      ) {
                                        handleVideoThumbnail(
                                          concatImgURL(item.uploaded_url),
                                          item.file,
                                        );
                                      } else if (
                                        (mediaFilter === "document" ||
                                          mediaFilter === "all") &&
                                        isPdf
                                      ) {
                                        // onSelect?.(item.storage_url);
                                        handleSelect(
                                          item.storage_url,
                                          item.file,
                                        );
                                      }
                                    }}
                                  >
                                    {item.mime_type?.startsWith("image") && (
                                      <div
                                        className="absolute top-3 right-3  transition-opacity duration-300 z-10"
                                        onClick={(e) => {
                                          e.stopPropagation(); // prevent triggering parent click
                                          // handleCropModal(item.storage_url);
                                          handleCropModal(
                                            concatImgURL(item.uploaded_url),
                                          );
                                        }}
                                      >
                                        <Button
                                          backgroundColor="white"
                                          icon={cropIcon}
                                          className="md:p-0"
                                        />
                                      </div>
                                    )}
                                    {item.mime_type?.startsWith("image") ? (
                                      <img
                                        src={concatImgURL(item.storage_url)}
                                        alt={item.alt_text || item.file_name}
                                        className="w-full md:h-24 h-20 object-cover rounded-2xl cursor-pointer"
                                      />
                                    ) : item.mime_type?.startsWith("video") ? (
                                      <video
                                        controls
                                        src={concatImgURL(item.storage_url)}
                                        className="w-full md:h-24 h-20 object-cover rounded-2xl pointer-events-none"
                                      />
                                    ) : item.mime_type === "application/pdf" ? (
                                      <>
                                        <div className="flex flex-col items-center justify-center h-20 md:h-24 bg-gray-100 rounded-2xl cursor-pointer">
                                          <FileText
                                            size={50}
                                            className="text-red-500"
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <p className="text-sm text-red-500">
                                        Unsupported file
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex justify-between">
                                    <div className="py-2 ps-3">
                                      <p className="text-xs text-gray-700 truncate lg:w-28 w-24">
                                        {item.file_name}
                                      </p>
                                      <p className="md:text-xs text-[10px] text-gray-500">
                                        {extractFileType(item.mime_type) ||
                                          item.mime_type}
                                        |{formatFileSize(item.size)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 mt-4">
                      {combinedContents.map((item) => {
                        const isDisabled =
                          item.type !== "folder" &&
                          ((mediaFilter === "image" &&
                            !item.mime_type?.startsWith("image")) ||
                            (mediaFilter === "video" &&
                              !item.mime_type?.startsWith("video")));
                        return (
                          <div
                            key={item.id}
                            className={`bg-white rounded-2xl shadow-md flex items-center cursor-pointer ${
                              isDisabled
                                ? "opacity-50 cursor-not-allowed pointer-events-none"
                                : "cursor-pointer"
                            }`}
                            onClick={() => {
                              if (item.type === "folder")
                                handleFolderClick(item);
                            }}
                          >
                            {/* Icon / Preview */}
                            <div
                              className={`p-1`}
                              onClick={() => {
                                if (
                                  (mediaFilter === "image" &&
                                    !item.mime_type?.startsWith("image")) ||
                                  (mediaFilter === "video" &&
                                    !item.mime_type?.startsWith("video"))
                                ) {
                                  return;
                                }
                                handleSelect(item.storage_url, item.file);
                              }}
                            >
                              {item.type === "folder" ? (
                                <img
                                  src={folderIcon}
                                  alt="Folder"
                                  className="w-16 h-16 object-contain"
                                />
                              ) : item.mime_type?.startsWith("image") ? (
                                <img
                                  src={concatImgURL(item.storage_url)}
                                  alt={item.alt_text || item.file_name}
                                  className="w-16 h-16 object-cover rounded-2xl"
                                />
                              ) : item.mime_type?.startsWith("video") ? (
                                <video
                                  src={concatImgURL(item.storage_url)}
                                  className="w-16 h-16 object-cover rounded-2xl pointer-events-none"
                                  controls
                                />
                              ) : item.mime_type === "application/pdf" ? (
                                <div className="flex flex-col items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl cursor-pointer">
                                  <FileText
                                    size={30}
                                    className="text-red-500"
                                  />
                                </div>
                              ) : (
                                <p className="text-xs text-red-500">
                                  Unsupported
                                </p>
                              )}
                            </div>

                            {/* Info */}
                            <div
                              className="flex-1 p-2"
                              onClick={() => {
                                if (
                                  (mediaFilter === "image" &&
                                    !item.mime_type?.startsWith("image")) ||
                                  (mediaFilter === "video" &&
                                    !item.mime_type?.startsWith("video"))
                                ) {
                                  return;
                                }
                                handleSelect(item.storage_url, item.file);
                              }}
                            >
                              <p className="text-sm text-gray-700 truncate w-40">
                                {item.type === "folder"
                                  ? item.name
                                  : item.file_name}
                              </p>
                              {item.type === "file" && (
                                <p className="text-xs text-gray-500">
                                  {extractFileType(item.mime_type)} |
                                  {formatFileSize(item.size)}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      onPageChange={setCurrentPage}
                      totalPages={totalPages}
                    />
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="relative w-full h-[640px]">
              {loadingIframe && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-black" />
                </div>
              )}
              <iframe
                src={`${env.DAM_URL}?file_type=${damMediaType}&at=${env.DAM_AUTHKEY}`}
                className="w-full h-[640px]"
                onLoad={() => setLoadingIframe(false)}
              />
            </div>
          </>
        )}
      </SidebarDialog>
    </>
  );
};

export default ContentLibrary;
