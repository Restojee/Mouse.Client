import { Field } from "@common/store/entity/utils";
import { IsString } from "class-validator";
import Entity from "@common/store/entity/Entity";

export class UpdateLevelEntity extends Entity {

  @Field('id')
  private _id: string;

  @Field('name')
  @IsString()
  private _name: string;

  @Field('description')
  @IsString()
  private _description: string;

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }

  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
}