import TagsApi from "@common/api/tags/api";
import { inject, injectable } from "inversify";

import { TagDataAccess } from "@/modules/tags/model/TagDataAccess";
import { TagMapper } from "@/modules/tags/common/mappers";
import { TagDataAccessInjectKey, TagMapperInjectKey, TagsApiInjectKey } from "@/modules/tags/common/constants";
import OnMounted from "@common/hocs/withView/decorators/OnMounted";
import { makeAutoObservable, runInAction } from "mobx";
import Action from "@common/hocs/withView/decorators/Action";

@injectable()
export class TagActions  {

  constructor(
    @inject(TagDataAccessInjectKey) private readonly tagDataAccess: TagDataAccess,
    @inject(TagsApiInjectKey) private readonly tagsApi: TagsApi,
    @inject(TagMapperInjectKey) private readonly mapper: TagMapper,
  ) {}

  @Action()
  public async loadTagCollection() {
    const response = await this.tagsApi.collect();
    const tags = this.mapper.toAppTags(response);
    this.tagDataAccess.setLevelTags(tags);
  }
}
