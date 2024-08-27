import { SvgIconPropsType } from "@/svg/common/types";

export const CircleCloseIcon = ({ onClick, color = "white", size = 24 }: SvgIconPropsType) => {
  return (
    <svg
      onClick={onClick}
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="9"
        cy="9"
        r="9"
        fill="black"
        fillOpacity="0.15"
      />
      <path
        d="M12 6L6 12"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L12 12"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
};
