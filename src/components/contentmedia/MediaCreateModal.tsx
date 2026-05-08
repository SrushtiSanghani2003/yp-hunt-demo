import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { closeIcon } from "../../icons";
import Button from "../ui/button";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import api from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../utils/toastUtils";
import { useParams } from "react-router-dom";
import { FileText } from "lucide-react";
import { concatImgURL } from "../../config/function";

type MediaItem = {
  url: string;
  name: string;
  type: "image" | "video" | "pdf";
  file: File;
};

type MediaCreateProps = {
  show: boolean;
  onClose: () => void;
};

const acceptedFileExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "mp4",
  "pdf",
  "svg",
];

const MediaCreateModal = ({ show, onClose }: MediaCreateProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mediaFiles, setMediaFiles] = useState<MediaItem[]>([]);
  const queryClient = useQueryClient();
  const { folderId } = useParams();

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const getFileType = (file: File): any => {
    if (file.type.startsWith("video")) return "video";
    if (file.type === "application/pdf") return "pdf";
    return "image";
  };

  const processFiles = (filesArray: File[]) => {
    let hasError = false;
    const newSelectedFiles: MediaItem[] = [...mediaFiles];
    const fileTypeRegex = new RegExp(acceptedFileExtensions.join("|"), "i");

    filesArray.forEach((file) => {
      const ext = file.name.split(".").pop();
      const isDuplicate = newSelectedFiles.some((f) => f.name === file.name);

      if (isDuplicate) {
        // setError("File names must be unique");
        hasError = true;
      } else if (!fileTypeRegex.test(ext || "")) {
        // setError(`Only ${acceptedFileExtensions.join(", ")} files are allowed`);
        hasError = true;
      } else {
        const url = URL.createObjectURL(file);
        const type = getFileType(file);
        // const type: "image" | "video" = file.type.startsWith("video")
        //   ? "video"
        //   : "image";
        newSelectedFiles.push({ url, name: file.name, type, file });
      }
    });

    if (!hasError) {
      // setError("");
      setMediaFiles(newSelectedFiles);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newMedia = files.map((file) => {
      const url = URL.createObjectURL(file);
      const type = getFileType(file);
      // const type: "image" | "video" = file.type.startsWith("video")
      //   ? "video"
      //   : "image";

      return {
        url,
        name: file.name,
        type,
        file,
      };
    });

    setMediaFiles((prev) => [...prev, ...newMedia]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const uploadFiles = async (folderId?: string) => {
    const formData = new FormData();

    mediaFiles.forEach((item) => {
      formData.append("files", item.file);
    });
    if (folderId) {
      formData.append("folder_id", folderId);
    }
    return await api.post("/content-library/files", formData);
  };

  const uploadFilesMutation = useMutation({
    mutationFn: (folderId?: string) => uploadFiles(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-content-media"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["sub-contents"],
        exact: false,
      });
      showToast("Files Uploaded", "success");
      onClose();
    },
    onError: () => {
      showToast("Failed to upload files", "error");
    },
  });

  const handleSubmit = () => {
    uploadFilesMutation.mutate(folderId);
  };

  const handleDeleteMedia = (indexToDelete: number) => {
    setMediaFiles((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  useEffect(() => {
    if (!show) {
      setMediaFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [show]);

  return (
    <>
      <Dialog
        open={show}
        onClose={() => {}}
        transition
        className="fixed inset-0 z-[500] flex items-center justify-center transition duration-300 ease-out data-closed:opacity-0"
      >
        <div className="fixed inset-0 bg-black/55" aria-hidden="true" />

        <DialogPanel className="max-w-3xl relative z-10 bg-white rounded-2xl p-6 w-full border border-primary">
          <div className="flex items-center justify-between mb-2">
            <DialogTitle as="h2" className="text-2xl/6 font-extrabold">
              Upload Media
            </DialogTitle>
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="p-0"
              onClick={onClose}
            />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,video/mp4"
            multiple
          />
          <div
            className="p-3 rounded-2xl border border-dashed border-primary h-80 relative w-full mb-4 overflow-y-auto scrollbar-thin"
            onClick={handleFileClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {mediaFiles.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">
                  Drag & Drop files here, or Click to Upload
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2  h-max">
                {mediaFiles.map((media, index) => (
                  <div
                    key={index}
                    className="relative rounded-md overflow-hidden border"
                  >
                    {media.type === "image" ? (
                      <img
                        src={concatImgURL(media.url)}
                        alt={media.name}
                        className="w-full h-full object-cover"
                      />
                    ) : media.type === "video" ? (
                      <video
                        src={concatImgURL(media.url)}
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      // PDF preview (thumbnail or inline embed)
                      <div className="flex flex-col items-center justify-center p-6 text-red-600">
                        <FileText size={48} />
                        <span className="mt-2 text-xs font-medium text-gray-700 line-clamp-1">
                          {media.name}
                        </span>
                      </div>
                    )}
                    <Button
                      icon={closeIcon}
                      className="absolute z-10 top-1 right-1 md:p-1 bg-white rounded-full hover:bg-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMedia(index);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className="text-sm mb-4 font-medium">
            {/* {error && <p className="text-red-500 text-sm mt-2">{error}</p>} */}
          </p>
          <div className="flex justify-center">
            <Button
              text={uploadFilesMutation.isPending ? "Uploading..." : "Save"}
              className={`${
                mediaFiles.length === 0 ? "opacity-50" : "opacity-100"
              } w-full md:py-3 px-5 py-3 font-semibold`}
              textSize="md:text-lg text-sm"
              onClick={handleSubmit}
              disabled={
                uploadFilesMutation.isPending || mediaFiles.length === 0
              }
              isLoading={uploadFilesMutation.isPending}
            />
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default MediaCreateModal;
