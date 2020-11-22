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
    if (position <= this.boundaryPoints.begin) {
      return this.boundaryPoints.realBegin;
    } else if (position >= this.boundaryPoints.end) {
      return this.boundaryPoints.realEnd;
    }

    const precPos =
      position / (this.boundaryPoints.end - this.boundaryPoints.begin);
    const real =
      (this.boundaryPoints.realEnd - this.boundaryPoints.realBegin) * precPos +
      this.boundaryPoints.realBegin;

    if (this.boundaryPoints.step === 0) {
      return Math.floor(real);
    }

    // const modulo = real % this.boundaryPoints.step;

    return Math.round(real);
  };

  getFixedPoint = (position: number, offset: number): number => {
    const newFlattenPosition = offset + position;
    if (newFlattenPosition < this.boundaryPoints.begin) {
      position = this.boundaryPoints.begin - offset;
    } else if (newFlattenPosition > this.boundaryPoints.end) {
      position = this.boundaryPoints.end - offset;
    }

    const pxDistance = this.boundaryPoints.end - this.boundaryPoints.begin;
    const realDistance =
      this.boundaryPoints.realEnd - this.boundaryPoints.realBegin;
    const pxPerReal = pxDistance / realDistance;

    const realValueStep =
      (this.realValue - this.boundaryPoints.realBegin) /
      this.boundaryPoints.step;

    return pxPerReal * realValueStep - offset;
  };

  forceSetValue = (value: number, realValue: number = this.realValue) => {
    this.value.setValue(value);
    this.realValue = realValue;
  };

  setPoint = (value: number, withoutCallback?: boolean) => {
    const newRealValue = this.getNewRealValue(value + this.getOffsetValue());

    if (this.realValue !== newRealValue) {
      this.realValue = newRealValue;

      const fixedPoint = this.getFixedPoint(value, this.getOffsetValue());
      this.value.setValue(fixedPoint);
      this.onPointChange && this.onPointChange(withoutCallback);
    }
  };

  getPointPositionBasedOnRealValue = (): number => {
    return this.getFixedPoint(this.getPointValue(), this.getOffsetValue());
  };

  fixPointPositionAfterRealValueRangeChange = () => {
    let position: number;
    let realValue: number | undefined;

    if (this.realValue <= this.boundaryPoints.realBegin) {
      position = this.boundaryPoints.begin;
      realValue = this.boundaryPoints.realBegin;
    } else if (this.realValue >= this.boundaryPoints.realEnd) {
      position = this.boundaryPoints.end;
      realValue = this.boundaryPoints.realEnd;
    } else {
      position = this.getPointPositionBasedOnRealValue();
    }

    this.forceSetValue(position, realValue);
  };
}
