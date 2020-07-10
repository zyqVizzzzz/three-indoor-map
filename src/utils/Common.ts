export class Rect {
  public tl: Array<number>; //top left point
  public br: Array<number>; //bottom right point
  constructor(
    minx: number = 0,
    miny: number = 0,
    maxx: number = 0,
    maxy: number = 0
  ) {
    this.tl = [minx, miny];
    this.br = [maxx, maxy];
  }
}

export function getBoundingRect(points: Array<number>): Rect {
  let rect = new Rect();
  if (points.length < 2) {
    return rect;
  }
  let minX = 9999999,
    minY = 9999999,
    maxX = -9999999,
    maxY = -9999999;
  for (let i = 0; i < points.length - 1; i += 2) {
    if (points[i] > maxX) {
      maxX = points[i];
    }
    if (points[i] < minX) {
      minX = points[i];
    }
    if (points[i + 1] > maxY) {
      maxY = points[i + 1];
    }
    if (points[i + 1] < minY) {
      minY = points[i + 1];
    }
  }
  rect.tl = [minX, minY];
  rect.br = [maxX, maxY];
  return rect;
}
