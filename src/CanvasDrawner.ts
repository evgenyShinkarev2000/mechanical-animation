import { Point2 } from "./Point2";
import { Triangle } from "./Triangle";
import { Vector2 as Vector2 } from "./Vector2";

export class CanvasDrawner
{
  private readonly _canvasContext: CanvasRenderingContext2D;
  private readonly _pointC: Point2 = new Point2(980, 20);
  private readonly _pointH: Point2 = new Point2(770, 120);
  private readonly _pointF: Point2 = new Point2(550, 850);
  private readonly _lengthCB: number = 400;
  private readonly _lengthBD: number = 80;
  private readonly _lengthDE: number = 700;
  private readonly _lengthEF: number = 160;
  private readonly _lengthDG: number = 40;
  private _pointA: Point2;
  private _pointB: Point2;
  private _pointD: Point2;
  private _pointE: Point2;
  private _pointG: Point2;

  constructor(canvas: HTMLCanvasElement)
  {
    const context = canvas.getContext("2d");
    if (!context)
    {
      throw new Error();
    }
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    this._canvasContext = context;
  }

  public drawMechanism(x: number, y: number): void
  {
    this._pointA = new Point2(x, y);
    this.drawInit();
    this.drawAC();
    this.drawB();
    this.drawBEF();
    this.drawDG();
    this.drawDH();
  }

  private drawInit(): void
  {
    this._canvasContext.strokeRect(0, 0, 1000, 1000);
    this._canvasContext.moveTo(...this._pointC.coordinates);
    this._canvasContext.arc(...this._pointC.coordinates, 5, 0, Math.PI * 2);
    this._canvasContext.stroke();
    this._canvasContext.moveTo(...this._pointH.coordinates);
    this._canvasContext.arc(...this._pointH.coordinates, 5, 0, Math.PI * 2);
    this._canvasContext.stroke();
    this._canvasContext.moveTo(...this._pointF.coordinates);
    this._canvasContext.arc(...this._pointF.coordinates, 5, 0, Math.PI * 2);
    this._canvasContext.stroke();
  }

  private drawAC(): void
  {
    this._canvasContext.beginPath();
    this._canvasContext.moveTo(...this._pointA.coordinates);
    this._canvasContext.lineTo(...this._pointC.coordinates);
    this._canvasContext.stroke();
  }

  private drawB(): void
  {
    this._pointB = new Vector2(this._pointA, this._pointC)
      .getNormilized().vector
      .MultiplyScalar(this._lengthCB)
      .Add(this._pointA)

    this._canvasContext.beginPath();
    this._canvasContext.arc(...this._pointB.coordinates, 5, 0, Math.PI * 2);
    this._canvasContext.stroke();
  }

  private drawBEF(): void
  {
    const lengthBF = new Vector2(this._pointB, this._pointF).length;
    const cosEFB = Triangle.FindCosAB(this._lengthEF, lengthBF, this._lengthBD + this._lengthDE);
    const angleEFB = Math.acos(cosEFB);
    this._pointE = new Vector2(this._pointF, this._pointB)
      .getNormilized().vector
      .RotateLeft(angleEFB)
      .MultiplyScalar(this._lengthEF)
      .Add(this._pointF);

      this._canvasContext.beginPath();
      this._canvasContext.moveTo(...this._pointF.coordinates);
      this._canvasContext.lineTo(...this._pointE.coordinates);
      this._canvasContext.arc(...this._pointE.coordinates, 5, 0, Math.PI * 2);
      this._canvasContext.lineTo(...this._pointB.coordinates);
      this._canvasContext.stroke();
  }

  private drawDG(): void{
    const vectorEB = new Vector2(this._pointE, this._pointB);
    const vectorED = vectorEB.getNormilized().multipleScalar(this._lengthDE);
    this._pointD = vectorED.end;
    const directionDG = vectorED.getNormilized().vector.RotateRight(Math.PI / 2);
    this._pointG = vectorED.end.Add(directionDG.MultiplyScalar(this._lengthDG)); 

    this._canvasContext.beginPath();
    this._canvasContext.moveTo(...this._pointD.coordinates);
    this._canvasContext.arc(...this._pointD.coordinates, 3, 0, Math.PI * 2);
    this._canvasContext.fill();
    this._canvasContext.arc(...this._pointG.coordinates, 5, 0, Math.PI * 2);
    this._canvasContext.stroke();
  }

  private drawDH(): void{
    this._canvasContext.beginPath();
    this._canvasContext.moveTo(...this._pointG.coordinates);
    this._canvasContext.lineTo(...this._pointH.coordinates);
    this._canvasContext.stroke();
  }

}