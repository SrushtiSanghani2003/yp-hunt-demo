import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useMemo, useState } from "react";
import AsyncSelect from "react-select/async";
import { useQuery } from "@tanstack/react-query";
import { closeIcon } from "../../icons";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import Button from "../ui/button";
import api from "../../lib/api";

type MediaSelectModalProps = {
  open: boolean;
  onClose: () => void;
  mediaType: "news" | "video" | null;
  selectedValue?: any;
  onSave: (value: any) => void;
};

const PageMediaSelectModal = ({
  open,
  onClose,
  mediaType,
  selectedValue: initialValue,
  onSave,
}: MediaSelectModalProps) => {
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [useLatestNews, setUseLatestNews] = useState<boolean>(true);

  /* ---------------- RESET / INIT ---------------- */
  useEffect(() => {
    if (mediaType === "news") {
      if (initialValue?.is_latest) {
        setUseLatestNews(true);
        setSelectedValue(null);
      } else if (initialValue?.external_id) {
        setUseLatestNews(false);
        setSelectedValue({
          label: initialValue.title,
          value: initialValue.external_id,
        });
      } else {
        setUseLatestNews(true);
        setSelectedValue(null);
      }
    }

    if (mediaType === "video") {
      if (initialValue?.is_latest) {
        setUseLatestNews(true);
        setSelectedValue(null);
      } else if (initialValue?.external_id) {
        setUseLatestNews(false);
        setSelectedValue({
          label: initialValue.title,
          value: initialValue.external_id,
        });
      } else {
        setUseLatestNews(true);
        setSelectedValue(null);
      }
    }
  }, [mediaType, initialValue]);

  /* ---------------- INITIAL FETCH (LIMITED) ---------------- */
  const getAllNews = async () =>
    api.get("/news/dropdown", { params: { page: 1, limit: 50 } });

  const getAllVideos = async () =>
    api.get("/videos/dropdown", { params: { page: 1, limit: 50 } });

  const { data: allNews } = useQuery({
    queryKey: ["newsDropdown"],
    queryFn: getAllNews,
    enabled: mediaType === "news",
    refetchOnWindowFocus: false,
  });

  const { data: allVideos } = useQuery({
    queryKey: ["videosDropdown"],
    queryFn: getAllVideos,
    enabled: mediaType === "video",
    refetchOnWindowFocus: false,
  });

  const newsOptions = useMemo(
    () =>
      allNews?.data?.news?.map((n: any) => ({
        value: n.id,
        label: n.title,
      })) || [],
    [allNews]
  );

  const videoOptions = useMemo(
    () =>
      allVideos?.data?.videos?.map((v: any) => ({
        value: v.id,
        label: v.title,
      })) || [],
    [allVideos]
  );

  /* ---------------- ASYNC SEARCH (FULL DB) ---------------- */
  const loadOptionsNews = async (inputValue: string) => {
    if (!inputValue) return newsOptions;

    const { data } = await api.get("/news/dropdown", {
      params: { page: 1, limit: 50, search: inputValue },
    });

    return (
      data?.news?.map((n: any) => ({
        value: n.id,
        label: n.title,
      })) || []
    );
  };

  const loadOptionsVideo = async (inputValue: string) => {
    if (!inputValue) return videoOptions;

    const { data } = await api.get("/videos/dropdown", {
      params: { page: 1, limit: 50, search: inputValue },
    });

    return (
      data?.videos?.map((v: any) => ({
        value: v.id,
        label: v.title,
      })) || []
    );
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = () => {
    // Latest selected
    if (useLatestNews) {
      onSave({
        is_latest: true,
        external_id: null,
        title: "",
      });
      onClose();
      return;
    }

    // Manual selection
    if (!selectedValue) return;

    onSave({
      is_latest: false,
      external_id: selectedValue.value,
      title: selectedValue.label,
    });

    onClose();
  };

  /* ---------------- STYLES ---------------- */
  const customStyles = {
    control: (base: any) => ({
      ...base,
      minHeight: "48px",
      borderRadius: "8px",
      borderColor: "#e5e7eb",
      boxShadow: "none",
    }),
  };

  return (
    <Dialog
      open={open}
      onClose={() => {}}
      className="fixed inset-0 z-[500] flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/55" />
      <DialogPanel className="relative bg-white rounded-2xl p-6 w-full max-w-md border border-primary">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <DialogTitle className="text-xl font-extrabold">
            {mediaType === "news" ? "Select News" : "Select Video"}
          </DialogTitle>
          <button onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        {/* Toggle */}
        {(mediaType === "news" || mediaType === "video") && (
          <div className="mb-4 flex items-center justify-between">
            <span className="font-medium">
              Use Latest {mediaType === "news" ? "News" : "Video"}
            </span>
            <ToggleSwitch checked={useLatestNews} onChange={setUseLatestNews} />
          </div>
        )}

        {/* Dropdown */}
        <div className="mb-6">
          <label className="block mb-2 text-base font-medium">
            {mediaType === "news" ? "Select News" : "Select Video"}
          </label>

          <AsyncSelect
            cacheOptions
            styles={customStyles}
            loadOptions={
              mediaType === "news" ? loadOptionsNews : loadOptionsVideo
            }
            defaultOptions={mediaType === "news" ? newsOptions : videoOptions}
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder={
              mediaType === "news"
                ? "Type to search news"
                : "Type to search video"
            }
            isDisabled={useLatestNews}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <Button
            text="Cancel"
            onClick={onClose}
            backgroundColor="transparent"
            className="border border-gray-300 px-4 py-3"
          />
          <Button
            text="Save"
            onClick={handleSave}
            className="bg-primary px-4 py-3 text-black"
            disabled={!useLatestNews && !selectedValue}
          />
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default PageMediaSelectModal;
