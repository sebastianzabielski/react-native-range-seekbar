export interface IBoundaryPoints {
  getFixedPoint: (
    position: number,
    offset: number,
  ) => {
    position: number;
    realValue: number;
  };
}

export default class BoundaryPoints implements IBoundaryPoints {
  begin: number;
  end: number;

  realBegin: number;
  realEnd: number;

  step: number;

  constructor(
    begin: number,
    end: number,
    step: number,
    realBegin: number,
    realEnd: number,
  ) {
    this.begin = begin;
    this.end = end;
    this.realBegin = realBegin;
    this.realEnd = realEnd;

    this.step = step;
  }

  updatePoints = (begin: number = this.begin, end: number = this.end) => {
    this.setBegin(begin);
    this.setEnd(end);
  };

  setBegin = (begin: number) => {
    this.begin = begin;
  };

  setEnd = (end: number) => {
    this.end = end;
  };
}
