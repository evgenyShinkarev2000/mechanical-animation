export class Point2
{
  public readonly x: number;
  public readonly y: number;

  public get coordinates(): [number, number] {
    return [this.x, this.y];
  }

  constructor(x: number, y: number)
  {
    this.x = x;
    this.y = y;
  }

  public Add(point: Point2): Point2
  {
    return new Point2(this.x + point.x, this.y + point.y);
  }

  public MultiplyScalar(scalar: number)
  {
    return new Point2(this.x * scalar, this.y * scalar);
  }

  public Substract(point: Point2)
  {
    return this.Add(point.MultiplyScalar(-1));
  }

  public RotateLeft(radian: number): Point2
  {
    return new Point2(
      this.x * Math.cos(radian) + this.y * Math.sin(radian),
      -this.x * Math.sin(radian) + this.y * Math.cos(radian),
    );
  }

  public RotateRight(radian: number): Point2{
    return this.RotateLeft(-radian);
  }
}