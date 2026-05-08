import { concatImgURL } from "../../../config/function";

type ImageBlockPreviewProps = {
  data?: any;
};

const ImageBlockPreview = ({ data }: ImageBlockPreviewProps) => {
  const imageURL = data?.content?.imgUrl;
  const sponsorImageUrl = data?.content?.more?.sponsor?.sponsor_img;
  const buttonText = data?.content?.more?.cta?.button_label;
  const title = data?.content?.more?.title;
  const description = data?.content?.more?.description;

  return (
    <div className="my-4">
      <div className="h-96 w-full relative">
        <img
          src={concatImgURL(imageURL)}
          alt={"Image Block"}
          className="w-full h-full rounded-xl object-cover"
          loading="lazy"
        />
        {sponsorImageUrl && (
          <div className="absolute bottom-2 right-3 z-20">
            <img
              src={concatImgURL(sponsorImageUrl)}
              alt="Sponsor"
              className="h-14 w-auto object-contain rounded-md px-2 py-1"
            />
          </div>
        )}
        <div className="absolute left-4 bottom-6 z-20">
          {title && (
            <h2 className="text-lg md:text-xl font-semibold text-white drop-shadow-md line-clamp-2 mb-1">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-white line-clamp-3 text-sm max-w-xl">
              {description}
            </p>
          )}
          {buttonText && (
            <button className="mt-2 px-2 text-sm py-1 border-0.5 text-black hover:text-white hover:bg-black hover:border-black transition-all duration-300 bg-white rounded-2xl font-medium">
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageBlockPreview;
