import styled from 'styled-components';

export const StyledUpdateAvatarShadow = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    opacity: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '50%',
    cursor: 'pointer',
    '&:hover': {
        opacity: 1
    }
})

export const StyledUpdateAvatar = styled.div<{image: string}>((props)=>({
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: '50%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    // backgroundColor: props.theme.colors.mapBackground,
    backgroundImage: props.image
}))