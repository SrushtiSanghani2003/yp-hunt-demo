import { Swiper, SwiperSlide } from "swiper/react";
import { NewsMediaPreview } from "./NewsPreview";

type Props = {
  data: any;
  title?: string;
};

const News2H1V = ({ data, title }: Props) => {
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

            return (
              <SwiperSlide key={groupIndex}>
                <div className="grid grid-cols-5 gap-4 h-72">
                  <div className="col-span-2 flex flex-col gap-4 h-72">
                    {[rawFirst, rawSecond].map(
                      (item: any, _idx) =>
                        item && (
                          <div
                            key={item.id}
                            className="h-1/2 rounded-2xl overflow-hidden border border-primary flex flex-col"
                          >
                            <NewsMediaPreview item={item} size="small" />
                          </div>
                        )
                    )}
                  </div>

                  {rawThird && (
                    <div className="col-span-3 h-full rounded-2xl overflow-hidden border border-primary flex flex-col">
                      <NewsMediaPreview item={rawThird} size="medium" />
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

export default News2H1V;
