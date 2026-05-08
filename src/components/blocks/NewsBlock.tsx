import { useEffect, useState } from "react";
import { chevronDown, mediaIcon } from "../../icons";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
import api from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
// import Button from "../ui/button";
import BentoModal from "./bentobox/BentoModal";
import NewsBentoStyles from "./NewsBentoStyles";
import { useParams } from "react-router-dom";
import MoreFieldsEditor from "./MoreFieldsEditor";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
import { concatImgURL } from "../../config/function";
// import Button from "../ui/button";

const NewsBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const [_categories, setCategories] = useState([]);
  const [_selectedCategoryID, setSelectedCategoryID] = useState("");
  // const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [previewType, setPreviewType] = useState("");
  const [bentoKey, setBentoKey] = useState("1V2H");
  const [bentoModalShow, setBentoModalShow] = useState(false);
  const [moreFields, setMoreFields] = useState<string[]>([]);
  const [type, setType] = useState("");
  const [newsCount, setNewsCount] = useState<string | number>(1);
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [newsData, setNewsData] = useState([]);

  const getCategories = async () => {
    return await api.get("/category/categories/news");
  };

  const { data: allCategories } = useQuery({
    queryKey: ["newsCatogories"],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
    select: (res) => {
      return (res as any)?.response?.data;
    },
  });

  // const getNewsByCategory = async ({
  //   queryKey,
  // }: QueryFunctionContext<[string, string | undefined]>) => {
  //   const [_key, selectedCategoryName] = queryKey;
  //   const params: Record<string, any> = {};

  //   if (selectedCategoryName) {
  //     params.category_name = selectedCategoryName;
  //   }

  //   return await api.get("/news/list-by-category", { params });
  // };

  // const { data: newsByCategory } = useQuery({
  //   queryKey: ["newsByCategory", selectedCategoryName],
  //   queryFn: getNewsByCategory,
  //   refetchOnWindowFocus: false,
  //   select: (res) => {
  //     return res.data.data;
  //   },
  // });

  const getNews = async () => {
    const params = { page: 1, limit: 50 };
    return await api.get("/news", { params });
  };

  const { data: newsAllData } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });

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

  const handleTypeChange = (type: string) => {
    setType(type);
    const updatedContent = { ...currentBlock.content };
    updatedContent.type = type;
    onChangeBlock?.({
      ...currentBlock,
      content: updatedContent,
    });
  };
  const handleCountChange = (count: string) => {
    setNewsCount(count);
    const updatedContent = { ...currentBlock.content };
    updatedContent.news_count = Number(count);
    onChangeBlock?.({
      ...currentBlock,
      content: updatedContent,
    });
  };

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

  useEffect(() => {}, [bentoKey]);

  // useEffect(() => {
  //   if (newsByCategory) {
  //     setNewsData(newsByCategory);
  //   }
  // }, [newsByCategory]);
  useEffect(() => {
    if (newsAllData) {
      setNewsData(newsAllData?.data?.news);
    }
  }, [newsAllData]);

  useEffect(() => {
    if (allCategories?.length > 0) {
      setCategories(allCategories);
    }
  }, [allCategories]);

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
      if (currentBlock.content?.more) {
        const fields = Object.keys(currentBlock.content?.more);
        setMoreFields(fields);
      }
      if (currentBlock.content?.type) {
        setType(currentBlock.content?.type);
      }
    }
    if (currentBlock.content?.preview_style) {
      setPreviewType(currentBlock.content?.preview_style);
    }
  }, [currentBlock]);

  return (
    <>
      <div className="pb-4 border-b-primary border-b-0.5">
        {/* <div className="grid grid-cols-2 gap-3">
          <div className="relative mb-5">
            <select
              className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
              value={selectedCategoryID}
              onChange={handleChange}
            >
              <option value="" disabled>
                Please Select Category
              </option>
              {categories &&
                categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>
            <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
              <img src={chevronDown} />
            </div>
          </div>
          <div className="relative mb-5">
            <select
              className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
              value={previewType}
              onChange={handleStyleChange}
            >
              <option value="" disabled>
                Please Select Style
              </option>
              <option value="list">List</option>
              <option value="bento">Bento</option>
            </select>
            <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
              <img src={chevronDown} />
            </div>
          </div>
        </div> */}
        <div
          className={`grid ${
            type == "hero" ? "grid-cols-2" : "grid-cols-1"
          } gap-5`}
        >
          <div className="relative mb-5">
            <label className="block md:text-base/4 text-base md:mb-2 mb-0 font-medium">
              Type
            </label>
            <div className="relative">
              <select
                className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
                value={type}
                onChange={(e) => handleTypeChange(e.target.value)}
              >
                <option value="" disabled>
                  Please Select Type
                </option>
                <option value="hero">Hero</option>
                <option value="latest">Latest</option>
                <option value="list">List</option>
                <option value="other">Other</option>
                <option value="press">Press</option>
                <option value="corporate_press">Corporate Press</option>
                <option value="tournament">Tournament</option>
                <option value="player">Player</option>
              </select>
              <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                <img src={chevronDown} />
              </div>
            </div>
          </div>
          {type == "hero" && (
            <div className="relative mb-5">
              <label className="block md:text-base/4 text-base md:mb-2 mb-0 font-medium">
                News To Show
              </label>
              <div className="relative">
                <select
                  className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
                  value={newsCount}
                  onChange={(e) => handleCountChange(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                  <img src={chevronDown} />
                </div>
              </div>
            </div>
          )}
        </div>

        {previewType === "" ? (
          <div className="text-center text-sm text-gray-500 py-10">
            Please select a preview style to continue
          </div>
        ) : newsData.length === 0 ? (
          <div className="text-center text-sm text-gray-500 py-10">
            No news items available
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
            {newsData.map((news: any) => (
              <SwiperSlide key={news.id}>
                <div className="border-primary border-0.5 rounded-2xl flex flex-col overflow-auto h-52">
                  <div className="h-3/4 bg-f6f6f6 rounded-2xl border-primary border-b-0.5 flex justify-center items-center overflow-hidden">
                    {news.hero_image_url ? (
                      <img
                        src={concatImgURL(news.hero_image_url)}
                        alt="Media"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img src={mediaIcon} alt="Media" className="" />
                    )}
                  </div>
                  <p className="md:px-4 px-2 md:py-2 py-1 md:text-sm text-xs h-1/4 line-clamp-2">
                    {news.title}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <NewsBentoStyles
            bentoStyle={bentoKey}
            newsData={newsData}
            getItemProps={(item: any) => ({
              id: item.id,
              imageUrl: item.hero_image_url,
              title: item.title,
            })}
          />
        )}
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

export default NewsBlock;
