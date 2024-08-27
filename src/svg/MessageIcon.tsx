import { SvgIconPropsType } from "@/svg/common/types";

export const MessageIcon = (props: SvgIconPropsType) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        stroke={props.color || "#CCD2E3"}
        x="4"
        y="6"
        width="16"
        height="12"
        rx="2"
        strokeWidth="2"
      />
      <path
        stroke={props.color || "#CCD2E3"}
        d="M4 9L11.1056 12.5528C11.6686 12.8343 12.3314 12.8343 12.8944 12.5528L20 9"
        strokeWidth="2"
      />
    </svg>
  );
};
