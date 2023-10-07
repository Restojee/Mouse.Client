import styled from "styled-components";
import { StyledBox } from "@/ui/Box/styles/StyledBox";

export const StyledPaper = styled(StyledBox)(({theme}) => ({
    display: 'flex',
    boxShadow: '0 0 100px 1px rgba(0, 0, 0, 1)',
    width: '100%',
    borderRadius: theme.blockSettings.siteBorder,
    height: '100%',
    maxHeight: '100%',
    backgroundColor: theme.colors.primary,
    zIndex: theme.order.modal,
}))