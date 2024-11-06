import User from "@/modules/users/User";
import Entity from '@common/store/entity/Entity';
import { LevelFields } from "@/modules/levels/model/common/types";
import { Field } from "@common/store/entity/utils";
import { string } from "yup";

class LevelEntity extends Entity {

  @Field('name')
  private _name: string;

  @Field('description')
  private _description: string;

  @Field('user')
  private _user?: User;

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