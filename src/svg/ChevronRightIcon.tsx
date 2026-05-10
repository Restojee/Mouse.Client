import { SvgIconPropsType } from "@/svg/common/types";

export const ChevronRightIcon = (props: SvgIconPropsType & { className?: string; style?: React.CSSProperties }) => (
  <svg
    className={props.className}
    width={props.size || "14px"}
    height={props.size || "14px"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "currentColor"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={props.onClick}
    style={props.style}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
