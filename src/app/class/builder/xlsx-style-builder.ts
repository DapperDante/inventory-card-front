export interface XLSXStyle {
  font: any;
  alignment: any;
  border: any;
  fill: any;
  numFmt: string;
}
type BorderStyle =
  | "dashDotDot"
  | "dashDot"
  | "dashed"
  | "dotted"
  | "hair"
  | "mediumDashDotDot"
  | "mediumDashDot"
  | "mediumDashed"
  | "medium"
  | "slantDashDot"
  | "thick"
  | "thin";

export class XLSXStyleBuilder{
  private style!: XLSXStyle;
  constructor(){
    this.reset();
  }
  public getStyle(): XLSXStyle{
    if(Object.values(this.style.fill).length === 0){
      delete this.style.fill;
    }
    return this.style;
  }
  public reset(): void{
    this.style = {
      font: {},
      alignment: {},
      border: {},
      fill: {},
      numFmt: ''
    };
  }
  //Fill
  public setForegroundColor(rgb: string): void{
    this.style.fill.fgColor = { rgb };
  }
  public setBackgroundColor(rgb: string): void{
    this.style.fill.bgColor = { rgb };
  }
  //Font
  public setFontColor(rgb: string): void{
    this.style.font.color = { rgb };
  }
  public setFontBold(): void{
    this.style.font.bold = true;
  }
  public setFontItalic(): void{
    this.style.font.italic = true;
  }
  public setFontUnderline(): void{
    this.style.font.underline = true;
  }
  public setNameFont(name: string): void{
    this.style.font.name = name;
  }
  //Alignment
  public setVertical(alignment: "top" | "center" | "bottom"){
    this.style.alignment.vertical = alignment;
  }
  public setHorizontal(alignment: "left" | "center" | "right"){
    this.style.alignment.horizontal = alignment;
  }
  public setWrapText(): void{
    this.style.alignment.wrapText = true;
  }
  //Border
  public setBorderAll(style: BorderStyle, rgb: string): void{
    this.setBorderTop(style, rgb);
    this.setBorderRight(style, rgb);
    this.setBorderBottom(style, rgb);
    this.setBorderLeft(style, rgb);
  }
  public setBorderTop(style: BorderStyle, rgb: string): void{
    this.style.border.top = {
      style,
      color: { rgb }
    }
  }
  public setBorderRight(style: BorderStyle, rgb: string): void{
    this.style.border.right = {
      style,
      color: { rgb }
    }
  }
  public setBorderBottom(style: BorderStyle, rgb: string): void{
    this.style.border.bottom = {
      style,
      color: { rgb }
    }
  }
  public setBorderLeft(style: BorderStyle, rgb: string): void{
    this.style.border.left = {
      style,
      color: { rgb }
    }
  }
}
