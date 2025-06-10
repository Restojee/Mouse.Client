import { TagItemEntity } from "@/modules/tags/model/TagItemEntity";
import { injectable } from "inversify";
import State from "@common/hocs/withView/decorators/State";
import Action from "@common/hocs/withView/decorators/Action";
import Computed from "@common/hocs/withView/decorators/Computed";

@injectable()
export class TagDataAccess  {

  @State()
  public tags: TagItemEntity[] = [];

  @Computed()
  public get allLevelTags(): TagItemEntity[] {
    return this.tags;
  }

  @Action()
  public setLevelTags(tags: TagItemEntity[]): void {
    this.tags = tags;
  }
}
