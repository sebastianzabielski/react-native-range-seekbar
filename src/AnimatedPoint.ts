import { Animated } from 'react-native';

const returnPosition = (position: number) => position;

export default class AnimatedPoint {
  private value: Animated.Value;
  private onPointChange?: () => void;
  private getFixedPoint: (position: number, offset: number) => number;

  constructor(
    value: number,
    getFixedPoint: (
      position: number,
      offset: number,
    ) => number = returnPosition,
    onPointChange?: () => void,
  ) {
    this.value = new Animated.Value(value);
    this.getFixedPoint = getFixedPoint;
    this.onPointChange = onPointChange;
  }

  getPoint = () => {
    return this.value;
  };

  getPointValue = () => {
    //@ts-ignore
    return this.value._value;
  };

  getOffsetValue = () => {
    //@ts-ignore
    return this.value._offset;
  };

  getRealPointValue = () => {
    return this.getOffsetValue() + this.getPointValue();
  };

  startObserve = () => {
    this.value.setOffset(this.getPointValue());
    this.value.setValue(0);
  };

  stopObserve = () => {
    this.value.flattenOffset();
  };

  setPoint = (value: number) => {
    const fixedPoint = this.getFixedPoint(value, this.getOffsetValue());
    this.value.setValue(fixedPoint);
    this.onPointChange && this.onPointChange();
  };
}
