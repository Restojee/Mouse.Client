import { Validated } from "@common/store/validate";
import { GetError, GetIsValid } from "@common/store/form/types";

class FieldProps {
  private readonly _getIsValid: GetIsValid;
  private readonly _getError: GetError;

  get getError(): GetError {
    return this._getError;
  }
  get getIsValid(): GetIsValid {
    return this._getIsValid;
  }

  constructor(validate: Validated<any>) {
    this._getIsValid = validate.getIsValid
    this._getError = validate.getError
    return this;
  }

  public getProps = () => ({
    isValid: this.getIsValid(),
    error: this._getError(),
  })
}

export default FieldProps