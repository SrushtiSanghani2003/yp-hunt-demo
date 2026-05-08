import { useRef, useState } from "react";
import Button from "../ui/button";
import { chevronLeft, closeIcon } from "../../icons";
import { concatCropUrl, dataURLtoFile } from "../../config/function";

interface Props {
  videoUrl: string | null;
  onBack: () => void;
  setThumbnailFileObj?: (file: string | File) => void;
}

const VideoThumbnailGenerator = ({
  videoUrl,
  onBack,
  setThumbnailFileObj,
}: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [autoSnapOption, setAutoSnapOption] = useState<string>("");
  const [isAutoSnapping, setIsAutoSnapping] = useState(false);
  const [isImageShow, setIsImageShow] = useState(false);
  const [selectedThumbnail, setSelectedThumbanail] = useState<
    Record<string, any>
  >({
    file: null,
    url: "",
    index: null,
  });

  //   const takeSnapshot = () => {
  //     if (!videoRef.current || !canvasRef.current) return;
  //     const video = videoRef.current;
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext("2d");

  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;
  //     ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

  //     const imgUrl = canvas.toDataURL("image/png");
  //     setThumbnails((prev) => [...prev, imgUrl]);
  //   };

  const takeSnapshot = (): File | null => {
    if (!videoRef.current || !canvasRef.current) return null;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/png");
    const file = dataURLtoFile(dataUrl, `thumbnail-${Date.now()}.png`);

    // Keep preview
    setThumbnails((prev) => [...prev, dataUrl]);

    return file;
  };

  const handleRemoveThumbnail = (index: number) => {
    setThumbnails((prev) => prev.filter((_, i) => i !== index));
  };

  //   const handleAutoSnap = async () => {
  //     if (!videoRef.current || !autoSnapOption) return;
  //     const video = videoRef.current;
  //     const duration = video.duration;

  //     let interval = 1;
  //     let totalShots = 0;

  //     if (autoSnapOption.endsWith("sec")) {
  //       interval = parseInt(autoSnapOption);
  //       totalShots = Math.floor(duration / interval);
  //     } else if (autoSnapOption.includes("photos")) {
  //       totalShots = parseInt(autoSnapOption);
  //       interval = duration / totalShots;
  //     }

  //     setThumbnails([]);
  //     setIsAutoSnapping(true);

  //     for (let i = 0; i < totalShots; i++) {
  //       await new Promise<void>((resolve) => {
  //         const seekHandler = () => {
  //           takeSnapshot();
  //           resolve();
  //         };

  //         video.addEventListener("seeked", seekHandler, { once: true });
  //         video.currentTime = i * interval;
  //       });
  //     }

  //     setIsAutoSnapping(false);
  //   };

  const handleAutoSnap = async () => {
    if (!videoRef.current || !autoSnapOption) return;
    const video = videoRef.current;
    const duration = video.duration;

    let interval = 1;
    let totalShots = 0;

    if (autoSnapOption.endsWith("sec")) {
      interval = parseInt(autoSnapOption);
      totalShots = Math.floor(duration / interval);
    } else if (autoSnapOption.includes("photos")) {
      totalShots = parseInt(autoSnapOption);
      interval = duration / totalShots;
    } else if (autoSnapOption.endsWith("%")) {
      const percent = parseFloat(autoSnapOption.replace("%", ""));
      const totalPercentShots = Math.floor(100 / percent);
      interval = duration / totalPercentShots;
      totalShots = totalPercentShots;
    }

    setThumbnails([]);
    setIsAutoSnapping(true);

    for (let i = 0; i < totalShots; i++) {
      await new Promise<void>((resolve) => {
        const seekHandler = () => {
          takeSnapshot();
          resolve();
        };

        video.addEventListener("seeked", seekHandler, { once: true });
        video.currentTime = i * interval;
      });
    }

    setIsAutoSnapping(false);
  };

  const handleThumbClick = (url: string, index: number) => {
    setIsImageShow(true);
    const file = dataURLtoFile(url, `thumbnail-${Date.now()}.png`);
    setSelectedThumbanail({
      file: file,
      url: url,
      index: index,
    });
    setThumbnailFileObj?.(file);
  };

  const handleClear = () => {
    setThumbnails([]);
    setIsImageShow(false);
  };

  return (
    <>
      <Button
        text="Back"
        icon={chevronLeft}
        className="md:px-3 mb-2"
        onClick={onBack}
      />
      <div className="space-y-4">
        <div className="relative">
          <video
            ref={videoRef}
            src={concatCropUrl(videoUrl || "")}
            className="w-full object-cover rounded-2xl"
            crossOrigin="anonymous"
            controls
          />
          {isImageShow && (
            <>
              <img
                src={selectedThumbnail.url}
                className="absolute top-0 w-full h-full object-cover rounded-xl"
              />
              <Button
                icon={closeIcon}
                backgroundColor="white"
                className="absolute top-0 right-0 md:p-1"
                onClick={() => setIsImageShow(false)}
              />
            </>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />

        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={takeSnapshot}
              className="px-4 py-1 bg-black text-white rounded"
            >
              Snap
            </button>

            <select
              className="px-1 py-1 rounded border-0.5 w-36  border-primary"
              value={autoSnapOption}
              onChange={(e) => setAutoSnapOption(e.target.value)}
            >
              <option value="">Auto Snap Option</option>
              <option value="1 sec">Every 1 sec</option>
              <option value="5 sec">Every 5 sec</option>
              <option value="10 sec">Every 10 sec</option>
              <option value="5 photos">5 Photos</option>
              <option value="10 photos">10 Photos</option>
              <option value="2%">Every 2%(50)</option>
              <option value="4%">Every 4%(25)</option>
              <option value="5%">Every 5%(20)</option>
              <option value="6.25%">Every 6.25%(16)</option>
              <option value="10%">Every 10%(10)</option>
            </select>

            <button
              onClick={handleAutoSnap}
              disabled={!autoSnapOption || isAutoSnapping}
              className="px-4 py-1 bg-black text-white rounded disabled:opacity-50"
            >
              {isAutoSnapping ? "Generating..." : "Generate"}
            </button>
          </div>
          <div>
            <Button
              text="Clear All"
              backgroundColor="transparent"
              className="md:p-0"
              onClick={handleClear}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 h-96 overflow-auto auto-rows-[96px]">
          {thumbnails.map((thumb, idx) => (
            <div key={idx} className="relative w-full h-full">
              <div className="group h-full">
                <img
                  src={thumb}
                  alt={`thumbnail-${idx}`}
                  className={`w-full h-full border-0.5 cursor-pointer rounded-2xl ${
                    selectedThumbnail.index === idx
                      ? "border-blue-600 border-2 shadow-xl "
                      : "border-primary"
                  }`}
                  onClick={() => handleThumbClick(thumb, idx)}
                />
                <Button
                  onClick={() => handleRemoveThumbnail(idx)}
                  className="md:p-1 absolute top-1 right-1 text-white text-xs px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  icon={closeIcon}
                  backgroundColor="white"
                  imageclassName="w-4 h-4"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoThumbnailGenerator;
