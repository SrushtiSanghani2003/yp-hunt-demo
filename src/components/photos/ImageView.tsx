import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   capitalize,
//   // extractFileType,
//   // formatFileSize,
// } from "../../config/function";
import api from "../../lib/api";
import ContentHeader from "../Subnavbar";
import Pagination from "../ui/pagination";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "../ui/button";
import { moreIcon } from "../../icons";
import DeleteMediaModal from "../contentmedia/DeleteMediaModal";
import { showToast } from "../../utils/toastUtils";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animation/content-library-empty.json";
import { PhotoProvider, PhotoView } from "react-photo-view";
import ImageDetailsModal from "./ImageDetailsModal";
import { useDebounce } from "../../hooks/useDebounce";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import { useDispatch } from "react-redux";
import EditPhotos from "./EditPhotos"; // ✅ import EditPhotos
import { concatImgURL } from "../../config/function";
import { useScroll } from "../../hooks/ScrollContext";

export default function ImageView() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const queryClient = useQueryClient();
  const { isScrolled } = useScroll();
  const dropdownWrapperRef = useRef<HTMLDivElement>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<null | {
    id: string;
    mediaType: "file" | "folder";
  }>(null);
  const [filePage, setFilePage] = useState(1);
  const [allImages, setAllImages] = useState([] as any[]);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const [detailsModal, setDetailsModal] = useState(false);
  const [imageDetails, setImageDetails] = useState<any>(null);

  const [editModalOpen, setEditModalOpen] = useState(false); // ✅ edit sidebar state
  const [editImageData, setEditImageData] = useState<any>(null); // ✅ selected image data for editing
  const debouncedSearch = useDebounce(searchInput, 300);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const pathParts = location.pathname.split("/").filter(Boolean);
  // const breadCrumbsItem = [
  //   { id: null, name: "Home" },
  //   ...pathParts.map((part, index) => ({
  //     id: "/" + pathParts.slice(0, index + 1).join("/"),
  //     name: capitalize(part),
  //   })),
  // ];

  const breadCrumbsItem = [
    { id: null, name: "Home" },
    { id: "/media/photos", name: "Photos" },
    { id: null, name: "Image Listing" },
  ];

  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    navigate(id ? id : "");
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setActiveMenuId(null);
    }, 1000);
  };
  const deleteFile = async (id: string) => {
    return await api.delete(`/images/${id}`);
  };
  const deleteFileMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      showToast("File Deleted", "success");
      queryClient.invalidateQueries({
        queryKey: ["allImages"],
        exact: false,
      });
    },
    onError: () => {
      showToast("Failed to delete file", "error");
    },
  });
  const handleDeleteFile = (id: string) => {
    if (id) {
      deleteFileMutation.mutate(id);
    }
  };

  const handleDeleteMedia = () => {
    if (!selectedItem) return;
    handleDeleteFile(selectedItem.id);
    setDeleteModalVisible(false);
    setSelectedItem(null);
  };
  const getImages = async (albumId: string) => {
    const params: Record<string, any> = {};
    params.page = filePage;
    params.limit = 10;
    const res = await api.get(`/images/albums/${albumId}/images`, { params });
    return res.data;
  };

  const { data: imagesDataById } = useQuery({
    queryKey: ["allImages", id, filePage, debouncedSearch],
    queryFn: () => getImages(id as string),
    refetchOnWindowFocus: false,
    placeholderData: (prevData) => prevData,
  });

  const totalFilesPages = useMemo(() => {
    return imagesDataById?.totalPages || 1;
  }, [imagesDataById?.totalPages]);

  useEffect(() => {
    setAllImages(imagesDataById?.Images || []);
  }, [imagesDataById]);

  // useEffect(() => {
  // }, [imagesDataById]);

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

  const updateImageMutation = useMutation({
    mutationFn: (updatedData: any) => {
      return api.put(`/images/${editImageData.id}`, {
        // image: {
        //   title: updatedData[0].title,
        //   image_url: updatedData[0].image_url,
        //   category_ids: updatedData[0].category_ids,
        //   tag_ids: updatedData[0].tag_ids,
        //   player_ids: updatedData[0].player_ids,
        // },
        image: {
          title: updatedData?.title,
          image_url: updatedData?.image_url,
          category_ids: updatedData?.category_ids,
          tag_ids: updatedData?.tag_ids,
          player_ids: updatedData?.player_ids,
        },
      });
    },
    onSuccess: () => {
      showToast("Image updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["allImages"], exact: false });
      setEditModalOpen(false);
    },
    onError: () => {
      showToast("Failed to update image", "error");
    },
  });

  // ✅ handle edit submit
  const handleEditSubmit = async (updatedData: any) => {
    updateImageMutation.mutate(updatedData);
    // try {
    //   const updated = updatedData[0];
    //   await api.put(`/images/${editImageData.id}`, {
    //     image: {
    //       title: updated.title,
    //       image_url: updated.image_url,
    //       category_ids: updated.category_ids,
    //       tag_ids: updated.tag_ids,
    //       player_ids: updated.player_ids,
    //     },
    //   });
    //   showToast("Image updated successfully!", "success");
    //   setEditModalOpen(false);

    //   // ✅ Invalidate the query your component uses
    //   await queryClient.invalidateQueries({
    //     queryKey: ["allImages", id, filePage, debouncedSearch],
    //   });
    // } catch (error) {
    //   console.error("Update error:", error);
    //   showToast("Failed to update image", "error");
    // }
  };

  return (
    <div>
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <ContentHeader
          title="Image Listing"
          breadCrumbsItem={breadCrumbsItem}
          onBreadCrumbClick={handleBreadcrumbClick}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </div>
      <div className="container">
        <div className="flex flex-col gap-2">
          {allImages.length === 0 && (
            <div className="flex items-center justify-center mt-4">
              <Lottie
                animationData={loadingAnimation}
                style={{ width: "25%" }}
              />
            </div>
          )}
          <div className="mb-2 mt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-4 gap-2">
            {allImages.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-md">
                <PhotoProvider maskOpacity={0.7}>
                  <div className="relative p-2">
                    {item.image_url ? (
                      <PhotoView src={concatImgURL(item.image_url)}>
                        <img
                          src={concatImgURL(item.image_url)}
                          alt={item.alt_text || item.title}
                          className="w-full md:h-40 h-20 object-cover rounded-2xl cursor-pointer"
                        />
                      </PhotoView>
                    ) : item.mime_type ? (
                      <video
                        controls
                        src={concatImgURL(item.storage_url)}
                        className="w-full md:h-40 h-20 object-cover rounded-2xl"
                      />
                    ) : (
                      <p className="text-sm text-red-500">Unsupported file</p>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <div className="md:py-3 py-2 md:ps-3 p-2">
                      <p className="md:text-sm text-xs text-gray-700 truncate font-medium lg:w-32 md:w-24 w-16">
                        {item.title}
                      </p>

                      {/* <span className="text-xs">{formatDate(item.createdAt)}</span> */}
                    </div>
                    <div className="relative p-2 flex items-center">
                      <Button
                        icon={moreIcon}
                        backgroundColor="transparent"
                        className="p-0 md:p-0"
                        imageclassName="md:w-5 w-4"
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
                              className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                              onClick={() => copyToClipboard(item.image_url)}
                            >
                              {copied ? "Copied" : "Copy URL"}
                            </li>
                            <li
                              className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                              onClick={() => {
                                setSelectedItem({
                                  id: item.id,
                                  mediaType: "file",
                                });
                                setDeleteModalVisible(true);
                              }}
                            >
                              Delete
                            </li>
                            <li
                              className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                              onClick={() => {
                                setDetailsModal(true);
                                setImageDetails(item);
                              }}
                            >
                              View Details
                            </li>
                            <li
                              className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                              onClick={() => {
                                setEditImageData(item);
                                setEditModalOpen(true);
                                setActiveMenuId(null);
                              }}
                            >
                              Edit Details
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </PhotoProvider>
              </div>
            ))}
          </div>

          {deleteModalVisible && (
            <DeleteMediaModal
              show={deleteModalVisible}
              onClose={() => {
                (setDeleteModalVisible(false), setSelectedItem(null));
              }}
              mediaType={selectedItem?.mediaType ?? "file"}
              onDelete={handleDeleteMedia}
              isLoading={deleteFileMutation.isPending}
            />
          )}

          {detailsModal && (
            <ImageDetailsModal
              show={detailsModal}
              onClose={() => {
                setDetailsModal(false);
                setActiveMenuId(null);
              }}
              data={imageDetails}
            />
          )}

          {/* ✅ EditPhotos Sidebar */}
          {editModalOpen && (
            <EditPhotos
              open={editModalOpen}
              onClose={() => setEditModalOpen(false)}
              onSubmit={handleEditSubmit}
              albumId={id as string}
              isLoading={updateImageMutation.isPending}
              initialData={editImageData}
            />
          )}

          {totalFilesPages > 1 && (
            <Pagination
              currentPage={filePage}
              onPageChange={setFilePage}
              totalPages={totalFilesPages}
            />
          )}
        </div>
      </div>
    </div>
  );
}
