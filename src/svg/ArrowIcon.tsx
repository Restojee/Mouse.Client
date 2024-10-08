import { SvgIconPropsType } from "@/svg/common/types";

export const ArrowIcon = (props: SvgIconPropsType) => {
  const arrowRotate = {
    transform: `rotate(${props.rotate})`,
    transition: "transform 150ms ease",
  };

  return (
    <svg
      style={arrowRotate}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={props.color || "#CCD2E3"}
        d="M15 12L15.7071 11.2929L16.4142 12L15.7071 12.7071L15 12ZM9.70711 5.29289L15.7071 11.2929L14.2929 12.7071L8.29289 6.70711L9.70711 5.29289ZM15.7071 12.7071L9.70711 18.7071L8.29289 17.2929L14.2929 11.2929L15.7071 12.7071Z"
      />
    </svg>
  );
};
