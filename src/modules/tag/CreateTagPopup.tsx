import CreateTagForm from "@/modules/tag/CreateTagForm";
import { PointBlock } from "@/ui/PointBlock/PointBlock";

type CreateTagPopupProps = {
    isVisible: boolean;
}
export const CreateTagPopup = (props: Partial<CreateTagPopupProps>) => {

    const { isVisible = true } = props;

    if (isVisible) {
        return (
            <PointBlock
                header="Добавить тег"
                width="100%" left="0"
                bottom="35px"
            >
                <CreateTagForm />
            </PointBlock>
        )
    }

    return null;
}