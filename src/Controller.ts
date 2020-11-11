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
      this._handlePointPositionChange,
    );
    this.x2 = new AnimatedPoint(
      leftPointBeginPosition,
      this.boundaryPoints,
      this._handlePointPositionChange,
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

  _handlePointPositionChange = (withoutCallback?: boolean) => {
    if (!withoutCallback) {
      this._onValueChange([this.x1.realValue, this.x2.realValue]);
    }
    this._activeLineUpdatePosition();
  };

  private _activeLineUpdatePosition = () => {
    const x1: number = this.x1.getRealPointValue();
    const x2: number = this.x2.getRealPointValue();

    const lineBegin = x1 < x2 ? x1 : x2;
    const lineWidth = Math.abs(x1 - x2);

    this.activeLineBegin.silentlySetPoint(lineBegin);
    this.activeLineWidth.silentlySetPoint(lineWidth + this.pointWidth);
  };
}

export default Controller;
