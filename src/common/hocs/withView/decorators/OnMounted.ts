import { Metadata } from "@common/hocs/withView/constants";

function OnMounted(): MethodDecorator {
  return (target, key) => {
    const ctor = target.constructor;
    const inits = Reflect.getMetadata(Metadata.onInit, ctor) || [];
    inits.push(key);
    Reflect.defineMetadata(Metadata.onInit, inits, ctor);
  };
}

export default OnMounted;
