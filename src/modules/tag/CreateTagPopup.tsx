import CreateTagForm from "@/modules/tag/CreateTagForm";
import { PointBlock } from "@/ui/PointBlock/PointBlock";

export const CreateTagPopup = () => {
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