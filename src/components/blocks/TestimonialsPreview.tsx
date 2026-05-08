import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { concatImgURL } from "../../config/function";

type TestimonialProps = {
  data?: any;
  title?: string;
};

const TestimonialsPreview = ({ data, title }: TestimonialProps) => {
  return (
    <div className="w-full h-auto overflow-hidden py-1">
      {title && (
        <h2 className="text-2xl md:text-44 lg:text-54 xl:text-84 font-extrabold text-black font-plakatbold mb-4 uppercase">
          {title}
        </h2>
      )}
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
          1280: { slidesPerView: 3.5 },
        }}
        className="testimonial-slider w-full h-auto !overflow-visible"
      >
        {data.map((item: any, index: number) => (
          <SwiperSlide key={index} className="max-w-[338px] w-full">
            <div className="bg-white text-black rounded-xl border-0.5 px-6 md:px-4 py-4 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-18 h-18 p-1 rounded-full bg-white overflow-hidden">
                  <img
                    src={concatImgURL(item.quote_img_url)}
                    alt={item.author}
                    className="w-16 h-16 rounded-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg/5">{item.author}</h3>
                  <p className="text-xs font-bold uppercase text-red-500 line-clamp-2">
                    {item.job_title}
                  </p>
                </div>
              </div>
              <div className="flex-1 border-t-4 border-bluelight pt-4 text-sm font-medium leading-normal md:leading-normal lg:leading-relaxed  line-clamp-5">
                {item.quote_text}
              </div>
              <div className="pt-4 flex gap-1 text-reddark">
                {Array.from({ length: Math.floor(item.rating) }, (_, i) => (
                  <FaStar key={i} fill="red" />
                ))}

                {item.rating % 1 === 0.5 && <FaStarHalfAlt fill="red" />}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialsPreview;
