import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { concatImgURL } from "../../config/function";

type HeroMediaPreviewProps = {
  data: any;
  containerHeight?: string;
  title?: string | null;
  description?: string | null;
};
const HeroMediaPreview = ({
  data,
  containerHeight,
}: // title,
// description,
HeroMediaPreviewProps) => {
  return (
    <div className={`mt-3 ${containerHeight ? containerHeight : "h-80"} `}>
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="h-full"
      >
        {data?.map((item: any) => (
          <SwiperSlide key={item.id}>
            <div className="w-full h-full rounded-20 relative overflow-hidden">
              {/* Image */}
              {item.media_type === "image" && item.media_url && (
                <img
                  src={concatImgURL(item.media_url)}
                  alt={item.title || "Hero Image"}
                  className="object-cover rounded-xl w-full h-full align-middle"
                />
              )}

              {/* Native Video */}
              {item.media_type === "video" &&
                item.media_source === "native" &&
                item.media_url && (
                  <video
                    className="absolute object-cover w-full h-full z-0 rounded-xl"
                    src={concatImgURL(item.media_url)}
                    autoPlay
                    // controls
                    loop
                    muted
                  />
                )}

              {/* YouTube Video Thumbnail */}
              {item.media_type === "video" &&
                item.media_source === "youtube" && (
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <iframe
                      src={`https://www.youtube.com/embed/${item.video_id}?autoplay=1&mute=1&controls=0`}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2"
                    />
                  </div>
                )}

              {item.sponsor_image_url && (
                <div className="absolute bottom-2 right-3 z-20">
                  <img
                    src={concatImgURL(item.sponsor_image_url)}
                    alt="Sponsor"
                    className="h-14 w-auto object-contain rounded-md px-2 py-1"
                  />
                </div>
              )}

              {/* 🔹 Title (Above bottom with spacing) */}
              <div className="absolute right-4 bottom-6 z-20">
                {item.title && (
                  <h2 className="text-lg md:text-xl font-semibold text-white drop-shadow-md line-clamp-2 mb-2">
                    {item.title}
                  </h2>
                )}
                {item.description && (
                  <p className="text-white line-clamp-3 text-sm max-w-xl">
                    {item.description}
                  </p>
                )}
                {item.link_text && (
                  <button className="mt-2 px-2 text-sm py-1 border-0.5 text-black hover:text-white hover:bg-black hover:border-black transition-all duration-300 bg-white rounded-2xl font-medium">
                    {item.link_text}
                  </button>
                )}
              </div>

              {/* <div className="absolute inset-0 bg-black/30 rounded-xl z-10"></div> */}
              {/* <div className="absolute inset-y-0 left-0 z-20 flex flex-col justify-end mb-5 px-8 text-white">
                {title && (
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-base md:text-lg opacity-90">
                    {description.slice(0, 200)}....
                  </p>
                )}
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroMediaPreview;
