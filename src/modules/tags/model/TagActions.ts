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
  ) {
    makeAutoObservable(this)
  }

  private getTagApi(): TagsApi {
    return this.tagsApi;
  }

  public loadTagCollection() {
    this.getTagApi().collect().then(response => {
      this.tagDataAccess.setLevelTags(this.mapper.toAppTags(response));
    });
  }
}
