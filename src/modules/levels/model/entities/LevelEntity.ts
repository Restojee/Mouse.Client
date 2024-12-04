import User from "@/modules/users/User";
import { Field } from "@common/store/entity/utils";
import { LevelMeta } from "@/modules/levels/model/common/constants";
import Entity from "@common/store/entity/Entity";

class LevelEntity extends Entity {

  @Field(LevelMeta.id)
  private _id: string;

  @Field(LevelMeta.name)
  private _name: string;

  @Field(LevelMeta.description)
  private _description: string;

  @Field(LevelMeta.user)
  private _user?: User;

  get id() : string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  get user(): User {
    return this._user;
  }
  set user(value: User) {
    this._user = value;
  }

  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

}

export default LevelEntity;