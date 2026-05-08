import { useEffect, useState } from "react";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";
import { chevronDown, mediaIcon } from "../../icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { concatImgURL } from "../../config/function";

const AlbumsBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [albumData, setAlbumData] = useState([]);
  const [type, setType] = useState("");

  const getPhotos = async () => {
    const params: Record<string, any> = {
      page: 1,
      limit: 100,
    };

    return await api.get("/images/albums", { params });
  };

  const { data: photoData, isFetching } = useQuery({
    queryKey: ["photoAlbums"],
    queryFn: getPhotos,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });

  const handleTypeChange = (type: string) => {
    setType(type);
    const updatedContent = { ...currentBlock.content };
    updatedContent.type = type;
    onChangeBlock?.({
      ...currentBlock,
      content: updatedContent,
    });
  };

  useEffect(() => {
    if (photoData?.data?.albums) {
      setAlbumData(photoData.data.albums);
    }
  }, [photoData]);

  useEffect(() => {
    if (isEditMode) {
      if (currentBlock?.content?.type) {
        setType(currentBlock.content.type);
      }
    }
  }, [currentBlock]);

  return (
    <>
      <div className="pb-4 border-b-primary border-b-0.5">
        <div className="relative mb-5">
          <select
            className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
            value={type}
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            <option value="" disabled>
              Please Select Type
            </option>
            <option value="list">List</option>
            <option value="other">Other</option>
            <option value="press">Press</option>
          </select>
          <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
            <img src={chevronDown} />
          </div>
        </div>
        {isFetching ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <Swiper
            spaceBetween={16}
            slidesPerView={4}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="!px-1"
          >
            {albumData.map((album: any) => (
              <SwiperSlide key={album.id}>
                <div className="border-primary border-0.5 rounded-2xl flex flex-col overflow-auto h-52">
                  <div className="h-3/4 bg-f6f6f6 rounded-2xl border-primary border-b-0.5 flex justify-center items-center overflow-hidden">
                    {album.thumbnail_url ? (
                      <img
                        src={concatImgURL(album.thumbnail_url)}
                        alt="Media"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img src={mediaIcon} alt="Media" className="" />
                    )}
                  </div>
                  <p className="md:px-4 px-2 md:py-2 py-1 md:text-sm text-xs h-1/4 line-clamp-2">
                    {album.name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className="flex items-center md:gap-8 gap-2 md:mt-5 mt-2">
        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
        />
      </div>
    </>
  );
};

export default AlbumsBlock;
