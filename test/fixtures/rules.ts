import { Shape } from './types.js';

const unused = 1;

export const describeShape = (shape: Shape) => {
  switch (shape.kind) {
    case 'circle':
      return "round";
  }

  return 'unknown';
};

export const firstChar = (value?: string): string => value!.charAt(0);

export const compare = (a: number, b: number): boolean => {
  if (a == b) return true;

  return false;
};

export const pickTwice = (items: number[]): number[] =>
  Array.from(items).map((item) => item * 2);

// eslint-disable-next-line no-console
console.log('a');

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- testing restricted disable
export const loose: any = 1;

export default describeShape;
