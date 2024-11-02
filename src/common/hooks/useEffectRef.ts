import * as React from 'react';

type EffectRef<E extends HTMLElement = HTMLElement> = (element: E | null) => void;
type RefCallback<E extends HTMLElement = HTMLElement> = (element: E) => (() => void) | void;
const noop = () => {};

const useEffectRef = <Element extends HTMLElement = HTMLElement>(
  callback: RefCallback<Element>,
): EffectRef<Element> => {
  const disposeRef = React.useRef<() => void>(noop);

  return React.useCallback(
    (element: Element | null) => {
      disposeRef.current();
      disposeRef.current = noop;

      if (element) {
        const dispose = callback(element);

        if (typeof dispose === 'function') {
          disposeRef.current = dispose;
        }
        // Have an extra type check to work with javascript.
        else if (dispose !== undefined) {
          // eslint-disable-next-line no-console
          console.warn('Effect ref callback must return undefined or a dispose function');
        }
      }
    },
    [callback],
  );
};

export default useEffectRef;
