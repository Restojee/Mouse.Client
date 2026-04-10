import { Property } from "csstype";
import { ReactNode, Suspense } from "react";
import { AsyncModalContent } from "./AsyncModalContent";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MobileSheet } from "@/ui/MobileSheet/MobileSheet";
import { StyledBox } from "@/ui/Box";
import { Button } from "@/ui/Button";
import { StyledCardActions } from "@/ui/Form/styled";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Typography } from "@/ui/Typography";
import { useModalZIndex } from "./useModalZIndex";
import { Display } from "@/ui/Display";

export type ModalPropsType = {
  isOpen?: boolean;
  onClose: () => void;
  onAccess?: () => void;
  accessDisabled?: boolean;
  text?: string;
  title?: string;
  width?: Property.Width<number>;
  children?: ReactNode;
  withoutTitle?: boolean;
  withoutButtons?: boolean;
  autoHeight?: boolean;
};

const MobileModalContent = (props: ModalPropsType) => {
  const { onClose, onAccess, text, title, children, withoutTitle, withoutButtons, accessDisabled, autoHeight } = props;
  const { theme } = useAppTheme();
  const zIndex = useModalZIndex();

  return (
    <MobileSheet
      isOpen={true}
      onClose={onClose}
      title={withoutTitle ? undefined : title}
      zIndex={zIndex}
      height={autoHeight ? "auto" : undefined}
    >
      <StyledBox
        direction="column"
        gap={16}
        padding="0 16px 24px"
        width="100%"
      >
        <Display condition={!children}>
          <Typography color={theme.colors.textOnSecondary}>{text || "Вы действительно уверены?"}</Typography>
        </Display>
        <Display condition={children}>
          <StyledBox
            direction="column"
            width="100%"
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
              type="submit"
              onClick={onAccess}
              label="Подтвердить"
              disabled={accessDisabled}
            />
          </StyledCardActions>
        </Display>
      </StyledBox>
    </MobileSheet>
  );
};

export const Modal = ({ isOpen, ...props }: ModalPropsType) => {
  const isMobile = useIsMobile();

  if (!isOpen) {
    return null;
  }

  if (isMobile) {
    return <MobileModalContent {...props} />;
  }

  return (
    <Suspense>
      <AsyncModalContent {...props} />
    </Suspense>
  );
};
