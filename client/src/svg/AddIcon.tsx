import { SvgIconPropsType } from "@/svg/common/types";

export const AddIcon = (props: SvgIconPropsType) => {
  return (
    <svg
      onClick={props.onClick}
      width={props.size || "24px"}
      height={props.size || "24px"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke={props.color || "white"}
        d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z"
        strokeWidth="2"
      />
      <path
        stroke={props.color || "white"}
        d="M12 8L12 16"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        stroke={props.color || "white"}
        d="M16 12L8 12"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
};
