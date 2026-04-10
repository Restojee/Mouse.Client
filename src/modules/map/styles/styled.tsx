import styled from "styled-components";
import { StyledTextarea } from "@/ui/Textarea/styled";

export const StyledMapContentMain = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 26,
  flex: "1 1 0",
  minHeight: 0,
  overflow: "auto",
  color: theme.colors.textOnPrimary,
  padding: "20px 20px 40px 20px",
  borderRadius: "inherit",
  flexGrow: 1,
  "::placeholder": {
    color: "rgba(255, 255, 255, 0.5)",
  },
  "@media all and (max-width: 790px)": {
    maxWidth: "100%",
  },
}));

export const StyledMapContentNoteForm = styled(StyledTextarea)(({ theme }) => ({
  marginBottom: "auto",
  position: "relative",
  backgroundColor: theme.colors.primaryAccent + "!important",
  "&:hover": {
    opacity: 0.8,
    backgroundColor: theme.colors.primaryAccent,
  },
  "&:focus": {
    opacity: 0.8,
    backgroundColor: theme.colors.primaryAccent,
  },
}));

export const StyledMapContentSidebar = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.colors.secondaryDark,
  boxShadow: "-10px 0 20px 1px rgba(0, 0, 0, 0.4)",
  maxWidth: "370px",
  minWidth: "370px",
  maxHeight: "100%",
  height: "100%",
  position: "sticky",
  top: 0,
  width: "100%",
  borderRadius: "inherit",
  padding: "30px 0 0 0",
  "@media all and (max-width: 1400px)": {
    maxWidth: "300px",
    minWidth: "300px",
  },
  "@media all and (max-width: 790px)": {
    maxWidth: "none",
    minWidth: "auto",
    minHeight: "auto",
    display: "none",
  },
}));

export const StyledContentSidebarBodyIcon = styled.div<{ disabled?: boolean; count?: number }>((props) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "10px 0",
  margin: "0 15px",
  alignItems: "center",
  width: "100%",
  position: "relative",
  cursor: "pointer",
  transition: "0.2s",
  transitionProperty: "opacity, transform",
  svg: {
    opacity: 0.8,
  },
  "&:before": {
    content: '""',
    borderRadius: "50%",
    backgroundColor: props.theme.colors.iconOnSecondary,
    height: "50px",
    width: "50px",
    position: "absolute",
    opacity: 0,
    transition: "0.1s",
    transitionProperty: "opacity, transform",
  },
  "&:after": {
    content: "' '",
    backgroundColor: props.theme.colors.neutral,
    height: "50%",
    position: "absolute",
    right: "-15px",
    width: "1px",
    pointerEvents: "none",
  },
  "&:last-of-type": {
    "&:after": {
      display: "none",
    },
  },
  "&:hover": {
    "&::before": {
      opacity: 0.2,
    },
  },
  "&:active": {
    "&::before": {
      transform: "scale(1.3)",
    },
  },
  ...(props.disabled && {
    opacity: 0.2,
    pointerEvents: "none",
  }),
  "@media all and (max-width: 790px)": {
    padding: "20px 0",
  },
}));

export const StyledContentSidebarBodyCount = styled.div({
  position: "absolute",
  bottom: "-5px",
  fontSize: "0.7rem",
});

export const StyledMapContentPaper = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  width: "100%",
  height: "100%",
  maxWidth: 1200,
  overflow: "hidden",
  backgroundColor: theme.colors.primaryLight,
  borderRadius: theme.blockSettings.siteBorder,
  "@media all and (max-width: 790px)": {
    flexDirection: "column",
    height: "100%",
    borderRadius: 0,
    backgroundColor: theme.colors.primaryLight,
  },
}));
