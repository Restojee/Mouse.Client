import { ValidatorHandler } from "@common/store/form/types";

class FormField {
  get validators(): ValidatorHandler[] {
    return this._validators;
  }
  set validators(value: ValidatorHandler[]) {
    this._validators = value;
  }
  private _events: Map<string, Function[]> = new Map();

  private _validators: ValidatorHandler[] = [];
  get events(): Map<string, Function[]> {
    return this._events;
  }
  set events(value: Map<string, Function[]>) {
    this._events = value;
  }

  constructor(public name: string) {}

  public addEvent(eventType: string, handler: Function): this {
    if (!this.events.has(eventType)) {
      this.events.set(eventType, []);
    }
    this.events.get(eventType)!.push(handler);
    return this;
  }

  public addValidator(validator: ValidatorHandler): this {
    this.validators.push(validator);
    return this;
  }
}

export default FormField;