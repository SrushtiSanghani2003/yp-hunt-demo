import { Swiper, SwiperSlide } from "swiper/react";
// import { mediaIcon } from "../../../../icons";
// import { formatUTCDate } from "../../../../config/function";
import { NewsMediaPreview } from "./NewsPreview";

type Props = {
  data: any;
  title?: string;
};

const News1V2H = ({ data, title }: Props) => {
  return (
    <div className="my-4">
      <h2 className="text-2xl md:text-44 lg:text-54 xl:text-84 font-extrabold text-black font-plakatbold mb-4 uppercase">
        {title}
      </h2>
      <Swiper spaceBetween={16} slidesPerView={2} className="!px-1">
        {Array.from({ length: Math.ceil(data.length / 3) }).map(
          (_, groupIndex) => {
            const baseIndex = groupIndex * 3;
            const rawFirst = data[baseIndex];
            const rawSecond = data[baseIndex + 1];
            const rawThird = data[baseIndex + 2];
            // const getImageSrc = (item: any) =>
            //   item?.hero_media_thumbnail || item?.hero_image_url || mediaIcon;

            return (
              <SwiperSlide key={groupIndex}>
                <div className="grid grid-cols-5 gap-4 h-72">
                  {rawFirst && (
                    <div className="col-span-3 h-full rounded-2xl overflow-hidden border border-primary flex flex-col">
                      <NewsMediaPreview item={rawFirst} size="medium" />
                      {/* <div className="relative h-full bg-f6f6f6 flex justify-center items-center overflow-hidden">
                        <img
                          src={getImageSrc(rawFirst)}
                          alt="Media"
                          className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/50"></div>

                        <div className="absolute bottom-0 left-0 right-0 px-2 py-2 flex flex-col gap-2 bg-gradient-to-t from-black/70 to-transparent">
                          <div className="flex items-center gap-2">
                            {rawFirst.author_name && (
                              <span className="bg-white text-black text-xs font-normal px-2 py-0.5 rounded-xl">
                                {rawFirst.author_name}
                              </span>
                            )}
                            <span className="text-white text-xs">
                              {formatUTCDate(rawFirst.published_at)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="w-3/4 text-sm text-white line-clamp-2">
                              {rawFirst.title}
                            </p>
                            <button className="w-3/12 p-1 border border-primary bg-white rounded-xl text-xs font-medium">
                              Read more
                            </button>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  )}

                  <div className="col-span-2 flex flex-col gap-4 h-72">
                    {[rawSecond, rawThird].map(
                      (item: any, _idx) =>
                        item && (
                          <div
                            key={item.id}
                            className="h-1/2 rounded-2xl overflow-hidden border border-primary flex flex-col"
                          >
                            <NewsMediaPreview item={item} size="small" />
                            {/* <div className="relative h-full bg-f6f6f6 flex justify-center items-center overflow-hidden">
                              <img
                                src={getImageSrc(item)}
                                alt="Media"
                                className="w-full h-full object-cover"
                              />

                              <div className="absolute inset-0 bg-black/50"></div>

                              <div className="absolute bottom-0 left-0 right-0 px-2 py-2 flex flex-col gap-2 bg-gradient-to-t from-black/70 to-transparent">
                                <div className="flex items-center gap-1">
                                  {rawFirst.author_name && (
                                    <span className="bg-white text-black text-[10px] font-normal px-1 py-0.5 rounded-xl">
                                      {rawFirst.author_name}
                                    </span>
                                  )}
                                  <span className="text-white text-[10px]">
                                    {formatUTCDate(rawFirst.published_at)}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between">
                                  <p className="w-3/5 text-sm/4 text-white line-clamp-2">
                                    {rawFirst.title}
                                  </p>
                                  <button className="w-2/5 p-1 border border-primary bg-white rounded-xl text-xs font-medium">
                                    Read more
                                  </button>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        )
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </div>
  );
};

export default News1V2H;
