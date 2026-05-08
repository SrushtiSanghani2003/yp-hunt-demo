import { Swiper, SwiperSlide } from "swiper/react";
import { NewsMediaPreview } from "../NewsBlock/NewsPreview";

type Props = {
  data: any;
  title?: string;
};

const News1C = ({ data, title }: Props) => {
  return (
    <div className="my-4">
      <h2 className="text-2xl md:text-44 lg:text-54 xl:text-84 font-extrabold text-black font-plakatbold mb-4 uppercase">
        {title}
      </h2>
      <Swiper spaceBetween={16} slidesPerView={1} className="!px-1">
        {data.map((item: any) => {
          return (
            <SwiperSlide key={item.id}>
              <div className="border-primary border-0.5 rounded-2xl flex flex-col overflow-auto h-60">
                <div
                  key={item.id}
                  className="h-full rounded-2xl overflow-hidden border-primary"
                >
                  <NewsMediaPreview item={item} size="large" />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default News1C;
