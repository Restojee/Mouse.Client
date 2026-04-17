import { MobileSheet } from "../MobileSheet/MobileSheet";
import { DesktopSheet } from "../DesktopSheet/DesktopSheet";
import { SheetProviderProps, useSheetProvider } from "../../viewModel/useSheetProvider";

const SheetProvider = (props: SheetProviderProps) => {
  const { instance } = props;
  const { component: Component, props: componentProps, config } = instance;

  const {
    isMobile,
    isOpen,
    zIndex,
    vars,
    dataTheme,
    handleClose,
    handleCloseVoid,
    handleAccess,
  } = useSheetProvider(props);

  const content = (
    <Component
      {...componentProps}
      onClose={handleClose}
    />
  );

  if (isMobile) {
    return (
      <MobileSheet
        style={vars}
        data-theme={dataTheme}
        isOpen={isOpen}
        onClose={handleCloseVoid}
        title={config.withoutTitle ? undefined : config.title}
        height={config.height}
        noHeader={config.noHeader}
        padding={config.padding}
        zIndex={zIndex}
        withBackdrop={true}
      >
        {content}
      </MobileSheet>
    );
  }

  return (
    <DesktopSheet
      style={vars}
      data-theme={dataTheme}
      isOpen={isOpen}
      onClose={handleCloseVoid}
      onAccess={handleAccess}
      title={config.title}
      text={config.text}
      width={config.width}
      withoutTitle={config.withoutTitle}
      withoutButtons={config.withoutButtons}
      accessDisabled={config.accessDisabled}
      padding={config.padding}
      zIndex={zIndex}
      withBackdrop={true}
    >
      {content}
    </DesktopSheet>
  );
};

export default SheetProvider;
