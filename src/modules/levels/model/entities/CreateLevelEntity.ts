import { Entity, Field } from "@common/store/entity/utils";
import { IsNotEmpty, IsString } from "class-validator";
import { LevelMeta } from "@/modules/levels/model/common/constants";

@Entity(LevelMeta.create)
export class CreateLevelEntity {

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