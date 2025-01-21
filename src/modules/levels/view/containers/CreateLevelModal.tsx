import React from "react";
import { Button, Form, Input, Paper, Spacer } from "@/common";
import { LevelMeta } from "@/modules/levels/model/common/constants";
import { LevelModuleProps } from "@/modules/levels/model/common/types";

const { name, description } = LevelMeta;

const CreateLevelModal: React.FC<LevelModuleProps> = ({ levelService }) => {
  const request = levelService.getLevelCreateForm();
  return (
    <Paper bgColor="secondary">
      <Spacer pa="sm">
        <Paper bgColor="primary">
          <Form onSubmit={levelService.createLevel}>
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
              <Button {...request.getSubmitProps()} />
            </Form.Field>
          </Form>
        </Paper>
      </Spacer>
    </Paper>
  )
}

export default React.memo(CreateLevelModal);