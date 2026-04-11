import { LoaderIcon } from "@/svg/loader/LoaderIcon";
import { StyledBox } from "@/ui/Box";

type BoxLoaderPropsType = {
  isLoading: boolean;
  isAbsolute?: boolean;
};
export const BoxLoader = (props: BoxLoaderPropsType) => {
  if (!props.isLoading) {
    return null;
  }

  return (
    <StyledBox
      align={"center"}
      justify={"center"}
      width={"100%"}
      height={"100%"}
      padding={20}
      zIndex={5}
      gap={10}
      {...(props.isAbsolute && {
        position: "absolute",
      })}
    >
      <LoaderIcon />
    </StyledBox>
  );
};
