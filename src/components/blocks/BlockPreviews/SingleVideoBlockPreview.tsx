type SingleVideoBlockPreviewProps = {
  data?: any;
};

const SingleVideoBlockPreview = ({ data }: SingleVideoBlockPreviewProps) => {
  const videoType = data?.content?.video_type;
  const videoUrl = data?.content?.video_url;
  const videoId = data?.content?.video_id;
//   const thumbnailUrl = data?.content?.thumbnail_url;

  return (
    <div className="my-4">
      <div className="h-[400px]">
        {videoType === "youtube" && (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            className="rounded-xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        {videoType === "native" && (
          <video controls className="rounded-xl h-[400px] w-full object-cover">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {/* {videoType == "native" && thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt="video thumbnail"
            className="w-full h-full object-cover"
          />
        )} */}
      </div>
    </div>
  );
};

export default SingleVideoBlockPreview;
