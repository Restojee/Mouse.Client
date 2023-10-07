import React from 'react';
import {StyledBox} from "@/ui/Box";

type ScrollBoxType = {
    children: React.ReactNode
}
export const ScrollBox = ({children}: ScrollBoxType) => {
    return (
        <StyledBox width={"100%"} overflow={"hidden"}>
            <StyledBox
                gap={5}
                width={"100%"}
                overflow={"auto"}
                direction={"column"}
            >
                {children}
            </StyledBox>
        </StyledBox>
    );
};

