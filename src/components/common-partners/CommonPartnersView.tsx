import { concatImgURL } from "../../config/function";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/free-mode";

const CommonPartnersView = ({ tiers }: any) => {
  return (
    <div className="mt-5">
      <div className="space-y-4">
        {tiers.map((tier: any, tierIndex: number) => (
          <div key={tierIndex}>
            {/* Tier Title */}
            <h3 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">
              {tier.tierName}
            </h3>

            {/* Slider */}
            <Swiper
              spaceBetween={12}
              freeMode={true}
              slidesPerView={2}
              breakpoints={{
                480: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
                1280: { slidesPerView: 5 },
              }}
            >
              {tier.partners.map((partner: any, partnerIndex: number) => (
                <SwiperSlide key={partnerIndex}>
                  <div
                    className="p-2 rounded-2xl bg-white shadow-sm hover:shadow-md 
                    transition-all duration-200 group border border-primary"
                  >
                    {/* Image */}
                    <div className="w-full h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                      {partner.imageUrl ? (
                        <img
                          src={concatImgURL(partner.imageUrl)}
                          alt={partner.text}
                          className="w-full h-full object-contain group-hover:scale-105 transition-all duration-200"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">No Image</span>
                      )}
                    </div>

                    {/* Name */}
                    <p className="mt-3 text-sm text-gray-700 font-medium text-center line-clamp-1">
                      {partner.text}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonPartnersView;
