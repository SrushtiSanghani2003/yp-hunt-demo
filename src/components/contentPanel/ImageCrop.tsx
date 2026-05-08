import "react-advanced-cropper/dist/style.css";
import {
  CircleStencil,
  Cropper,
  ImageRestriction,
  RectangleStencil,
  type CropperRef,
} from "react-advanced-cropper";
import { useRef, useState } from "react";
import {
  aspect1to1,
  aspect1to2,
  aspect3to4,
  aspect4to3,
  aspect9to16,
  brightnessicon,
  chevronLeft,
  circle,
  contrast,
  cropfeatures,
  cropimgicon,
  flipHorizontal,
  flipVertical,
  freeaspect,
  hue,
  imageediticon,
  phonecropicon,
  recatangle,
  // reset,
  rotateLeft,
  rotateRight,
  saturation,
} from "../../icons";
import Input from "../ui/input/Input";
import AngleDial from "./AngleDial";
import Button from "../ui/button";
import CustomRange from "./CustomRange";
import { concatCropUrl } from "../../config/function";
// import { concatImgURL } from "../../config/function";

type ImageCropProps = {
  imageUrl: string;
  setFileObj: (file: File | string) => void;
  disableOnCrop?: () => void;
};
const aspectRatios = [
  { label: "Free", value: undefined, icon: freeaspect },
  { label: "1:1", value: 1, icon: aspect1to1 },
  { label: "1:2", value: 1 / 2, icon: aspect1to2 },
  { label: "4:3", value: 4 / 3, icon: aspect4to3 },
  { label: "9:16", value: 9 / 16, icon: aspect9to16 },
  { label: "3:4", value: 3 / 4, icon: aspect3to4 },
  // { label: "Custom", value: "custom" },
];

const stencilTypes = [
  { label: "Rectangle", value: "rec", icon: recatangle },
  { label: "Circle", value: "cir", icon: circle },
];

