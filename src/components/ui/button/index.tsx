import { cn } from "../../../utils/cn";
import { type ButtonHTMLAttributes } from "react";
import * as LucideIcons from "lucide-react";

type ButtonProps = {
  text?: string;
  icon?: string;
  iconLucide?: string;
  iconPosition?: "start" | "end";
  isLoading?: boolean;
  backgroundColor?: string;
  textSize?: string;
  textWeight?: string;
  className?: string;
  imageclassName?: string;
  iconColor?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  text,
  icon,
  iconLucide,
  iconPosition = "start",
  backgroundColor = "primary",
  isLoading = false,
  textSize,
  textWeight,
  className,
  imageclassName,
  iconColor = "black",
  ...rest
}: ButtonProps) => {
  const IconComp = iconLucide && (LucideIcons as any)[iconLucide];

  const renderIcon = () => {
    if (IconComp) {
      // Render React icon component
      return (
        <IconComp color={iconColor} className={cn("w-4 h-4", imageclassName)} />
      );
    }
    if (icon) {
      // Render as image URL fallback
      return (
        <img src={icon} alt="icon" className={cn("w-5 h-5", imageclassName)} />
      );
    }
    return null;
  };

  return (
    <button
      disabled={isLoading || rest.disabled}
      className={cn(
        `flex items-center justify-center md:gap-2 gap-1 cursor-pointer  md:py-2 py-1  md:rounded-xl bg-${backgroundColor} rounded-2xl `,
        className,
      )}
      {...rest}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
      ) : (
        <>
          {/* {icon && iconPosition === "start" && (
            <img
              src={icon}
              alt="icon"
              className={cn("w-5 h-5", imageclassName)}
            />
          )} */}
          {(icon || iconLucide) && iconPosition === "start" && renderIcon()}
          {text && (
            <span
              className={cn(
                textSize ? textSize : "font-medium md:text-base/4 text-sm",
                textWeight,
              )}
            >
              {text}
            </span>
          )}
          {/* {icon && iconPosition === "end" && (
            <img
              src={icon}
              alt="icon"
              className={cn("w-5 h-5", imageclassName)}
            />
          )} */}
          {(icon || iconLucide) && iconPosition === "end" && renderIcon()}
        </>
      )}
    </button>
  );
};

export default Button;
