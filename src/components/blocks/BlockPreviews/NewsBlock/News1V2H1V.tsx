import { Swiper, SwiperSlide } from "swiper/react";
import { NewsMediaPreview } from "./NewsPreview";

type Props = {
  data: any;
  title?: string;
};

const News1V2H1V = ({ data, title }: Props) => {
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
                <div className="grid grid-cols-6 gap-3 h-72">
                  {rawFirst && (
                    <div className="col-span-2 h-full rounded-2xl overflow-hidden border border-primary flex flex-col">
                      <NewsMediaPreview item={rawFirst} size="medium" />
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
                            <NewsMediaPreview item={item} size="medium" />
                          </div>
                        )
                    )}
                  </div>
                  {rawFourth && (
                    <div className="col-span-2 h-full rounded-2xl overflow-hidden border border-primary flex flex-col">
                      <NewsMediaPreview item={rawFourth} size="medium" />
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

export default News1V2H1V;
