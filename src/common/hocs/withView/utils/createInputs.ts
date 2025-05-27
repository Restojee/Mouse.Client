import { runInAction } from "mobx";
import { Metadata } from "@common/hocs/withView/constants";

export function createInputs<Instance, Props extends {}>(instance: Instance, props: Props): void {
  runInAction(() => {
    const inputProperties: string[] = Reflect.getMetadata(Metadata.input, instance.constructor) || [];
    inputProperties.forEach(propName => {
      if(props.hasOwnProperty(propName) && instance.hasOwnProperty(propName)){
        runInAction(() => instance[propName] = props[propName])
      }
    })
  });
}
