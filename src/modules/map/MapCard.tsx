import { useAppTheme } from "@/hooks/useAppTheme";
import { StyledMapCard } from "@/modules/map/styles/StyledMapCard";
import { StyledMapCardHeader } from "@/modules/map/styles/StyledMapCardHeader";
import { Typography } from "@/ui/Typography/styles/Typography";
import { StyledMapCardBody } from "@/modules/map/styles/StyledMapCardBody";
import { StyledMapCardButton } from "@/modules/map/styles/StyledMapCardButton";
import { StyledMapCardFooter } from "@/modules/map/styles/StyledMapCardFooter";
import { StyledBox} from "@/ui/Box/styles/StyledBox";
import {FavoriteIcon} from "@/svg/FavoriteIcon";
import {BookCheckIcon} from "@/svg/BookCheckIcon";
import {CommentIcon} from "@/svg/CommentIcon";
import {CopyIcon} from "@/svg/CopyIcon";
import { Button } from "@/ui/Button/Button";
import {ImageIcon} from "@/svg/ImageIcon";
import Image from "next/image";

type MapCardProps = {
    label?: string | null;
    isMapHover?: boolean;
    addedCount?: number;
    commentsCount?: number;
    image?: string | null;
    onClick?: () => void;
}
export const MapCard = (props: MapCardProps) => {

    const theme = useAppTheme();

    const {
        label,
        isMapHover,
        addedCount,
        image = "",
        onClick,
        commentsCount
    } = props;
    return (
        <StyledMapCard>
            <StyledMapCardHeader>
                <Typography>{ label }</Typography>
                <CopyIcon />
            </StyledMapCardHeader>
            <StyledMapCardBody>
                <StyledMapCardButton isHover={ isMapHover } onClick={ onClick }>
                    <Button backgroundColor={ theme.colors.status.success } label="Открыть" />
                </StyledMapCardButton>
                <Image src={ image || "https://i.imgur.com/WpmGIaD.png" } alt=" " width={300} height={200}  />
            </StyledMapCardBody>
            <StyledMapCardFooter justify="space-between">
                <StyledBox gap={"10px"} justify="flex-start">
                    <ImageIcon />repla
                    <FavoriteIcon />
                </StyledBox>
                <StyledBox gap={"10px"} justify="flex-end" opacity="0.6">
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