import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { concatImgURL } from "../../../config/function";

type PartnersPreviewProps = {
  data?: any;
};

const PartnersPreview = ({ data }: PartnersPreviewProps) => {
  const sectionTitle = data?.content?.more?.title || null;
  const tiers = data?.content?.tiers || [];

  const getSlides = (partners: any[]) => {
    // If only 1 more than slidesPerView, duplicate once to avoid gaps
    if (partners.length === 6) {
      return [...partners, ...partners]; // duplicate
    }
    return partners;
  };

  return (
    <div className="my-4">
      {sectionTitle && (
        <h2 className="text-2xl md:text-44 lg:text-54 xl:text-84 font-bold font-plakatbold uppercase">
          {sectionTitle}
        </h2>
      )}
      <div className=" bg-white rounded-xl md:rounded-3xl lg:rounded-34 px-6 md:px-8 py-9 md:py-10 shadow-md">
        {tiers.map((tier: any, index: number) => {
          return (
            <div className="text-center" key={index}>
              <h2 className="text-black text-xl md:text-32 xl:text-44 uppercase font-semibold font-plakatbold mb-5">
                {tier?.tierName}
              </h2>

              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={5}
                breakpoints={{
                  320: { slidesPerView: 2 },
                  480: { slidesPerView: 2.5 },
                  768: { slidesPerView: 2.5 },
                  1024: { slidesPerView: 3.5 },
                  1440: { slidesPerView: 5 },
                }}
                loop={true}
                centeredSlides={true}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                className="mb-8 md:mb-15"
              >
                {getSlides(tier.partners).map((partner: any, index: number) => (
                  <SwiperSlide key={index}>
                    <a
                      href=""
                      key={index}
                      className="group rounded-xl xl:rounded-3xl px-2 xl:px-3 py-1 md:py-1.5 xl:py-2 w-28 md:w-40 xl:w-52 h-14 md:h-20 xl:h-27.5 flex items-center justify-center shadow-sm border-0.5 border-primary"
                    >
                      <img
                        src={concatImgURL(partner.imageUrl)}
                        alt={partner.text}
                        className="w-auto max-h-full md:max-h-8 xl:max-h-12 group-hover:scale-105 transition-all duration-500 object-contain"
                        loading="lazy"
                      />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PartnersPreview;
