import { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import api from "../../../../lib/api";
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import Albums2U3D from "./Albums2U3D";
import Albums1C from "./Albums1C";
import Albums2V from "./Albums2V";
import Albums2H from "./Albums2H";
import Albums3V from "./Albums3V";
import Albums1V2H from "./Albums1V2H";
import Albums2H1V from "./Albums2H1V";
import Albums4V from "./Albums4V";
import Albums1V2H1V from "./Albums1V2H1V";
import Albums2H2V from "./Albums2H2V";
import Albums2H2H from "./Albums2H2H";
import Albums2H2H2H from "./Albums2H2H2H";
import { concatImgURL } from "../../../../config/function";

type AlbumsPreviewProps = {
  data: any;
};

const AlbumsPreview = ({ data }: AlbumsPreviewProps) => {
  const sectionTitle = data?.content?.more?.title || null;
  const previewStyle = data?.content?.preview_style || "list";
  const bentoKey = data?.content?.bento_key || null;
  const categoryID = data?.content.category_id || null;
  const [albums, setAlbums] = useState([]);
  const [categoryName, setCategoryName] = useState<string | null>(null);

  useEffect(() => {
  }, [previewStyle]);

  const getCategories = async () => {
    return await api.get("/category/categories/image");
  };

  const { data: allCategories } = useQuery({
    queryKey: ["albumsCatogories"],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
    select: (res) => {
      return (res as any)?.response?.data;
    },
  });

  const getAlbumsByCategory = async ({
    queryKey,
  }: QueryFunctionContext<[string, string | undefined | null]>) => {
    const [_key, categoryName] = queryKey;
    const params: Record<string, any> = {};

    if (categoryName) {
      params.category_name = categoryName;
    }

    return await api.get("/images/albums/list-by-category", {
      params,
    });
  };

  const { data: albumsByCategory } = useQuery({
    queryKey: ["albumsByCategory", categoryName],
    queryFn: getAlbumsByCategory,
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
    if (albumsByCategory) {
      setAlbums(albumsByCategory);
    }
  }, [albumsByCategory]);

  return (
    <>
      {previewStyle == "list" && (
        <div className="my-4">
          <h2 className="text-2xl md:text-44 lg:text-54 xl:text-84 font-extrabold text-black font-plakatbold mb-4 uppercase">
            {sectionTitle}
          </h2>
          <Swiper
            spaceBetween={15}
            slidesPerView={4}
            breakpoints={{
              320: { slidesPerView: 1.5 },
              768: { slidesPerView: 3.5 },
              1024: { slidesPerView: 5 },
              1200: { slidesPerView: 4 },
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            className="highlights-slider w-full h-auto !overflow-visible"
          >
            {albums.map((item: any) => (
              <SwiperSlide key={item.id}>
                <div className="relative rounded-xl overflow-hidden group cursor-pointer after:content-[''] after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-black/60 ">
                  <img
                    src={concatImgURL(item.thumbnail_url)}
                    alt={item.name}
                    className="w-full h-52 md:h-56 object-cover transition duration-300 group-hover:brightness-75"
                    loading="lazy"
                  />

                  <div className="absolute bottom-2 z-10 left-2 right-2 text-sm md:text-base font-normal line-clamp-2 text-white p-2 ">
                    {item.name}
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
            "2U3D": Albums2U3D,
            "1C": Albums1C,
            "2V": Albums2V,
            "2H": Albums2H,
            "3V": Albums3V,
            "1V2H": Albums1V2H,
            "2H1V": Albums2H1V,
            "4V": Albums4V,
            "1V2H1V": Albums1V2H1V,
            "2H2V": Albums2H2V,
            "2H2H": Albums2H2H,
            "2H2H2H": Albums2H2H2H,
          };

          const SelectedComponent = components[bentoKey];
          return SelectedComponent ? (
            <SelectedComponent
              data={albums}
              title={data?.content?.more?.title}
            />
          ) : null;
        })()}
    </>
  );
};

export default AlbumsPreview;
