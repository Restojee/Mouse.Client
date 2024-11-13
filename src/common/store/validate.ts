export class Validated<E = unknown> {

  private _value: E;
  private _isValid: boolean;
  private _error: string;

  constructor(value: E) {
    this._value = value;
  }

  getError(): string {
    return this._error;
  }

  getIsValid(): boolean {
    return this._isValid;
  }

  getValue(): E {
    return this._value;
  }

  setValue(value: E) {
    this._value = value;
  }
}