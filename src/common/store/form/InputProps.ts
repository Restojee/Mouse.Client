import { GetValue, HandleChange, InputPropsGetter, InputPropsOptions } from "@common/store/form/types";

class InputProps {
  private readonly _getValue: GetValue;
  private readonly _handleChange: HandleChange;

  constructor({ value, onChange }: InputPropsOptions) {
    this._getValue = value;
    this._handleChange = onChange;
    return this;
  }

  public handleChange(event): void {
    this._handleChange(event.target.value)
  }

  public getProps = (): InputPropsGetter => ({
    value: this._getValue(),
    onChange: this.handleChange
  })
}

export default InputProps;