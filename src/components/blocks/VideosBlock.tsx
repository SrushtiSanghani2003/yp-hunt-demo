// import { useQuery } from "@tanstack/react-query";
import { chevronDown, correctIcon } from "../../icons";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
// import api from "../../lib/api";
import { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import "swiper/css";
// import NewsBentoStyles from "./NewsBentoStyles";
import BentoModal from "./bentobox/BentoModal";
// import Button from "../ui/button";
import { useParams } from "react-router-dom";
import MoreFieldsEditor from "./MoreFieldsEditor";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
// import { concatImgURL } from "../../config/function";
import api from "../../lib/api";
import { useQuery } from "@tanstack/react-query";

const VideosBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  // const [categories, setCategories] = useState([]);
  const [_selectedCategoryID, setSelectedCategoryID] = useState("");
  const [_selectedCategoryName, _setSelectedCategoryName] = useState("");
  const [videosData, setVideosData] = useState([]);
  console.log("🚀 ~ VideosBlock ~ videosData:", videosData)
  const [previewType, setPreviewType] = useState("");
  console.log("🚀 ~ VideosBlock ~ previewType:", previewType)
  const [bentoKey, setBentoKey] = useState("1V2H");
  const [bentoModalShow, setBentoModalShow] = useState(false);
  const [moreFields, setMoreFields] = useState<string[]>([]);
  const [type, setType] = useState("");
  const [moduleType, setModuleType] = useState("");
  const [titlePosition, setTitlePosition] = useState("top");
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const getVideos = async () => {
    const params: Record<string, any> = {
      page: 1,
      limit: 50,
    };
    return await api.get("/videos/", { params });
  };

  const { data: allVideosData } = useQuery({
    queryKey: ["videoAlbums"],
    queryFn: getVideos,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (allVideosData) {
      setVideosData(allVideosData?.data?.videos || []);
    }
  }, [allVideosData]);

  // const getCategories = async () => {
  //   return await api.get("/category/categories/video");
  // };

  // const { data: allCategories } = useQuery({
  //   queryKey: ["videoCatogories"],
  //   queryFn: getCategories,
  //   refetchOnWindowFocus: false,
  //   select: (res) => {
  //     return (res as any)?.response?.data;
  //   },
  // });

  // const getNewsByCategory = async ({
  //   queryKey,
  // }: QueryFunctionContext<[string, string | undefined]>) => {
  //   const [_key, selectedCategoryName] = queryKey;
  //   const params: Record<string, any> = {};

  //   if (selectedCategoryName) {
  //     params.category_name = selectedCategoryName;
  //   }

  //   return await api.get("/videos/list-by-category", { params });
  // };

  // const { data: videosByCategory } = useQuery({
  //   queryKey: ["videosByCategory", selectedCategoryName],
  //   queryFn: getNewsByCategory,
  //   refetchOnWindowFocus: false,
  //   select: (res) => {
  //     return res.data;
  //   },
  // });

  const handleTypeChange = (type: string) => {
    setType(type);
    const updatedContent = { ...currentBlock.content };
    updatedContent.type = type;
    onChangeBlock?.({
      ...currentBlock,
      content: updatedContent,
    });
  };
  const handleModuleTypeChange = (value: string) => {
    setModuleType(value);

    const updatedContent = { ...currentBlock.content };
    updatedContent.module_type = value;

    onChangeBlock?.({
      ...currentBlock,
      content: updatedContent,
    });
  };

  const handleTitlePosition = (position: string) => {
    setTitlePosition(position);
    const updatedContent = { ...currentBlock.content };
    updatedContent.title_position = position;
    onChangeBlock?.({
      ...currentBlock,
      content: updatedContent,
    });
  };

  // const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const updatedContent = { ...currentBlock.content };
  //   const { value } = e.target;
  //   setSelectedCategoryID(value);

  //   const selectedCatObj: any = categories.find(
  //     (cat: any) => String(cat.id) === value
  //   );
  //   const categoryName = selectedCatObj?.name || "";

  //   setSelectedCategoryName(categoryName);

  //   updatedContent.category_id = Number(value);
  //   onChangeBlock?.({
  //     ...currentBlock,
  //     content: updatedContent,
  //   });
  // };

  // const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const updatedContent = { ...currentBlock.content };
  //   const { value } = e.target;
  //   setPreviewType(value);
  //   updatedContent.preview_style = value;
  //   if (value == "bento") {
  //     updatedContent.bento_key = "1V2H";
  //   }
  //   onChangeBlock?.({
  //     ...currentBlock,
  //     content: updatedContent,
  //   });
  // };

  const handleSelectBentoKey = (key: string) => {
    const updatedContent = { ...currentBlock.content };
    setBentoKey(key);
    setBentoModalShow(false);
    updatedContent.bento_key = key;
    onChangeBlock?.({
      ...currentBlock,
      content: updatedContent,
    });
  };

  // useEffect(() => {
  //   if (videosByCategory) {
  //     setVideosData(videosByCategory?.data);
  //   }
  // }, [videosByCategory]);

  // useEffect(() => {
  //   if (allCategories?.length > 0) {
  //     setCategories(allCategories);
  //   }
  // }, [allCategories]);

  useEffect(() => {
    if (isEditMode) {
      if (currentBlock.content?.category_id) {
        const catId = currentBlock.content?.category_id;
        setSelectedCategoryID(catId);
      }
      if (currentBlock.content?.bento_key) {
        setBentoKey(currentBlock.content?.bento_key);
      }
      if (currentBlock.content?.preview_style) {
        setPreviewType(currentBlock.content?.preview_style);
      }
      if (currentBlock.content?.type) {
        setType(currentBlock.content?.type);
      }
      if (currentBlock.content?.more) {
        const fields = Object.keys(currentBlock.content?.more);
        setMoreFields(fields);
      }
      if (currentBlock.content?.module_type) {
        setModuleType(currentBlock.content.module_type);
      }
    }

    if (currentBlock.content?.preview_style) {
      setPreviewType(currentBlock.content?.preview_style);
    }
  }, [currentBlock]);

  return (
    <>
      <div className="pb-4 border-b-primary border-b-0.5">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative ">
            <select
              className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
              value={type}
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              <option value="" disabled>
                Please Select Type
              </option>
              <option value="list">List</option>
              <option value="grid">Grid</option>
              <option value="press">Press</option>
              <option value="shorts">Shorts</option>
              <option value="replays">Replays</option>
              <option value="top_moments">Top 10 Moments</option>
              <option value="top_stories">Top 10 Stories</option>
              <option value="featured_videos">Featured Videos</option>
              <option value="full_match">Full Match</option>
              <option value="latest_highlights">Latest Highlights</option>
              <option value="player_highlights">Player Highlights</option>
              <option value="match_highlights">Match Highlights</option>
              <option value="video_hero_media">Video Hero media</option>
            </select>
            <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
              <img src={chevronDown} />
            </div>
          </div>
          <div className="relative ">
            <select
              className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
              value={moduleType}
              onChange={(e) => handleModuleTypeChange(e.target.value)}
            >
              <option value="" disabled>
                Please Module Type
              </option>
              <option value="player">Player</option>
              <option value="tournament">Tournament</option>
              <option value="video">Video</option>
              <option value="moment">Moment</option>
              {/* <option value="top_moments">Top 10 Moments</option>
              <option value="featured_videos">Featured Videos</option>
              <option value="full_match">Full Match</option>
              <option value="latest_highlights">Latest Highlights</option>
              <option value="player_highlights">Player Highlights</option> */}
            </select>
            <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
              <img src={chevronDown} />
            </div>
          </div>
        </div>

        {type === "latest_highlights" && (
          <div className="mb-4">
            <p className="font-semibold">Title Position</p>

            <div className="flex items-center gap-6 mt-2">
              {/* Top Option */}
              <label
                htmlFor="title-position-top"
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="title-position"
                  id="title-position-top"
                  className="peer hidden"
                  checked={titlePosition === "top"}
                  onChange={() => handleTitlePosition("top")}
                />

                <div className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded peer-checked:bg-black peer-checked:border-black">
                  <img src={correctIcon} alt="Right" />
                </div>

                <span className="text-sm">Top</span>
              </label>

              {/* Left Option */}
              <label
                htmlFor="title-position-left"
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="title-position"
                  id="title-position-left"
                  className="peer hidden"
                  checked={titlePosition === "left"}
                  onChange={() => handleTitlePosition("left")}
                />

                <div className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded peer-checked:bg-black peer-checked:border-black">
                  <img src={correctIcon} alt="Right" />
                </div>

                <span className="text-sm">Left</span>
              </label>
            </div>
          </div>
        )}

        {/* {previewType === "" ? (
          <div className="text-center text-sm text-gray-500 py-10">
            Please select a preview style to continue
          </div>
        ) : videosData.length === 0 ? (
          <div className="text-center text-sm text-gray-500 py-10">
            No video items available
          </div>
        ) : previewType === "list" ? (
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
            {videosData.map((video: any) => (
              <SwiperSlide key={video.id}>
                <div className="border-primary border-0.5 rounded-2xl flex flex-col overflow-auto h-52">
                  <div className="h-3/4 bg-f6f6f6 rounded-2xl border-primary border-b-0.5 flex justify-center items-center overflow-hidden">
                    {video.video_thumbnail ? (
                      <img
                        src={concatImgURL(video.video_thumbnail)}
                        alt="Media"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img src={mediaIcon} alt="Media" className="" />
                    )}
                  </div>
                  <p className="md:px-4 px-2 md:py-2 py-1 md:text-sm text-xs h-1/4 line-clamp-2">
                    {video.title}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <NewsBentoStyles
            bentoStyle={bentoKey}
            newsData={videosData}
            getItemProps={(item: any) => ({
              id: item.id,
              imageUrl: item.video_thumbnail,
              title: item.title,
            })}
          />
        )} */}

        <MoreFieldsRenderer
          currentBlock={currentBlock}
          onChangeBlock={onChangeBlock}
          moreFields={moreFields}
          setMoreFields={setMoreFields}
        />
      </div>
      {bentoModalShow && (
        <BentoModal
          show={bentoModalShow}
          currentKey={bentoKey}
          onClose={() => setBentoModalShow(false)}
          onSelect={handleSelectBentoKey}
        />
      )}
      <div className="flex items-center md:gap-8 gap-2 md:mt-5 mt-2">
        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
        />
        {/* {previewType == "bento" && (
          <Button
            text="Change Bento Style"
            onClick={() => setBentoModalShow(true)}
            className=""
            icon={bentoBoxIcon}
            backgroundColor="transparent"
          />
        )} */}
        <MoreFieldsEditor
          currentBlock={currentBlock}
          onChangeBlock={onChangeBlock}
          moreFields={moreFields}
          setMoreFields={setMoreFields}
          fieldsToShow={["title", "description"]}
        />
      </div>
    </>
  );
};

export default VideosBlock;
