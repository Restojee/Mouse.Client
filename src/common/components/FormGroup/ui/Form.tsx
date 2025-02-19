import * as React from 'react';
import { FormItemComponent } from '@ui/FormGroup/ui/FormItem';
import { FormRowComponent } from '@ui/FormGroup/ui/FormRow';
import { type FormProps } from '@ui/FormGroup';
import { Space } from '@ui/Layout';
import { Controls } from '@ui/GroupControls';
import { Button } from '@ui/Button';
import { Input } from '@ui/Input';
import { PropsWithChildren } from "react";

const FormComponent: React.FC<FormProps> = () => (
  <Space>
    <div />
  </Space>
);

const FormInputComponent: React.FC = () => (
  <Space>
    <input />
  </Space>
);

const FormButtonComponent: React.FC = () => (
  <Space>
    <button />
  </Space>
);

const FormSubmitComponent: React.FC = () => (
  <Space>
    <button type="submit" />
  </Space>
);

export const Form = Object.assign(FormComponent, {
  Field: Object.assign(FormItemComponent, {
    Input: FormInputComponent,
    Submit: FormSubmitComponent,
    Button: FormButtonComponent
  }),
  Row: FormRowComponent,
});

const t = () => (
  <Form>
    <Form.Row>
      <Input.Text />
    </Form.Row>
    <Form.Row>
      <Form.Field label="test 1" error="error">

      </Form.Field>
      <Form.Field label="test 2" />
    </Form.Row>
    <Form.Field>
      <Controls>
        <Controls.Item>
          <Button.Submit />
        </Controls.Item>
        <Controls.Item>
          <Button.Cancel />
        </Controls.Item>
      </Controls>
    </Form.Field>
  </Form>
);
