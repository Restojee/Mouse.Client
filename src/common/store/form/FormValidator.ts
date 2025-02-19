import EntityState from "@common/store/entity/EntityState";
import FormField from "@common/store/form/FormField";
import Validated from "@common/store/Validate";

class FormValidator<E> {
  private validatedFields: Map<string, Validated> = new Map();

  constructor(private entityState: EntityState<E>, private formFields: Map<string, FormField>) {
    this.validateFields();
  }

  private validateFields() {
    this.formFields.forEach((field, key) => {
      const value = this.entityState.getField(key);
      this.validatedFields.set(key, this.validateField(field, value));
    });
  }

  private validateField(field: FormField, value: any): Validated {
    const isValid = value !== undefined && value !== null && value !== "";
    const error = isValid ? "" : "Поле обязательно для заполнение";
    const validated = new Validated(value);
    validated.setIsValid(isValid);
    validated.setError(error);
    return validated;
  }

  public validateAllFields(): Validated {
    this.validateFields();
    const isValid = Array.from(this.validatedFields.values()).every(validated => validated.getIsValid());
    const validatedResult = new Validated(this.validatedFields);
    validatedResult.setIsValid(isValid);
    validatedResult.setError(isValid ? "" : "Some fields are invalid");
    return validatedResult;
  }

  public getValidatedFields(): Map<string, Validated> {
    return this.validatedFields;
  }
}

export default FormValidator;