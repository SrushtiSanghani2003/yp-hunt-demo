import { Swiper, SwiperSlide } from "swiper/react";
import { mediaIcon } from "../../../../icons";
import { PlayIcon } from "lucide-react";
import { concatImgURL } from "../../../../config/function";

type Props = {
  data: any;
  title?: string;
};

const Videos2H = ({ data, title }: Props) => {
  return (
    <div className="my-4">
      <h2 className="text-2xl md:text-44 lg:text-54 xl:text-84 font-extrabold text-black font-plakatbold mb-4 uppercase">
        {title}
      </h2>
      <Swiper spaceBetween={30} slidesPerView={1} className="!px-1">
        {Array.from({ length: Math.ceil(data.length / 2) }).map(
          (_, groupIndex) => {
            const start = groupIndex * 2;
            const items = data.slice(start, start + 2);

            return (
              <SwiperSlide key={groupIndex}>
                <div className="flex flex-col gap-2 h-60">
                  {items.map((item: any) => {
                    const imageUrl = item.video_thumbnail || "";
                    return (
                      <div
                        key={item.id}
                        className="h-[116px] rounded-2xl overflow-hidden border border-primary flex flex-col"
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
                          <div className="absolute top-2 right-2 group rounded-full z-10">
                            <div className="p-1 bg-black/50 rounded-xl flex justify-center items-center group-hover:scale-110 transition-all duration-500">
                              <PlayIcon className="text-white" size={20} />
                            </div>
                          </div>

                          {/* 🔽 Full overlay */}
                          <div className="absolute inset-0 bg-black/50"></div>

                          {/* 🔽 Title centered at bottom */}
                          <p className="absolute bottom-0 left-0 right-0 px-2 py-1 text-sm text-white line-clamp-2">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </div>
  );
};

export default Videos2H;
