import { Point2 } from "./Point2";

export class Vector2{
  public readonly begin: Point2;
  public readonly end: Point2;
  public readonly vector: Point2;

  constructor(begin: Point2, end: Point2){
    this.begin = begin;
    this.end = end;
    this.vector = new Point2(end.x - begin.x, end.y - begin.y);
  }

  public get length(): number{
    return Math.sqrt(this.vector.x ** 2 + this.vector.y ** 2);
  }

  public getNormilized(): Vector2{
    const length = this.length;
    const normilized = new Point2(this.vector.x / length, this.vector.y / length);
    const end = new Point2(this.begin.x + normilized.x, this.begin.y + normilized.y);

    return new Vector2(this.begin, end);
  }

  public multipleScalar(scalar: number): Vector2{
    return new Vector2(this.begin, this.begin.Add(this.vector.MultiplyScalar(scalar)));
  }
}