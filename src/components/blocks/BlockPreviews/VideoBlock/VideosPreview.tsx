import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import { PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import api from "../../../../lib/api";
import Videos2U3D from "./Videos2U3D";
import Videos1C from "./Videos1C";
import Videos2V from "./Videos2V";
import Videos2H from "./Videos2H";
import Videos3V from "./Videos3V";
import Videos1V2H from "./Videos1V2H";
import Videos2H1V from "./Videos2H1V";
import Videos4V from "./Videos4V";
import Videos1V2H1V from "./Videos1V2H1V";
import Videos2H2V from "./Videos2H2V";
import Videos2H2H from "./Videos2H2H";
import Videos2H2H2H from "./Videos2H2H2H";
import { concatImgURL } from "../../../../config/function";

type Props = {
  data: any;
};

// type VideoMediaPreviewProps = {
//   imageUrl: string;
//   title: string;
//   iconSize?: number;
// };

// export const VideoMediaPreview = ({
//   imageUrl,
//   title,
//   iconSize = 15,
// }: VideoMediaPreviewProps) => {
//   return (
//     <div className="relative h-full bg-f6f6f6 flex justify-center items-center overflow-hidden">
//       {/* Image */}
//       {imageUrl ? (
//         <img
//           src={imageUrl}
//           alt="Media"
//           className="w-full h-full object-cover"
//         />
//       ) : (
//         <img
//           src={mediaIcon}
//           alt="Media"
//           className="w-full h-full object-cover"
//         />
//       )}
//       <div className="absolute top-2 right-2 group rounded-xl z-10">
//         <div className="w-6 h-6 bg-black/50 rounded-lg flex justify-center items-center group-hover:scale-110 transition-all duration-500">
//           <PlayIcon className="text-white" size={iconSize} />
//         </div>
//       </div>

//       {/* 🔽 Full overlay */}
//       <div className="absolute inset-0 bg-black/50"></div>

//       {/* 🔽 Title centered at bottom */}
//       <p className="absolute bottom-0 left-0 right-0 px-2 py-1 text-sm text-white line-clamp-2">
//         {title}
//       </p>
//     </div>
//   );
// };

const VideosPreview = ({ data }: Props) => {
  const previewStyle = data?.content.preview_style;
  const bentoKey = data?.content.bento_key || "1V2H";
  const sectionTitle = data?.content?.more?.title || "Videos";
  const categoryID = data?.content.category_id || null;
  const [videos, setVideos] = useState([]);

  const [categoryName, setCategoryName] = useState<string | null>(null);

  const getCategories = async () => {
    return await api.get("/category/categories/video");
  };

  const { data: allCategories } = useQuery({
    queryKey: ["videoCatogories"],
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

    return await api.get("/videos/list-by-category", { params });
  };

  const { data: videosByCategory } = useQuery({
    queryKey: ["videosByCategory", categoryName],
    queryFn: getNewsByCategory,
    refetchOnWindowFocus: false,
    select: (res: any) => {
      return res.data;
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
    if (videosByCategory) {
      setVideos(videosByCategory?.data);
    }
  }, [videosByCategory]);

  // useEffect(() => {
  // }, [data]);

  return (
    <>
      {previewStyle == "list" && (
        <div className="overflow-hidden mt-4">
          <h2 className="text-2xl md:text-44 lg:text-54 xl:text-84 font-extrabold text-black font-plakatbold mb-4 uppercase">
            {sectionTitle}
          </h2>
          <Swiper
            spaceBetween={15}
            slidesPerView={6}
            breakpoints={{
              320: { slidesPerView: 1.5 },
              768: { slidesPerView: 3.5 },
              1024: { slidesPerView: 5 },
              1200: { slidesPerView: 6 },
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            className="highlights-slider w-full h-auto !overflow-visible"
          >
            {videos.map((video: any) => (
              <SwiperSlide key={video.id}>
                <div className="relative rounded-xl overflow-hidden group cursor-pointer after:content-[''] after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-black/60 ">
                  <img
                    src={concatImgURL(video.video_thumbnail)}
                    alt={video.title}
                    className="w-full h-52 md:h-56 object-cover transition duration-300 group-hover:brightness-75"
                    loading="lazy"
                  />

                  <div className="absolute top-2 right-2 group rounded-full z-10">
                    <div className="p-2 bg-black/50 rounded-xl flex justify-center items-center group-hover:scale-110 transition-all duration-500">
                      <PlayIcon className="text-white" size={20} />
                    </div>
                  </div>
                  <div className="absolute bottom-2 z-10 left-2 right-2 text-sm md:text-base font-normal line-clamp-2 text-white p-2 ">
                    {video.title}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {previewStyle === "bento" &&
        (() => {
          const components: Record<string, React.ElementType> = {
            "2U3D": Videos2U3D,
            "1C": Videos1C,
            "2V": Videos2V,
            "2H": Videos2H,
            "3V": Videos3V,
            "1V2H": Videos1V2H,
            "2H1V": Videos2H1V,
            "4V": Videos4V,
            "1V2H1V": Videos1V2H1V,
            "2H2V": Videos2H2V,
            "2H2H": Videos2H2H,
            "2H2H2H": Videos2H2H2H,
          };

          const SelectedComponent = components[bentoKey];
          return SelectedComponent ? (
            <SelectedComponent
              data={videos}
              title={data?.content?.more?.title}
            />
          ) : null;
        })()}
      {/* {previewStyle == "bento" && bentoKey == "2U3D" && (
        <Videos2U3D data={videos} title={data?.content.more.title} />
      )}
      {previewStyle == "bento" && bentoKey == "1C" && (
        <Videos1C data={videos} title={data?.content.more.title} />
      )}
      {previewStyle == "bento" && bentoKey == "2V" && (
        <Videos2V data={videos} title={data?.content.more.title} />
      )}
      {previewStyle == "bento" && bentoKey == "2H" && (
        <Videos2H data={videos} title={data?.content.more.title} />
      )}
      {previewStyle == "bento" && bentoKey == "3V" && (
        <Videos3V data={videos} title={data?.content.more.title} />
      )}
      {previewStyle == "bento" && bentoKey == "1V2H" && (
        <Videos1V2H data={videos} title={data?.content.more.title} />
      )}
      {previewStyle == "bento" && bentoKey == "2H1V" && (
        <Videos2H1V data={videos} title={data?.content.more.title} />
      )}
      {previewStyle == "bento" && bentoKey == "4V" && (
        <Videos4V data={videos} title={data?.content.more.title} />
      )}
      {previewStyle == "bento" && bentoKey == "1V2H1V" && (
        <Videos1V2H1V data={videos} title={data?.content.more.title} />
      )}
      {previewStyle == "bento" && bentoKey == "2H2V" && (
        <Videos2H2V data={videos} title={data?.content.more.title} />
      )}
      {previewStyle == "bento" && bentoKey == "2H2H" && (
        <Videos2H2H data={videos} title={data?.content.more.title} />
      )}
      {previewStyle == "bento" && bentoKey == "2H2H2H" && (
        <Videos2H2H2H data={videos} title={data?.content.more.title} />
      )} */}
    </>
  );
};

export default VideosPreview;
