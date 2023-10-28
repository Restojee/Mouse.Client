import React, { useEffect } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { InfoItem } from '@/layout/drawer/Info/InfoItem';
import { selectIsAuth } from '@/modules/auth/slice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppTheme } from '@/hooks/useAppTheme';
import { CreateInfoModal } from '@/modules/info/containers/create-modal/CreateInfoModal';
import { useInfo } from '@/modules/info/hooks/useInfo';
import { getInfoThunk } from '@/modules/info/slice';
import { AddIcon } from '@/svg/AddIcon';
import { BoxLoader } from '@/ui/BoxLoader/BoxLoader';
import { IconButton } from '@/ui/Button/IconButton';
import { Display } from '@/ui/Display';
import { Typography } from '@/ui/Typography/styles/Typography';
import { StyledBox } from '@/ui/Box';
import { StyledInfoList } from '@/layout/drawer/Info/styled';
import { StyledDrawerHeader } from '@/layout/drawer/styled';

export const Info = () => {
    const dispatch = useAppDispatch();
    const theme = useAppTheme();

    const isAuth = useAppSelector(selectIsAuth);

    const {
        onModalOpen,
        infoList,
        removeInfo,
        updateInfo,
        isInfoFetching,
        selectInfo,
    } = useInfo();

    useEffect(() => {
        dispatch(getInfoThunk());
    }, []);

    return (
        <StyledBox
            direction="column"
            padding="0 20px 20px 20px"
            overflow={'auto'}
            grow={1}
        >
            <StyledDrawerHeader>
                <Typography>
                    Полезная инфа
                </Typography>
                <Display condition={isAuth}>
                    <IconButton onClick={() => onModalOpen()}>
                        <AddIcon color={theme.colors.secondaryAccent}/>
                    </IconButton>
                </Display>
            </StyledDrawerHeader>
            <Display condition={infoList.length}>
                <StyledInfoList>
                    {infoList.map((info) => (
                        <InfoItem
                            key={info.id}
                            info={info}
                            selectInfo={selectInfo}
                            removeInfo={removeInfo}
                        />
                    ))}
                </StyledInfoList>
            </Display>
            <Display condition={!infoList.length && !isInfoFetching}>
                <StyledBox margin={'auto'}>
                    Полезной инфы еще нет.
                </StyledBox>
            </Display>
            <BoxLoader isLoading={isInfoFetching}/>
            <CreateInfoModal/>
        </StyledBox>
    );
};



