import EntityState from "@common/store/entity/EntityState";
import { Validated } from "@common/store/validate";
import FieldProps from "@common/store/form/FieldProps";
import { InputPropsGetter, InputPropsOptions } from "@common/store/form/types";
import InputProps from "@common/store/form/InputProps";

export class FormSchema<E> {

  private _value: EntityState<E>;

  // remove after fields
  private validated: Map<string, Validated>;

  // private fields: Map<string, FieldSchema>

  public handleValueChange = (key: string, value: string) => this._value.setField(key, value);
  public getValue = () => this._value
  public getIsValuesValid = () => Array.from(this.validated).every(([_, validate]) => validate.getIsValid());
  public getValueByFieldKey = (key: string) => this._value.getField(key);

  constructor(value: E) {
    this.initEntityState(value);
    this.setValidated();
  }

  public initEntityState(value: E) {
    this._value = new EntityState(value);
  }

  public setValidated() {
    for (let key in this._value.getFieldKeys()) {
      this.validated.set(key, new Validated<{}>(this._value[key]))
    }
  }

  public getInputOptions = (key: string): InputPropsOptions => {
    const value = this._value.getField(key);
    return {
      value: this.getValueByFieldKey(key),
      onChange: this.handleValueChange(key, value)
    };
  }

  public getInputProps = (key: string): InputPropsGetter => {
    // this.validated.validate(fieldValue)
    return new InputProps(this.getInputOptions(key)).getProps()
  }

  public getFieldProps(key: string) {
    return new FieldProps(this.validated.get(key)).getProps()
  }
}