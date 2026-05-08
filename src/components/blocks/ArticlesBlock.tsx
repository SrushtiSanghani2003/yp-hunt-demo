import { useEffect, useState } from "react";
import type { BlockTypeProps } from "./changeBlockTypes";
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import api from "../../lib/api";
import ChangeBlockType from "./ChangeBlockType";
import { bentoBoxIcon, chevronDown, mediaIcon } from "../../icons";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../ui/button";
import BentoModal from "./bentobox/BentoModal";
import NewsBentoStyles from "./NewsBentoStyles";
import MoreFieldsEditor from "./MoreFieldsEditor";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
import { concatImgURL } from "../../config/function";

const ArticlesBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryID, setSelectedCategoryID] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [articleData, setArticleData] = useState([]);
  const [previewType, setPreviewType] = useState("");
  const [bentoKey, setBentoKey] = useState("1V2H");
  const [bentoModalShow, setBentoModalShow] = useState(false);
  const [moreFields, setMoreFields] = useState<string[]>([]);

  const getCategories = async () => {
    return await api.get("/category/categories/article");
  };

  const { data: allCategories } = useQuery({
    queryKey: ["articlesCatogories"],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
    select: (res) => {
      return (res as any)?.response?.data;
    },
  });

  const getArticlesByCategory = async ({
    queryKey,
  }: QueryFunctionContext<[string, string | undefined]>) => {
    const [_key, selectedCategoryName] = queryKey;
    const params: Record<string, any> = {
      limit: 30,
    };

    if (selectedCategoryName) {
      params.category_name = selectedCategoryName;
    }

    return await api.get("/articles/list-by-category", {
      params,
    });
  };

  const { data: articlesByCategory } = useQuery({
    queryKey: ["articlesByCategory", selectedCategoryName],
    queryFn: getArticlesByCategory,
    refetchOnWindowFocus: false,
    select: (res) => {
      return res.data.data;
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedContent = { ...currentBlock.content };
    const { value } = e.target;
    setSelectedCategoryID(value);
    const selectedCatObj: any = categories.find(
      (cat: any) => String(cat.id) === value
    );
    const categoryName = selectedCatObj?.name || "";

    setSelectedCategoryName(categoryName);

    updatedContent.category_id = Number(value);
    onChangeBlock?.({
      ...currentBlock,
      content: updatedContent,
    });
  };

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedContent = { ...currentBlock.content };
    const { value } = e.target;
    setPreviewType(value);
    updatedContent.preview_style = value;
    if (value == "bento") {
      updatedContent.bento_key = "1V2H";
    }
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

  useEffect(() => {
    if (articlesByCategory) {
      setArticleData(articlesByCategory);
    }
  }, [articlesByCategory]);

  useEffect(() => {
    if (allCategories?.length > 0) {
      setCategories(allCategories);
    }
  }, [allCategories]);

  useEffect(() => {
    if (currentBlock?.content?.preview_style) {
      if (previewType == "") {
        setPreviewType(currentBlock?.content?.preview_style);
      }
      if (selectedCategoryID == null) {
        setSelectedCategoryID(currentBlock?.content?.category_id);
      }
      if (bentoKey == "") {
        setBentoKey(currentBlock?.content?.bento_key);
      }
    }
  }, [currentBlock]);

  return (
    <>
      <div className="pb-4 border-b-primary border-b-0.5">
        <div className="grid grid-cols-2 gap-3">
          <div className="relative mb-5">
            <select
              id="videoSource"
              className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
              value={selectedCategoryID}
              onChange={handleChange}
            >
              <option value="" disabled>
                Please Select
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
        </div>

        {previewType === "" ? (
          <div className="text-center text-sm text-gray-500 py-10">
            Please select a preview style to continue
          </div>
        ) : articleData.length === 0 ? (
          <div className="text-center text-sm text-gray-500 py-10">
            No article items available
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
            {articleData.map((article: any) => (
              <SwiperSlide key={article.id}>
                <div className="border-primary border-0.5 rounded-2xl flex flex-col overflow-auto h-52">
                  <div className="h-3/4 bg-f6f6f6 rounded-2xl border-primary border-b-0.5 flex justify-center items-center overflow-hidden">
                    {article.hero_image_url ? (
                      <img
                        src={concatImgURL(article.hero_image_url)}
                        alt="Media"
                        className="h-full w-full object-cover"
                      />
                    ) : article.hero_video_url ? (
                      <video
                        src={concatImgURL(article.hero_video_url)}
                        className="w-full h-full object-cover rounded-xl"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={mediaIcon}
                        alt="Media"
                        className="h-full w-full"
                      />
                    )}
                  </div>
                  <p className="md:px-4 px-2 md:py-2 py-1 md:text-sm text-xs h-1/4 line-clamp-2">
                    {article.title}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <NewsBentoStyles
            bentoStyle={bentoKey}
            newsData={articleData}
            getItemProps={(item: any) => ({
              id: item.id,
              imageUrl: item.hero_image_url,
              videoUrl: item.hero_video_url,
              title: item.title,
            })}
          />
        )}
        {/* {articleData && articleData.length > 0 ? (
            <Swiper
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="!px-1"
            >
              {articleData.map((article: any) => {
                return (
                  <SwiperSlide key={article.id}>
                    <div className="border-primary border-0.5 rounded-2xl flex flex-col overflow-auto h-52">
                      <div className="h-3/4 bg-f6f6f6 rounded-2xl border-primary border-b-0.5 flex justify-center items-center overflow-hidden">
                        {article.hero_image_url ? (
                          <img
                            src={article.hero_image_url}
                            alt="Media"
                            className="h-full w-full object-cover"
                          />
                        ) : article.hero_video_url ? (
                          <video
                            src={article.hero_video_url}
                            className="w-full h-full object-cover rounded-xl"
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                        ) : (
                          <img
                            src={mediaIcon}
                            alt="Media"
                            className="h-full w-full"
                          />
                        )}
                      </div>
                      <p className="md:px-4 px-2 md:py-2 py-1 md:text-sm text-xs h-1/4 line-clamp-2">
                        {article.title}
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <div className="text-center text-sm text-gray-500 py-10">
              No data available
            </div>
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
        {previewType == "bento" && (
          <Button
            text="Change Bento Style"
            onClick={() => setBentoModalShow(true)}
            className=""
            icon={bentoBoxIcon}
            backgroundColor="transparent"
          />
        )}
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

export default ArticlesBlock;
