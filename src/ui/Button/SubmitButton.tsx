import { Button, ButtonProps } from "@/ui/Button/Button";

type SubmitButtonProps = ButtonProps;
export const SubmitButton = (props: SubmitButtonProps) => {
    return (
        <Button { ...props } type="submit" />
    )
}