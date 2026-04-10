import { ReactNode, useState } from "react";
import messageStyles from "./Message.module.scss";

interface Props {
  children: ReactNode;
}

export const Spoiler = (props: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <span
      className={[messageStyles.spoiler, !isOpened && messageStyles.spoilerClosed].filter(Boolean).join(" ")}
      title={isOpened ? "" : "Открыть спойлер"}
      onClick={() => setIsOpened(true)}
    >
      {props.children}
    </span>
  );
};
