import styled from "styled-components";
import { Typography } from "@/ui/Typography/styles/Typography";

type StyledStatisticIconContainerPropsType = {
  fillingPercent?: string;
};
export const StyledStatisticIconContainer = styled.div<StyledStatisticIconContainerPropsType>(
  ({ theme, ...props }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(to top, rgb(132, 208, 108) ${props.fillingPercent}, ${theme.colors.secondary} ${props.fillingPercent})`,
    flexDirection: "column",
    position: "relative",
    backgroundColor: theme.colors.secondary,
    width: 44,
    height: 44,
    borderRadius: "50%",
    boxShadow: `0 0 2px 1px ${theme.colors.iconOnSecondary}`,
    cursor: "pointer",
    color: theme.colors.textOnSecondary,
    transition: "0.2s",
    transitionProperty: "transform",
    "&:hover": {
      transform: "scale(1.06)",
    },
    svg: {
      "-webkit-filter": `drop-shadow(0px 0px 2px ${theme.colors.iconOnSecondary})`,
      filter: `drop-shadow(0px 0px 2px ${theme.colors.iconOnSecondary})`,
    },
  }),
);

export const StyledStatisticIconText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: `calc(${theme.font.fontSize} - 2px)`,
  opacity: 0.6,
}));
