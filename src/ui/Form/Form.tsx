import { StyledBox, StyledBoxProps } from "@/ui/Box";
import { FormEvent, ReactNode } from "react";

type FormProps = {
  children: ReactNode;
  onSubmit: () => void;
};
export const Form = (props: FormProps & Partial<StyledBoxProps>) => {
  const { children, onSubmit, ...boxProps } = props;
  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit && onSubmit();
  };

  return (
    <StyledBox direction="column" gap={20} {...boxProps}>
      <form onSubmit={onSubmitHandler} style={{ display: "contents" }}>
        {children}
      </form>
    </StyledBox>
  );
};
