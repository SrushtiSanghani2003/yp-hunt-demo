import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useMemo, useState } from "react";
import AsyncSelect from "react-select/async";
import { useQuery } from "@tanstack/react-query";
import { closeIcon } from "../../../icons";
import Button from "../../ui/button";
import api from "../../../lib/api";
import ToggleSwitch from "../../ui/switch/ToggleSwitch";

type MediaSelectModalProps = {
  open: boolean;
  onClose: () => void;
  mediaType: "news" | "video" | null;
  selectedValue?: any; // <-- pass the current selected value
  onSave: (value: any) => void;
};

const MediaSelectModal = ({
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
    if (mediaType === "video") {
      setSelectedValue(
        initialValue ?? { label: "Highlight", value: "highlight" }
      );
    } else if (mediaType === "news") {
      if (initialValue) {
        if (initialValue.type === "latest") {
          setUseLatestNews(true);
          setSelectedValue(null);
        } else {
          setUseLatestNews(false);
          setSelectedValue({
            label: initialValue.title,
            value: initialValue.news_id,
          });
        }
      } else {
        setUseLatestNews(true);
        setSelectedValue(null);
      }
    }
  }, [mediaType, initialValue]);

  /* ---------------- FETCH NEWS ---------------- */
  const getAllNews = async () => {
    return await api.get("/news/dropdown", { params: { page: 1, limit: 100 } });
  };

  const { data: allNews } = useQuery({
    queryKey: ["newsDropdown"],
    queryFn: getAllNews,
    refetchOnWindowFocus: false,
    enabled: mediaType === "news",
  });

  const newsOptions = useMemo(
    () =>
      allNews?.data?.news?.map((item: any) => ({
        value: item.id,
        label: item.title,
      })) || [],
    [allNews]
  );

  /* ---------------- LOAD OPTIONS ---------------- */
  const loadOptionsNews = (inputValue: string, callback: any) => {
    if (!inputValue) return callback(newsOptions.slice(0, 50));
    const filtered = newsOptions.filter((news: any) =>
      news.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtered.slice(0, 50));
  };

  const loadOptionsVideo = (_: string, callback: any) => {
    callback([
      { label: "Highlight", value: "highlight" },
      { label: "Moment Video", value: "moment_video" },
    ]);
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = () => {
    if (mediaType === "news") {
      if (useLatestNews) {
        onSave({ type: "latest" });
      } else {
        if (!selectedValue) return;
        onSave({
          type: "manual",
          news_id: selectedValue.value,
          title: selectedValue.label,
        });
      }
    } else {
      if (!selectedValue) return;
      onSave(selectedValue.value);
    }

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
      <div className="fixed inset-0 bg-black/55" aria-hidden="true" />
      <DialogPanel className="relative z-10 bg-white rounded-2xl p-6 w-full max-w-md border border-primary">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <DialogTitle className="text-xl font-extrabold">
            {mediaType === "news" ? "Select News" : "Select Video Type"}
          </DialogTitle>
          <button onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        {/* News Toggle */}
        {mediaType === "news" && (
          <div className="mb-4 flex items-center justify-between">
            <span className="font-medium">Use Latest News</span>
            <ToggleSwitch checked={useLatestNews} onChange={setUseLatestNews} />
          </div>
        )}

        {/* Dropdown */}
        {mediaType === "video" || mediaType === "news" ? (
          <div className="mb-6">
            <label className="block mb-2 text-base font-medium">
              {mediaType === "news" ? "Select News" : "Video Type"}
            </label>

            <AsyncSelect
              cacheOptions
              styles={customStyles}
              loadOptions={
                mediaType === "news" ? loadOptionsNews : loadOptionsVideo
              }
              placeholder={
                mediaType === "news"
                  ? "Type to search news"
                  : "Select video type"
              }
              value={selectedValue}
              onChange={setSelectedValue}
              defaultOptions={
                mediaType === "news" ? newsOptions.slice(0, 100) : true
              }
              isDisabled={mediaType === "news" && useLatestNews} // <-- disable if toggle ON
              classNamePrefix={
                mediaType === "news" && useLatestNews
                  ? "pointer-events-none "
                  : ""
              }
              // Optional: you can also wrap in a div and reduce opacity visually
            />
          </div>
        ) : null}

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <Button
            text="Cancel"
            onClick={onClose}
            className="border border-gray-300 px-4 py-3"
            backgroundColor="transparent"
          />
          <Button
            text="Save"
            onClick={handleSave}
            className="bg-primary px-4 py-3 text-white "
            disabled={
              mediaType === "news"
                ? !useLatestNews && !selectedValue
                : !selectedValue
            }
          />
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default MediaSelectModal;
