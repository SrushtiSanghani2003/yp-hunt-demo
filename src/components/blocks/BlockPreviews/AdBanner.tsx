import { concatImgURL } from "../../../config/function";

type AdBannerProps = {
  data: any;
};

const AdBanner = ({ data }: AdBannerProps) => {
  const imageUrl = data?.content.nativeImgUrl;
  return (
    <div className="my-6">
      <div className="w-full flex justify-center items-center rounded-xl">
        <img
          src={concatImgURL(imageUrl)}
          alt={"Ad Banner"}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default AdBanner;
