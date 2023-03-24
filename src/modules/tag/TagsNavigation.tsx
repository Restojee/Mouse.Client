import { StyledBox } from "@/ui/Box/styles/StyledBox";
import { StyledNavLinkSection } from "@/layout/navigation/styles/StyledNavLinkSection";
import { SidebarSection } from "@/layout/sidebar/SidebarSection";
import { NavLink } from "@/layout/navigation/NavLink";
import { CloseIcon } from "@/svg/CloseIcon";
import {
    useCreateTagMutation, useDeleteTagMutation,
    useGetTagsQuery
} from "@/api/tagsApi";
import { AddIcon } from "@/svg/AddIcon";
import { CreateTagPopup } from "@/modules/tag/CreateTagPopup";
import { ScrollBox } from "@/ui/ScrollBox/ScrollBox";
import {
    StyledMegaShadow,
    StyledModalsWrapper
} from "@/ui/Modal/styled";
import { Fragment, useState } from "react";
import { useAppTheme } from "@/hooks/useAppTheme";
import FormElement from "@/ui/Form/FormElement";
import { Form } from "@/ui/Form/Form";
import { SubmitButton } from "@/ui/Button/SubmitButton";
import { CancelButton } from "@/ui/Button/CancelButton";
import {StyledCardActions, StyledFormElementContainer} from "@/ui/Form/styled";
import styled from "styled-components";
import {Typography} from "@/ui/Typography/styles/Typography";
import Box from "next-auth/providers/box";

type TagsNavigationSectionProps = {
    isOpen: boolean;
}

const StyledCard = styled(StyledBox)(props => ({
    backgroundColor: "white",
    borderRadius: "15px",
    flexDirection: "column",
    padding: "20px",
    gap: "15px",
    height: "max-content",
    zIndex: props.theme.order.modal + 1
}))

type DeleteMapTagProps =  {
    tagId: number;
    isVisible: boolean;
    onClose: () => void;
}
function DeleteMapTag(props: Partial<DeleteMapTagProps>) {

    const { tagId = 0, isVisible = false, onClose } = props;

    const theme = useAppTheme();

    const [ deleteTag ] = useDeleteTagMutation();

    if (isVisible) {
        return (
            <Fragment>
                <StyledMegaShadow onClick={ onClose } />
                <StyledModalsWrapper>
                    <StyledCard width="400px">
                        <Typography fontSize="18px" color={ theme.colors.textOnSecondary }>
                            Подтверждение удаления
                        </Typography>
                        <StyledBox direction="column">
                            <Typography color={ theme.colors.textOnSecondary }>
                                Вы действительно хотите удалить этот тег?
                            </Typography>
                            <StyledCardActions>
                                <SubmitButton
                                    onClick={ () => deleteTag({ tagId }).then(onClose) }
                                    bgColor={ theme.colors.status.success }
                                    label="Подтвердить"
                                />
                                <CancelButton
                                    label="Отмена"
                                    onClick={ onClose }
                                />
                            </StyledCardActions>
                        </StyledBox>
                    </StyledCard>
                </StyledModalsWrapper>
            </Fragment>

        )
    }

    return null;
}

export function TagsNavigation(props: TagsNavigationSectionProps) {
    const { data: tags } = useGetTagsQuery();
    const [ tagId, setTagId ] = useState<number>();
    const [ isTagDeleteProcess, setIsTagDeleteProcess ] = useState(false);
    const [ isTagCreateProcess, setIsTagCreateProcess ] = useState(false);
    return (
        <StyledBox
            direction="column"
            gap={ 0 }
            padding="5px"
            overflow="hidden"
        >
            <SidebarSection
                label="Поиск по тегам"
                append={
                    <StyledNavLinkSection
                        onClick={ () => setIsTagCreateProcess(true) }
                        isOpen={ props.isOpen }
                    >
                        <AddIcon />
                    </StyledNavLinkSection>
                }
                prepend={
                    <CreateTagPopup isVisible={ isTagCreateProcess } />
                }
                isOpen={ props.isOpen }
            />
            <ScrollBox>
                { tags?.map(el => (
                    <NavLink
                        key={ el.id }
                        label={ el.name }
                        isChecked={ false }
                        append={ (
                            <StyledNavLinkSection onClick={ () => {
                                setTagId(el.id);
                                setIsTagDeleteProcess(true)
                            } }>
                                <CloseIcon />
                            </StyledNavLinkSection>
                        ) }
                        justifyContent="space-between"
                        isOpen={ props.isOpen }
                    />
                )) }
            </ScrollBox>
            <DeleteMapTag
                tagId={ tagId }
                isVisible={ isTagDeleteProcess }
                onClose={ () => setIsTagDeleteProcess(false) }
            />
        </StyledBox>
    )
}