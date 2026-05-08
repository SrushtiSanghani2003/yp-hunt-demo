import React, { useEffect, useState, type MouseEvent } from "react";
import { Star } from "lucide-react";

interface RatingStarsProps {
  max?: number;
  initialRating?: number;
  onChange?: (value: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  max = 5,
  initialRating = 0,
  onChange,
}) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const calculateValue = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    return x < width / 2 ? index + 0.5 : index + 1;
  };

  const handleClick = (value: number) => {
    const newRating = value === rating ? 0 : value;
    setRating(newRating);
    onChange?.(newRating);
  };

  return (
    <div className="flex items-center gap-1 py-1">
      {Array.from({ length: max }, (_, index) => {
        const value = index + 1;
        const currentValue = hovered ?? rating;

        let fill = "none";
        if (currentValue >= value) {
          fill = "full";
        } else if (currentValue >= value - 0.5) {
          fill = "half";
        }

        return (
          <button
            key={index}
            type="button"
            onClick={(e) => handleClick(calculateValue(e, index))}
            onMouseMove={(e) => setHovered(calculateValue(e, index))}
            onMouseLeave={() => setHovered(null)}
            className="relative w-9 h-9 text-yellow-400 hover:scale-110 transition-transform"
          >
            {/* Empty star as base */}
            <Star className="w-9 h-9 stroke-gray-400" />

            {/* Half or full star overlay */}
            {fill !== "none" && (
              <Star
                className={`w-9 h-9 absolute top-0 left-0 ${
                  fill === "half"
                    ? "fill-yellow-400 stroke-yellow-500 clip-half"
                    : "fill-yellow-400 stroke-yellow-500"
                }`}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;
