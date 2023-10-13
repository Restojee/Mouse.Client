import { getMapImageLink } from '@/common/utils';
import { useAppTheme } from "@/hooks/useAppTheme";
import { StyledMapCard } from "@/modules/map/styles/StyledMapCard";
import { StyledMapCardHeader } from "@/modules/map/styles/StyledMapCardHeader";
import { Typography } from "@/ui/Typography/styles/Typography";
import { StyledMapCardBody } from "@/modules/map/styles/StyledMapCardBody";
import { StyledMapCardButton } from "@/modules/map/styles/StyledMapCardButton";
import { StyledMapCardFooter } from "@/modules/map/styles/StyledMapCardFooter";
import { StyledBox} from "@/ui/Box";
import {FavoriteIcon} from "@/svg/FavoriteIcon";
import {BookCheckIcon} from "@/svg/BookCheckIcon";
import {CommentIcon} from "@/svg/CommentIcon";
import {CopyIcon} from "@/svg/CopyIcon";
import { Button } from "@/ui/Button/Button";
import {ImageIcon} from "@/svg/ImageIcon";
import { IconButton } from "@/ui/Button/IconButton";
import Image from "next/image";
import { useState } from 'react';
import { Map } from "@/api/codegen/genMouseMapsApi";

type MapCardProps = {
    id: Map['id'];
    label?: string | null;
    addedCount?: number;
    commentsCount?: number;
    image?: string | null;
    onClick?: (id: Map['id']) => void;
}
export const MapCard = (props: MapCardProps) => {
    const theme = useAppTheme();
    const [isMapHover, setIsMapHover] = useState(false);

    const onIconsClick= (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        alert('Пока не работает....')
    }

    const {
        label,
        addedCount,
        image = "",
        onClick,
        commentsCount
    } = props;
    return (
        <StyledMapCard
            onMouseLeave={() => setIsMapHover(false)}
            onMouseEnter={() => setIsMapHover(true)}
        >
            <StyledMapCardHeader>
                <Typography>{ label }</Typography>
                <IconButton onClick={onIconsClick}>
                    <CopyIcon />
                </IconButton>
            </StyledMapCardHeader>
            <StyledMapCardBody>
                <StyledMapCardButton
                    isHover={ isMapHover }
                    onClick={ () => onClick?.(props.id) }
                >
                    <Button
                        bgColor={ theme.colors.status.success }
                        label="Открыть"
                    />
                </StyledMapCardButton>
                <Image
                    src={ image || "https://i.imgur.com/WpmGIaD.png" }
                    alt=" "
                    objectFit={'cover'}
                    objectPosition={'center'}
                    width={500}
                    height={350}
                />
            </StyledMapCardBody>
            <StyledMapCardFooter justify="space-between">
                <StyledBox gap={ "10px" } justify="flex-start">
                    <IconButton onClick={onIconsClick}>
                        <ImageIcon />
                    </IconButton>
                    <IconButton onClick={onIconsClick}>
                        <FavoriteIcon />
                    </IconButton>
                </StyledBox>
                <StyledBox gap={ "10px" } justify="flex-end" opacity="0.6">
                    <StyledBox gap="5px" align="center" title="Выполнений">
                        <BookCheckIcon />
                        <Typography>{ addedCount }</Typography>
                    </StyledBox>
                    <StyledBox gap="5px" align="center" title="Комментариев">
                        <CommentIcon />
                        <Typography>{ commentsCount }</Typography>
                    </StyledBox>
                </StyledBox>
            </StyledMapCardFooter>
        </StyledMapCard>
    )
}