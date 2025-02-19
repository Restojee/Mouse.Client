import EntityState from "@common/store/entity/EntityState";
import FieldProps from "@common/store/form/FieldProps";
import {
  FieldPropsOptions,
  InputPropsOptions,
  SubmitPropsOptions,
} from "@common/store/form/types";
import InputProps from "@common/store/form/InputProps";
import FormBuilder from "@common/store/form/FormBuilder";
import FormField from "@common/store/form/FormField";
import FormValidator from "@common/store/form/FormValidator";
import SubmitProps from "@common/store/form/SubmitProps";

export class FormGroup<E> {

  private _value: EntityState<E>;
  private _formFields: Map<string, FormField>;
  private _formValidator: FormValidator<E>

  private initValidator() {
    this._formValidator = new FormValidator<E>(this._value, this._formFields);
  }
  private initEntityState(value: E) {
    this._value = new EntityState(value);
  }

  constructor(value: E, private configure?: (builder: FormBuilder<E>) => void) {
    const builder = new FormBuilder(value);
    this.configure(builder)
    this.initEntityState(value);
    this.initValidator();
  }

  public getFormStateValue(): EntityState<E>{
    return this._value;
  }
  public handleInputChange(key: string, value: string){
    return this._value.setField(key, value);
  }
  public getFormField(key: string) {
    return this._value.getField(key);
  }
  public getValidatedFields() {
    return this._formValidator.getValidatedFields();
  }
  public getValidatedField(key: string) {
    return this.getValidatedFields().get(key);
  };
  public getValidatedForm(){
    return this._formValidator.validateAllFields();
  }

  public getInputOptions = (key: string): InputPropsOptions => {
    const fieldValue = this.getFormField(key);
    return {
      value: fieldValue,
      onChange: this.handleInputChange(key, fieldValue)
    };
  }
  public getFieldOptions = (key: string): FieldPropsOptions => {
    return {
      validate: this.getValidatedField(key),
    }
  }
  public getSubmitOptions = (): SubmitPropsOptions => {
    return {
      validate: this.getValidatedForm()
    }
  }

  public getInputProps(key: string)  {
    return new InputProps(this.getInputOptions(key)).getProps();
  }
  public getFieldProps(key: string) {
    return new FieldProps(this.getFieldOptions(key)).getProps();
  }
  public getSubmitProps() {
    return new SubmitProps(this.getSubmitOptions()).getProps();
  }
}