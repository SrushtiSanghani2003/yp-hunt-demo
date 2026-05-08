import { concatImgURL, formatUTCDate } from "../../config/function";

type ArticleHeroMediaPreviewProps = {
  data?: any;
  publishDate?: any;
};

const ArticleHeroMediaPreview = ({
  data,
  publishDate,
}: ArticleHeroMediaPreviewProps) => {
  const mediaType = data?.hero_media_type;
  const videoSource = data?.hero_video_source;
  const imageUrl = data?.hero_image_url;
  const videoUrl = data?.hero_video_url;
  const sponsorImage = data?.sponsor_logo_url;
  const sponsorName = data?.sponsor_name;
  //   const sponsorURL = data?.sponsor_url;
  const title = data?.title;
  const description = data?.description;

  return (
    <div className="mt-3 h-[600px] relative rounded-xl overflow-hidden">
      <div className="w-full h-full rounded-20 relative overflow-hidden">
        {mediaType === "image" && imageUrl && (
          <img
            src={concatImgURL(imageUrl)}
            alt={"Hero Image"}
            className="object-cover rounded-xl w-full h-full align-middle border-2 border-black"
          />
        )}
        {mediaType === "video" && videoSource === "native" && videoUrl && (
          <video
            className="absolute object-cover w-full h-full z-0 rounded-xl border-2 border-black"
            src={concatImgURL(videoUrl)}
            autoPlay
            loop
            muted
          />
        )}
      </div>
      {sponsorImage && (
        <div className="absolute right-[5%] bottom-[5%]">
          {sponsorName && <p className="text-lg mb-1">{sponsorName}</p>}
          <div className="px-4 py-2 bg-f6f6f6 rounded-xl flex items-center justify-center">
            <img
              src={concatImgURL(sponsorImage)}
              alt="Sponsor"
              className="h-auto w-28 object-cover rounded-md px-2 py-1"
            />
          </div>
        </div>
      )}
      <div className="h-1/3 border-black border-t-2 border-r-2 rounded-bl-xl rounded-tr-xl absolute bottom-0 left-0 max-w-md w-full bg-f6f6f6">
        <div className="p-4 relative h-full heroMediaCurves">
          {publishDate && (
            <span className="inline-block mb-2 text-sm text-black font-normal">
              {formatUTCDate(publishDate)}
            </span>
          )}
          {title && (
            <p className="text-2xl/7 line-clamp-3 text-black uppercase font-extrabold mb-2">
              {title}
            </p>
          )}
          {description && (
            <p className="text-xs line-clamp-3 text-black uppercase font-light">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleHeroMediaPreview;
