import React, { useEffect, useRef, useState } from "react";

type CustomRangeProps = {
  min?: number;
  max?: number;
  value: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
};

const CustomRange = ({
  min = -180,
  max = 180,
  value,
  step = 1,
  onChange,
  label = "Adjust",
}: CustomRangeProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.offsetWidth);
      }
    });

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const position = ((value - min) / (max - min)) * trackWidth;
  const centerPosition = ((0 - min) / (max - min)) * trackWidth;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const isLeft = position < centerPosition;
  const fillLeft = isLeft ? position : centerPosition;
  const fillWidth = Math.abs(position - centerPosition);

  return (
    <div className="w-full mt-4">
      <label className="block text-sm font-medium mb-8 text-black">{label}</label>
      <div className="relative w-full h-6">
        {/* Track background */}
        <div
          ref={trackRef}
          className="absolute top-1/2 -translate-y-1/2 w-full h-[4px] bg-gray-300 rounded"
        />

        {/* Custom black fill from center to current position */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[4px] bg-black rounded"
          style={{
            left: `${fillLeft}px`,
            width: `${fillWidth}px`,
          }}
        />

        {/* Static black dot at center (0°) */}
        <div
          className="absolute top-2 -translate-y-1/2 w-[8px] h-[10px] rounded-full bg-black"
          style={{ left: `${centerPosition}px`, transform: "translateX(-50%)" }}
        />

        {/* Moving vertical bar | */}
        <div
          className="absolute -top-2 -translate-y-1/2 bottom-0 w-[2px] bg-black"
          style={{ left: `${position}px`, transform: "translateX(-50%)" }}
        />

        {/* Range input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="absolute w-full h-6  appearance-none bg-transparent z-10 cursor-pointer"
        />

        {/* Degree label */}
        <div
          className="absolute -top-6 text-xs text-black"
          style={{ left: `${position}px`, transform: "translateX(-50%)" }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export default CustomRange;
