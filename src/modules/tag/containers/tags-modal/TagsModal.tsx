import { useTag } from '@/modules/tag/hooks/useTag';
import { StyledBox } from '@/ui/Box';
import { Modal } from '@/ui/Modal/Modal';
import { StyledTag } from '@/ui/Tag/styled';
import { Typography } from '@/ui/Typography';

export const TagsModal = () => {
    const {
        tagsList,
        onCloseModal,
        updateMapTags,
        modalType,
        toggleSelectedTag,
        checkIsSelectedTagId
    } = useTag();

    return (
        <Modal
            title={'Выберите теги'}
            isOpen={modalType === 'update'}
            onClose={onCloseModal}
            onAccess={updateMapTags}
            width={600}
        >
            <StyledBox gap="20px" direction="column" width="100%">
                <StyledBox
                    maxHeight="400px"
                    wrap={'wrap'}
                    gap={10}
                    overflow={'auto'}
                >
                    {tagsList.map(({ name, id }) => (
                        <StyledTag
                            key={name}
                            onClick={() => toggleSelectedTag(id)}
                            isActive={checkIsSelectedTagId(id)}
                            chips
                        >
                            <Typography isEllipsis>{name}</Typography>
                        </StyledTag>
                    ))}
                </StyledBox>
            </StyledBox>
        </Modal>
    );
};

