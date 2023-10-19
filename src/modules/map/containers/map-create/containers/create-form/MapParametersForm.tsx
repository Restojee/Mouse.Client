import React, { useMemo, useState } from 'react';
import { useMapCreate } from '@/modules/map/containers/map-create/hooks/useMapCreate';
import { useTag } from '@/modules/tag/hooks/useTag';
import { Button } from '@/ui/Button';
import { Display } from '@/ui/Display';
import { PointBlock } from '@/ui/PointBlock/PointBlock';
import { StyledBox } from '@/ui/Box';
import { Typography } from '@/ui/Typography/styles/Typography';
import { EditFillIcon } from '@/svg/EditFillIcon';
import { ImageForm } from '@/ui/ImageForm/ImageForm';
import { StyledTag } from '@/ui/Tag/styled';

export const MapParametersForm = () => {
    const [mapImage, setMapImage] = useState<string | null>(null);

    const {
        setImage,
    } = useMapCreate();

    const {
        tagsList,
        onOpenModal,
        selectedIdForCreateMap
    } = useTag();

    const selectedTags = useMemo(() => {
        return tagsList.filter((tag) => selectedIdForCreateMap?.includes(tag.id));
    }, [tagsList, selectedIdForCreateMap]);

    const onOpenModalHandler = () => {
        onOpenModal('update');
    };

    const onChangePackImage = (file: string) => {
        setMapImage(file);
        setImage(file);
    };

    return (
        <PointBlock
            centeredTitle
            header="Доп. параметры карты"
            width="230px"
            bottom="60px"
        >
            <StyledBox
                width={'100%'}
                gap="15px"
                direction="column"
            >
                <ImageForm
                    fileType="image"
                    onChange={onChangePackImage}
                    value={mapImage}
                />
                <StyledBox wrap={'wrap'} gap={5}>
                    <Display condition={selectedTags.length}>
                        <>
                            <Typography>Теги: </Typography>
                            {selectedTags?.map(tag => (
                                <StyledTag
                                    key={tag.id}
                                    small>
                                    {tag.name}
                                </StyledTag>
                            ))}
                        </>
                    </Display>
                    <StyledBox margin={'10px auto 0 auto'}>
                        <Button
                            onClick={onOpenModalHandler}
                            size={'sm'}
                            prepend={<EditFillIcon/>}
                            label={'Изменить теги'}
                        />
                    </StyledBox>
                </StyledBox>
            </StyledBox>
        </PointBlock>
    );
};
