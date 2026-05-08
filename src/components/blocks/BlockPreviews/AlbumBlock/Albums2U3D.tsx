import { Swiper, SwiperSlide } from "swiper/react";
import { mediaIcon } from "../../../../icons";
import { concatImgURL } from "../../../../config/function";

type Props = {
  data: any;
  title?: string;
};

const Albums2U3D = ({ data, title }: Props) => {
  return (
    <div className="my-4">
      <h2 className="text-2xl md:text-44 lg:text-54 xl:text-84 font-extrabold text-black font-plakatbold mb-4 uppercase">
        {title}
      </h2>
      <Swiper spaceBetween={16} slidesPerView={2} className="!px-1">
        {Array.from({ length: Math.ceil(data.length / 5) }).map(
          (_, groupIndex) => {
            const baseIndex = groupIndex * 5;
            const topItems = data.slice(baseIndex, baseIndex + 2); // First two items
            const bottomItems = data.slice(baseIndex + 2, baseIndex + 5); // Next three items

            return (
              <SwiperSlide key={groupIndex}>
                <div className="flex flex-col gap-3 h-72">
                  <div className="h-40 grid grid-cols-2 gap-3">
                    {topItems.map((item: any) => {
                      const imageUrl = item.thumbnail_url || "";
                      return (
                        <div
                          key={item.id}
                          className="h-full rounded-2xl overflow-hidden border border-primary"
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
                      );
                    })}
                  </div>
                  <div className="h-32 grid grid-cols-3 gap-3">
                    {bottomItems.map((item: any) => {
                      const imageUrl = item.thumbnail_url || "";
                      return (
                        <div
                          key={item.id}
                          className="h-full rounded-2xl overflow-hidden border border-primary"
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
                      );
                    })}
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

export default Albums2U3D;
