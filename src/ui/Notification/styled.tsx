import styled from "styled-components";

const notificationHeight = 60

type TSNotificationWrapper = {
    notificationsCount: string | number;
};
export const SNotificationWrapper = styled.div<TSNotificationWrapper>(({ theme, ...props }) => ({
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: 15,
    alignItems: 'flex-end',
    overflow: 'hidden',
    maxHeight: (notificationHeight ) * 3 + 20 + 20,
    bottom: 20,
    right: '60px',
    color: '#fff',
    zIndex: theme.order.notifications,
    ...props.notificationsCount > 1 && {
        '&:after': {
            content: `'${ props.notificationsCount }'`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.secondary,
            color: theme.colors.textOnSecondary,
            boxShadow: '1px 1px 2px rgb(0, 0, 0, 0.1), -1px -1px 2px rgb(0, 0, 0, 0.1)',
            width: 30,
            height: 30,
            borderRadius: '50%',
            fontSize: 12,
            position: 'absolute',
            right: -170,
            top: -70,
            zIndex: theme.order.notifications,
        }
    }
}))

type TSNotificationContainerProps = {
    severity?: "error" | "success";
};
export const SNotificationContainer = styled.div<TSNotificationContainerProps>(({ theme, ...props }) => ({
    display: 'flex',
    bottom: '100%',
    alignItems: 'center',
    gap: 20,
    borderRadius: 20,
    color: '#fff',
    overflow: 'hidden',
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 330,
    height: notificationHeight,
    minHeight: notificationHeight,
    padding: '10px 20px',
    backgroundColor: props.severity
        ? theme.colors.status[props.severity]
        : theme.colors.primary,
    zIndex: theme.order.notifications,
    '&:last-of-type': {
        boxShadow: '0 0 5px 0 rgb(0, 0, 0, 0.3)',
    }
}))

export const SNotificationIcon = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 30,
    marginLeft: 'auto',
    height: 30,
    borderRadius: '50%',
    cursor: 'pointer',
    svg: {
        width: 24,
        height: 24,
    },
    circle: {
        stroke: '#fff'
    },

    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    }
})
