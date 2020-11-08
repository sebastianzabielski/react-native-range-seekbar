export default class BoundaryPoints {
  private begin: number;
  private end: number;

  constructor(begin: number, end: number) {
    this.begin = begin;
    this.end = end;
  }

  getFixedPoint = (position: number, offset: number) => {
    const newFlattenPosition = offset + position;

    if (newFlattenPosition < this.begin) {
      position = this.begin - offset;
    } else if (newFlattenPosition > this.end) {
      position = this.end - offset;
    }

    return position;
  };

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
