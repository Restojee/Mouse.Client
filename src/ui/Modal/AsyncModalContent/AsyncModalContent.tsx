import React from "react";
import { StyledBox } from "@/ui/Box";
import { Display } from "@/ui/Display";
import { Paper } from "@/ui/Paper";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Button } from "@/ui/Button";
import { StyledCardActions } from "@/ui/Form/styled";
import { ModalPropsType } from "@/ui/Modal/Modal";
import { Typography } from "@/ui/Typography";
import { useModalZIndex } from "@/ui/Modal/useModalZIndex";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(-8px); }
  to   { opacity: 1; transform: scale(1)    translateY(0);    }
`;

const Overlay = styled.div<{ zIndex: number }>(({ zIndex }) => ({
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  alignItems: "center",
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  zIndex,
  padding: 40,
  animation: `${fadeIn} 0.2s ease`,
  "@media all and (max-width: 790px)": {
    padding: 10,
  },
}));

const AnimatedPaperWrapper = styled.div({
  animation: `${scaleIn} 0.2s ease`,
  display: "flex",
  maxWidth: "100%",
  width: "100%",
});

const AsyncModalContent = (props: ModalPropsType) => {
  const { onClose, onAccess, text, title, children, width, withoutTitle, withoutButtons } = props;
  const { theme } = useAppTheme();
  const zIndex = useModalZIndex();

  return (
    <Overlay
      zIndex={zIndex}
      onMouseDown={onClose}
    >
      <AnimatedPaperWrapper onMouseDown={(e) => e.stopPropagation()}>
        <Paper
          height={"auto"}
          gap={20}
          width={width || 400}
        >
          <Display condition={!withoutTitle}>
            <Typography
              fontSize="18px"
              color={theme.colors.textOnSecondary}
            >
              {title}
            </Typography>
          </Display>
          <Display condition={!children}>
            <Typography color={theme.colors.textOnSecondary}>{text || "Вы действительно уверены?"}</Typography>
          </Display>
          <Display condition={children}>
            <StyledBox
              direction={"column"}
              width={"100%"}
            >
              {children}
            </StyledBox>
          </Display>
          <Display condition={!withoutButtons}>
            <StyledCardActions>
              <Button
                label="Отмена"
                color={theme.colors.textOnSecondary}
                bgColor={theme.colors.default.paperAccent}
                onClick={onClose}
              />
              <Button
                color={theme.colors.brandColorContrastText}
                type={"submit"}
                onClick={onAccess}
                label="Подтвердить"
                disabled={props.accessDisabled}
              />
            </StyledCardActions>
          </Display>
        </Paper>
      </AnimatedPaperWrapper>
    </Overlay>
  );
};

export default AsyncModalContent;
