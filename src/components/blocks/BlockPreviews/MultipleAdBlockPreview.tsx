import AdvertisementPreview from "../Advertisements/AdvertisementPreview";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

type MultipleAdBlockPreviewProps = {
  data: any;
};

const MultipleAdBlockPreview = ({ data }: MultipleAdBlockPreviewProps) => {
  const sectionTitle = data?.content?.more?.title || null;
  const ads = data?.content?.ads || [];

  return (
    <div className="my-4">
      {sectionTitle && (
        <h2 className="text-2xl md:text-44 lg:text-54 xl:text-84 font-extrabold text-black font-plakatbold mb-4 uppercase">
          {sectionTitle}
        </h2>
      )}

      {ads.length > 0 && (
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation
          loop={true}
          modules={[Navigation, Autoplay]}
          className="advertisement-slider w-full"
        >
          {ads.map((ad: any, index: number) => (
            <SwiperSlide key={index}>
              <AdvertisementPreview data={ad} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default MultipleAdBlockPreview;
