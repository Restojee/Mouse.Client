import { DEFAULT_MAP_IMAGE } from "@/common/constants";
import { useAppTheme } from '@/hooks/useAppTheme';
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

    const { theme } = useAppTheme()

    const initials = React.useMemo(() => {
        return getInitials(username);
    }, [username, image]);

    return (
        <StyledBox
            align={'center'}
            justify={'center'}
            fontSize={size && size > 70 ? '2.5rem' : '1.2rem'}
            fontWeight={300}
            borderRadius={'50%'}
            overflow={'hidden'}
            width={size}
            height={size}
            minWidth={size}
            bgColor={theme.colors.mapBackgroundLight}
            color={'#fff'}
        >
            <Display condition={image}>
                <Image
                    src={image || DEFAULT_MAP_IMAGE}
                    width={size}
                    height={size}
                    objectFit={'cover'}
                    objectPosition={'center'}
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


