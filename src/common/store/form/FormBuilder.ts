import FormField from "@common/store/form/FormField";
import FormFieldCollection from "@common/store/form/FormFieldCollection";

class FormBuilder<E> {
  private fields: Map<string, FormField> = new Map();

  constructor(entity: E) {
    this.initializeFields(entity);
  }

  private initializeFields(entity: E) {
    Object.keys(entity).forEach(key => {
      this.fields.set(key, new FormField(key));
    });
  }

  getField(fieldName: string): FormField {
    return this.fields.get(fieldName)!;
  }

  getFields(...fieldNames: string[]): FormFieldCollection {
    return new FormFieldCollection(fieldNames.map(name => this.fields.get(name)!));
  }
}

export default FormBuilder;