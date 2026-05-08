import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../lib/api";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import Pagination from "../ui/pagination";
import Button from "../ui/button";
import { deleteIcon, mediaIcon } from "../../icons";
import { concatImgURL, formatDate } from "../../config/function";
import { PhotoProvider, PhotoView } from "react-photo-view";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import { showToast } from "../../utils/toastUtils";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import ContentHeader from "../Subnavbar";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import { useDispatch } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Thumbnail", minWidth: "min-w-28 w-28" },
  { title: "Title", minWidth: "min-w-72 w-72" },
  { title: "Order", minWidth: "min-w-16 w-16" },
  { title: "Status", minWidth: "min-w-24 w-24" },
  { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];

const VIdeosView = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const groupName = location?.state?.groupName;
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [statusModalShow, setStatusModalShow] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string | undefined>("");
  const [selectedVideoId, setSelectedVideoId] = useState<
    string | undefined | null
  >("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearch = useDebounce(searchInput, 300);
  const navigate = useNavigate();

  const breadCrumbsItem = [
    { id: null, name: "Home" },
    { id: "/media/videogroups", name: "Video Groups" },
    { id: null, name: "Video Listing" },
  ];

  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    navigate(id ? id : "");
  };

  const getVideosById = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string?]>) => {
    const [, currentPage, debouncedSearch] = queryKey;
    const params: Record<string, any> = {
      page: currentPage,
      limit: 10,
    };
    if (debouncedSearch) {
      params.search = debouncedSearch;
    }
    return await api.get(`/video-group/${id}/videos`, { params });
  };

  const { data: videosByIdData, isFetching } = useQuery({
    queryKey: ["videosById", page, debouncedSearch],
    queryFn: getVideosById,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return videosByIdData?.data?.totalPages || 1;
  }, [videosByIdData?.data?.totalPages]);

  const statusChange = async (videoId: string) => {
    const isActive = currentStatus == "draft" ? "published" : "draft";
    return await api.patch(
      `/video-group/${id}/videos/${videoId}/change-status`,
      {
        status: isActive,
      }
    );
  };

  const statusChangeMutation = useMutation({
    mutationFn: statusChange,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videosById"],
        exact: false,
      });
      showToast("Status Changed", "success");
      setStatusModalShow(false);
      setSelectedVideoId(null);
    },
    onError: () => {
      showToast("Failed to change status", "error");
    },
  });

  const deleteVideo = async (videoId: string) => {
    return api.delete(`/video-group/${id}/videos/${videoId}`);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videosById"],
        exact: false,
      });
      showToast("Video deleted successfully", "success");
      setShowDeleteModal(false);
    },
    onError: () => {
      console.error("Failed to delete a video");
    },
  });

  const handleConfirmDelete = () => {
    if (selectedVideoId) {
      deleteMutation.mutate(String(selectedVideoId));
    }
  };

  const handleOrderClick = async (
    videoId: number,
    current_order: number,
    totalDocs: number
  ) => {
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
      const payload = { order: parseInt(new_order) };
      try {
        await api.patch(
          `/video-group/${id}/videos/${videoId}/change-order`,
          payload
        );

        toast.success(`Order updated to ${new_order}`);
        await queryClient.invalidateQueries({
          queryKey: ["videosById"],
          exact: false,
        });
      } catch (error) {
        console.error("Order update failed:", error);
        toast.error("Failed to update order");
      }
    }
  };

  useEffect(() => {
    if (videosByIdData) {
      setVideos(videosByIdData?.data?.data);
    }
  }, [videosByIdData]);

  return (
    <>
      <div className="mt-14 grid grid-cols-1">
        <ContentHeader
          title={`${groupName} Video List`}
          breadCrumbsItem={breadCrumbsItem}
          onBreadCrumbClick={handleBreadcrumbClick}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <div className="overflow-x-auto my-3">
          <table className="min-w-full table-fixed border-separate border-spacing-y-2">
            <thead className="text-left">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.title}
                    className={`p-2 ps-0 text-black font-normal text-base ${col.minWidth}`}
                  >
                    <span
                      className={`${
                        col.title === "Action" ||
                        col.title === "Status" ||
                        col.title === "Order"
                          ? "flex items-center justify-center gap-1"
                          : ""
                      } opacity-40 break-words whitespace-normal block text-left ${
                        col.title === "ID" ? "" : ""
                      }`}
                    >
                      {col.title}
                    </span>
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
              ) : videos?.length === 0 ? (
                <tr>
                  <td colSpan={columns.length}>
                    <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                      No data available.
                    </div>
                  </td>
                </tr>
              ) : (
                (videos as any[])?.map((item, index) => {
                  return (
                    <tr key={item?.video_id} className="">
                      <td colSpan={columns.length}>
                        <div className="hover:bg-gray-100 transition bg-white border border-primary rounded-xl py-2">
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
                                <td className="text-base text-left ">
                                  <PhotoProvider maskOpacity={0.6}>
                                    {item.video?.video_thumbnail ||
                                    item?.video?.image ? (
                                      <PhotoView
                                        src={concatImgURL(
                                          item.video?.video_thumbnail ||
                                            item?.video?.image
                                        )}
                                      >
                                        <img
                                          src={concatImgURL(
                                            item.video?.video_thumbnail ||
                                              item?.video?.image
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
                                <td className="text-base text-left">
                                  <p className="w-64 line-clamp-3">
                                    {item.video.title}
                                  </p>
                                </td>
                                <td>
                                  <p
                                    className="text-base text-center"
                                    onClick={() =>
                                      handleOrderClick(
                                        item?.video_id,
                                        item?.order,
                                        videosByIdData?.data?.totalDocs ||
                                          videosByIdData?.data?.data?.length
                                      )
                                    }
                                  >
                                    {item.order}
                                  </p>
                                </td>
                                <td className="text-base relative  text-left cursor-pointer">
                                  <ToggleSwitch
                                    checked={item?.status === "published"}
                                    onClick={() => {
                                      setStatusModalShow(true);
                                      setCurrentStatus(item?.status);
                                      setSelectedVideoId(
                                        String(item?.video_id)
                                      );
                                    }}
                                  />
                                </td>
                                <td className="text-base text-left">
                                  {formatDate(item.video.created_at)}
                                </td>
                                <td className="">
                                  <div className="flex items-center justify-center gap-3">
                                    <Button
                                      icon={deleteIcon}
                                      backgroundColor="transparent"
                                      className="p-0"
                                      onClick={() => {
                                        setSelectedVideoId(
                                          String(item?.video_id)
                                        );
                                        setShowDeleteModal(true);
                                      }}
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
      </div>
      {videos?.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
      {statusModalShow && (
        <ChangeStatusModal
          show={statusModalShow}
          onClose={() => setStatusModalShow(false)}
          onSave={() => {
            if (selectedVideoId) {
              statusChangeMutation.mutate(selectedVideoId);
            }
          }}
          isLoading={statusChangeMutation.isPending}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          isLoading={deleteMutation.isPending}
        />
      )}
    </>
  );
};

export default VIdeosView;
