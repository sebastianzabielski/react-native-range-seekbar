import AnimatedPoint from './AnimatedPoint';
import BoundaryPoints from './BoundaryPoints';

class Controller {
  x1: AnimatedPoint;
  x2: AnimatedPoint;
  activeLineBegin: AnimatedPoint;
  activeLineWidth: AnimatedPoint;

  boundaryPoints: BoundaryPoints;

  pointWidth: number;

  private _onValueChange: (values: [number, number]) => void;

  constructor(
    leftPointBeginPosition: number,
    pointsDistance: number,
    realBegin: number,
    realEnd: number,
    pointWidth: number,
    step: number,
    onValueChange: (values: [number, number]) => void,
    boundaryBegin?: number,
    boundaryEnd?: number,
  ) {
    const rightPointBeginPosition = leftPointBeginPosition + pointsDistance;

    if (boundaryBegin === undefined) {
      boundaryBegin = leftPointBeginPosition;
    }
    if (boundaryEnd === undefined) {
      boundaryEnd = rightPointBeginPosition;
    }

    this.boundaryPoints = new BoundaryPoints(
      boundaryBegin,
      boundaryEnd,
      step,
      realBegin,
      realEnd,
    );

    this.x1 = new AnimatedPoint(
      leftPointBeginPosition,
      this.boundaryPoints,
      this.handlePointPositionChange,
    );
    this.x2 = new AnimatedPoint(
      leftPointBeginPosition,
      this.boundaryPoints,
      this.handlePointPositionChange,
    );

    this.activeLineBegin = new AnimatedPoint(
      leftPointBeginPosition,
      this.boundaryPoints,
    );
    this.activeLineWidth = new AnimatedPoint(
      rightPointBeginPosition,
      this.boundaryPoints,
    );

    this.pointWidth = pointWidth;
    this._onValueChange = onValueChange;
  }

  handlePointPositionChange = (withoutCallback?: boolean) => {
    if (!withoutCallback) {
      let left = this.x1.realValue;
      let right = this.x2.realValue;
      if (right < left) {
        const temp = left;
        left = right;
        right = temp;
      }
      this._onValueChange([left, right]);
    }
    this._activeLineUpdatePosition();
  };

  private _activeLineUpdatePosition = () => {
    const x1: number = this.x1.getRealPointValue();
    const x2: number = this.x2.getRealPointValue();

    const lineBegin = x1 < x2 ? x1 : x2;
    const lineWidth = Math.abs(x1 - x2);

    this.activeLineBegin.forceSetValue(lineBegin);
    this.activeLineWidth.forceSetValue(lineWidth + this.pointWidth);
  };

  updatePropertyValues = (
    realBegin: number,
    realEnd: number,
    pointWidth: number,
  ) => {
    this.boundaryPoints.updateRealPoints(realBegin, realEnd);
    this.pointWidth = pointWidth;
    this.fixPointPosition();
  };

  fixPointPosition = (withoutCallback?: boolean) => {
    const { realBegin, realEnd } = this.boundaryPoints;
    if (realBegin === realEnd) {
      this.x1.forceSetValue(this.boundaryPoints.begin, realBegin);
      this.x2.forceSetValue(this.boundaryPoints.end, realEnd);
    } else {
      this.x1.fixPointPositionAfterRealValueRangeChange();
      this.x2.fixPointPositionAfterRealValueRangeChange();
    }
    this.handlePointPositionChange(withoutCallback);
  };
}

export default Controller;
