import { Typography } from "@/ui/Typography";
import { SheetComponentProps } from "@/ui/Sheet/core/createSheet";

export type ConfirmContentProps = Partial<SheetComponentProps<boolean>> & {
  text?: string;
};

export const ConfirmContent = ({ text }: ConfirmContentProps) => (
  <Typography>{text ?? "Вы действительно уверены?"}</Typography>
);
