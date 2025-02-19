import { SubmitPropsOptions, GetError, GetIsValid } from "@common/store/form/types";

class SubmitProps {
  private readonly _getIsValid: GetIsValid;
  private readonly _getError: GetError;

  get getError(): GetError {
    return this._getError;
  }
  get getIsValid(): GetIsValid {
    return this._getIsValid;
  }

  constructor({ validate }: SubmitPropsOptions) {
    this._getIsValid = validate.getIsValid;
    this._getError = validate.getError;
    return this;
  }

  public getProps = () => ({
    isValid: this.getIsValid(),
    error: this._getError(),
  })
}

export default SubmitProps