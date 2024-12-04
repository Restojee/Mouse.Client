import { Field } from "@common/store/entity/utils";
import { IsNotEmpty, IsString } from "class-validator";
import { LevelMeta } from "@/modules/levels/model/common/constants";
import Entity from "@common/store/entity/Entity";

export class CreateLevelEntity extends Entity {

  @Field(LevelMeta.name)
  @IsString()
  @IsNotEmpty()
  private _name: string;

  @Field(LevelMeta.description)
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
}