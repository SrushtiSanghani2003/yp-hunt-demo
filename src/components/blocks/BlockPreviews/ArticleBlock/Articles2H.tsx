import { Swiper, SwiperSlide } from "swiper/react";
import { ArticlesMediaPreview } from "./ArticlesPreview";

type Props = {
  data: any;
  title?: string;
};

const Articles2H = ({ data, title }: Props) => {
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
                    return (
                      <div
                        key={item.id}
                        className="h-[116px] rounded-2xl overflow-hidden border border-primary flex flex-col"
                      >
                        <ArticlesMediaPreview item={item} />
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

export default Articles2H;
