import { TagItemEntity } from "@/modules/tags/model/TagItemEntity";
import { Tag } from "@common/api/tags/types";
import { injectable } from "inversify";

@injectable()
export class TagMapper {
  public toAppTags(tags: Tag[]): TagItemEntity[] {
    return tags.map(tag => {
      return new TagItemEntity(
        tag.id,
        tag.description,
        tag.name,
      );
    });
  }

  public toApiTags(tagEntities: TagItemEntity[]): Tag[] {
    return tagEntities.map(tagEntity => ({
      id: tagEntity.id,
      name: tagEntity.title,
      description: tagEntity.description,
    }));
  }
}
