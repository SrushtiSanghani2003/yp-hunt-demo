import { useEffect, useState } from "react";
import api from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { concatImgURL } from "../../config/function";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";

const ShopBlock = () => {
  const [shops, setShops] = useState<any[]>([]);

  const getShops = async () => {
    return await api.get("/shop");
  };

  const { data: shopData } = useQuery({
    queryKey: ["shops"],
    queryFn: getShops,
    refetchOnWindowFocus: false,
    select: (res) => res.data.shops,
  });

  useEffect(() => {
    if (shopData?.length > 0) {
      setShops(shopData);
    }
  }, [shopData]);

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {shops?.map((shop: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="relative rounded-xl border border-primary/40 h-56 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_100%)]"></div>

              {/* Background image */}
              <img
                src={concatImgURL(shop?.shop_image_url)}
                className="object-cover w-full h-full"
                alt="shop"
              />

              {/* Sponsor Logo */}
              <div className="absolute bottom-3 left-3">
                <img
                  src={concatImgURL(shop?.sponsor_logo_url)}
                  className="h-6 drop-shadow-md"
                  alt="sponsor"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShopBlock;
