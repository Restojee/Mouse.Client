import { Button, ButtonProps } from "@/ui/Button/Button";

type CancelButtonProps = ButtonProps;
export const CancelButton = (props: CancelButtonProps) => {
    return (
        <Button { ...props } type="submit" />
    )
}