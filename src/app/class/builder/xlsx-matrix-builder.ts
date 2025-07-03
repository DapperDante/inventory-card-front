export class XLSXMatrixBuilder{
  private matrix!: any[][];
  constructor(){
    this.reset();
  }
  public reset(): void{
    this.matrix = [];
  }
  public setHeaders(headers: string[]): void {
    this.matrix.push(headers);
  }
  public setRow(row: any[]): void {
    this.matrix.push(row);
  }
  public setSpacing(): void{
    this.matrix.push([]);
  }
  public getMatrix(): any[][] {
    return this.matrix;
  }
}
