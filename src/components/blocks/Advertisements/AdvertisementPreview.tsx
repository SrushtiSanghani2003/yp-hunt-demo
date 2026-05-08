import { concatImgURL } from "../../../config/function";
import Button from "../../ui/button";

type Props = {
  data: any;
};

const AdvertisementPreview = ({ data }: Props) => {
  const imageUrl = data?.imageUrl || "";
  const mediaAlign = data?.mediaAlignment || "center";
  const mediaType = data?.mediaType || "";
  const videoSource = data?.videoSource || "";
  const videoUrl = data?.videoUrl || "";
  const title = data?.more?.title || "";
  const description = data?.more?.description || "";
  const points = Array.isArray(data?.more?.bullet) ? data.more.bullet : [];
  const sponsors = Array.isArray(data?.more?.sponsor) ? data.more.sponsor : [];
  const buttons = Array.isArray(data?.more?.cta) ? data.more.cta : [];


  // Helper to render image or video
  const renderMedia = () => {
    if (mediaType === "video" && videoSource === "native") {
      return (
        <video
          src={concatImgURL(videoUrl)}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      );
    }

    if (mediaType === "video" && videoSource === "youtube") {
      const youtubeEmbedUrl =
        videoUrl.replace("watch?v=", "embed/") +
        (mediaAlign == "center"
          ? "?autoplay=1&mute=1&loop=1&playlist="
          : "?autoplay=0&mute=1&loop=1&playlist=") +
        videoUrl.split("v=")[1];
      return (
        <iframe
          src={youtubeEmbedUrl}
          // src={videoUrl}
          className="w-full h-full object-cover"
          allow="encrypted-media"
          allowFullScreen
        />
      );
    }

    // default image
    return (
      <img
        src={concatImgURL(imageUrl)}
        alt="Ad Image"
        className="w-full h-full object-cover"
      />
    );
  };

  // Centered background layout
  if (mediaAlign === "center") {
    return (
      <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-black">
        {/* Background media */}
        <div className="absolute inset-0">{renderMedia()}</div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Foreground content */}
        <div className="relative z-10 text-white p-6 md:p-5 max-w-2xl flex flex-col justify-between h-full">
          {/* Sponsors */}
          {sponsors.length > 0 && (
            <div className="flex items-center gap-4 mb-3">
              {sponsors.map((sponsor: any, idx: number) => (
                <img
                  key={idx}
                  src={concatImgURL(sponsor.sponsor_img)}
                  alt={`Sponsor ${idx + 1}`}
                  className="w-20 h-auto object-contain"
                />
              ))}
            </div>
          )}

          {/* Main content */}
          <div>
            <div>
              {title && <h2 className="text-2xl font-bold mb-1">{title}</h2>}
              {description && <p className="mb-2 text-sm/4">{description}</p>}
              {points.length > 0 && (
                <ul className="ps-6 list-disc text-sm">
                  {points.map((item: any, idx: number) => (
                    <li key={idx}>{item?.value}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* CTA Buttons */}
            {buttons.length > 0 && (
              <div className="flex gap-2 mt-1">
                {buttons.map((btn: any, idx: number) => (
                  <Button
                    icon={btn.button_icon}
                    iconColor={btn.icon_color}
                    iconPosition="end"
                    key={idx}
                    text={btn.button_label}
                    backgroundColor="white"
                    textSize="text-sm"
                    className="md:py-2 px-3 md:rounded-md"
                    textWeight="text-black font-semibold"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Side-aligned layout
  const isLeft = mediaAlign === "left";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      {/* Media Left */}
      {isLeft && (
        <div className="relative w-full h-[320px] rounded-xl overflow-hidden">
          {renderMedia()}
          {/* <div className="absolute inset-0 bg-black/30" /> */}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col h-full gap-5">
        {/* Sponsors */}
        {sponsors.length > 0 && (
          <div
            className={`flex ${
              isLeft ? "justify-end" : "justify-start"
            } items-center gap-4 mb-1`}
          >
            {sponsors.map((sponsor: any, idx: number) => (
              <img
                key={idx}
                src={concatImgURL(sponsor.sponsor_img)}
                alt={`Sponsor ${idx + 1}`}
                className="w-20 h-auto object-contain"
              />
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2 mb-10 ps-5">
          {/* Main content */}
          {title && (
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
          {points.length > 0 && (
            <ul className="ps-6 list-disc text-sm text-gray-700">
              {points.map((item: any, idx: number) => (
                <li key={idx}>{item?.value}</li>
              ))}
            </ul>
          )}

          {/* CTA Buttons */}
          {buttons.length > 0 && (
            <div className="flex gap-2 mt-4">
              {buttons.map((btn: any, idx: number) => (
                <Button
                  key={idx}
                  icon={btn.button_icon}
                  iconColor={btn.icon_color}
                  iconPosition="end"
                  text={btn.button_label}
                  textSize="text-sm"
                  className="md:py-2 px-3 md:rounded-md"
                  textWeight="text-black font-semibold"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Media Right */}
      {!isLeft && (
        <div className="relative w-full h-[320px] rounded-xl overflow-hidden">
          {renderMedia()}
          {/* <div className="absolute inset-0 bg-black/30" /> */}
        </div>
      )}
    </div>
  );
};

export default AdvertisementPreview;
