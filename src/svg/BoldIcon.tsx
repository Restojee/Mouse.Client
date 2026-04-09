import { SvgIconPropsType } from "@/svg/common/types";

export const BoldIcon = (props: SvgIconPropsType) => (
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
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
  </svg>
);
