import EntityState from "@common/store/entity/EntityState";
import { Validated } from "@common/store/validate";
import FieldProps from "@common/store/form/FieldProps";
import { InputPropsGetter, InputPropsOptions } from "@common/store/form/types";
import InputProps from "@common/store/form/InputProps";
import { SubmitProps } from "@common/store/form/SubmitProps";

export class FormGroup<E> {

  private _value: EntityState<E>;

  // remove after fields
  private validatedByField: Map<string, Validated>;

  // private fields: Map<string, FieldSchema>

  public handleFieldValueChange(key: string, value: string){
    return this._value.setField(key, value);
  }
  public getFormStateValue(): EntityState<E>{
    return this._value;
  }
  public getValidatedFields(){
    return Array.from(this.validatedByField);
  }
  public getIsValuesValid(){
    return this.getValidatedFields().every(([_, validate]) => validate.getIsValid());
  };
  public getValueByFieldKey(key: string){
    return this._value.getField(key);
  };

  constructor(value: E) {
    this.initEntityState(value);
    this.setValidated();
  }

  public initEntityState(value: E) {
    this._value = new EntityState(value);
  }

  public setValidated() {
    for (let key in this._value.getFieldKeys()) {
      this.validatedByField.set(key, new Validated<{}>(this._value[key]))
    }
  }

  public getInputOptions = (key: string): InputPropsOptions => {
    return {
      value: this.getValueByFieldKey(key),
      onChange: this.handleFieldValueChange(key, this._value.getField(key))
    };
  }

  public getInputProps = (key: string): InputPropsGetter => {
    // this.validated.validate(fieldValue)
    return new InputProps(this.getInputOptions(key)).getProps()
  }

  public getFieldProps(key: string) {
    return new FieldProps(this.validatedByField.get(key)).getProps()
  }

  public getSubmitProps() {
    return new SubmitProps();
  }
}