import { useTag } from "@/modules/tag/hooks/useTag";
import { StyledBox } from "@/ui/Box";
import { Modal } from "@/ui/Modal/Modal";
import { StyledTag } from "@/ui/Tag/styled";
import { Typography } from "@/ui/Typography";

const TagsModal = () => {
  const { tagsList, onCloseModal, updateMapTags, toggleSelectedTag, checkIsSelectedTagId } = useTag();

  return (
    <Modal
      isOpen={true}
      title={"Выберите теги"}
      onClose={onCloseModal}
      onAccess={updateMapTags}
      width={600}
    >
      <StyledBox
        gap="20px"
        direction="column"
        width="100%"
      >
        <StyledBox
          maxHeight="400px"
          wrap={"wrap"}
          gap={10}
          overflow={"auto"}
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

export default TagsModal;
