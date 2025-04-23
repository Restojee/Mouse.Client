import React from "react";
import { LevelModuleProps } from "@/modules/levels/model/common/types";
import { Spacer } from "@ui/Layout/ui/Spacer/ui/Spacer";
import { Form } from "@ui/FormGroup";
import { Controls } from "@ui/GroupControls";
import { Paper } from "@common/components/Layout";

const CreateLevel: React.FC<LevelModuleProps> = (props) => (
  <Paper bgColor="paletteBackgroundPrimary">
    <Spacer pa="sm">
      <Paper bgColor="paletteBackgroundSecondary">
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

export default React.memo(CreateLevel);
