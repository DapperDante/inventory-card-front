export class XLSXMatrixBuilder{
  private matrix!: any[][];
  constructor(){
    this.reset();
  }
  public reset(): this {
    this.matrix = [];
    return this;
  }
  public setHeaders(headers: string[]): this {
    this.matrix.push(headers);
    return this;
  }
  public setRow(row: any[]): this {
    this.matrix.push(row);
    return this;
  }
  public setSpacing(): this {
    this.matrix.push([]);
    return this;
  }
  public getMatrix(): any[][] {
    return this.matrix;
  }
}
