import { MAP_ADDITIONAL_INFO, MapInfoType } from '../../common/constants';
import React from 'react';
import { Map } from '@/api/codegen/genMouseMapsApi';
import { CopyIcon } from '@/svg/CopyIcon';
import { StyledBox } from '@/ui/Box';
import { IconButton } from '@/ui/Button/IconButton';
import { Typography } from '@/ui/Typography';

type MapContentHeaderPropsType = {
    completeCount: number;
    viewCount: number;
    commentsCount: number;
    map?: Map
}
export const MapContentHeader = (props: MapContentHeaderPropsType) => {
    const {
        completeCount,
        viewCount,
        commentsCount,
    } = props;

    const counts: {[key in MapInfoType]: number} = {
        complete: completeCount,
        view: viewCount,
        comments: commentsCount,
    };

    const onCopyClickHandler = async () => {
        const text = `!map ${props.map?.name}`

        try {
            await navigator.clipboard.writeText(text);
            alert('Скопировано!');
        } catch (error) {
            alert('Ошибка копирования');
        }
    }

    return (
        <StyledBox justify={'space-between'} align={'center'}>
            <StyledBox align={'center'} gap={10}>
                <Typography>
                    !map {props.map?.name}
                </Typography>
                <IconButton opacity="0.6" onClick={onCopyClickHandler}>
                    <CopyIcon/>
                </IconButton>
            </StyledBox>
            <StyledBox opacity={0.6} align={'center'} gap={15}>
                {MAP_ADDITIONAL_INFO?.map((info, index) => (
                    <StyledBox
                        key={index}
                        gap="5px"
                        align="center"
                        title={info.title}
                    >
                        {info.icon}
                        <Typography>{counts[info.label]}</Typography>
                    </StyledBox>
                ))}
            </StyledBox>
        </StyledBox>
    );
};

