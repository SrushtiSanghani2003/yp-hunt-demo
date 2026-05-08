import { Swiper, SwiperSlide } from "swiper/react";
import { ArticlesMediaPreview } from "./ArticlesPreview";

type Props = {
  data: any;
  title?: string;
};

const Articles2U3D = ({ data, title }: Props) => {
  
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
                <div className="flex flex-col gap-3 h-80">
                  <div className="h-44 grid grid-cols-2 gap-3">
                    {topItems.map((item: any) => {
                      // const imageUrl = item.video_thumbnail;
                      return (
                        <div
                          key={item.id}
                          className="h-full rounded-2xl overflow-hidden border border-primary"
                        >
                          <ArticlesMediaPreview item={item} size="medium"/>
                        </div>
                      );
                    })}
                  </div>
                  <div className="h-32 grid grid-cols-3 gap-3">
                    {bottomItems.map((item: any) => {
                      // const imageUrl = item.video_thumbnail;
                      return (
                        <div
                          key={item.id}
                          className="h-full rounded-2xl overflow-hidden border border-primary"
                        >
                          <ArticlesMediaPreview item={item} size="small"/>
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

export default Articles2U3D;
