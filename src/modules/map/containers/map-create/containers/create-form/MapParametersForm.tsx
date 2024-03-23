import { Tab } from '@/ui/Tabs/Tab';
import { Tabs } from '@/ui/Tabs/Tabs';
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

    const [currentTab, setCurrentTab] = useState<'map' | 'completed'>('map');

    const {
        image,
        completedMapImage,
        setImage,
        setCompletedMapImage,
    } = useMapCreate();

    const {
        tagsList,
        onOpenModal,
        selectedIdForCreateMap,
    } = useTag();

    const selectedTags = useMemo(() => {
        return tagsList.filter((tag) => selectedIdForCreateMap?.includes(tag.id));
    }, [tagsList, selectedIdForCreateMap]);

    const onOpenModalHandler = () => {
        onOpenModal('tag-update');
    };

    return (
        <PointBlock
            centeredTitle
            header="Доп. параметры карты"
            width={278}
            bottom="60px"
        >
            <StyledBox
                width={'100%'}
                gap="15px"
                direction="column"
            >
                <Tabs>
                    <Tab
                        onClick={() => setCurrentTab('map')}
                        isActive={currentTab === 'map'}
                        label={'Обложка'}
                    />
                    <Tab
                        onClick={() => setCurrentTab('completed')}
                        isActive={currentTab === 'completed'}
                        label={'Постройка'}
                    />
                </Tabs>
                <Display condition={currentTab === 'map'}>
                    <ImageForm
                        fileType="image"
                        onChange={setImage}
                        value={image || null}
                        messageWords={"обложку карты"}
                    />
                </Display>
                <Display condition={currentTab === 'completed'}>
                    <ImageForm
                        fileType="image"
                        onChange={setCompletedMapImage}
                        value={completedMapImage || null}
                        messageWords={"свою постройку"}
                    />
                </Display>
                <StyledBox
                    maxHeight={'150px'}
                    wrap={'wrap'}
                    gap={5}
                    overflow={'auto'}
                >
                    <Display condition={selectedTags.length}>
                        <>
                            <Typography>Теги: </Typography>
                            {selectedTags?.map(tag => (
                                <StyledTag
                                    key={tag.id}
                                    small
                                >
                                    {tag.name}
                                </StyledTag>
                            ))}
                        </>
                    </Display>
                    <StyledBox margin={selectedTags.length ? 'initial' : '10px auto 0 auto'}>
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
