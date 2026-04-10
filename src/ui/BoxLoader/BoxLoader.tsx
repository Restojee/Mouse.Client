import { useEffect, useState } from "react";
import { LoaderIcon } from "@/svg/loader/LoaderIcon";
import { StyledBoxLoader } from "./styles";

type BoxLoaderPropsType = {
  isLoading: boolean;
  delay?: number;
};

export const BoxLoader = ({ isLoading, delay = 1000 }: BoxLoaderPropsType) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  if (!visible) return null;

  return (
    <StyledBoxLoader>
      <LoaderIcon />
    </StyledBoxLoader>
  );
};
