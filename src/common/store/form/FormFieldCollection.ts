import FormField from "@common/store/form/FormField";
import { ValidatorHandler } from "@common/store/form/types";

class FormFieldCollection {
  constructor(private fields: FormField[]) {}

  public addEvent(eventType: string, handler: Function): this {
    this.fields.forEach(field => field.addEvent(eventType, handler));
    return this;
  }

  public addValidator(handler: ValidatorHandler): this {
    this.fields.forEach(field => field.addValidator(handler));
    return this;
  }
}

export default FormFieldCollection;