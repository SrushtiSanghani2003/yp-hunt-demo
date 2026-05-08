import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import api from "../../../../lib/api";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import News1V2H from "./News1V2H";
import { concatImgURL, formatUTCDate } from "../../../../config/function";
import { mediaIcon } from "../../../../icons";
import News2U3D from "./News2U3D";
import News1C from "./News1C";
import News2V from "./News2V";
import News2H from "./News2H";
import News3V from "./News3V";
import News2H1V from "./News2H1V";
import News4V from "./News4V";
import News1V2H1V from "./News1V2H1V";
import News2H2V from "./News2H2V";
import News2H2H from "./News2H2H";
import News2H2H2H from "./News2H2H2H";

type NewsPreviewProps = {
  data: any;
};

export const NewsMediaPreview = ({ item, size }: any) => {
  const getImageSrc = (item: any) =>
    concatImgURL(item?.hero_media_thumbnail) || concatImgURL(item?.hero_image_url) || mediaIcon;

  const classes: Record<string, any> = {
    badge: {
      small: "text-[10px] px-1",
      medium: "text-xs px-1.5",
      large: "text-xs px-2",
    },
    date: {
      small: "text-[10px]",
      medium: "text-xs",
      large: "text-sm",
    },
    title: {
      small: "w-3/5 text-xs",
      medium: "w-2/3 text-sm",
      large: "w-3/4 text-base",
    },
    buttonWrapper: {
      small: "w-2/5 text-[10px]",
      medium: "w-1/3 text-xs",
      large: "w-3/12 text-sm",
    },
  };

  const getClass = (section: keyof typeof classes) =>
    classes[section][size] || classes[section].large;

  return (
    <div className="relative h-full bg-f6f6f6 flex justify-center items-center overflow-hidden">
      <img
        src={getImageSrc(item)}
        alt="Media"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="absolute bottom-0 left-0 right-0 px-2 py-2 flex flex-col gap-2 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center gap-2">
          {item.author_name && (
            <span
              className={`bg-white text-black font-normal  py-0.5 rounded-xl ${getClass(
                "badge"
              )}`}
            >
              {item.author_name}
            </span>
          )}
          <span className={`text-white ${getClass("date")}`}>
            {formatUTCDate(item.published_at)}
          </span>
        </div>

        <div className="flex items-end justify-between">
          <p className={`${getClass("title")}  text-white line-clamp-2`}>
            {item.title}
          </p>
          <div className={`flex justify-end ${getClass("buttonWrapper")}`}>
            <button
              className={`p-1 border-0.5 text-white rounded-xl font-medium`}
            >
              Read more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsPreview = ({ data }: NewsPreviewProps) => {
  const previewStyle = data?.content.preview_style;
  const bentoKey = data?.content.bento_key || "1V2H";
  const sectionTitle = data?.content?.more?.title || "Videos";
  const categoryID = data?.content.category_id || null;
  const [news, setNews] = useState([]);

  const [categoryName, setCategoryName] = useState<string | null>(null);
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

  const getNewsByCategory = async ({
    queryKey,
  }: QueryFunctionContext<[string, string | undefined | null]>) => {
    const [_key, categoryName] = queryKey;
    const params: Record<string, any> = {};

    if (categoryName) {
      params.category_name = categoryName;
    }

    return await api.get("/news/list-by-category", { params });
  };

  const { data: newsByCategory } = useQuery({
    queryKey: ["newsByCategory", categoryName],
    queryFn: getNewsByCategory,
    refetchOnWindowFocus: false,
    select: (res) => {
      return res.data.data;
    },
  });

  useEffect(() => {
    if (allCategories && categoryID) {
      const selectedCatObj: any = allCategories.find(
        (cat: any) => cat.id === categoryID
      );
      const categoryName = selectedCatObj?.name || null;
      setCategoryName(categoryName);
    }
  }, [allCategories]);

  useEffect(() => {
    if (newsByCategory) {
      setNews(newsByCategory);
    }
  }, [newsByCategory]);

  return (
    <>
      {previewStyle == "list" && (
        <div className="overflow-hidden mt-4">
          <h2 className="text-2xl md:text-44 lg:text-54 xl:text-84 font-extrabold text-black font-plakatbold mb-4 uppercase">
            {sectionTitle}
          </h2>
          <Swiper
            spaceBetween={15}
            slidesPerView={4}
            breakpoints={{
              320: { slidesPerView: 1.5 },
              768: { slidesPerView: 3.5 },
              1024: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            className="highlights-slider w-full h-auto !overflow-visible"
          >
            {news.map((news: any) => (
              <SwiperSlide key={news.id}>
                <div className="h-72 rounded-2xl overflow-hidden">
                  <NewsMediaPreview item={news} size="medium" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {previewStyle === "bento" &&
        (() => {
          const components: Record<string, React.ElementType> = {
            "2U3D": News2U3D,
            "1C": News1C,
            "2V": News2V,
            "2H": News2H,
            "3V": News3V,
            "1V2H": News1V2H,
            "2H1V": News2H1V,
            "4V": News4V,
            "1V2H1V": News1V2H1V,
            "2H2V": News2H2V,
            "2H2H": News2H2H,
            "2H2H2H": News2H2H2H,
          };

          const SelectedComponent = components[bentoKey];
          return SelectedComponent ? (
            <SelectedComponent data={news} title={data?.content?.more?.title} />
          ) : null;
        })()}
    </>
  );
};

export default NewsPreview;
