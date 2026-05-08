import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/button";
import { closeIcon, mediaIcon } from "../../icons";
import api from "../../lib/api";
import {
  useMutation,
  useQuery,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import SearchInput from "../ui/searchInput";
import { concatImgURL } from "../../config/function";
import { useDebounce } from "../../hooks/useDebounce";
import { showToast } from "../../utils/toastUtils";
import Pagination from "../ui/pagination";

type Props = {
  show: boolean;
  onClose: () => void;
  selectedVideoGroupId?: string | null;
  videoIds?: any[];
};

const VideosModal = ({
  show,
  onClose,
  selectedVideoGroupId,
  videoIds,
}: Props) => {
  const [allVideos, setAllVideos] = useState<any[]>([]);
  const [selectedVideoIds, setSelectedVideoIds] = useState<number[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 300);
  const [page, setPage] = useState(1);

  const getVideos = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string?]>) => {
    const [, page, debouncedSearch] = queryKey;
    const params: Record<string, any> = {
      page: page,
      limit: 30,
    };
    if (debouncedSearch) {
      params.title = debouncedSearch;
    }
    return await api.get("/videos/", { params });
  };

  const { data: allVideosData } = useQuery({
    queryKey: ["videoAlbums", page, debouncedSearch],
    queryFn: getVideos,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });

  const totalPages = useMemo(() => {
    return allVideosData?.data?.totalPages;
  }, [allVideosData?.data?.totalPages]);

  // Toggle select/unselect
  const handleVideoSelect = (videoId: number) => {
    setSelectedVideoIds((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId]
    );
  };

  const addVideosInGroup = async () => {
    return await api.post(`/video-group/${selectedVideoGroupId}/videos`, {
      video_ids: selectedVideoIds,
      status: "published",
    });
  };

  const addVideosMutation = useMutation({
    mutationFn: addVideosInGroup,
    onSuccess: () => {
      showToast("Videos added successfully", "success");
      onClose();
    },
    onError: () => {
      showToast("Failed to add videos", "error");
    },
  });

  const handleSubmit = () => {
    console.log("Selected Videos:", selectedVideoIds);
    addVideosMutation.mutate();
  };

  // Set videos on load
  useEffect(() => {
    if (allVideosData?.data?.videos) {
      setAllVideos(allVideosData.data.videos);
    }
  }, [allVideosData]);

  useEffect(() => {
    if (show && Array.isArray(videoIds)) {
      const ids = videoIds.map((v) => Number(v.id)).filter(Boolean);
      setSelectedVideoIds(ids);
    }
  }, [show, videoIds]);

  return (
    <Dialog
      open={show}
      onClose={() => {}}
      className="fixed inset-0 z-[500] flex items-center overflow-auto"
    >
      <div className="fixed inset-0 bg-black/55" aria-hidden="true" />

      <DialogPanel className="max-w-3xl relative z-10 bg-white rounded-2xl p-6 w-full border border-primary m-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <DialogTitle className="text-2xl font-extrabold">
            Select Videos
          </DialogTitle>

          <Button
            icon={closeIcon}
            backgroundColor="transparent"
            className="p-0"
            onClick={onClose}
          />
        </div>

        {/* Search */}
        <SearchInput
          placeholder="Search here..."
          value={searchInput}
          className="px-3 py-2 text-sm w-full rounded-xl"
          onChange={setSearchInput}
          onClear={() => setSearchInput("")}
        />

        {/* Scrollable Grid */}
        <div className="h-96 overflow-auto mt-5 pr-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-1">
            {allVideos?.length === 0 ? (
              <div className="col-span-full flex justify-center py-10">
                <p className="text-gray-500 text-sm">No videos found</p>
              </div>
            ) : (
              allVideos?.map((video: any) => {
                const isSelected = selectedVideoIds.includes(video.id);

                return (
                  <div
                    key={video.id}
                    className={`border rounded-xl overflow-hidden cursor-pointer transition-all relative
          ${
            isSelected
              ? "border-primary ring-2 ring-primary"
              : "border-gray-300"
          }`}
                    onClick={() => handleVideoSelect(video.id)}
                  >
                    {/* Thumbnail */}
                    {video.video_thumbnail ? (
                      <img
                        src={concatImgURL(video.video_thumbnail)}
                        alt={video.title}
                        className="w-full h-24 object-cover"
                      />
                    ) : (
                      <div className="flex justify-center items-center bg-gray-100 h-24">
                        <img
                          src={mediaIcon}
                          alt="Media"
                          className="w-10 h-10"
                        />
                      </div>
                    )}

                    {/* Title */}
                    <div className="p-2">
                      <p className="text-xs font-medium line-clamp-2">
                        {video.title}
                      </p>
                    </div>

                    {/* Checkbox */}
                    <div
                      className="absolute top-2 right-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleVideoSelect(video.id)}
                        className="w-4 h-4 accent-black cursor-pointer"
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer */}
        {allVideos?.length !== 0 && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
        <div className="mt-6 flex justify-end gap-4">
          <Button
            text="Cancel"
            onClick={onClose}
            className="px-5 border-primary border-0.5"
            backgroundColor="transparent"
          />

          <Button
            text={addVideosMutation.isPending ? "Saving..." : "Save"}
            className="px-8 py-3"
            onClick={handleSubmit}
          />
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default VideosModal;
