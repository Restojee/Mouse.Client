import { Paper } from '@ui/Layout';
import { Button, Form, Input } from "@/common";
import LevelStore from "@/modules/levels/model/store";
import React from "react";
import { LevelMeta } from "@/modules/levels/model/common/constants";

const store = new LevelStore();
const { Name, Description } = LevelMeta;

const Levels = () => {

  const request = store.getLevelCreateForm();

  return (
    <Paper bgColor="secondary">
      <Form onSubmit={store.createLevel}>
        <Form.Field {...request.getField(Name)}>
          <Input {...request.Input(Name)}/>
        </Form.Field>
        <Form.Field {...request.getField(Description)}>
          <Input {...request.Input(Description)}/>
        </Form.Field>
        <Form.Field>
          <Button type="submit" disabled={!request.getIsValid()} />
        </Form.Field>
      </Form>
    </Paper>
  )
}

export default React.memo(Levels);