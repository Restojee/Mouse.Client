import React from 'react';
import { GetMapsApiArg } from '@/api/codegen/genMouseMapsApi';
import { getMapImageLink } from '@/common/utils';
import { formatDateTime } from '@/common/utils/formatDateTime';
import useQueryParams from '@/hooks/useQueryParams';
import { StyledStatisticIconContainer, StyledStatisticIconText } from '@/layout/drawer/Statistic/styled';
import { useMapView } from '@/modules/map/containers/map-view-modal/hooks/useMapView';
import { useUser } from '@/modules/user/hooks/useUser';
import { BookCheckFillIcon } from '@/svg/BookCheckFillIcon';
import { CommentFillIcon } from '@/svg/CommentFillIcon';
import { FavoriteIcon } from '@/svg/FavoriteIcon';
import { InIcon } from '@/svg/InIcon';
import { Avatar } from '@/ui/Avatar';
import { StyledBox } from '@/ui/Box';
import { Button } from '@/ui/Button';
import { Modal } from '@/ui/Modal/Modal';
import { Typography } from '@/ui/Typography';

const UserModal = () => {
    const {
        onCloseUserModal,
        currentUserView,
    } = useUser();

    const {
        closeMap,
        levelId
    } = useMapView();

    const { updateFilter } = useQueryParams();

    const onFilterClick = async (filter: Partial<GetMapsApiArg>) => {
        await updateFilter(filter);
        onCloseUserModal();

        if (levelId) {
            await closeMap();
        }
    };

    return (
        <Modal
            isOpen={true}
            onClose={onCloseUserModal}
            title={currentUserView?.username}
            withoutButtons
        >
            <StyledBox align={'center'} direction={'column'} gap={20} width={'100%'}>
                <StyledBox
                    align="center"
                    gap={20}
                    overflow={'hidden'}
                    direction={'column'}
                    width={'100%'}
                >
                    <Avatar
                        size={100}
                        image={getMapImageLink(currentUserView?.avatar)}
                        username={currentUserView?.username}
                    />
                    <StyledBox
                        gap="5px"
                        direction="column"
                        overflow={'hidden'}
                    >
                        <StyledBox overflow={'hidden'}>
                            <Typography opacity="0.5" title={formatDateTime(currentUserView?.createdUtcDate)}
                                        isEllipsis>
                                Регистрация: {formatDateTime(currentUserView?.createdUtcDate, true)}
                            </Typography>
                        </StyledBox>
                    </StyledBox>
                </StyledBox>
                <StyledBox width={'100%'} align="center" justify={'space-between'}>
                    <StyledBox
                        grow="1"
                        justify="center"
                        title="Выполнено"
                        onClick={() => onFilterClick({ userId: currentUserView?.id, isCompleted: true, isFavorite: undefined })}
                    >
                        <StyledStatisticIconContainer
                            fillingPercent={'60%'}
                        >
                            <BookCheckFillIcon/>
                            <StyledStatisticIconText>
                                0
                            </StyledStatisticIconText>
                        </StyledStatisticIconContainer>
                    </StyledBox>
                    <StyledBox
                        onClick={() => alert('просмотр загруженных карт пока не работает')}
                        grow="1"
                        justify="center"
                        title="Добавлено"
                    >
                        <StyledStatisticIconContainer fillingPercent={'20%'}>
                            <InIcon/>
                            <StyledStatisticIconText>
                                0
                            </StyledStatisticIconText>
                        </StyledStatisticIconContainer>
                    </StyledBox>
                    <StyledBox
                        onClick={() => onFilterClick({ isFavorite: true, isCompleted: undefined, userId: currentUserView?.id })}
                        grow="1"
                        justify="center"
                        title="В избранном"
                    >
                        <StyledStatisticIconContainer>
                            <FavoriteIcon/>
                            <StyledStatisticIconText>{1}</StyledStatisticIconText>
                        </StyledStatisticIconContainer>
                    </StyledBox>
                    <StyledBox
                        onClick={() => alert('просмотр прокомментированных карт пока не работает')}
                        grow="1"
                        justify="center"
                        title="Оставлено комментариев"
                    >
                        <StyledStatisticIconContainer>
                            <CommentFillIcon/>
                            <StyledStatisticIconText>{1}</StyledStatisticIconText>
                        </StyledStatisticIconContainer>
                    </StyledBox>
                </StyledBox>
                <Button
                    size={'lg'}
                    label={'Закрыть'}
                    onClick={onCloseUserModal}
                />
            </StyledBox>
        </Modal>
    );
};

export default UserModal;