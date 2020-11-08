import AnimatedPoint from './AnimatedPoint';
import BoundaryPoints from './BoundaryPoints';

class Controller {
  x1: AnimatedPoint;
  x2: AnimatedPoint;
  activeLineBegin: AnimatedPoint;
  activeLineWidth: AnimatedPoint;

  boundaryPoints: BoundaryPoints;

  constructor(
    leftPointBeginPosition: number,
    pointsDistance: number,
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

    this.boundaryPoints = new BoundaryPoints(boundaryBegin, boundaryEnd);

    this.x1 = new AnimatedPoint(
      leftPointBeginPosition,
      this.boundaryPoints.getFixedPoint,
      this._activeLineUpdatePosition,
    );
    this.x2 = new AnimatedPoint(
      leftPointBeginPosition,
      this.boundaryPoints.getFixedPoint,
      this._activeLineUpdatePosition,
    );

    this.activeLineBegin = new AnimatedPoint(leftPointBeginPosition);
    this.activeLineWidth = new AnimatedPoint(rightPointBeginPosition);
  }

  private _activeLineUpdatePosition = () => {
    const x1: number = this.x1.getRealPointValue();
    const x2: number = this.x2.getRealPointValue();

    const lineBegin = x1 < x2 ? x1 : x2;
    const lineWidth = Math.abs(x1 - x2);

    this.activeLineBegin.setPoint(lineBegin);
    this.activeLineWidth.setPoint(lineWidth + 15);
  };
}

export default Controller;
