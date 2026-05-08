import { useEffect, useMemo, useState } from "react";
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

export type PhotosType = {
  album_id: string;
  image_url: string;
  title: string;
  category_ids: number[];
  player_ids: number[];
  tag_ids: number[];
};

type EditPhotosProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: PhotosType) => void;
  albumId: string;
  isLoading: boolean;
  initialData?:
    | (PhotosType & {
        categories?: { id: number; name: string }[];
        tags?: { id: number; name: string }[];
        players?: { id: number; name: string }[];
      })
    | null;
  readOnly?: boolean;
};

const EditPhotos = ({
  open,
  onClose,
  onSubmit,
  albumId,
  isLoading,
  initialData,
  readOnly = false,
}: EditPhotosProps) => {
  const initialState: PhotosType = {
    album_id: albumId,
    image_url: "",
    title: "",
    category_ids: [],
    player_ids: [],
    tag_ids: [],
  };

  const [image, setImage] = useState<PhotosType>(initialState);
  const [activeMediaUrl, setActiveMediaUrl] = useState<keyof PhotosType | null>(
    null
  );

  // const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);
  const [selectedTagMap, setSelectedTagMap] = useState<Record<number, string>>(
    {}
  );
  const [selectedPlayerOptions, setSelectedPlayerOptions] = useState([]);

  // ✅ Fetch Tags
  const getAllTags = async () => await api.get("/tag/tags");
  const { data: allTags } = useQuery({
    queryKey: ["tags"],
    queryFn: getAllTags,
  });

  useEffect(() => {
    if ((allTags as any)?.response?.data?.tags) {
      const newMap: Record<number, string> = {};
      (allTags as any).response.data.tags.forEach((tag: any) => {
        newMap[tag.id] = tag.name;
      });
      setSelectedTagMap(newMap);
    }
  }, [allTags]);

  // ✅ Fetch Categories
  const getCategories = async () => await api.get("/category/categories/image");
  const { data: allCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categoryOptions =
    (allCategories as any)?.response?.data?.map((c: any) => ({
      value: c.id,
      label: c.name,
    })) || [];

  const tagOptions = Object.entries(selectedTagMap).map(([id, name]) => ({
    value: Number(id),
    label: name,
  }));

  const getAllPlayers = async () => {
    const params: Record<string, any> = {
      page: 1,
      limit: 200,
    };
    return await api.get("/player/getdropdown", { params });
  };

  const { data: allPlayerData } = useQuery({
    queryKey: ["players"],
    queryFn: getAllPlayers,
    refetchOnWindowFocus: false,
  });

  const playerOptions = useMemo(
    () =>
      allPlayerData?.data?.players?.map((item: any) => ({
        value: item.id,
        label: item.name,
      })) || [],
    [allPlayerData]
  );

  const loadPlayerOptions = async (input: string) => {
    if (!input) {
      return playerOptions;
    }

    const res = await api.get("/player/getdropdown", {
      params: {
        page: 1,
        limit: 5000,
        search: input,
      },
    });

    return res.data.players.map((p: any) => ({
      value: p.id,
      label: p.name,
    }));
  };

  const getPlayersByIds = async () => {
    const params: Record<string, any> = {
      type: "player",
      id: image.player_ids,
    };
    return await api.get("/common/get-dropdown-value", { params });
  };

  const { data: playersByIds } = useQuery({
    queryKey: ["playersByIds"],
    queryFn: getPlayersByIds,
    refetchOnWindowFocus: false,
    enabled: image.player_ids.length > 0,
  });

  // ✅ Prefill form when editing existing image
  useEffect(() => {
    if (initialData && allCategories && allTags && allPlayerData) {
      console.log("initial data useefec clled");
      // setImages([
      //   {
      //     album_id: albumId,
      //     image_url: initialData.image_url || "",
      //     title: initialData.title || "",
      //     category_ids: initialData.categories?.map((c: any) => c.id) || [],
      //     tag_ids: initialData.tags?.map((t: any) => t.id) || [],
      //     player_ids: initialData.players?.map((t: any) => t.id) || [],
      //   },
      // ]);
      setImage({
        album_id: albumId,
        image_url: initialData.image_url || "",
        title: initialData.title || "",
        category_ids: initialData.categories?.map((c: any) => c.id) || [],
        tag_ids: initialData.tags?.map((t: any) => t.id) || [],
        player_ids: initialData.players?.map((t: any) => t.id) || [],
      });
    }
  }, [initialData, albumId, allCategories, allTags, allPlayerData]);

  useEffect(() => {
    if (playersByIds && (initialData as any)?.players?.length > 0) {
      console.log("player by id useEffect called");
      const selected = playersByIds?.data?.map((player: any) => ({
        value: player.id,
        label: player.name,
      }));
      setSelectedPlayerOptions(selected);
    }
  }, [playersByIds]);

  // ✅ Handle Form Field Change
  // const handleImageChange = (
  //   index: number,
  //   field: keyof PhotosType,
  //   value: PhotosType[keyof PhotosType]
  // ) => {
  //   setImages((prev) =>
  //     prev.map((img, i) => (i === index ? { ...img, [field]: value } : img))
  //   );
  // };
  const handleImageChange = (
    field: keyof PhotosType,
    value: PhotosType[keyof PhotosType]
  ) => {
    setImage((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // useEffect(() => {
  // }, [image]);

  // ✅ Submit
  const handleSubmit = () => {
    onSubmit(image);
  };

  const uploadTypeMap: Record<string, string> = { image_url: "other" };

  return (
    <>
      <SidebarDialog
        open={open}
        onClose={onClose}
        title={readOnly ? "View Photo Details" : "Edit Photo"}
        onSubmit={!readOnly ? handleSubmit : undefined}
        isLoading={isLoading}
        submitText={isLoading ? "Updating..." : "Confirm"}
        cancelText="Cancel"
      >
        {/* {images.map((photo, index) => ( */}
        <div className="flex flex-col md:gap-4 gap-2 mb-5 relative">
          {/* Image Preview */}
          <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
            <div className="md:w-sp170 w-20 h-full">
              {image.image_url ? (
                <img
                  src={concatImgURL(image.image_url)}
                  alt="Uploaded"
                  className="w-full h-full rounded-2xl border border-primary object-contain p-2"
                />
              ) : (
                <div className="bg-f6f6f6 border border-primary h-full rounded-2xl flex justify-center items-center">
                  <img src={mediaIcon} alt="Placeholder" />
                </div>
              )}
            </div>

            {/* Image URL + Buttons */}
            <div className="flex-1">
              <Input
                label="Image URL"
                value={concatImgURL(image.image_url)}
                disabled={readOnly}
                onChange={(e) => handleImageChange("image_url", e.target.value)}
              />

              {!readOnly && (
                <>
                  {image.image_url ? (
                    <Button
                      text="Remove Image"
                      icon={closeIcon}
                      backgroundColor="transparent"
                      onClick={() => handleImageChange("image_url", "")}
                    />
                  ) : (
                    <Button
                      icon={plusIcon}
                      text="Add Image"
                      backgroundColor="transparent"
                      onClick={() => {
                        setActiveMediaUrl("image_url");
                        // setActiveMediaIndex(index);
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>

          {/* Title */}
          <Input
            label="Image Title*"
            value={image.title}
            disabled={readOnly}
            onChange={(e) => handleImageChange("title", e.target.value)}
          />

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <Select
              options={categoryOptions}
              isMulti
              styles={customStyles}
              isDisabled={readOnly}
              placeholder="Select Categories"
              value={categoryOptions.filter(
                (opt: { value: number; label: string }) =>
                  image.category_ids.includes(opt.value)
              )}
              onChange={(selected) =>
                handleImageChange(
                  "category_ids",
                  selected?.map((s) => s.value) || []
                )
              }
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-1 font-medium">Tags</label>
            <Select
              options={tagOptions}
              isMulti
              styles={customStyles}
              isDisabled={readOnly}
              placeholder="Select Tags"
              value={image.tag_ids
                .map((id) => tagOptions.find((opt) => opt.value === id))
                .filter(Boolean)}
              onChange={(selected) =>
                handleImageChange(
                  "tag_ids",
                  selected?.map((s) => s.value) || []
                )
              }
            />
          </div>
          {/* players */}
          <div>
            <label className="block mb-1 font-medium">Players</label>
            <AsyncSelect
              cacheOptions
              loadOptions={loadPlayerOptions}
              isMulti
              styles={customStyles}
              placeholder="Type to search players"
              onChange={(selected: any) => {
                handleImageChange(
                  "player_ids",
                  selected?.map((s: any) => s.value) || []
                );
                setSelectedPlayerOptions(selected);
              }}
              defaultOptions={playerOptions}
              // value={playerOptions.filter((opt: any) =>
              //   photo.player_ids.includes(opt.value)
              // )}
              value={selectedPlayerOptions}
            />
          </div>
        </div>
        {/* ))} */}
      </SidebarDialog>

      {/* Media Picker */}
      {activeMediaUrl !== null && (
        <ContentLibrary
          open={!!activeMediaUrl}
          onClose={() => {
            setActiveMediaUrl(null);
            // setActiveMediaIndex(0);
          }}
          uploadType={uploadTypeMap[activeMediaUrl] || "other"}
          onSelect={(url) => {
            handleImageChange(activeMediaUrl, url);
            setActiveMediaUrl(null);
            // setActiveMediaIndex(0);
          }}
          mediaFilter="image"
        />
      )}
    </>
  );
};

export default EditPhotos;
