import { COLORS } from './constant';

/**
 * Only use for snapshot test
 */
export interface ColorProp {
  _color?: typeof COLORS[number];
}