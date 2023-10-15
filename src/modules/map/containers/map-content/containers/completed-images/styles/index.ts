import { MINI_IMAGES_HEIGHT, MINI_IMAGES_WIDTH } from '../constants';
import styled from 'styled-components';

type StyledMiniMapImageContainerPropsType = {
    isVisible?: boolean,
    username?: string,
    isActive?: boolean
}
export const StyledMiniMapImageContainer = styled.div<StyledMiniMapImageContainerPropsType>(({theme, ...props}) => ({
    height: MINI_IMAGES_HEIGHT,
    maxHeight: MINI_IMAGES_HEIGHT,
    minHeight: MINI_IMAGES_HEIGHT,
    display: 'flex',
    justifyContent: 'center',
    overflow: "hidden",
    alignItems: 'center',
    minWidth: MINI_IMAGES_WIDTH,
    maxWidth: MINI_IMAGES_WIDTH,
    borderRadius: 10,
    backgroundColor: theme.colors.primaryLight,
    cursor: 'pointer',
    position: 'relative',
    transition: '0.1s',
    transitionProperty: 'background-color, transform, box-shadow',

    '&:hover': {
        transform: 'scale(0.97)',
    },

    '&:active': {
        transform: 'scale(0.96)',
    },
    ...props.isVisible && {
        '&::after': {
            content: `' ${ props.username } '` || "' '",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            borderRadius: 'inherit',
            backdropFilter: 'blur(4px)',
            '-webkit-backdrop-filter': 'blur(4px)',
            transition: '0.7s',
            transitionProperty: 'opacity',
        },
        '&:hover': {
            '&::after': {
                opacity: 0.3,
            }
        }
    },
    ...props.isActive && {
        backgroundColor: theme.colors.mapBackground,
        boxShadow: '0 0 5px 0 rgba(255, 255, 255, 0.3)',
        pointerEvents: 'none',
        '&::after': {
            opacity: 0.3,
        }
    },
}))
