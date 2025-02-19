import React from "react";
import { Controls, Form, Paper, Spacer } from "@/common";
import { LevelMeta } from "@/modules/levels/model/common/constants";
import { LevelModuleProps } from "@/modules/levels/model/common/types";
import { LevelActionsInjectKey } from "@/modules/levels/model/services/LevelActions";

const { name, description } = LevelMeta;

const CreateLevel: React.FC<LevelModuleProps> = ({ [LevelActionsInjectKey]: levelService }) => {
  return (
    <Paper bgColor="secondary">
      <Spacer pa="sm">
        <Paper bgColor="primary">
          {/*<ContextMenu model={contextMenu}>*/}
            <Form
              // from={createForm}
            >
              <Controls>
                <Controls.Item>
                  <Form.Field.Input key={name} />
                </Controls.Item>
                <Controls.Item>
                  <Form.Field.Input key={description} />
                </Controls.Item>
              </Controls>
              <Form.Field.Submit />
            </Form>
          {/*</ContextMenu>*/}
        </Paper>
      </Spacer>
    </Paper>
  )
}

export default React.memo(CreateLevel);