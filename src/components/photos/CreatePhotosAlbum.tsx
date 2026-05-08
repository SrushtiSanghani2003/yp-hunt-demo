import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/button";
import { chevronDown, closeIcon, mediaIcon } from "../../icons";
import Input from "../ui/input/Input";
import { useEffect, useRef, useState } from "react";
import { showToast } from "../../utils/toastUtils";
import api from "../../lib/api";
// import { useQuery } from "@tanstack/react-query";
import { concatImgURL } from "../../config/function";
// import { customStyles } from "../account-settings/CreateCategories";
// import Select from "react-select";

type CreatePhotoAlbumType = {
  show: boolean;
  onClose: () => void;
  onCreate?: (newAlbum: {
    name: string;
    es_name: string;
    thumbnail_url: string;
    category_ids?: number[];
    player_ids?: number[];
    tag_ids?: number[];
    type?: string;
  }) => void;
  onUpdate?: (updateAlbum: {
    id: string;
    name: string;
    es_name: string;
    thumbnail_url: string;
    category_ids?: number[];
    player_ids?: number[];
    tag_ids?: number[];
    type?: string;
  }) => void;
  isLoading: boolean;
  editData: any;
};

const CreatePhotosAlbum = ({
  show,
  onClose,
  onCreate,
  onUpdate,
  isLoading,
  editData,
}: CreatePhotoAlbumType) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [albumName, setAlbumName] = useState("");
  const [albumNameEs, setAlbumNameEs] = useState("");
  const [type, setType] = useState<string>("press");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  // const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  // const [categoryIds, setCategoryIds] = useState<number[]>([]);
  // const [selectedTagMap, setSelectedTagMap] = useState<Record<number, string>>(
  //   {}
  // );
  // const [selectedTags, setSelectedTags] = useState<any[]>([]);
  // const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]);
  // const [playerIds, setPlayerIds] = useState<number[]>([]);

  // const [tagIds, setTagIds] = useState<number[]>([]);
  const acceptedFileExtensions = ["jpg", "jpeg", "png", "webp"];
  const isEdit = Boolean(editData?.id);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles([files[0]]);
    }
  };

  const processFiles = (filesArray: File[]) => {
    const file = filesArray[0];

    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();
    const isAccepted = acceptedFileExtensions.includes(ext || "");

    if (!isAccepted) {
      showToast(
        `Only ${acceptedFileExtensions.join(", ")} files are allowed`,
        "error"
      );
      return;
    }

    uploadCoverImage(file);
  };

  const uploadCoverImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    setIsUploading(true);
    try {
      const res = await api.post("/images/upload/gallery", formData);
      const imgUrl = res?.data[0]?.url;
      if (imgUrl) {
        setThumbnailUrl(imgUrl);
      } else {
        console.error("Not getting url from api");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      showToast("Upload failed", "error");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (editData) {
      setAlbumName(editData.name);
      setAlbumNameEs(editData.es_name);
      setThumbnailUrl(editData.thumbnail_url || editData.thumbnailUrl);
      setType(editData.type);

      // 🟩 Pre-fill categories
      // if (editData.categories && allCategories) {
      //   const categoryOptionsData = allCategories.map((c: any) => ({
      //     value: c.id,
      //     label: c.name,
      //   }));
      //   const selected = categoryOptionsData.filter((opt: any) =>
      //     editData.categories.some((cat: any) => cat.id === opt.value)
      //   );
      //   setSelectedCategories(selected);
      //   setCategoryIds(selected.map((s: any) => s.value));
      // }

      // 🟦 Pre-fill tags
      // if (editData.tags && Object.keys(selectedTagMap).length > 0) {
      //   const tagOptionsData = Object.entries(selectedTagMap).map(
      //     ([id, name]) => ({
      //       value: Number(id),
      //       label: name,
      //     })
      //   );
      //   const selected = tagOptionsData.filter((opt: any) =>
      //     editData.tags.some((tag: any) => tag.id === opt.value)
      //   );
      //   setSelectedTags(selected);
      //   setTagIds(selected.map((s: any) => s.value));
      // }

      // 🟨 Pre-fill players
      // if (editData.players && allPlayers) {
      //   const playerOptionsData = allPlayers.map((p: any) => ({
      //     value: p.id,
      //     label: p.player_name,
      //   }));
      //   const selected = playerOptionsData.filter((opt: any) =>
      //     editData.players.some((pl: any) => pl.id === opt.value)
      //   );
      //   setSelectedPlayers(selected);
      //   setPlayerIds(selected.map((s: any) => s.value));
      // }
    } else {
      // Reset form if creating new
      // setAlbumName("");
      // setThumbnailUrl("");
      // setSelectedCategories([]);
      // setCategoryIds([]);
      // setSelectedTags([]);
      // setTagIds([]);
      // setSelectedPlayers([]);
      // setPlayerIds([]);
    }
  }, [editData, show]);

  const handleSubmit = () => {
    if (editData && onUpdate) {
      onUpdate({
        id: String(editData.id),
        name: albumName,
        es_name: albumNameEs,
        thumbnail_url: thumbnailUrl,
        type: type,
        // category_ids: categoryIds,
        // player_ids: playerIds,
        // tag_ids: tagIds,
      });
    } else {
      // onCreate?.({ name: albumName, thumbnail_url: thumbnailUrl, category_ids: categoryIds, player_ids: playerIds, tag_ids: tagIds });
      onCreate?.({
        name: albumName,
        es_name: albumNameEs,
        thumbnail_url: thumbnailUrl,
        type: type,
      });
    }
  };

  // const getCategories = async () => {
  //   return await api.get("/category/categories/image");
  // };

  // const { data: allCategories } = useQuery({
  //   queryKey: ["catogories"],
  //   queryFn: getCategories,
  //   refetchOnWindowFocus: false,
  //   select: (response) => {
  //     return (response as any)?.response?.data;
  //   },
  // });
  // // ✅ Fetch Tags
  // const getAllTags = async () => await api.get("/tag/tags");
  // const { data: allTags } = useQuery({
  //   queryKey: ["tags"],
  //   queryFn: getAllTags,
  // });

  // const categoryOptions =
  //   allCategories?.map((category: any) => ({
  //     value: category.id,
  //     label: category.name,
  //   })) || [];

  // const tagOptions = Object.entries(selectedTagMap).map(([id, name]) => ({
  //   value: Number(id),
  //   label: name,
  // }));

  // const handleCategoryChange = (selected: any) => {
  //   setSelectedCategories(selected || []); // full objects for Select UI
  //   setCategoryIds((selected || []).map((item: any) => item.value)); // only ids
  // };

  // // ---- HANDLE TAG ----
  // const handleTagChange = (selected: any) => {
  //   setSelectedTags(selected || []); // full objects for Select UI
  //   setTagIds((selected || []).map((item: any) => item.value)); // only ids
  // };

  // const handlePlayerChange = (selected: any) => {
  //   setSelectedPlayers(selected || []); // full objects for Select UI
  //   setPlayerIds((selected || []).map((item: any) => item.value)); // only ids
  // };
  // const getPlayers = async () => {
  //   return await api.get("/player/players");
  // };

  // const { data: allPlayers } = useQuery({
  //   queryKey: ["playersList"],
  //   queryFn: getPlayers,
  //   refetchOnWindowFocus: false,
  //   select: (res) => {
  //     return (res as any)?.data?.players;
  //   },
  // });

  // const playerOptions = [
  //   ...(allPlayers?.map((player: any) => ({
  //     value: player.id,
  //     label: player.player_name,
  //   })) || []),
  // ];

  // useEffect(() => {
  //   if (allCategories) {
  //   }
  // }, [allCategories]);

  // useEffect(() => {
  //   if ((allTags as any)?.response?.data?.tags) {
  //     const newMap: Record<number, string> = {};
  //     (allTags as any).response.data.tags.forEach((tag: any) => {
  //       newMap[tag.id] = tag.name;
  //     });
  //     setSelectedTagMap(newMap);
  //   }
  // }, [allTags]);

  // useEffect(() => {}, [categoryIds, tagIds, playerIds]);

  return (
    <div>
      <Dialog
        open={show}
        onClose={() => {}}
        transition
        className="fixed inset-0 z-[500] flex items-center transition duration-300 ease-out data-closed:opacity-0 overflow-auto m-auto h-auto"
      >
        <div className="fixed inset-0 bg-black/55" aria-hidden="true" />

        <DialogPanel className="max-w-lg relative z-10 bg-white rounded-2xl p-6 w-full border border-primary m-auto overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <DialogTitle as="h2" className="text-2xl/6 font-extrabold">
              {editData ? "Edit Photo Album" : "Create Photo Album"}
            </DialogTitle>
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="p-0"
              onClick={onClose}
            />
          </div>

          <div className="mb-4">
            <div
              onClick={() => inputRef.current?.click()}
              className="relative h-36 bg-f6f6f6 rounded-xl cursor-pointer flex items-center justify-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {isUploading && (
                <div className="absolute rounded-xl inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
                    <p className="text-white text-sm mt-2">Uploading...</p>
                  </div>
                </div>
              )}
              {thumbnailUrl ? (
                <img
                  src={concatImgURL(thumbnailUrl)}
                  alt="Cover"
                  className="h-full w-full object-cover rounded-xl"
                />
              ) : (
                <div className="flex flex-col gap-4 pointer-events-none">
                  <img
                    src={mediaIcon}
                    alt="mediaIcon"
                    className="w-10 mx-auto"
                  />
                  <Button
                    text="Upload Cover Image"
                    textSize="text-sm"
                    className="px-3 py-2 border-primary rounded-xl border-0.5"
                    backgroundColor="transparent"
                  />
                </div>
              )}
              <input
                ref={inputRef}
                type="file"
                accept={acceptedFileExtensions
                  .map((ext) => `image/${ext}`)
                  .join(",")}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="mb-2">
            <Input
              label="English Name"
              placeholder="English Album Name"
              value={albumName}
              inputCss="py-3"
              onChange={(e) => setAlbumName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <Input
              label="Spanish Name"
              placeholder="Spanish Album Name"
              value={albumNameEs}
              inputCss="py-3"
              onChange={(e) => setAlbumNameEs(e.target.value)}
            />
          </div>
          <div>
            <label className="block md:text-base/4 text-sm mb-2 font-medium">
              Type
            </label>
            <div className="relative">
              <select
                className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="press">Press</option>
              </select>
              <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                <img src={chevronDown} />
              </div>
            </div>
          </div>
          {/* <div className="md:mb-5 mb-2">
            <div>
              <label
                htmlFor="category"
                className="block mb-1 md:text-base text-sm font-medium"
              >
                Category
              </label>
              <Select
                options={categoryOptions}
                isMulti
                styles={customStyles}
                placeholder="Select Categories"
                onChange={(selected) => handleCategoryChange(selected)}
                value={selectedCategories}
              />
            </div>
          </div> */}

          {/* Tags */}
          {/* <div className="md:mb-5 mb-2">
            <label
              htmlFor="tags"
              className="block mb-1 md:text-base text-sm font-medium"
            >
              Tags
            </label>
            <Select
              options={tagOptions}
              isMulti
              styles={customStyles}
              placeholder="Select Tags"
              onChange={handleTagChange}
              value={selectedTags}
            />
          </div> */}
          {/* players */}
          {/* <div className="md:mb-5 mb-2">
            <label
              htmlFor="players"
              className="block mb-1 md:text-base text-sm font-medium"
            >
              Players
            </label>
            <Select
              options={playerOptions}
              isMulti
              styles={customStyles}
              placeholder="Select Players"
              onChange={handlePlayerChange}
              value={selectedPlayers}
            />
          </div> */}

          <div className="mt-6 flex justify-end gap-4">
            <Button
              text="Cancel"
              onClick={onClose}
              className="px-5 border-primary border-0.5"
              backgroundColor="transparent"
            />
            <Button
              text={
                isLoading
                  ? isEdit
                    ? "Updating.."
                    : "Saving.."
                  : isEdit
                  ? "Update"
                  : "Save"
              }
              className="px-8 py-3"
              onClick={handleSubmit}
              disabled={albumName === "" || thumbnailUrl === ""}
              style={{
                opacity: albumName === "" || thumbnailUrl === "" ? 0.5 : 1,
              }}
            />
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default CreatePhotosAlbum;