const ImageCrop = ({ imageUrl, setFileObj, disableOnCrop }: ImageCropProps) => {
  const cropperRef = useRef<CropperRef>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | undefined | string>(
    undefined,
  );
  const [customLimits, setCustomLimits] = useState({
    minWidth: "",
    maxWidth: "",
    minHeight: "",
    maxHeight: "",
  });
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
  });

  const filterStyle = `
  brightness(${filters.brightness}%)
  contrast(${filters.contrast}%)
  saturate(${filters.saturation}%)
  hue-rotate(${filters.hue}deg)
`;

  const [stencilType, setStencilType] = useState("rec");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [rotationCount, setRotationCount] = useState(0);
  const [isFlippedX, setIsFlippedX] = useState(false);
  const [isFlippedY, setIsFlippedY] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [cropFeatures, setCropFeatures] = useState<string>("crop");
  const [showOnly, setShowOnly] = useState<string>("Brightness");
  const [croppedImagePreview, setCroppedImagePreview] = useState("");
  const handleDeltaRotation = (delta: number) => {
    if (!delta) return;
    const cropper = cropperRef.current;
    if (cropper) {
      cropper.rotateImage(delta);
    }
  };

  const handleAngleDisplay = (angle: number) => {
    setRotationAngle(angle);
  };

  const dataURLToFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handleCrop = () => {
    const cropper = cropperRef.current;
    if (!cropper) return;

    const baseCanvas = cropper.getCanvas(); // includes rotation, flip, crop
    if (!baseCanvas) return;

    const ctx = baseCanvas.getContext("2d");
    if (!ctx) return;

    const { brightness, contrast, saturation, hue } = filters;
    const isCircle = stencilType === "cir";

    // First apply filters to a filtered canvas
    const filteredCanvas = document.createElement("canvas");
    filteredCanvas.width = baseCanvas.width;
    filteredCanvas.height = baseCanvas.height;

    const filteredCtx = filteredCanvas.getContext("2d");
    if (!filteredCtx) return;

    filteredCtx.filter = `
    brightness(${brightness}%)
    contrast(${contrast}%)
    saturate(${saturation}%)
    hue-rotate(${hue}deg)
  `.trim();

    // Draw the baseCanvas (already transformed) into the filtered canvas
    filteredCtx.drawImage(baseCanvas, 0, 0);

    let finalCanvas = filteredCanvas;

    // 🔵 Clip into a circle if needed
    if (isCircle) {
      const size = Math.min(filteredCanvas.width, filteredCanvas.height);
      const circleCanvas = document.createElement("canvas");
      circleCanvas.width = size;
      circleCanvas.height = size;

      const circleCtx = circleCanvas.getContext("2d");
      if (!circleCtx) return;

      // Ensure no fill, only transparent background
      circleCtx.clearRect(0, 0, size, size);

      // Create circular clipping path
      circleCtx.beginPath();
      circleCtx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      circleCtx.closePath();
      circleCtx.clip();

      // Draw the center area of the filtered canvas into the circle
      const offsetX = (filteredCanvas.width - size) / 2;
      const offsetY = (filteredCanvas.height - size) / 2;

      circleCtx.drawImage(filteredCanvas, -offsetX, -offsetY);

      finalCanvas = circleCanvas;
    }

    // Export final image
    const dataUrl = finalCanvas.toDataURL("image/png");
    setCroppedImagePreview(dataUrl);
    const file = dataURLToFile(
      dataUrl,
      isCircle ? "cropped-circle.png" : "cropped-image.png",
    );

    setFileObj(file);
    // uploadImage(file);
  };

  const rotate = (side: string) => {
    const cropper = cropperRef.current;
    if (cropper) {
      const delta = side === "right" ? 90 : -90;
      cropper.rotateImage(delta);
      setRotationCount((prev) => prev + delta);
    }
  };

  const flip = (vertical: boolean, horizontal: boolean) => {
    const cropper = cropperRef.current;
    if (cropper) {
      cropper.flipImage(horizontal, vertical);
      if (horizontal) setIsFlippedX((prev) => !prev);
      if (vertical) setIsFlippedY((prev) => !prev);
    }
  };

  const handleReset = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      cropper.rotateImage(-rotationCount);
      cropper.rotateImage(-rotationAngle);

      if (isFlippedX) cropper.flipImage(true, false);
      if (isFlippedY) cropper.flipImage(false, true);
    }
    setRotationAngle(0);
    setRotationCount(0);
    setIsFlippedX(false);
    setIsFlippedY(false);

    setFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
    });
    setAspectRatio(undefined);
    setStencilType("rec");
    setCustomLimits({
      minWidth: "",
      maxWidth: "",
      minHeight: "",
      maxHeight: "",
    });

    setResetKey((prev) => prev + 1);
  };

  // useEffect(() => {
  // }, [imageUrl]);

  return (
    <div className="overflow-hidden">
      <style>
        {`
          .custom-image img {
            filter: ${filterStyle};
          }
        `}
      </style>
      {croppedImagePreview ? (
        <>
          <Button
            text="Back"
            icon={chevronLeft}
            className="md:px-3 mb-2"
            onClick={() => setCroppedImagePreview("")}
          />
          <img
            src={croppedImagePreview}
            alt="cropped img"
            className="max-w-full h-auto rounded shadow"
          />
        </>
      ) : (
        <>
          <Button
            text="Back"
            icon={chevronLeft}
            // backgroundColor="transparent"
            className="px-3 mb-4"
            onClick={disableOnCrop}
          />
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Button
                icon={cropimgicon}
                className={`p-3 hover:bg-gray-200 border ${
                  cropFeatures === "crop" ? "bg-gray-300" : ""
                }`}
                backgroundColor="transparent"
                onClick={() => setCropFeatures("crop")}
              />
              <Button
                icon={phonecropicon}
                className={`p-3 hover:bg-gray-200 border ${
                  isMenuOpen ? "cursor-not-allowed" : "cursor-pointer"
                } ${cropFeatures === "phone" ? "bg-gray-200" : ""}`}
                backgroundColor="transparent"
                onClick={() => setCropFeatures("phone")}
                disabled={isMenuOpen}
              />
              <Button
                icon={imageediticon}
                className={`p-3 hover:bg-gray-200 border ${
                  isMenuOpen ? "cursor-not-allowed" : "cursor-pointer"
                } ${cropFeatures === "edit" ? "bg-gray-200" : ""}`}
                backgroundColor="transparent"
                onClick={() => setCropFeatures("edit")}
                disabled={isMenuOpen}
              />
            </div>
            <div>
              <Button
                icon={cropfeatures}
                className={`p-3 border ${
                  cropFeatures !== "crop"
                    ? " opacity-50 cursor-not-allowed"
                    : "bg-gray-300"
                }`}
                backgroundColor="transparent"
                onClick={
                  cropFeatures === "crop"
                    ? () => setIsMenuOpen(!isMenuOpen)
                    : undefined
                }
                disabled={cropFeatures !== "crop"}
              />
            </div>
          </div>

          <div className="relative h-96 flex items-center justify-center bg-gray-100 rounded-xl">
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black" />
              </div>
            )}
            <Cropper
              ref={cropperRef}
              src={concatCropUrl(imageUrl)}
              crossOrigin="anonymous"
              // src={"http://localhost:5173/src/assets/auth-image.png"}
              className="cropper custom-image h-96 object-cover shadow-md"
              stencilComponent={
                stencilType == "rec" ? RectangleStencil : CircleStencil
              }
              transformImage={{ adjustStencil: true }}
              imageRestriction={ImageRestriction.fitArea}
              maxHeight={
                aspectRatio == "custom" && customLimits.maxHeight
                  ? parseInt(customLimits.maxHeight)
                  : undefined
              }
              maxWidth={
                aspectRatio == "custom" && customLimits.maxWidth
                  ? parseInt(customLimits.maxWidth)
                  : undefined
              }
              minHeight={
                aspectRatio == "custom" && customLimits.minHeight
                  ? parseInt(customLimits.minHeight)
                  : undefined
              }
              minWidth={
                aspectRatio == "custom" && customLimits.minWidth
                  ? parseInt(customLimits.minWidth)
                  : undefined
              }
              stencilProps={{
                movable: true,
                resizable: true,
                aspectRatio: aspectRatio,
              }}
              onReady={() => setIsImageLoaded(true)}
              onError={() => setIsImageLoaded(false)}
            />
            <div className="flex items-center absolute top-2 right-2 justify-end mb-2">
              {/* <Button
              icon={reset}
              backgroundColor="white"
              textSize="text-sm"
              imageclassName="w-8 h-8"
              className="border-primary border md:px-1 md:py-1"
              onClick={handleReset}
            /> */}
            </div>

            {/* <div
            className={`${
              isMenuOpen ? "open" : ""
            } mb-4 bg-black/50 backdrop-blur-sm absolute h-full top-0 p-4 rounded-xl shadow-md`}
          > */}
            <div
              className={`${
                isMenuOpen ? "left-0" : "left-[120%]"
              } mb-4 bg-black/40 transition-all duration-500 backdrop-blur-sm absolute h-full top-0 md:p-6 p-2 rounded-xl shadow-md`}
            >
              <div className="md:mt-4 mt-2">
                <p className="text-sm text-white font-medium mb-2">
                  Aspect Ratio:
                </p>
                <div className="flex flex-wrap md:justify-between md:gap-2 gap-3">
                  {aspectRatios.map((ratio) => (
                    <button
                      key={ratio.label}
                      onClick={() => setAspectRatio(ratio.value)}
                    >
                      <img
                        src={ratio.icon}
                        alt=""
                        className={`hover:scale-110 transition-transform md:w-full w-8  ${
                          aspectRatio === ratio.value ? "bg-black" : ""
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:mt-4 mt-2">
                <p className="text-sm text-white font-medium mb-2">Shape:</p>
                <div className="flex md:items-center   md:gap-10 gap-4">
                  {stencilTypes.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setStencilType(item.value)}
                      className="text-white h-full text-sm font-medium"
                    >
                      <img
                        src={item.icon}
                        alt=""
                        className={`hover:scale-110 transition-transform    ${
                          item.value === stencilType
                            ? item.value === "cir"
                              ? "bg-black rounded-full "
                              : "bg-black"
                            : ""
                        }`}
                      />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:mt-5 mt-2 flex items-end gap-5">
                <Input
                  type="number"
                  label="Min. Width"
                  inputCss="md:py-1 md:pr-0 md:text-sm text-white  md:rounded-none  rounded-none bg-transparent border-t-0 border-l-0 border-r-0 border-b-2 border-white"
                  placeholder="0"
                  labelCss="md:text-sm font-normal text-white"
                  value={customLimits.minWidth}
                  onChange={(e) =>
                    setCustomLimits({
                      ...customLimits,
                      minWidth: e.target.value,
                    })
                  }
                />
                <Input
                  type="number"
                  inputCss="md:py-1 md:pr-0 md:text-sm  text-white  md:rounded-none rounded-none bg-transparent border-t-0 border-l-0 border-r-0 border-b-2 border-white"
                  label="Max. Width"
                  placeholder="0"
                  labelCss="md:text-sm font-normal text-white"
                  value={customLimits.maxWidth}
                  onChange={(e) =>
                    setCustomLimits({
                      ...customLimits,
                      maxWidth: e.target.value,
                    })
                  }
                />
                <Input
                  type="number"
                  label="Min. Height"
                  inputCss="md:py-1 md:pr-0 md:text-sm  text-white md:rounded-none rounded-none bg-transparent border-t-0 border-l-0 border-r-0 border-b-2 border-white"
                  placeholder="0"
                  labelCss="md:text-sm font-normal text-white"
                  value={customLimits.minHeight}
                  onChange={(e) =>
                    setCustomLimits({
                      ...customLimits,
                      minHeight: e.target.value,
                    })
                  }
                />
                <Input
                  type="number"
                  labelCss="md:text-sm font-normal text-white"
                  inputCss="md:py-1 md:pr-0 md:text-sm  text-white md:rounded-none rounded-none bg-transparent border-t-0 border-l-0 border-r-0 border-b-2 border-white"
                  label="Max. Height"
                  placeholder="0"
                  value={customLimits.maxHeight}
                  onChange={(e) =>
                    setCustomLimits({
                      ...customLimits,
                      maxHeight: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            {/* </div> */}
          </div>

          {cropFeatures === "phone" && (
            <div className="flex  items-end lg:gap-3 gap-1 mt-3">
              <button
                onClick={() => flip(false, true)}
                className="p-2 rounded-2xl bg-black  text-white text-sm"
              >
                <img src={flipHorizontal} />
              </button>
              <button
                onClick={() => rotate("right")}
                className="p-2 rounded-2xl bg-black  text-white text-sm"
              >
                <img src={rotateRight} />
              </button>
              <div className="max-w-xs mx-auto">
                <p className="text-center font-medium">
                  {rotationAngle.toFixed(1)}&deg;
                </p>
                <AngleDial
                  onAngleChange={handleAngleDisplay}
                  onDeltaChange={handleDeltaRotation}
                  resetKey={resetKey}
                />
              </div>
              <button
                onClick={() => rotate("left")}
                className="p-2 rounded-2xl bg-black  text-white text-sm"
              >
                <img src={rotateLeft} />
              </button>
              <button
                onClick={() => flip(true, false)}
                className="p-2 rounded-2xl bg-black  text-white text-sm"
              >
                <img src={flipVertical} />
              </button>
            </div>
          )}

          {cropFeatures === "edit" && (
            <>
              {["brightness", "contrast", "saturation", "hue"].map((key) =>
                showOnly?.toLowerCase() === key.toLowerCase() ||
                (showOnly === undefined && key === "brightness") ? (
                  <CustomRange
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    min={key === "hue" ? -180 : -100}
                    max={key === "hue" ? 180 : 100}
                    value={
                      key === "hue"
                        ? filters.hue
                        : filters[key as keyof typeof filters] - 100
                    } // normalize for slider view
                    onChange={(val) =>
                      setFilters((prev) => ({
                        ...prev,
                        [key]: key === "hue" ? val : val + 100, // shift back for CSS
                      }))
                    }
                  />
                ) : null,
              )}

              <div className="flex items-center justify-evenly gap-3 mt-7">
                {[
                  {
                    label: "Brightness",
                    key: "brightness",
                    icon: brightnessicon,
                  },
                  { label: "Contrast", key: "contrast", icon: contrast },
                  {
                    label: "Saturation",
                    key: "saturation",
                    icon: saturation,
                  },
                  { label: "Hue", key: "hue", icon: hue },
                ].map(({ label, key }) => (
                  <Button
                    key={key}
                    backgroundColor="white"
                    icon={
                      key === "brightness"
                        ? brightnessicon
                        : key === "contrast"
                          ? contrast
                          : key === "saturation"
                            ? saturation
                            : hue
                    }
                    className={`p-3 hover:bg-gray-200 border ${
                      showOnly === label ? "bg-gray-300" : ""
                    }`}
                    onClick={() => setShowOnly(label)}
                  />
                ))}
              </div>
            </>
          )}
          <div className="mt-8 flex justify-end gap-3">
            <button
              // onClick={onClose}
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-gray-200 text-sm"
            >
              Reset
            </button>
            <button
              onClick={handleCrop}
              // onClick={() => setCroppedImageView(true)}
              className="px-4 py-2 rounded-xl bg-black  text-white text-sm"
            >
              Apply
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCrop;
