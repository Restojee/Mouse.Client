import { FormGroup } from "@common/store/form/FormGroup";
import { Configure } from "@common/store/form/types";
import Entity from "@common/store/entity/Entity";

interface ConfigurableForm<E extends Entity = Entity> {
  getForm(): FormGroup<E>

  configure(configure: Configure<Entity>): FormGroup<E>;
}

export default ConfigurableForm;