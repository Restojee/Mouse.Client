import { StyledBox } from "@/ui/Box";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

type AppImageType = ImageProps;
export const AppImage = (props: AppImageType) => {
  const { height, width, src, alt, ...restProps } = props;

  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const imageElement = document.createElement("img");

    if (!imageElement) return;

    imageElement.onload = () => {
      setIsLoaded(false);
    };
    imageElement.src = src as string;
  }, []);

  if (isLoaded) {
    return (
      <StyledBox
        height={"100%"}
        width={"100%"}
      >
        <Image
          src={src}
          width={10}
          height={10}
          quality={1}
          style={{
            filter: "blur(8px)",
          }}
          alt={alt}
          objectFit={"cover"}
          {...restProps}
        />
      </StyledBox>
    );
  }

  return (
    <>
      <StyledBox
        height={"100%"}
        width={"100%"}
      >
        <Image
          src={src}
          alt={alt}
          quality={70}
          width={width}
          height={height}
          objectFit={"cover"}
        />
      </StyledBox>
    </>
  );
};
