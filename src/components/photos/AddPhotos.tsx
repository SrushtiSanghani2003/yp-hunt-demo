import { useEffect, useState } from "react";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import SidebarDialog from "../ui/sidebarDialog/SidebarDialog";
import ContentLibrary from "../contentPanel/ContentLibrary";
import Select from "react-select";
import { customStyles } from "../account-settings/CreateCategories";
import api from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { concatImgURL } from "../../config/function";
import AsyncSelect from "react-select/async";
import { showToast } from "../../utils/toastUtils";

export type PhotosType = {
  album_id: string;
  image_url: string;
  title: string;
  category_ids: number[];
  player_ids: number[];
  tag_ids: number[];
};

const AddPhotos = ({
  open,
  onClose,
  onSubmit,
  albumId,
  isLoading,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (updatedBox: PhotosType[]) => void;
  albumId: string;
  isLoading: boolean;
}) => {
  const initialState = {
    album_id: albumId,
    image_url: "",
    title: "",
    category_ids: [],
    player_ids: [],
    tag_ids: [],
  };

  const [images, setImages] = useState<(typeof initialState)[]>([initialState]);
  const [playerMap, setPlayerMap] = useState<Record<number, string>>({});

  const [debouncedInput, setDebouncedInput] = useState("");

  const [activeMediaUrl, setActiveMediaUrl] = useState<null | string>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);

  const handleAddImageBlock = () => {
    setImages((prev) => [
      ...prev,
      {
        album_id: albumId,
        image_url: "",
        title: "",
        category_ids: [],
        player_ids: [],
        tag_ids: [],
      },
    ]);
  };

  const handleDeleteImage = (index: number) => {
    const filterImage = images.filter((_, i) => i !== index);
    setImages(filterImage);
  };

  const handleImageChange = (index: number, key: string, value: any) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, [key]: value } : img))
    );
  };

  const [tagSearchInput, setTagSearchInput] = useState("");
  const [selectedTagMap, setSelectedTagMap] = useState<Record<string, string>>(
    {}
  );

  const getAllTags = async () => {
    const params: Record<string, string> = {};

    // if (debouncedInput.trim()) {
    //   params.search = debouncedInput;
    // }

    return await api.get("/tag/tags", { params });
  };

  const { data: allTags } = useQuery({
    queryKey: ["tags", debouncedInput],
    queryFn: getAllTags,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    // enabled: !!debouncedInput.trim(),
  });

  // const tagOptions =
  //   (allTags as any)?.response?.data?.tags.map((tag: any) => ({
  //     value: tag.id,
  //     label: tag.name,
  //   })) || [];

  useEffect(() => {
    if ((allTags as any)?.response?.data?.tags) {
      const newMap = { ...selectedTagMap };
      (allTags as any).response.data.tags.forEach((tag: any) => {
        newMap[tag.id] = tag.name;
      });
      setSelectedTagMap(newMap);
    }
  }, [allTags]);

  // player
  // const getAllPlayers = async () => {
  //   const params: Record<string, any> = {
  //     page: 1,
  //     limit: 200,
  //   };
  //   return await api.get("/player/getdropdown", { params });
  // };
  // const { data: allPlayerData } = useQuery({
  //   queryKey: ["players"],
  //   queryFn: getAllPlayers,
  //   refetchOnWindowFocus: false,
  // });
  // const playerOptions = useMemo(
  //   () =>
  //     allPlayerData?.data?.players?.map((item: any) => ({
  //       value: item.id,
  //       label: item.name,
  //     })) || [],
  //   [allPlayerData]
  // );
  const loadPlayerOptions = async (input: string) => {
    const res = await api.get("/player/getdropdown", {
      params: {
        page: 1,
        limit: 5000,
        search: input || "",
      },
    });

    const options =
      res.data.players?.map((p: any) => ({
        value: p.id,
        label: p.name,
      })) || [];

    setPlayerMap((prev) => {
      const next = { ...prev };
      options.forEach((opt: any) => {
        next[opt.value] = opt.label;
      });
      return next;
    });

    return options;
  };

  const handlePlayerChange = (selected: any, index: number) => {
    const ids = selected?.map((opt: any) => Number(opt.value)) || [];

    handleImageChange(index, "player_ids", ids);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedInput(tagSearchInput);
    }, 300);

    return () => clearTimeout(debounce);
  }, [tagSearchInput]);

  const getCategories = async () => {
    // return await api.get("/articles/categories/article");
    return await api.get("/category/categories/image");
  };

  const { data: allCategories } = useQuery({
    queryKey: ["catogories"],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
  });

  const categoryOptions: { label: string; value: number }[] =
    (allCategories as any)?.response?.data?.map((category: any) => ({
      value: category.id,
      label: category.name,
    })) || [];

  const handleSubmit = () => {
    const titleEmpty = images.some((img) => !img.title.trim());
    if (titleEmpty) {
      showToast("Please fill in Title", "error");
      return;
    }

    onSubmit(images);
  };

  const uploadTypeMap: Record<string, string> = {
    image_url: "other",
  };

  return (
    <>
      <SidebarDialog
        open={open}
        onClose={onClose}
        title="Add Photos"
        onSubmit={handleSubmit}
        submitText={isLoading ? "Adding" : "Confirm"}
        cancelText="Cancel"
      >
        {images.map((photo: PhotosType, index) => {
          return (
            <div
              key={index}
              className="flex flex-col md:gap-4 gap-2 mb-5 relative"
            >
              <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                <div className="md:w-sp170 w-20 h-full">
                  {photo.image_url ? (
                    <img
                      src={concatImgURL(photo.image_url)}
                      alt="Uploaded"
                      className="w-full h-full rounded-2xl border-0.5 border-primary block align-middle object-contain p-2"
                    />
                  ) : (
                    <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                      <img src={mediaIcon} alt="Placeholder" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    label="Image URL"
                    placeholder="https://www.example.com"
                    className="m-0"
                    value={concatImgURL(photo.image_url)}
                    onChange={(e) =>
                      handleImageChange(index, "image_url", e.target.value)
                    }
                  />
                  <div>
                    {photo.image_url ? (
                      <Button
                        text="Remove Image"
                        icon={closeIcon}
                        backgroundColor="transparent"
                        imageclassName="md:w-5 md:h-5 w-4 h-4"
                        className="pb-0"
                        onClick={() =>
                          handleImageChange(index, "image_url", "")
                        }
                      />
                    ) : (
                      <Button
                        icon={plusIcon}
                        text="Add Image"
                        backgroundColor="transparent"
                        imageclassName="md:w-5 md:h-5 w-4 h-4"
                        className="pb-0"
                        onClick={() => {
                          setActiveMediaUrl("image_url"),
                            setActiveMediaIndex(index);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              <Input
                label="Image Title*"
                value={photo.title}
                className="m-0"
                onChange={(e) =>
                  handleImageChange(index, "title", e.target.value)
                }
              />
              <div>
                <label
                  htmlFor="category"
                  className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm"
                >
                  Category
                </label>
                <Select
                  options={categoryOptions}
                  isMulti
                  styles={customStyles}
                  placeholder="Select Categories"
                  // onChange={(selected) =>
                  //   handleSelectChange(selected, "category_ids")
                  // }
                  // value={selectedCategories}
                  onChange={(selected) =>
                    handleImageChange(
                      index,
                      "category_ids",
                      selected?.map((s: any) => s.value) || []
                    )
                  }
                  value={categoryOptions.filter((opt) =>
                    photo.category_ids.includes(opt.value)
                  )}
                />
              </div>
              <div>
                <div>
                  <label
                    htmlFor="player"
                    className="block md:mb-2 mb-1 md:text-base text-sm font-medium"
                  >
                    Player
                  </label>

                  <AsyncSelect
                    isMulti
                    cacheOptions
                    loadOptions={loadPlayerOptions}
                    defaultOptions
                    styles={customStyles}
                    placeholder="Type to search players"
                    onChange={(selected) => handlePlayerChange(selected, index)}
                    value={photo.player_ids.map((id) => ({
                      value: id,
                      label: playerMap[id] || "Loading...",
                    }))}
                  />
                </div>
              </div>

              <div className="mb-2 relative">
                <label
                  htmlFor="tags"
                  className="block md:mb-2 mb-1 md:text-base text-sm font-medium"
                >
                  Tags
                </label>
                <Select
                  options={Object.entries(selectedTagMap).map(([id, name]) => ({
                    value: id,
                    label: name,
                  }))}
                  isMulti
                  styles={customStyles}
                  placeholder="Select Tags"
                  onChange={(selected) => {
                    const selectedIds =
                      selected?.map((s: any) => Number(s.value)) || [];
                    const uniqueIds = Array.from(new Set(selectedIds));
                    handleImageChange(index, "tag_ids", uniqueIds);
                  }}
                  value={photo.tag_ids.map((id) => ({
                    value: id,
                    label: selectedTagMap[id] || id,
                  }))}
                  onInputChange={(inputValue) => {
                    setTagSearchInput(inputValue);
                  }}
                  // openMenuOnClick={false}
                  // openMenuOnFocus={false}
                />
              </div>

              {images.length > 1 && (
                <Button
                  icon={closeIcon}
                  className="absolute right-0 -top-2 p-0 md:p-0"
                  backgroundColor="transparent"
                  onClick={() => handleDeleteImage(index)}
                />
              )}
            </div>
          );
        })}
        <Button
          text="Add Another Photo"
          icon={plusIcon}
          backgroundColor="transparent"
          className="relative addSideBarBtn justify-start"
          onClick={handleAddImageBlock}
        />
      </SidebarDialog>
      {activeMediaUrl !== null && (
        <ContentLibrary
          open={!!activeMediaUrl}
          onClose={() => {
            setActiveMediaUrl(null), setActiveMediaIndex(0);
          }}
          uploadType={
            activeMediaUrl ? uploadTypeMap[activeMediaUrl] || "other" : "other"
          }
          onSelect={(url) => {
            handleImageChange(activeMediaIndex, activeMediaUrl!, url),
              setActiveMediaUrl(null);
            setActiveMediaIndex(0);
          }}
          mediaFilter="image"
        />
      )}
    </>
  );
};

export default AddPhotos;
