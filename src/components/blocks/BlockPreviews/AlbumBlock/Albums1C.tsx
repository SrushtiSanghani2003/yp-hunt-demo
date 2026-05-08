import { Swiper, SwiperSlide } from "swiper/react";
import { mediaIcon } from "../../../../icons";
import { concatImgURL } from "../../../../config/function";

type Props = {
  data: any;
  title?: string;
};

const Albums1C = ({ data, title }: Props) => {
  return (
    <div className="my-4">
      <h2 className="text-2xl md:text-44 lg:text-54 xl:text-84 font-extrabold text-black font-plakatbold mb-4 uppercase">
        {title}
      </h2>
      <Swiper spaceBetween={16} slidesPerView={1} className="!px-1">
        {data.map((item: any) => {
          const imageUrl = item.thumbnail_url || "";
          return (
            <SwiperSlide key={item.id}>
              <div className="border-primary border-0.5 rounded-2xl flex flex-col overflow-auto h-60">
                <div
                  key={item.id}
                  className="h-full rounded-2xl overflow-hidden border-primary"
                >
                  <div className="relative h-full bg-f6f6f6 flex justify-center items-center overflow-hidden">
                    {/* Image */}
                    {imageUrl ? (
                      <img
                        src={concatImgURL(imageUrl)}
                        alt="Media"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={mediaIcon}
                        alt="Media"
                        className="w-full h-full object-cover"
                      />
                    )}

                    {/* 🔽 Full overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>

                    {/* 🔽 Title centered at bottom */}
                    <p className="absolute bottom-0 left-0 right-0 px-2 py-1 text-sm text-white line-clamp-2">
                      {item.name}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Albums1C;
