import { useTag } from "@/modules/tag/hooks/useTag";
import { StyledBox } from "@/ui/Box";
import { AsyncSheet } from "@/ui/Sheet/view";
import tagStyles from "@/ui/Tag/Tag.module.scss";
import { Typography } from "@/ui/Typography";

const TagsModal = () => {
  const { tagsList, onCloseModal, updateMapTags, toggleSelectedTag, checkIsSelectedTagId } = useTag();

  return (
    <AsyncSheet
      isOpen={true}
      title={"Выберите теги"}
      onClose={onCloseModal}
      onAccess={updateMapTags}
      width={600}
      height={500}
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
            <div
              key={name}
              onClick={() => toggleSelectedTag(id)}
              className={[tagStyles.tag, tagStyles.chips, checkIsSelectedTagId(id) && tagStyles.active]
                .filter(Boolean)
                .join(" ")}
              style={{
                display: "flex",
                backgroundColor: checkIsSelectedTagId(id) ? undefined : "var(--color-neutral)",
              }}
            >
              <Typography isEllipsis>{name}</Typography>
            </div>
          ))}
        </StyledBox>
      </StyledBox>
    </AsyncSheet>
  );
};

export default TagsModal;
