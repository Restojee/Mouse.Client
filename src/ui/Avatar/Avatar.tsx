import { AVATAR_SIZE } from '@/ui/Avatar/constants';
import { getInitials } from '@/ui/Avatar/utils';
import { StyledBox } from '@/ui/Box';
import { Display } from '@/ui/Display';
import * as React from 'react';
import Image from 'next/image';

type AvatarPropsType = {
    image?: string;
    username?: string;
    size?: React.CSSProperties['width'];
}
export const Avatar: React.FunctionComponent<AvatarPropsType> = (props) => {
    const {
        size,
        image,
        username,
    } = props;

    const initials = React.useMemo(() => {
        return getInitials(username);
    }, [username, image]);

    return (
        <StyledBox
            align={'center'}
            justify={'center'}
            fontSize={'1.2rem'}
            fontWeight={500}
            borderRadius={50}
            overflow={'hidden'}
            width={size}
            height={size}
            bgColor={'rgba(0, 0, 0, 0.05)'}
        >
            <Display condition={image}>
                <Image
                    src={image || ''}
                    width={size}
                    height={size}
                />
            </Display>
            <Display condition={!image}>
                <StyledBox>
                    {initials}
                </StyledBox>
            </Display>
        </StyledBox>
    )
};

Avatar.defaultProps = {
    size: AVATAR_SIZE,
};


