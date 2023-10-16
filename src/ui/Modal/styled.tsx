import { IS_TABLET } from '@/common/constants';
import styled from "styled-components";

export const StyledModalWrapper = styled.div(({theme}) => ({
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    overflow: "auto",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: "center",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: theme.order.modal,
    padding: 40,
    ...IS_TABLET && {
        padding: 10
    }
}))


export const StyledMegaShadow = styled.div(({theme}) => ({
    position: 'fixed',
    zIndex: theme.order.megaShadow,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
}))