export class Triangle
{
  public static FindCosAB(a: number, b: number, c: number): number
  {
    if (a + b < c || a + c < b || b + c < a){
      throw new Error();
    }
    return (a ** 2 + b ** 2 - c ** 2) / (2 * a * b)
  }
}