import { LoaderIcon } from "@/svg/loader/LoaderIcon";
import { BoxLoader } from "@/ui/BoxLoader/BoxLoader";
import { useState } from "react";
import { StyledBox } from "@/ui/Box";
import Image, { ImageProps } from "next/image";

type AppImageType = ImageProps;
export const AppImage = (props: AppImageType) => {
  const {
    height,
    width,
    src,
    alt,
    ...restProps
  } = props;

  const [isLoaded, setIsLoaded] = useState(true);
console.log(isLoaded)
  return (
    <>
      <StyledBox
        display={isLoaded ? "none" : "initial"}
        height={"100%"}
        width={"100%"}
      >
        <Image
          onLoad={() => setIsLoaded(false)}
          src={src}
          alt={alt}
          quality={70}
          width={width}
          height={height}
          objectFit={"cover"}
        />
      </StyledBox>
      <StyledBox
        height={"100%"}
        width={"100%"}
        display={isLoaded ? "flex" : "none"}>
        <Image
          src={src}
          width={50}
          height={50}
          quality={1}
          style={{
            filter: "blur(8px)",
          }}
          alt={alt}
          objectFit={"cover"}
          {...restProps}
        />
      </StyledBox>
    </>
  );
};

