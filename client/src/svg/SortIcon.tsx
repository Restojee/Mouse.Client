import { SvgIconPropsType } from "@/svg/common/types";

export const SortIcon = (props: SvgIconPropsType) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 7H19"
        stroke={props.color || "#CCD2E3"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 12H15"
        stroke={props.color || "#CCD2E3"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 17H11"
        stroke={props.color || "#CCD2E3"}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
