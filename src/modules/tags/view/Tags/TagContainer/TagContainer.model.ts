import { inject } from "inversify";
import {
  TagActionsInjectKey,
  TagDataAccessInjectKey,
  TagMapperInjectKey,
  TagMeta,
  TagsApiInjectKey,
} from "@/modules/tags/common/constants";
import { TagDataAccess } from "@/modules/tags/model/TagDataAccess";
import { CollectionProps } from "@ui/Collection/types";
import { TagItemEntity } from "@/modules/tags/model/TagItemEntity";
import TagItemView from "@/modules/tags/view/Tags/TagItem/TagItem.view";
import OnMounted from "@common/hocs/withView/decorators/OnMounted";
import { TagActions } from "@/modules/tags/model/TagActions";
import { makeAutoObservable } from "mobx";

export class TagContainerViewModel {

  constructor(
    @inject(TagActionsInjectKey) public tagActions: TagActions,
    @inject(TagDataAccessInjectKey) public tagDataAccess: TagDataAccess,
  ) {
    makeAutoObservable(this)
  }

  public get tagCollectionProps(): CollectionProps<TagItemEntity> {
    return {
      itemKey: TagMeta.id,
      Component: TagItemView,
      items: this.tagDataAccess.allLevelTags,
    }
  }

  @OnMounted()
  public loadTagCollection () {
    this.tagActions.loadTagCollection();
  }
}
