import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import api from "../../../lib/api";
import { concatImgURL } from "../../../config/function";

type ShopPreviewProps = {
  data: any;
};

const ShopPreview = ({ data }: ShopPreviewProps) => {
  const sectionTitle = data?.content?.more?.title || null;
  const btnObj = data?.content?.more?.cta || null;
  //   const shopData = data?.blockData?.shop || [];
  //   const products = data?.blockData?.data || [];
  const shopID = data?.content?.shop_id || null;

  const [shopInfo, setShopInfo] = useState<Record<string, any>>({});
  const [products, setProducts] = useState([]);

  const getProductData = async () => {
    const params: Record<string, any> = {};

    if (shopID) {
      params.shop_id = shopID;
    }

    return await api.get("/product/list-by-shop", { params });
  };

  const { data: productData } = useQuery({
    queryKey: ["productData", shopID],
    queryFn: getProductData,
    refetchOnWindowFocus: false,
    enabled: !!shopID,
    select: (res) => {
      const products = res.data.data;
      const shop = res.data.shop;
      return { products, shop };
    },
  });

  useEffect(() => {
    if (productData) {
      setShopInfo(productData.shop);
      setProducts(productData.products);
    }
  }, [productData]);

  return (
    <div className="my-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl md:text-44 lg:text-54 xl:text-84 font-bold font-plakatbold uppercase">
          {sectionTitle}
        </h2>
        {btnObj && (
          <button className="px-6 py-2 border-0.5 rounded-full border-primary transition-all hover:bg-red-500 hover:text-white text-black font-semibold">
            {btnObj.button_label}
          </button>
        )}
      </div>
      <div className="flex justify-between gap-8 flex-wrap md:flex-nowrap">
        {/* <div className="w-full md:w-2/5 relative rounded-2xl overflow-hidden h-full min-h-64 md:min-h-85 max-h-600">
          <img
            src={shopInfo?.banner_url}
            alt="shop_img"
            className="w-full h-full object-cover "
            loading="lazy"
          />
          <div className="absolute bottom-0 right-0 z-10 h-56 md:h-48 xl:h-72">
            <div className="relative flex flex-col items-center justify-between bg-yellow-400 px-6 xl:px-14 py-10 rounded-tl-2xl rounded-br-2xl h-full w-14 md:w-14 xl:w-[80px]">
              <div className="absolute top-5 md:top-2 xl:top-5">
                <svg
                  className="w-8 h-8 md:w-8 md:h-8 xl:w-12 xl:h-12"
                  width="48"
                  height="48"
                  viewBox="0 0 61 61"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="30.7364" cy="30.6708" r="29.9208" fill="black" />
                  <path
                    d="M23.425 37.9814L37.4856 23.9209"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                  <path
                    d="M22.8625 22.7969H38.6103V38.5447"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </div>

              <div className="flex flex-col items-center text-black">
                <div className="text-base md:text-xl lg:text-2xl xl:text-44 absolute bottom-[32%] lg:bottom-[25%] xl:bottom-[13%] -right-[32px] lg:-right-[0px] xl:right-[30px] font-plakatbold font-bold -rotate-90 whitespace-nowrap tracking-wider">
                  {shopInfo.name}
                </div>
                <div className=" text-[10px] lg:text-lg absolute bottom-10 md:bottom-14 lg:bottom-16 -right-2 md:-right-1 lg:-right-[30px] -rotate-90 tracking-widest uppercase">
                  {shopInfo.description}
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="w-full md:w-2/5 relative rounded-2xl overflow-hidden h-full min-h-64 md:min-h-85 max-h-[600px]">
          <img
            src={concatImgURL(shopInfo?.banner_url)}
            alt="shop_img"
            className="w-full h-full object-cover"
            loading="lazy"
          />

          <div className="absolute bottom-0 right-0 z-10 h-56 md:h-48 xl:h-72">
            <div className="relative flex flex-col items-center justify-between bg-yellow-400 px-4 xl:px-6 pt-2 pb-12 rounded-tl-2xl rounded-br-2xl h-full w-14 md:w-16 xl:w-20">
              <div className="mt-2">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 xl:w-12 xl:h-12"
                  viewBox="0 0 61 61"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="30.7364" cy="30.6708" r="29.9208" fill="black" />
                  <path
                    d="M23.425 37.9814L37.4856 23.9209"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                  <path
                    d="M22.8625 22.7969H38.6103V38.5447"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </div>

              <div className="flex flex-col rotate-[-90deg]">
                <p className="text-sm md:text-lg lg:text-xl xl:text-2xl font-plakatbold font-bold tracking-wider whitespace-nowrap">
                  {shopInfo?.name}
                </p>
                {shopInfo?.description && (
                  <p className="text-[10px] md:text-xs lg:text-sm xl:text-base uppercase tracking-widest whitespace-nowrap">
                    {shopInfo?.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/5">
          <Swiper
            spaceBetween={20}
            slidesPerView={2.5}
            breakpoints={{
              640: { slidesPerView: 1.2 }, // small screens
              768: { slidesPerView: 2 }, // tablets
              1024: { slidesPerView: 2.5 }, // desktops
            }}
            className="w-full h-full"
          >
            {products.map((product: any) => (
              <SwiperSlide key={product.id}>
                <div className="flex flex-col w-full h-full justify-between text-black">
                  <div className="bg-white rounded-xl md:rounded-20 lg:rounded-30 overflow-hidden py-8.5 px-5">
                    <img
                      src={
                        concatImgURL(product.thumbnail_url) ||
                        concatImgURL(product.media?.[0]?.media_url) ||
                        "/placeholder.png"
                      }
                      alt={product.media?.[0]?.alt_text || product.name}
                      width={400}
                      height={400}
                      className="h-44 lg:h-56 xl:h-72 w-auto mx-auto object-contain"
                    />
                  </div>
                  <button className="mt-auto flex justify-center items-center gap-2 text-base md:text-sm xl:text-xl font-bold uppercase bg-white border border-primary rounded-full px-8 lg:px-6 xl:px-20 py-3 hover:bg-red-500 hover:text-white transition-all duration-500">
                    Buy Now
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ShopPreview;
