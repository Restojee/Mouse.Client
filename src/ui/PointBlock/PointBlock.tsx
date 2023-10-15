import React from 'react';
import { Property } from "csstype";
import {
    StyledPointBlockBody,
    StyledPointBlockContainer,
    StyledPointBlockFooter,
    StyledPointBlockHeader
} from "@/ui/PointBlock/styled";


type PointBlockViewPropsType = {
    header: string,
    children: React.ReactNode,
    width: Property.Width,
    left: Property.Left,
    right: Property.Right,
    bottom: Property.Bottom,
    footer: React.ReactNode,
    isVisible: boolean
}
export function PointBlock(props: Partial<PointBlockViewPropsType>) {
    return (
        <StyledPointBlockContainer
            isVisible={ props.isVisible }
            left={ props.left }
            right={ props.right }
            width={ props.width }
            bottom={ props.bottom }
        >
            <StyledPointBlockHeader>{ props.header }</StyledPointBlockHeader>
            <StyledPointBlockBody>{ props.children }</StyledPointBlockBody>
            <StyledPointBlockFooter>{ props.footer }</StyledPointBlockFooter>
        </StyledPointBlockContainer>
    );
}
