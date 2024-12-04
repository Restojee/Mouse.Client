// TODO Вынести в Тему

const getStylesFromProp = (propMap: Record<string, number>): string => {
  let top: number = 0;
  let button: number = 0;
  let left: number = 0;
  let right: number = 0;

  for (let key in propMap) {
    const size = propMap[key];
    switch (key) {
      case 'pa': {
        top = left = right = button = size;
        break;
      }
      case 'px': {
        left = right = size;
        break;
      }
      case 'py': {
        top = button = size;
        break;
      }
    }
  }

  return `${top}px ${right}px ${button}px ${left}px`;
}

export const percent = (number: number): string => `${number * 100}%`
export const px = (number: number): string => `${number}px`
export const calcSize = (size: number): string => size <= 1 ? percent(size) : px(size);
export const calcPadding = (propMap: Record<string, number>) => getStylesFromProp(propMap)