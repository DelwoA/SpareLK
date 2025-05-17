import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "small" | "medium" | "large";
  showText?: boolean;
}

export default function Logo({
  variant = "light",
  size = "medium",
  showText = true,
}: LogoProps) {
  // Size mappings
  const sizeClasses = {
    small: {
      container: "gap-1.5",
      circle: "h-6 w-6",
      svg: "w-[15px] h-[15px]",
      text: "text-base",
    },
    medium: {
      container: "gap-2",
      circle: "h-8 w-8",
      svg: "w-[20px] h-[20px]",
      text: "text-xl",
    },
    large: {
      container: "gap-3",
      circle: "h-10 w-10",
      svg: "w-[25px] h-[25px]",
      text: "text-2xl",
    },
  };

  // Color variants
  const textColor = variant === "light" ? "text-white" : "text-slate-800";

  return (
    <Link
      to="/"
      className={`flex items-center ${sizeClasses[size].container} hover:scale-105 transition-transform duration-200`}
    >
      <div
        className={`flex items-center justify-center rounded-full bg-orange-500 ${sizeClasses[size].circle}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-white ${sizeClasses[size].svg}`}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
      </div>
      {showText && (
        <span className={`font-bold ${textColor} ${sizeClasses[size].text}`}>
          SpareLK
        </span>
      )}
    </Link>
  );
}
