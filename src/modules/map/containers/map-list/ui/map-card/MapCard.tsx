import { removeNonDigits } from "@/modules/map/containers/map-list";
import React, { useCallback, useMemo, useState } from 'react';
import { getMapImageLink } from '@/common/utils';
import { MapCardButton } from './MapCardButton';
import { AppImage } from '@/ui/AppImage/AppImage';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useMap } from '@/modules/map/common';
import { StyledMapCard } from '@/modules/map/styles/StyledMapCard';
import { StyledMapCardHeader } from '@/modules/map/styles/StyledMapCardHeader';
import { Typography } from '@/ui/Typography/styles/Typography';
import { StyledMapCardBody } from '@/modules/map/styles/StyledMapCardBody';
import { StyledMapCardFooter } from '@/modules/map/styles/StyledMapCardFooter';
import { StyledBox } from '@/ui/Box';
import { FavoriteIcon } from '@/svg/FavoriteIcon';
import { BookCheckIcon } from '@/svg/BookCheckIcon';
import { CommentIcon } from '@/svg/CommentIcon';
import { CopyIcon } from '@/svg/CopyIcon';
import { IconButton } from '@/ui/Button/IconButton';
import { Map } from '@/api/codegen/genMouseMapsApi';

type MapCardProps = {
    map: Map;
}
// eslint-disable-next-line react/display-name
export const MapCard = React.memo((props: MapCardProps) => {
    const {
        id,
        name,
        tags,
        image = '',
        commentsCount,
        completedCount,
        isFavoriteByUser,
    } = props.map;

    const theme = useAppTheme();

    const [isMapHover, setIsMapHover] = useState(false);

    const {
        onMapNameCopy,
        onToggleMapFavorite
    } = useMap(id);

    const onIconsClick = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        const isVanilla = tags?.find(el => el.name === "Ванилла");

        if (name && isVanilla) {
            await onMapNameCopy(removeNonDigits(name));
            return;
        }

        await onMapNameCopy(name);
    }, [name, onMapNameCopy, tags]);

    const formattedName = useMemo(() => {
        const isVanilla = tags?.find(el => el.name === "Ванилла");

        return isVanilla ? removeNonDigits(name) : name;
    }, [name, tags])


    const onToggleMapFavoriteHandler = useCallback(() => {
        onToggleMapFavorite(Boolean(isFavoriteByUser))
    }, [onToggleMapFavorite, isFavoriteByUser])

    const mapImage = useMemo(() => (getMapImageLink(image)), [image])

    return (
        <StyledMapCard
            onMouseLeave={() => setIsMapHover(false)}
            onMouseEnter={() => setIsMapHover(true)}
        >
            <StyledMapCardHeader onClick={onIconsClick}>
                <Typography>{formattedName}</Typography>
                <IconButton>
                    <CopyIcon size={24} />
                </IconButton>
            </StyledMapCardHeader>
            <StyledMapCardBody>
                <MapCardButton
                    id={id}
                    isMapHover={isMapHover}
                />
                <AppImage
                    src={mapImage}
                    alt={name || ''}
                    objectFit={'contain'}
                    objectPosition={'center'}
                    width={300}
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
                    <IconButton onClick={onToggleMapFavoriteHandler}>
                        <FavoriteIcon color={isFavoriteByUser ? theme.colors.brandColor : undefined}/>
                    </IconButton>
                </StyledBox>
                <StyledBox gap={'10px'} justify="flex-end" opacity="0.6">
                    <StyledBox gap="5px" align="center" title="Выполнений">
                        <BookCheckIcon/>
                        <Typography>{completedCount}</Typography>
                    </StyledBox>
                    <StyledBox gap="5px" align="center" title="Комментариев">
                        <CommentIcon/>
                        <Typography>{commentsCount}</Typography>
                    </StyledBox>
                </StyledBox>
            </StyledMapCardFooter>
        </StyledMapCard>
    );
});
