import { SvgIconPropsType } from "@/svg/common/types";

export const UnderlineIcon = (props: SvgIconPropsType) => (
  <svg
    width={props.size || "16px"}
    height={props.size || "16px"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "currentColor"}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={props.onClick}
  >
    <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
    <line
      x1="4"
      y1="21"
      x2="20"
      y2="21"
    />
  </svg>
);
