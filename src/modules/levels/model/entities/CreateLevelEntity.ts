import { Entity, Field } from "@common/store/entity/utils";
import { IsNotEmpty, IsString } from "class-validator";
import { LevelMeta } from "@/modules/levels/model/common/constants";

@Entity(LevelMeta.Create)
export class CreateLevelEntity {

  @Field(LevelMeta.Name)
  @IsString()
  @IsNotEmpty()
  private _name: string;

  @Field(LevelMeta.Description)
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