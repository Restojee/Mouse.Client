import React from 'react';
import {CloseIcon} from "@/svg/CloseIcon";
import {StyledButtonIcon} from "@/ui/Button/styles/StyledButtonIcon";
import {Typography} from "@/ui/Typography/styles/Typography";
import {StyledBox} from "@/ui/Box/styles/StyledBox";
import {infoMoc} from "@/moc/drawerInfoMoc";
import {StyledInfoBlock, StyledInfoList} from "@/layout/drawer/Info/styled";
import { StyledDrawerHeader } from "@/layout/drawer/styled";

export const Info = () => {
    return (
        <StyledBox direction="column" padding="0 20px 20px 20px" overflow={"auto"}>
            <StyledDrawerHeader>
                Полезная инфа
            </StyledDrawerHeader>
            <StyledInfoList>
                {infoMoc.map(({ title, date, text, id }) => (
                    <StyledBox key={id} gap="5px" direction="column">
                        <StyledBox align="center">
                            <Typography margin="0 0 0 15px" addSize="0" opacity="0.5">
                                {title}
                            </Typography>
                            <StyledButtonIcon margin="0 0 0 auto">
                                <CloseIcon color="gray" />
                            </StyledButtonIcon>
                        </StyledBox>
                        <StyledInfoBlock>
                            <Typography>{text}</Typography>
                            <Typography margin="10px 0 0 auto" opacity="0.5" addSize="-2px">
                                {date}
                            </Typography>
                        </StyledInfoBlock>
                    </StyledBox>
                ))}
            </StyledInfoList>
        </StyledBox>
    );
}



