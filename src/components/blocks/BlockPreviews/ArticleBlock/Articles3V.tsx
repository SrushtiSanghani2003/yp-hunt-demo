import { Swiper, SwiperSlide } from "swiper/react";
import { chunkArray } from "../../../../config/function";
import { ArticlesMediaPreview } from "./ArticlesPreview";

type Props = {
  data: any;
  title?: string;
};

const Articles3V = ({ data, title }: Props) => {
  return (
    <div className="my-4">
      <h2 className="text-2xl md:text-44 lg:text-54 xl:text-84 font-extrabold text-black font-plakatbold mb-4 uppercase">
        {title}
      </h2>
      <Swiper spaceBetween={16} slidesPerView={1} className="!px-1">
        {chunkArray(data, 3).map((group, index) => (
          <SwiperSlide key={index}>
            <div className="flex gap-4 h-60">
              {group.map((item: any) => {
                // const imageUrl = item.video_thumbnail || "";
                return (
                  <div
                    key={item.id}
                    className="w-full max-w-[33.33%] border-primary border-0.5 rounded-2xl flex flex-col overflow-hidden h-60"
                  >
                    <ArticlesMediaPreview item={item} />
                  </div>
                );
              })}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Articles3V;
