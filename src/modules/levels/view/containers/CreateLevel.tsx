import React from "react";
import { Controls, Form, Paper, Spacer } from "@/common";
import { LevelModuleProps } from "@/modules/levels/model/common/types";

const CreateLevel: React.FC<LevelModuleProps> = (props) => {
  return (
    <Paper bgColor="secondary">
      <Spacer pa="sm">
        <Paper bgColor="primary">
          {/*<ContextMenu provider={contextMenu}>*/}
            <Form>
              <Controls>
                <Controls.Item>
                  <Form.Field.Input />
                </Controls.Item>
                <Controls.Item>
                  <Form.Field.Input />
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