import { useLocation, useNavigate } from "react-router-dom";
import ContentHeader from "../Subnavbar";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { capitalize, formatDate } from "../../config/function";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import { useEffect, useMemo, useState } from "react";
import VideoGroupCreate from "./VideoGroupCreate";
import Button from "../ui/button";
import {
  correctIconGreen,
  deleteIcon,
  eyeOpenIcon,
  penIcon,
  spanishFlag,
  usaFlag,
} from "../../icons";
import api from "../../lib/api";
import { showToast } from "../../utils/toastUtils";
import { useDebounce } from "../../hooks/useDebounce";
import Pagination from "../ui/pagination";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import VideosModal from "./VideosModal";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import ChangeStatusModal from "../articles/ChangeStatusModal";

const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Title", minWidth: "min-w-60 w-60" },
  { title: "Created At", minWidth: "min-w-24 w-24" },
  { title: "Languages", minWidth: "min-w-20 w-20" },
  { title: "Status", minWidth: "min-w-20 w-20" },
  { title: "Action", minWidth: "min-w-24 w-24" },
];

const VideoGroupsList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState<string>("");
  const [page, setPage] = useState(1);
  const [createShow, setCreateShow] = useState(false);
  const [allVideoGroups, setAllVideoGroups] = useState([]);
  const debouncedSearch = useDebounce(searchInput, 300);
  const [selectedVideoGroupId, setSelectedVideoGroupId] = useState<
    string | null
  >("");
  const [videoIds, setVideoIds] = useState<any[]>([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [statusModalShow, setStatusModalShow] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string | undefined>("");
  const [selectedLanguageCode, setSelectedLanguageCode] =
    useState<string>("en");

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

  const getAllVideoGroups = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string?]>) => {
    const [, currentPage, title] = queryKey;

    const params: Record<string, any> = {
      page: currentPage,
      limit: 8,
    };

    if (title) {
      params.search = title;
    }
    return await api.get("/video-group", { params });
  };

  const { data: videoGroupData, isFetching } = useQuery({
    queryKey: ["videoGroups", page, debouncedSearch],
    queryFn: getAllVideoGroups,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return videoGroupData?.data?.totalPages || 1;
  }, [videoGroupData?.data?.totalPages]);

  useEffect(() => {
    if (videoGroupData) {
      setAllVideoGroups(videoGroupData?.data?.data);
    }
  }, [videoGroupData]);

  const handleCreate = () => {
    setCreateShow(true);
  };

  const createVideoGroup = async (newGroup: any) => {
    return await api.post("/video-group", newGroup);
  };

  const createVideoGroupMutation = useMutation({
    mutationFn: createVideoGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videoGroups"],
        exact: false,
      });
      showToast("Video Group created successfully", "success");
      setCreateShow(false);
    },
    onError: () => {
      showToast("Video Group creation failed", "error");
    },
  });

  const updateVideoGroup = async (updatedGroup: any) => {
    return await api.put(`/video-group/${selectedVideoGroupId}`, updatedGroup);
  };

  const updateVideoGroupMutation = useMutation({
    mutationFn: updateVideoGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videoGroups"],
        exact: false,
      });
      setCreateShow(false);
      showToast("Video Group updated successfully", "success");
    },
    onError: () => {
      showToast("Video Group update failed", "error");
    },
  });

  const deleteVideoGroup = async (id: string) => {
    return api.delete(`/video-group/${id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteVideoGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videoGroups"],
        exact: false,
      });
      showToast("Video Group deleted successfully", "success");
      setShowDeleteModal(false);
      //   setse(null);
    },
    onError: () => {
      console.error("Failed to delete a photo");
    },
  });

  const handleConfirmDelete = () => {
    if (selectedVideoGroupId) {
      deleteMutation.mutate(String(selectedVideoGroupId));
    }
  };

  const statusChange = async (videoGroupId: string) => {
    const isActive = currentStatus == "draft" ? "published" : "draft";
    return await api.patch(`/video-group/${videoGroupId}/change-status`, {
      status: isActive,
    });
  };

  const statusChangeMutation = useMutation({
    mutationFn: statusChange,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videoGroups"],
        exact: false,
      });
      showToast("Status Changed", "success");
      setStatusModalShow(false);
      setSelectedVideoGroupId(null);
    },
    onError: () => {
      showToast("Failed to change status", "error");
    },
  });

  const handleTranslationClick = (id: string, lang: "en" | "es", data: any) => {
    setCreateShow(true);
    setSelectedLanguageCode(lang);
    setSelectedVideoGroupId(id);
    setEditData(data);
  };

  const handleView = (data: any) => {
    navigate(`/media/videogroups/videos/${data?.id}`, {
      state: { groupName: data?.title },
    });
  };

  return (
    <div className="mt-10 grid grid-cols-1">
      <ContentHeader
        title="Video Groups"
        breadCrumbsItem={breadCrumbsItem}
        onBreadCrumbClick={handleBreadcrumbClick}
        onCreate={handleCreate}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <div className="overflow-x-auto my-3">
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
                        col.title === "Action" || col.title === "Status"
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
            ) : allVideoGroups.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No data available.
                  </div>
                </td>
              </tr>
            ) : (
              (allVideoGroups as any[])?.map((video, index) => {
                return (
                  <tr key={video?.id} className="">
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
                              <td className="text-base cursor-pointer">
                                <div className="flex justify-between items-center line-clamp-3">
                                  {video?.title}
                                  <Button
                                    text="Add Videos"
                                    onClick={() => {
                                      setVideoIds(video?.videos);
                                      setSelectedVideoGroupId(video?.id);
                                      setShowVideoModal(true);
                                    }}
                                    backgroundColor="transparent"
                                    iconPosition="end"
                                    textWeight="font-bold"
                                    className="flex items-center me-4 gap-2 border border-green-600 text-green-600 md:px-4 px-2 md:py-3 py-2 rounded-xl text-sm transition"
                                  />
                                </div>
                              </td>
                              <td className="text-base cursor-pointer">
                                {formatDate(video?.created_at)}
                              </td>

                              <td className="">
                                <div className="flex items-center justify-center gap-2">
                                  <Button
                                    backgroundColor="transparent"
                                    className="p-0"
                                    icon={
                                      video.languages.includes("en")
                                        ? correctIconGreen
                                        : penIcon
                                    }
                                    onClick={() =>
                                      handleTranslationClick(
                                        video?.id,
                                        "en",
                                        video
                                      )
                                    }
                                  />
                                  <Button
                                    backgroundColor="transparent"
                                    className="p-0"
                                    icon={
                                      video.languages.includes("es")
                                        ? correctIconGreen
                                        : penIcon
                                    }
                                    onClick={() =>
                                      handleTranslationClick(
                                        video?.id,
                                        "es",
                                        video
                                      )
                                    }
                                  />
                                </div>
                              </td>
                              <td className="text-base text-center">
                                <ToggleSwitch
                                  checked={video?.status === "published"}
                                  onClick={() => {
                                    setStatusModalShow(true);
                                    setCurrentStatus(video?.status);
                                    setSelectedVideoGroupId(String(video?.id));
                                  }}
                                />
                              </td>
                              <td className="">
                                <div className="flex items-center justify-center gap-3">
                                  <Button
                                    icon={eyeOpenIcon}
                                    backgroundColor="transparent"
                                    className="p-0"
                                    onClick={() => handleView(video)}
                                  />
                                  <Button
                                    icon={penIcon}
                                    backgroundColor="transparent"
                                    className="p-0"
                                    onClick={() => {
                                      setCreateShow(true);
                                      setSelectedVideoGroupId(video?.id);
                                      setSelectedLanguageCode("en");
                                      setEditData(video);
                                    }}
                                  />
                                  <Button
                                    icon={deleteIcon}
                                    backgroundColor="transparent"
                                    className="p-0"
                                    onClick={() => {
                                      setShowDeleteModal(true);
                                      setSelectedVideoGroupId(
                                        String(video?.id)
                                      );
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

      {createShow && (
        <VideoGroupCreate
          show={createShow}
          onClose={() => {
            setCreateShow(false);
            setEditData(null);
          }}
          isLoading={
            createVideoGroupMutation.isPending ||
            updateVideoGroupMutation.isPending
          }
          onCreate={(obj) => createVideoGroupMutation.mutate(obj)}
          onUpdate={(obj) => updateVideoGroupMutation.mutate(obj)}
          editData={editData}
          language_code={selectedLanguageCode}
        />
      )}
      {showVideoModal && (
        <VideosModal
          show={showVideoModal}
          onClose={() => setShowVideoModal(false)}
          selectedVideoGroupId={selectedVideoGroupId}
          videoIds={videoIds}
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
      {statusModalShow && (
        <ChangeStatusModal
          show={statusModalShow}
          onClose={() => setStatusModalShow(false)}
          onSave={() => {
            if (selectedVideoGroupId) {
              statusChangeMutation.mutate(selectedVideoGroupId);
            }
          }}
          isLoading={statusChangeMutation.isPending}
        />
      )}
      {allVideoGroups?.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default VideoGroupsList;
