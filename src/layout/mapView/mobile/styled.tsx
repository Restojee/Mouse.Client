import styled from "styled-components";
import { Property } from "csstype";

type StyledMobileMapDrawerPropsType = {
    padding?: Property.Padding,
    bgColor?: Property.BackgroundColor
}
export const StyledMobileMapDrawer = styled.div<StyledMobileMapDrawerPropsType>(({ theme, ...props }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    width: '100%',
    alignSelf: 'center',
    position: 'relative',
    padding: props.padding || 25,
    '&:after': {
        content: "''",
        borderRadius: 2,
        height: 3,
        width: '20%',
        position: 'absolute',
        backgroundColor: props.bgColor || theme.colors.neutral,
    }
}))
