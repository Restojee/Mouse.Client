import { useAppTheme } from "@/hooks/useAppTheme";
import { StyledBox } from "@/ui/Box";

export const Divider = () => {
  const { theme } = useAppTheme();

  return (
    <StyledBox
      height={1}
      width={"100%"}
      bgColor={theme.colors.secondaryAccent}
      opacity={0.5}
    ></StyledBox>
  );
};
