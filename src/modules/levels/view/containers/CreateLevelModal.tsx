import React from "react";
import { Button, Controls, Form, Input, Paper, Spacer } from "@/common";
import { LevelMeta } from "@/modules/levels/model/common/constants";
import { LevelModuleProps } from "@/modules/levels/model/common/types";
import { LevelServiceInjectKey } from "@/modules/levels/model/services/LevelService";

const { name, description } = LevelMeta;

const CreateLevelModal: React.FC<LevelModuleProps> = ({ [LevelServiceInjectKey]: levelService }) => {
  // const createForm = levelService.getLevelCreateForm();
  // const contextMenu = levelService.getLevelContextMenu();
  return (
    <Paper bgColor="secondary">
        <Spacer pa="sm">
          <Paper bgColor="primary">
            {/*<ContextMenu model={contextMenu}>*/}
              <Form
                // model={createForm}
              >
                <Controls>
                  <Controls.Item>
                    <Form.Field.Input key={name} />
                  </Controls.Item>
                  <Controls.Item>
                    <Form.Field.Input key={description} />
                  </Controls.Item>
                </Controls>
                <Form.Field.Submit  />
              </Form>
            {/*</ContextMenu>*/}
          </Paper>
        </Spacer>
    </Paper>
  )
}

export default React.memo(CreateLevelModal);