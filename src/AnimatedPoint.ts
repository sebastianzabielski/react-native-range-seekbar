import { Animated } from 'react-native';
import BoundaryPoints from './BoundaryPoints';

export default class AnimatedPoint {
  private value: Animated.Value;
  private onPointChange?: (withoutCallback?: boolean) => void;
  private boundaryPoints: BoundaryPoints;

  realValue: number;

  constructor(
    value: number,
    boundaryPoints: BoundaryPoints,
    onPointChange?: (withoutCallback?: boolean) => void,
  ) {
    this.value = new Animated.Value(value);
    this.boundaryPoints = boundaryPoints;
    this.onPointChange = onPointChange;

    this.realValue = this.getNewRealValue(value);
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

  getNewRealValue = (position: number) => {
    // console.log(position);
    if (position <= this.boundaryPoints.begin) {
      return this.boundaryPoints.realBegin;
    } else if (position >= this.boundaryPoints.end) {
      return this.boundaryPoints.realEnd;
    }

    const precPos =
      (position - this.boundaryPoints.realBegin) /
      (this.boundaryPoints.end - this.boundaryPoints.begin);
    const real =
      (this.boundaryPoints.realEnd - this.boundaryPoints.realBegin) * precPos +
      this.boundaryPoints.realBegin;

    if (this.boundaryPoints.step === 0) {
      return Math.floor(real);
    }

    const modulo = real % this.boundaryPoints.step;
    console.log(
      real,
      modulo,
      this.boundaryPoints.step,
      this.boundaryPoints.step / 2,
      modulo >= this.boundaryPoints.step / 2,
    );
    // if (modulo >= this.boundaryPoints.step / 2) {
    //   return Math.floor(
    //     this.boundaryPoints.step * Math.round(real / this.boundaryPoints.step),
    //   );
    // }
    return (
      Math.floor(real - (real % this.boundaryPoints.step)) +
      this.boundaryPoints.realBegin
    );
  };

  getFixedPoint = (position: number, offset: number): number => {
    const newFlattenPosition = offset + position;
    if (newFlattenPosition < this.boundaryPoints.begin) {
      position = this.boundaryPoints.begin - offset;
    } else if (newFlattenPosition > this.boundaryPoints.end) {
      position = this.boundaryPoints.end - offset;
    }
    return position;
  };

  silentlySetPoint = (value: number) => {
    this.value.setValue(value);
  };

  setPoint = (value: number, withoutCallback?: boolean) => {
    const newRealValue = this.getNewRealValue(value + this.getOffsetValue());
    const fixedPoint = this.getFixedPoint(value, this.getOffsetValue());

    console.log(this.realValue, newRealValue);

    if (this.realValue !== newRealValue) {
      this.value.setValue(fixedPoint);
      this.realValue = newRealValue;

      this.onPointChange && this.onPointChange(withoutCallback);
    }
  };
}
