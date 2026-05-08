import { Swiper, SwiperSlide } from "swiper/react";
import { mediaIcon } from "../../icons";
import { chunkArray, concatImgURL } from "../../config/function";

type NewsBentoStylesProps = {
  bentoStyle: string;
  newsData: any;
  getItemProps: any;
};

type MediaPreviewProps = {
  imageUrl?: string;
  videoUrl?: string;
  alt?: string;
  fallbackIcon?: string;
  className?: string;
};

const MediaPreview = ({
  imageUrl,
  videoUrl,
  alt = "Media",
  fallbackIcon = mediaIcon,
  className = "h-full w-full object-cover",
}: MediaPreviewProps) => {
  if (imageUrl) {
    return <img src={concatImgURL(imageUrl)} alt={alt} className={className} />;
  }

  if (videoUrl) {
    return (
      <video
        src={concatImgURL(videoUrl)}
        className={className}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return <img src={fallbackIcon} alt={alt} />;
};

const NewsBentoStyles = ({
  bentoStyle,
  newsData,
  getItemProps,
}: NewsBentoStylesProps) => {
  return (
    <>
      {bentoStyle == "2U3D" && (
        <Swiper spaceBetween={16} slidesPerView={2} className="!px-1">
          {Array.from({ length: Math.ceil(newsData.length / 5) }).map(
            (_, groupIndex) => {
              const baseIndex = groupIndex * 5;
              const topItems = newsData.slice(baseIndex, baseIndex + 2); // First two items
              const bottomItems = newsData.slice(baseIndex + 2, baseIndex + 5); // Next three items

              return (
                <SwiperSlide key={groupIndex}>
                  <div className="flex flex-col gap-3 h-60">
                    <div className="h-[114px] grid grid-cols-2 gap-3">
                      {topItems.map((item: any) => {
                        const { id, imageUrl, videoUrl, title } =
                          getItemProps(item);
                        return (
                          <div
                            key={id}
                            className="h-full rounded-2xl overflow-hidden border border-primary flex flex-col"
                          >
                            <div className="h-2/3 flex-1 bg-f6f6f6 flex justify-center items-center overflow-hidden">
                              <MediaPreview
                                imageUrl={imageUrl}
                                videoUrl={videoUrl}
                              />
                            </div>
                            <p className="px-2 py-1 text-xs line-clamp-2 h-2/6">
                              {title}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="h-[114px] grid grid-cols-3 gap-3">
                      {bottomItems.map((item: any) => {
                        const { id, imageUrl, videoUrl, title } =
                          getItemProps(item);
                        return (
                          <div
                            key={id}
                            className="h-full rounded-2xl overflow-hidden border border-primary flex flex-col"
                          >
                            <div className="h-2/3 flex-1 bg-f6f6f6 flex justify-center items-center overflow-hidden">
                              <MediaPreview
                                imageUrl={imageUrl}
                                videoUrl={videoUrl}
                              />
                            </div>
                            <p className="px-2 py-1 text-xs line-clamp-2 h-2/6">
                              {title}
                            </p>
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
      )}

      {bentoStyle == "1C" && (
        <Swiper spaceBetween={16} slidesPerView={1} className="!px-1">
          {newsData.map((news: any) => {
            const { id, imageUrl, videoUrl, title } = getItemProps(news);
            return (
              <SwiperSlide key={id}>
                <div className="border-primary border-0.5 rounded-2xl flex flex-col overflow-auto h-60">
                  <div className="h-[85%] bg-f6f6f6 rounded-2xl border-primary border-b-0.5 flex justify-center items-center overflow-hidden">
                    <MediaPreview imageUrl={imageUrl} videoUrl={videoUrl} />
                    {/* {news.hero_image_url ? (
                      <img
                        src={news.hero_image_url}
                        alt="Media"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img src={mediaIcon} alt="Media" className="" />
                    )} */}
                  </div>
                  <p className="md:px-4 px-2 md:py-1 py-1 md:text-sm text-xs h-[15%] line-clamp-2">
                    {/* {news.title} */}
                    {title}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      {bentoStyle === "2V" && (
        <Swiper spaceBetween={16} slidesPerView={1} className="!px-1">
          {chunkArray(newsData, 2).map((group, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="flex justify-between gap-4">
                  {group.map((news: any) => {
                    const { id, imageUrl, videoUrl, title } =
                      getItemProps(news);
                    return (
                      <div
                        key={id}
                        className="w-full max-w-[50%] border-primary border-0.5 rounded-2xl flex flex-col overflow-hidden h-60"
                      >
                        <div className="h-[80%] bg-f6f6f6 rounded-t-2xl border-primary border-b-0.5 flex justify-center items-center overflow-hidden">
                          <MediaPreview
                            imageUrl={imageUrl}
                            videoUrl={videoUrl}
                          />
                          {/* {news.hero_image_url ? (
                            <img
                              src={news.hero_image_url}
                              alt="Media"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <img
                              src={mediaIcon}
                              alt="Media"
                              className="object-contain"
                            />
                          )} */}
                        </div>
                        <p className="md:px-4 px-2 md:py-2 py-1 md:text-sm text-xs h-[20%] line-clamp-2">
                          {/* {news.title} */}
                          {title}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      {bentoStyle == "2H" && (
        <Swiper spaceBetween={30} slidesPerView={1} className="!px-1">
          {Array.from({ length: Math.ceil(newsData.length / 2) }).map(
            (_, groupIndex) => {
              const start = groupIndex * 2;
              const items = newsData.slice(start, start + 2);

              return (
                <SwiperSlide key={groupIndex}>
                  <div className="flex flex-col gap-2 h-full">
                    {items.map((item: any) => {
                      const { id, imageUrl, videoUrl, title } =
                        getItemProps(item);
                      return (
                        <div
                          key={id}
                          className="h-[116px] rounded-2xl overflow-hidden border border-primary flex flex-col"
                        >
                          <div className="flex-1 bg-f6f6f6 flex justify-center items-center overflow-hidden">
                            <MediaPreview
                              imageUrl={imageUrl}
                              videoUrl={videoUrl}
                            />
                            {/* {item.hero_image_url ? (
                              <img
                                src={item.hero_image_url}
                                alt="Media"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <img src={mediaIcon} alt="Media" className="" />
                            )} */}
                          </div>
                          <p className="px-2 py-1 text-sm/4 line-clamp-2 h-7">
                            {/* {item.title} */}
                            {title}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      )}

      {bentoStyle === "3V" && (
        <Swiper spaceBetween={16} slidesPerView={1} className="!px-1">
          {chunkArray(newsData, 3).map((group, index) => (
            <SwiperSlide key={index}>
              <div className="flex gap-4">
                {group.map((news: any) => {
                  const { id, imageUrl, videoUrl, title } = getItemProps(news);
                  return (
                    <div
                      key={id}
                      className="w-full max-w-[33.33%] border-primary border-0.5 rounded-2xl flex flex-col overflow-hidden h-60"
                    >
                      <div className="h-[80%] bg-f6f6f6 rounded-t-2xl border-primary border-b-0.5 flex justify-center items-center overflow-hidden">
                        <MediaPreview imageUrl={imageUrl} videoUrl={videoUrl} />
                        {/* {news.hero_image_url ? (
                          <img
                            src={news.hero_image_url}
                            alt="Media"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <img
                            src={mediaIcon}
                            alt="Media"
                            className="object-contain"
                          />
                        )} */}
                      </div>
                      <p className="md:px-4 px-2 md:py-2 py-1 md:text-sm text-xs h-[20%] line-clamp-2">
                        {/* {news.title} */}
                        {title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {bentoStyle == "1V2H" && (
        <Swiper spaceBetween={16} slidesPerView={2} className="!px-1">
          {Array.from({ length: Math.ceil(newsData.length / 3) }).map(
            (_, groupIndex) => {
              const baseIndex = groupIndex * 3;
              const rawFirst = newsData[baseIndex];
              const rawSecond = newsData[baseIndex + 1];
              const rawThird = newsData[baseIndex + 2];

              const first = rawFirst ? getItemProps(rawFirst) : null;
              const second = rawSecond ? getItemProps(rawSecond) : null;
              const third = rawThird ? getItemProps(rawThird) : null;

              return (
                <SwiperSlide key={groupIndex}>
                  <div className="grid grid-cols-5 gap-4 h-60">
                    {first && (
                      <div className="col-span-3 h-full rounded-2xl overflow-hidden border border-primary flex flex-col">
                        <div className="h-[210px] bg-f6f6f6 flex justify-center items-center overflow-hidden">
                          <MediaPreview
                            imageUrl={first.imageUrl}
                            videoUrl={first.videoUrl}
                          />
                          {/* {first.hero_image_url ? (
                            <img
                              src={first.hero_image_url}
                              alt="Media"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <img
                              src={mediaIcon}
                              alt="Media"
                              className="object-contain"
                            />
                          )} */}
                        </div>
                        <p className="px-3 py-2 text-sm line-clamp-2 h-[30px]">
                          {first.title}
                        </p>
                      </div>
                    )}
                    <div className="col-span-2 flex flex-col gap-4 h-60">
                      {[second, third].map(
                        (item: any, _idx) =>
                          item && (
                            <div
                              key={item.id}
                              className="h-1/2 rounded-2xl overflow-hidden border border-primary flex flex-col"
                            >
                              <div className="h-[200px] bg-f6f6f6 flex justify-center items-center overflow-hidden">
                                <MediaPreview
                                  imageUrl={item.imageUrl}
                                  videoUrl={item.videoUrl}
                                />
                                {/* {item.hero_image_url ? (
                                  <img
                                    src={item.hero_image_url}
                                    alt="Media"
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <img
                                    src={mediaIcon}
                                    alt="Media"
                                    className="object-contain"
                                  />
                                )} */}
                              </div>
                              <p className="px-2 py-1 text-xs line-clamp-2 h-[40px]">
                                {item.title}
                              </p>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      )}

      {bentoStyle == "2H1V" && (
        <Swiper spaceBetween={16} slidesPerView={2} className="!px-1">
          {Array.from({ length: Math.ceil(newsData.length / 3) }).map(
            (_, groupIndex) => {
              const baseIndex = groupIndex * 3;
              // const first: any = newsData[baseIndex];
              // const second = newsData[baseIndex + 1];
              // const third = newsData[baseIndex + 2];
              const rawFirst = newsData[baseIndex];
              const rawSecond = newsData[baseIndex + 1];
              const rawThird = newsData[baseIndex + 2];

              const first = rawFirst ? getItemProps(rawFirst) : null;
              const second = rawSecond ? getItemProps(rawSecond) : null;
              const third = rawThird ? getItemProps(rawThird) : null;

              return (
                <SwiperSlide key={groupIndex}>
                  <div className="grid grid-cols-5 gap-4 h-60">
                    <div className="col-span-2 flex flex-col gap-4 h-60">
                      {[first, second].map(
                        (item: any, _idx) =>
                          item && (
                            <div
                              key={item.id}
                              className="h-1/2 rounded-2xl overflow-hidden border border-primary flex flex-col"
                            >
                              <div className="h-[200px] bg-f6f6f6 flex justify-center items-center overflow-hidden">
                                <MediaPreview
                                  imageUrl={item.imageUrl}
                                  videoUrl={item.videoUrl}
                                />
                                {/* {item.hero_image_url ? (
                                  <img
                                    src={item.hero_image_url}
                                    alt="Media"
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <img
                                    src={mediaIcon}
                                    alt="Media"
                                    className="object-contain"
                                  />
                                )} */}
                              </div>
                              <p className="px-2 py-1 text-xs line-clamp-2 h-[40px]">
                                {item.title}
                              </p>
                            </div>
                          )
                      )}
                    </div>
                    {third && (
                      <div className="col-span-3 h-full rounded-2xl overflow-hidden border border-primary flex flex-col">
                        <div className="h-[210px] bg-f6f6f6 flex justify-center items-center overflow-hidden">
                          <MediaPreview
                            imageUrl={third.imageUrl}
                            videoUrl={third.videoUrl}
                          />
                          {/* {third.hero_image_url ? (
                            <img
                              src={third.hero_image_url}
                              alt="Media"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <img
                              src={mediaIcon}
                              alt="Media"
                              className="object-contain"
                            />
                          )} */}
                        </div>
                        <p className="px-3 py-2 text-sm line-clamp-2 h-[30px]">
                          {third.title}
                        </p>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      )}

      {bentoStyle === "4V" && (
        <Swiper spaceBetween={16} slidesPerView={1} className="!px-1">
          {chunkArray(newsData, 4).map((group, index) => (
            <SwiperSlide key={index}>
              <div className="flex gap-4">
                {group.map((news: any) => {
                  const { id, imageUrl, videoUrl, title } = getItemProps(news);
                  return (
                    <div
                      key={id}
                      className="w-full max-w-[25%] border-primary border-0.5 rounded-2xl flex flex-col overflow-hidden h-60"
                    >
                      <div className="h-[80%] bg-f6f6f6 rounded-t-2xl border-primary border-b-0.5 flex justify-center items-center overflow-hidden">
                        <MediaPreview imageUrl={imageUrl} videoUrl={videoUrl} />
                        {/* {news.hero_image_url ? (
                          <img
                            src={news.hero_image_url}
                            alt="Media"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <img
                            src={mediaIcon}
                            alt="Media"
                            className="object-contain"
                          />
                        )} */}
                      </div>
                      <p className="md:px-4 px-2 md:py-2 py-1 md:text-sm text-xs h-[20%] line-clamp-2">
                        {/* {news.title} */}
                        {title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {bentoStyle == "1V2H1V" && (
        <Swiper spaceBetween={16} slidesPerView={1} className="!px-1">
          {Array.from({ length: Math.ceil(newsData.length / 4) }).map(
            (_, groupIndex) => {
              const baseIndex = groupIndex * 4;
              // const first: any = newsData[baseIndex];
              // const second = newsData[baseIndex + 1];
              // const third = newsData[baseIndex + 2];
              // const fourth = newsData[baseIndex + 3];
              const rawFirst = newsData[baseIndex];
              const rawSecond = newsData[baseIndex + 1];
              const rawThird = newsData[baseIndex + 2];
              const rawFourth = newsData[baseIndex + 3];

              const first = rawFirst ? getItemProps(rawFirst) : null;
              const second = rawSecond ? getItemProps(rawSecond) : null;
              const third = rawThird ? getItemProps(rawThird) : null;
              const fourth = rawFourth ? getItemProps(rawFourth) : null;

              return (
                <SwiperSlide key={groupIndex}>
                  <div className="grid grid-cols-6 gap-3 h-60">
                    {first && (
                      <div className="col-span-2 h-full rounded-2xl overflow-hidden border border-primary flex flex-col">
                        <div className="h-[210px] bg-f6f6f6 flex justify-center items-center overflow-hidden">
                          <MediaPreview
                            imageUrl={first.imageUrl}
                            videoUrl={first.videoUrl}
                          />
                          {/* {first.hero_image_url ? (
                            <img
                              src={first.hero_image_url}
                              alt="Media"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <img
                              src={mediaIcon}
                              alt="Media"
                              className="object-contain"
                            />
                          )} */}
                        </div>
                        <p className="px-3 py-1 text-sm line-clamp-2 h-[30px]">
                          {first.title}
                        </p>
                      </div>
                    )}
                    <div className="col-span-2 flex flex-col gap-3 h-60">
                      {[second, third].map(
                        (item: any, _idx) =>
                          item && (
                            <div
                              key={item.id}
                              className="h-1/2 rounded-2xl overflow-hidden border border-primary flex flex-col"
                            >
                              <div className="h-[200px] bg-f6f6f6 flex justify-center items-center overflow-hidden">
                                <MediaPreview
                                  imageUrl={item.imageUrl}
                                  videoUrl={item.videoUrl}
                                />
                                {/* {item.hero_image_url ? (
                                  <img
                                    src={item.hero_image_url}
                                    alt="Media"
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <img
                                    src={mediaIcon}
                                    alt="Media"
                                    className="object-contain"
                                  />
                                )} */}
                              </div>
                              <p className="px-2 py-1 text-xs line-clamp-2 h-[40px]">
                                {item.title}
                              </p>
                            </div>
                          )
                      )}
                    </div>
                    {fourth && (
                      <div className="col-span-2 h-full rounded-2xl overflow-hidden border border-primary flex flex-col">
                        <div className="h-[210px] bg-f6f6f6 flex justify-center items-center overflow-hidden">
                          <MediaPreview
                            imageUrl={fourth.imageUrl}
                            videoUrl={fourth.videoUrl}
                          />
                          {/* {fourth.hero_image_url ? (
                            <img
                              src={fourth.hero_image_url}
                              alt="Media"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <img
                              src={mediaIcon}
                              alt="Media"
                              className="object-contain"
                            />
                          )} */}
                        </div>
                        <p className="px-3 py-1 text-sm line-clamp-2 h-[30px]">
                          {fourth.title}
                        </p>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      )}

      {bentoStyle == "2H2V" && (
        <Swiper spaceBetween={16} slidesPerView={1} className="!px-1">
          {Array.from({ length: Math.ceil(newsData.length / 4) }).map(
            (_, groupIndex) => {
              const baseIndex = groupIndex * 4;
              // const first: any = newsData[baseIndex];
              // const second = newsData[baseIndex + 1];
              // const third = newsData[baseIndex + 2];
              // const fourth = newsData[baseIndex + 3];
              const rawFirst = newsData[baseIndex];
              const rawSecond = newsData[baseIndex + 1];
              const rawThird = newsData[baseIndex + 2];
              const rawFourth = newsData[baseIndex + 3];

              const first = rawFirst ? getItemProps(rawFirst) : null;
              const second = rawSecond ? getItemProps(rawSecond) : null;
              const third = rawThird ? getItemProps(rawThird) : null;
              const fourth = rawFourth ? getItemProps(rawFourth) : null;

              return (
                <SwiperSlide key={groupIndex}>
                  <div className="grid grid-cols-6 gap-4 h-60">
                    <div className="col-span-2 flex flex-col gap-4 h-60">
                      {[first, second].map(
                        (item: any, _idx) =>
                          item && (
                            <div
                              key={item.id}
                              className="h-1/2 rounded-2xl overflow-hidden border border-primary flex flex-col"
                            >
                              <div className="h-[200px] bg-f6f6f6 flex justify-center items-center overflow-hidden">
                                <MediaPreview
                                  imageUrl={item.imageUrl}
                                  videoUrl={item.videoUrl}
                                />
                                {/* {item.hero_image_url ? (
                                  <img
                                    src={item.hero_image_url}
                                    alt="Media"
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <img
                                    src={mediaIcon}
                                    alt="Media"
                                    className="object-contain"
                                  />
                                )} */}
                              </div>
                              <p className="px-2 py-1 text-xs line-clamp-2 h-[40px]">
                                {item.title}
                              </p>
                            </div>
                          )
                      )}
                    </div>
                    {third && (
                      <div className="col-span-2 h-full rounded-2xl overflow-hidden border border-primary flex flex-col">
                        <div className="h-[210px] bg-f6f6f6 flex justify-center items-center overflow-hidden">
                          <MediaPreview
                            imageUrl={third.imageUrl}
                            videoUrl={third.videoUrl}
                          />
                          {/* {third.hero_image_url ? (
                            <img
                              src={third.hero_image_url}
                              alt="Media"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <img
                              src={mediaIcon}
                              alt="Media"
                              className="object-contain"
                            />
                          )} */}
                        </div>
                        <p className="px-3 py-2 text-sm line-clamp-2 h-[30px]">
                          {third.title}
                        </p>
                      </div>
                    )}
                    {fourth && (
                      <div className="col-span-2 h-full rounded-2xl overflow-hidden border border-primary flex flex-col">
                        <div className="h-[210px] bg-f6f6f6 flex justify-center items-center overflow-hidden">
                          <MediaPreview
                            imageUrl={fourth.imageUrl}
                            videoUrl={fourth.videoUrl}
                          />
                          {/* {fourth.hero_image_url ? (
                            <img
                              src={fourth.hero_image_url}
                              alt="Media"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <img
                              src={mediaIcon}
                              alt="Media"
                              className="object-contain"
                            />
                          )} */}
                        </div>
                        <p className="px-3 py-2 text-sm line-clamp-2 h-[30px]">
                          {fourth.title}
                        </p>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      )}

      {bentoStyle == "2H2H" && (
        <Swiper spaceBetween={30} slidesPerView={2} className="!px-1">
          {Array.from({ length: Math.ceil(newsData.length / 2) }).map(
            (_, groupIndex) => {
              const start = groupIndex * 2;
              const items = newsData.slice(start, start + 2);

              return (
                <SwiperSlide key={groupIndex}>
                  <div className="flex flex-col gap-2 h-full">
                    {items.map((item: any) => {
                      const { id, imageUrl, videoUrl, title } =
                        getItemProps(item);
                      return (
                        <div
                          key={id}
                          className="h-[116px] rounded-2xl overflow-hidden border border-primary flex flex-col"
                        >
                          <div className="flex-1 bg-f6f6f6 flex justify-center items-center overflow-hidden">
                            <MediaPreview
                              imageUrl={imageUrl}
                              videoUrl={videoUrl}
                            />
                            {/* {item.hero_image_url ? (
                              <img
                                src={item.hero_image_url}
                                alt="Media"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <img src={mediaIcon} alt="Media" className="" />
                            )} */}
                          </div>
                          <p className="px-2 py-1 text-sm/4 line-clamp-2 h-[22px]">
                            {/* {item.title} */}
                            {title}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      )}

      {bentoStyle == "2H2H2H" && (
        <Swiper spaceBetween={30} slidesPerView={3} className="!px-1">
          {Array.from({ length: Math.ceil(newsData.length / 2) }).map(
            (_, groupIndex) => {
              const start = groupIndex * 2;
              const items = newsData.slice(start, start + 2);

              return (
                <SwiperSlide key={groupIndex}>
                  <div className="flex flex-col gap-2 h-full">
                    {items.map((item: any) => {
                      const { id, imageUrl, videoUrl, title } =
                        getItemProps(item);
                      return (
                        <div
                          key={id}
                          className="h-[116px] rounded-2xl overflow-hidden border border-primary flex flex-col"
                        >
                          <div className="flex-1 bg-f6f6f6 flex justify-center items-center overflow-hidden">
                            <MediaPreview
                              imageUrl={imageUrl}
                              videoUrl={videoUrl}
                            />
                            {/* {item.hero_image_url ? (
                              <img
                                src={item.hero_image_url}
                                alt="Media"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <img src={mediaIcon} alt="Media" className="" />
                            )} */}
                          </div>
                          <p className="px-2 py-1 text-sm/4 line-clamp-2 h-[22px]">
                            {/* {item.title} */}
                            {title}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      )}

      {bentoStyle === "1V3H" && newsData.length > 0 && (
        <div className="grid grid-cols-5 gap-4 h-60">
          {getItemProps(newsData[0]) && (
            <div className="col-span-3 h-full rounded-2xl overflow-hidden border border-primary flex flex-col">
              <div className="h-[210px] bg-f6f6f6 flex justify-center items-center overflow-hidden">
                <MediaPreview
                  imageUrl={getItemProps(newsData[0]).imageUrl}
                  videoUrl={getItemProps(newsData[0]).videoUrl}
                />
              </div>
              <p className="px-3 py-2 text-sm line-clamp-2 h-[30px]">
                {getItemProps(newsData[0]).title}
              </p>
            </div>
          )}

          <div className="col-span-2 h-60 overflow-hidden">
            <Swiper
              direction="vertical"
              spaceBetween={8}
              slidesPerView={2}
              allowTouchMove={true}
              className="h-full !pb-12"
            >
              {newsData.slice(1).map((item: any, idx: number) => {
                const parsed = getItemProps(item);
                return (
                  <SwiperSlide key={parsed.id || idx}>
                    <div className="h-full rounded-2xl overflow-hidden border border-primary flex flex-col">
                      <div className="h-[60px] bg-f6f6f6 flex justify-center items-center overflow-hidden">
                        <MediaPreview
                          imageUrl={parsed.imageUrl}
                          videoUrl={parsed.videoUrl}
                        />
                      </div>
                      <p className="px-2 py-1 text-xs line-clamp-2 h-[40px]">
                        {parsed.title}
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      )}

      {bentoStyle === "2U1D" && newsData.length > 0 && (
        <Swiper spaceBetween={16} slidesPerView={2} className="!px-1">
          {Array.from({ length: Math.ceil(newsData.length / 3) }).map(
            (_, groupIndex) => {
              const baseIndex = groupIndex * 3;
              const topItems = newsData.slice(baseIndex, baseIndex + 2); // First 2 items
              const bottomItem = newsData[baseIndex + 2]; // 3rd item

              return (
                <SwiperSlide key={groupIndex}>
                  <div className="flex flex-col gap-3 h-60">
                    {/* Top row: 2 items side by side */}
                    <div className="h-[114px] grid grid-cols-2 gap-3">
                      {topItems.map((item: any) => {
                        const { id, imageUrl, videoUrl, title } =
                          getItemProps(item);
                        return (
                          <div
                            key={id}
                            className="h-full rounded-2xl overflow-hidden border border-primary flex flex-col"
                          >
                            <div className="h-2/3 flex-1 bg-f6f6f6 flex justify-center items-center overflow-hidden">
                              <MediaPreview
                                imageUrl={imageUrl}
                                videoUrl={videoUrl}
                              />
                            </div>
                            <p className="px-2 py-1 text-xs line-clamp-2 h-2/6">
                              {title}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom row: 1 item full width */}
                    {bottomItem && (
                      <div className="h-[114px]">
                        {(() => {
                          const { id, imageUrl, videoUrl, title } =
                            getItemProps(bottomItem);
                          return (
                            <div
                              key={id}
                              className="h-full rounded-2xl overflow-hidden border border-primary flex flex-col"
                            >
                              <div className="h-2/3 flex-1 bg-f6f6f6 flex justify-center items-center overflow-hidden">
                                <MediaPreview
                                  imageUrl={imageUrl}
                                  videoUrl={videoUrl}
                                />
                              </div>
                              <p className="px-2 py-1 text-xs line-clamp-2 h-2/6">
                                {title}
                              </p>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      )}
    </>
  );
};

export default NewsBentoStyles;
