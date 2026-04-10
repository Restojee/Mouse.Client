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

const ANIM_MS = 180;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.96) translateY(-6px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;
const scaleOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.96) translateY(-6px);
  }
`;

const Overlay = styled.div<{ zIndex: number; closing: boolean }>(({ zIndex, closing }) => ({
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
  animation: `${closing ? fadeOut : fadeIn} ${ANIM_MS}ms ease forwards`,
  "@media all and (max-width: 790px)": {
    padding: 10,
  },
}));

const AnimatedPaperWrapper = styled.div<{ closing: boolean }>(({ closing }) => ({
  animation: `${closing ? scaleOut : scaleIn} ${ANIM_MS}ms ease forwards`,
  display: "flex",
  maxWidth: "100%",
  width: "100%",
}));

type Props = ModalPropsType & { isOpen?: boolean };

const AsyncModalContent = (props: Props) => {
  const { onClose, onAccess, text, title, children, width, withoutTitle, withoutButtons, isOpen } = props;
  const { theme } = useAppTheme();
  const zIndex = useModalZIndex();

  const [visible, setVisible] = React.useState(false);
  const [closing, setClosing] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setClosing(false);
      setVisible(true);
    } else if (visible) {
      setClosing(true);
      closeTimer.current = setTimeout(() => {
        setVisible(false);
        setClosing(false);
      }, ANIM_MS);
    }
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [isOpen]);

  if (!visible) return null;

  return (
    <Overlay
      zIndex={zIndex}
      closing={closing}
      onMouseDown={onClose}
    >
      <AnimatedPaperWrapper
        closing={closing}
        onMouseDown={(e) => e.stopPropagation()}
      >
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
