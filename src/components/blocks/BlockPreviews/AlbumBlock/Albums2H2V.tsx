import { Swiper, SwiperSlide } from "swiper/react";
import { mediaIcon } from "../../../../icons";
import { concatImgURL } from "../../../../config/function";

type Props = {
  data: any;
  title?: string;
};

const Albums2H2V = ({ data, title }: Props) => {
  return (
    <div className="my-4">
      <h2 className="text-2xl md:text-44 lg:text-54 xl:text-84 font-extrabold text-black font-plakatbold mb-4 uppercase">
        {title}
      </h2>
      <Swiper spaceBetween={16} slidesPerView={1} className="!px-1">
        {Array.from({ length: Math.ceil(data.length / 4) }).map(
          (_, groupIndex) => {
            const baseIndex = groupIndex * 3;
            const rawFirst = data[baseIndex];
            const rawSecond = data[baseIndex + 1];
            const rawThird = data[baseIndex + 2];
            const rawFourth = data[baseIndex + 3];

            return (
              <SwiperSlide key={groupIndex}>
                <div className="grid grid-cols-6 gap-3 h-60">
                  <div className="col-span-2 flex flex-col gap-4 h-60">
                    {[rawFirst, rawSecond].map(
                      (item: any, _idx) =>
                        item && (
                          <div
                            key={item.id}
                            className="h-1/2 rounded-2xl overflow-hidden border border-primary flex flex-col"
                          >
                            <div className="relative h-full bg-f6f6f6 flex justify-center items-center overflow-hidden">
                              {/* Image */}
                              {item.thumbnail_url ? (
                                <img
                                  src={concatImgURL(item.thumbnail_url)}
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
                        )
                    )}
                  </div>
                  {rawThird && (
                    <div className="col-span-2 h-full rounded-2xl overflow-hidden border border-primary flex flex-col">
                      <div className="relative h-full bg-f6f6f6 flex justify-center items-center overflow-hidden">
                        {/* Image */}
                        {rawFirst.thumbnail_url ? (
                          <img
                            src={concatImgURL(rawFirst.thumbnail_url)}
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
                          {rawFirst.name}
                        </p>
                      </div>
                    </div>
                  )}

                  {rawFourth && (
                    <div className="col-span-2 h-full rounded-2xl overflow-hidden border border-primary flex flex-col">
                      <div className="relative h-full bg-f6f6f6 flex justify-center items-center overflow-hidden">
                        {/* Image */}
                        {rawFourth.thumbnail_url ? (
                          <img
                            src={concatImgURL(rawFourth.thumbnail_url)}
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
                          {rawFourth.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </div>
  );
};

export default Albums2H2V;
