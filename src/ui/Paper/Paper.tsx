import React from 'react';
import { StyledPaper } from "./styled";
import { StyledBoxProps } from "@/ui/Box";

const Paper = ({children, ...props}: Partial<StyledBoxProps>) => {
    return (
        <StyledPaper {...props}>
            {children}
        </StyledPaper>
    );
};

export default Paper;