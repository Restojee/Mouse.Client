import * as React from 'react';
import { FormItemComponent } from '@ui/FormGroup/ui/FormItem';
import { FormRowComponent } from '@ui/FormGroup/ui/FormRow';
import { type FormProps } from '@ui/FormGroup';
import { Space } from '@ui/Layout';
import { Controls } from '@ui/GroupControls';
import { Button } from '@ui/Button';
import { Input } from '@ui/Input';

const FormComponent: React.FC<FormProps> = () => (
  <Space>
    <div />
  </Space>
);

export const Form = Object.assign(FormComponent, {
  Item: FormItemComponent,
  Row: FormRowComponent,
});

const t = () => (
  <Form>
    <Form.Row>
      <Input.Text />
    </Form.Row>
    <Form.Row>
      <Form.Item label="test 1" error="error">

      </Form.Item>
      <Form.Item label="test 2" />
    </Form.Row>
    <Form.Item>
      <Controls>
        <Controls.Item>
          <Button.Submit />
        </Controls.Item>
        <Controls.Item>
          <Button.Cancel />
        </Controls.Item>
      </Controls>
    </Form.Item>
  </Form>
);
