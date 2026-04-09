import { SvgIconPropsType } from "@/svg/common/types";

export const ItalicIcon = (props: SvgIconPropsType) => (
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
    <line
      x1="19"
      y1="4"
      x2="10"
      y2="4"
    />
    <line
      x1="14"
      y1="20"
      x2="5"
      y2="20"
    />
    <line
      x1="15"
      y1="4"
      x2="9"
      y2="20"
    />
  </svg>
);
