import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

const MAX_ANGLE = 45;
const PIXELS_PER_DEGREE = 1;

export default function AngleDial({
  onAngleChange,
  onDeltaChange,
  resetKey,
}: {
  onAngleChange: (newAngle: number) => void;
  onDeltaChange: (delta: number) => void;
  resetKey: number;
}) {
  const x = useMotionValue(0);
  const lastAngle = useRef(0);

  const handleDrag = (_: any) => {
    const rawX = x.get();
    const rawAngle = -rawX / PIXELS_PER_DEGREE;

    // Clamp angle to -45 to 45
    const clampedAngle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, rawAngle));
    const clampedX = -clampedAngle * PIXELS_PER_DEGREE;

    // Physically clamp the dial UI to ±45°
    x.set(clampedX);

    const delta = clampedAngle - lastAngle.current;

    const goingRight = delta > 0 && lastAngle.current >= MAX_ANGLE;
    const goingLeft = delta < 0 && lastAngle.current <= -MAX_ANGLE;

    if (!goingRight && !goingLeft) {
      onDeltaChange(delta); // Rotate image
      lastAngle.current = clampedAngle;
    }

    onAngleChange(clampedAngle); // For display
  };

  const handleDragStart = () => {
    lastAngle.current = -x.get() / PIXELS_PER_DEGREE;
  };

  useEffect(() => {
    x.set(0);
    lastAngle.current = 0;
    onAngleChange(0);
  }, [resetKey]);

  return (
    <div className="relative lg:w-full md:flex flex-colw-64 w-32 h-8 flex items-center justify-center overflow-hidden">
      {/* Center Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-cyan-600 z-10" />

      {/* Draggable Lines */}
      <motion.div
        drag="x"
        dragConstraints={{
          left: -MAX_ANGLE * PIXELS_PER_DEGREE,
          right: MAX_ANGLE * PIXELS_PER_DEGREE,
        }}
        style={{ x }}
        className="flex md:gap-2 gap-1 cursor-grab"
        onDrag={handleDrag}
        onDragStart={handleDragStart}
      >
        {Array.from({ length: 45 }, (_, i) => (
          <div key={i} className="w-0.5 h-4 bg-gray-500" />
        ))}
      </motion.div>
    </div>
  );
}
