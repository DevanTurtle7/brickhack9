import Element from './Element';

export enum DragTypes {
  ELEMENT = 'element',
  DIVISOR = 'divisor',
}

export interface ConstantOrVariableItem {
  index: number;
  variableIndex?: number;
  isConstant: boolean;
  element: Element;
}
