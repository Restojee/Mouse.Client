import {
    useCompletedMap
} from '@/modules/map/containers/map-content/containers/completed-images/hooks/useCompletedMap';
import { ImageIcon } from '@/svg/ImageIcon';
import { Display } from '@/ui/Display';
import { useState } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useMap } from '@/modules/map/common';
import { StyledMapCard } from '@/modules/map/styles/StyledMapCard';
import { StyledMapCardHeader } from '@/modules/map/styles/StyledMapCardHeader';
import { Typography } from '@/ui/Typography/styles/Typography';
import { StyledMapCardBody } from '@/modules/map/styles/StyledMapCardBody';
import { StyledMapCardButton } from '@/modules/map/styles/StyledMapCardButton';
import { StyledMapCardFooter } from '@/modules/map/styles/StyledMapCardFooter';
import { StyledBox } from '@/ui/Box';
import { FavoriteIcon } from '@/svg/FavoriteIcon';
import { BookCheckIcon } from '@/svg/BookCheckIcon';
import { CommentIcon } from '@/svg/CommentIcon';
import { CopyIcon } from '@/svg/CopyIcon';
import { Button } from '@/ui/Button/Button';
import { IconButton } from '@/ui/Button/IconButton';
import Image from 'next/image';
import { Map } from '@/api/codegen/genMouseMapsApi';

type MapCardProps = {
    id: Map['id'];
    label?: string | null;
    addedCount?: number;
    commentsCount?: number;
    image: string;
    onClick?: (id: Map['id']) => void;
}
export const MapCard = (props: MapCardProps) => {
    const theme = useAppTheme();
    const [isMapHover, setIsMapHover] = useState(false);

    const {
        onMapNameCopy,
        onAddMapFavorite
    } = useMap(props.id);

    const onIconsClick = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (props.label) {
            await onMapNameCopy(props.label);
        }
    };

    const {
        label,
        addedCount,
        image = '',
        onClick,
        commentsCount,
    } = props;
    return (
        <StyledMapCard
            onMouseLeave={() => setIsMapHover(false)}
            onMouseEnter={() => setIsMapHover(true)}
        >
            <StyledMapCardHeader onClick={onIconsClick}>
                <Typography fontSize={'0.8rem'}>{label}</Typography>
                <IconButton>
                    <CopyIcon size={20}/>
                </IconButton>
            </StyledMapCardHeader>
            <StyledMapCardBody>
                <StyledMapCardButton
                    isHover={isMapHover}
                    onClick={() => onClick?.(props.id)}
                >
                    <Button
                        bgColor={theme.colors.status.success}
                        label="Открыть"
                    />
                </StyledMapCardButton>
                <Image
                    src={image}
                    alt=" "
                    objectFit={'contain'}
                    objectPosition={'center'}
                    width={330}
                    height={150}
                />
            </StyledMapCardBody>
            <StyledMapCardFooter
                isMapHover={isMapHover}
                justify="space-between"
            >
                <StyledBox gap={'10px'} justify="flex-start">
                    {/*<IconButton onClick={onCompletedMapModalOpen}>*/}
                    {/*    <ImageIcon />*/}
                    {/*</IconButton>*/}
                    <IconButton onClick={onAddMapFavorite}>
                        <FavoriteIcon/>
                    </IconButton>
                </StyledBox>
                <StyledBox gap={'10px'} justify="flex-end" opacity="0.6">
                    <StyledBox gap="5px" align="center" title="Выполнений">
                        <BookCheckIcon/>
                        <Typography>{addedCount}</Typography>
                    </StyledBox>
                    <StyledBox gap="5px" align="center" title="Комментариев">
                        <CommentIcon/>
                        <Typography>{commentsCount}</Typography>
                    </StyledBox>
                </StyledBox>
            </StyledMapCardFooter>
        </StyledMapCard>
    );
};