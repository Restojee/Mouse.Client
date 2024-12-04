import { Paper, Spacer } from "@ui/Layout";
import { Button, Form, Input } from "@/common";
import LevelStore from "@/modules/levels/model/store";
import React from "react";
import { LevelMeta } from "@/modules/levels/model/common/constants";

const store = new LevelStore();
const { name, description } = LevelMeta;

const Levels: React.FC = () => {
  const request = store.getLevelCreateForm();

  return (
    <Paper bgColor="secondary">
      <Spacer pa={5}>
        <Paper bgColor="primary">
          <Form onSubmit={store.createLevel}>
            <Form.Field {...request.getFieldProps(name)}>
              <Input {...request.getInputProps(name)}/>
            </Form.Field>
            <Form.Field {...request.getFieldProps(description)}>
              <Input {...request.getInputProps(description)}/>
            </Form.Field>
            <Form.Field {...request.getFieldProps(description)}>
              <Input {...request.getInputProps(description)}/>
            </Form.Field>
            <Form.Field>
              <Button type="submit" disabled={!request.getIsValuesValid()} />
            </Form.Field>
          </Form>
        </Paper>
      </Spacer>
    </Paper>
  )
}

export default React.memo(Levels);