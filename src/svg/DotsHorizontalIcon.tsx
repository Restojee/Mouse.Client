import { SvgIconPropsType } from "@/svg/common/types";

export const DotsHorizontalIcon = (props: SvgIconPropsType) => {
  return (
    <svg
      width={props.size || "24px"}
      height={props.size || "24px"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={props.onClick}
    >
      <circle
        cx="5"
        cy="12"
        r="2"
        fill={props.color || "currentColor"}
      />
      <circle
        cx="12"
        cy="12"
        r="2"
        fill={props.color || "currentColor"}
      />
      <circle
        cx="19"
        cy="12"
        r="2"
        fill={props.color || "currentColor"}
      />
    </svg>
  );
};
