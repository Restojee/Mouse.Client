import "reflect-metadata";
import { string } from "yup";

class Entity {
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  public fieldKeys: Record<string, string> = {};

  private _id: string;

  public getFieldKeys(): Record<string, string> {
    return this.fieldKeys;
  }
}

export default Entity;