import { ReactNode, useState } from "react";
import { StyledSpoiler } from "@/ui/Message/styled";

interface Props {
  children: ReactNode;
}

export const Spoiler = (props: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <StyledSpoiler
      title={isOpened ? "" : "Открыть спойлер"}
      isOpened={isOpened}
      onClick={() => setIsOpened(true)}
    >
      {props.children}
    </StyledSpoiler>
  );
};
