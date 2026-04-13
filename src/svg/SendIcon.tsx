import { SvgIconPropsType } from "@/svg/common/types";

export const SendIcon = (props: SvgIconPropsType) => {
  return (
    <svg
      width={props.size || "24px"}
      height={props.size || "24px"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={props.color || "currentColor"}
        d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
      />
    </svg>
  );
};
