import { useState, useEffect } from "react";

export const useImageDimensions = (url: string) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!url) return;

    const img = new Image();
    img.src = url;

    img.onload = () => {
      setDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
  }, [url]);

  return dimensions;
};
