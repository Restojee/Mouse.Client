export const percent = (number: number): string => `${number * 100}%`
export const px = (number: number): string => `${number}px`
export const calc = (size: number): string => size <= 1 ? percent(size) : px(size);