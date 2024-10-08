import { SvgIconPropsType } from "@/svg/common/types";

export const InIcon = (props: SvgIconPropsType) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      opacity={0.85}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke={props.color || "rgb(255,255,255)"}
        d="M3 9V15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15V9C21 6.17157 21 4.75736 20.1213 3.87868C19.2426 3 17.8284 3 15 3H9"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        fill={props.color || "rgb(255,255,255)"}
        d="M15 15V16H16V15H15ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM14 8V15H16V8H14ZM15 14H8V16H15V14ZM15.7071 14.2929L7.70711 6.29289L6.29289 7.70711L14.2929 15.7071L15.7071 14.2929Z"
      />
    </svg>
  );
};
