import { useMapView } from '@/modules/map/containers/map-view-modal/hooks/useMapView';
import { mockProviders } from 'next-auth/client/__tests__/helpers/mocks';
import { useMapTag } from './hooks/useMapTag';
import { StyledBox } from '@/ui/Box';
import { Button } from '@/ui/Button';
import { Display } from '@/ui/Display';
import React from 'react';
import { Tag, Map } from '@/api/codegen/genMouseMapsApi';
import { useAppTheme } from '@/hooks/useAppTheme';
import { CloseIcon } from '@/svg/CloseIcon';
import { EditFillIcon } from '@/svg/EditFillIcon';
import { IconButton } from '@/ui/Button/IconButton';
import { StyledTag } from '@/ui/Tag/styled';
import { Typography } from '@/ui/Typography';

type MapContentFooterPropsType = {
    tags?: Tag[]
}
export const Tags = ({ tags }: MapContentFooterPropsType) => {
    const theme = useAppTheme();

    const {
        mapId
    } = useMapView()

    const {
        onTagsEdit,
    } = useMapTag();

    const onEditClickHandler = () => {
        onTagsEdit(mapId);
    };

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
                            <IconButton isAdmin>
                                <CloseIcon/>
                            </IconButton>
                        </StyledTag>
                    ))}
                    <IconButton
                        margin={'0 0 0 10px'}
                        onClick={onEditClickHandler}
                    >
                        <EditFillIcon/>
                    </IconButton>
                </StyledBox>
            </Display>
            <Display condition={!tags?.length}>
                <Button
                    onClick={onEditClickHandler}
                    label={'Добавить тег'}
                    prepend={<EditFillIcon/>}
                />
            </Display>
        </StyledBox>
    );
};

