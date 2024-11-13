import { Validated } from "@common/store/validate";

export class FieldProps {
  private readonly _isValid: () => boolean;
  private readonly _error: () => string;

  get error(): () => string {
    return this._error;
  }
  get isValid(): () => boolean {
    return this._isValid;
  }

  constructor(validate: Validated<any>) {
    this._isValid = validate.getIsValid
    this._error = validate.getError
  }
}