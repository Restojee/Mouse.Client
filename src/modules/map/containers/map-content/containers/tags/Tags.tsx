import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIsAuth } from '@/modules/auth/slice';
import React from 'react';
import { useTag } from '@/modules/tag/hooks/useTag';
import { StyledBox } from '@/ui/Box';
import { Button } from '@/ui/Button';
import { Display } from '@/ui/Display';
import { Tag } from '@/api/codegen/genMouseMapsApi';
import { useAppTheme } from '@/hooks/useAppTheme';
import { EditFillIcon } from '@/svg/EditFillIcon';
import { StyledTag } from '@/ui/Tag/styled';
import { Typography } from '@/ui/Typography';

type MapContentFooterPropsType = {
    tags?: Tag[]
}
export const Tags = ({ tags }: MapContentFooterPropsType) => {
    const theme = useAppTheme();
    const isAuth = useAppSelector(selectIsAuth);

    const {
        onOpenModal,
    } = useTag();

    const onOpenModalHandler = () => {
        onOpenModal('tag-update')
    }

    return (
        <StyledBox justify={'center'}>
            <Display condition={tags?.length}>
                <StyledBox wrap={'wrap'} gap={10}>
                    {tags?.map(({ name, id }) => (
                        <StyledTag
                            key={id}
                            bgColor={theme.colors.primaryLighter}
                        >
                            <Typography isEllipsis>
                                {name}
                            </Typography>
                        </StyledTag>
                    ))}
                    <Button
                        bgColor={theme.colors.secondaryAccent}
                        onClick={onOpenModalHandler}
                        label={'Изменить'}
                        prepend={<EditFillIcon/>}
                    />
                </StyledBox>
            </Display>
            <Display condition={!tags?.length}>
                <Button
                    disabled={!isAuth}
                    size={'lg'}
                    onClick={onOpenModalHandler}
                    label={'Изменить теги'}
                    prepend={<EditFillIcon/>}
                />
            </Display>
        </StyledBox>
    );
};

