import { TagItemEntity } from "@/modules/tags/model/TagItemEntity";
import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";

@injectable()
export class TagDataAccess  {

  public tags: TagItemEntity[] = [];

  constructor() {
    makeAutoObservable(this)
  }

  public get allLevelTags(): TagItemEntity[] {
    return this.tags;
  }

  public setLevelTags(tags: TagItemEntity[]): void {
    this.tags = tags;
  }
}
