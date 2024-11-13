import EntityState from "@common/store/entity/EntityState";
import { Validated } from "@common/store/validate";
import { FieldProps } from "@common/store/fieldProps";

export class FormSchema<E extends {}> {

  private readonly _value: EntityState<E>;
  private validated: Map<string, Validated>;

  constructor(value: E) {
    this._value = new EntityState(value);
    for (let key in this._value.getFieldKeys()) {
      this.validated.set(key, new Validated<{}>(this._value[key]))
    }
  }

  public getValue() {
    return this._value;
  }

  public getIsValid() {
    return this._value.getFieldKeys();
  }

  public getField(key: string) {
    return new FieldProps(this.validated.get(key))
  }
}