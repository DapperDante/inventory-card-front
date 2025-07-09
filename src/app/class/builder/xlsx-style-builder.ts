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
  public reset(): this {
    this.style = {
      font: {},
      alignment: {},
      border: {},
      fill: {},
      numFmt: ''
    };
    return this;
  }
  //Fill
  public setForegroundColor(rgb: string): this {
    this.style.fill.fgColor = { rgb };
    return this;
  }
  public setBackgroundColor(rgb: string): this {
    this.style.fill.bgColor = { rgb };
    return this;
  }
  //Font
  public setFontColor(rgb: string): this {
    this.style.font.color = { rgb };
    return this;
  }
  public setFontBold(): this {
    this.style.font.bold = true;
    return this;
  }
  public setFontItalic(): this {
    this.style.font.italic = true;
    return this;
  }
  public setFontUnderline(): this {
    this.style.font.underline = true;
    return this;
  }
  public setNameFont(name: string): this {
    this.style.font.name = name;
    return this;
  }
  //Alignment
  public setVertical(alignment: "top" | "center" | "bottom"): this {
    this.style.alignment.vertical = alignment;
    return this;
  }
  public setHorizontal(alignment: "left" | "center" | "right"): this {
    this.style.alignment.horizontal = alignment;
    return this;
  }
  public setWrapText(): this {
    this.style.alignment.wrapText = true;
    return this;
  }
  //Border
  public setBorderAll(style: BorderStyle, rgb: string): this {
    this.setBorderTop(style, rgb);
    this.setBorderRight(style, rgb);
    this.setBorderBottom(style, rgb);
    this.setBorderLeft(style, rgb);
    return this;
  }
  public setBorderTop(style: BorderStyle, rgb: string): this {
    this.style.border.top = {
      style,
      color: { rgb }
    }
    return this;
  }
  public setBorderRight(style: BorderStyle, rgb: string): this {
    this.style.border.right = {
      style,
      color: { rgb }
    }
    return this;
  }
  public setBorderBottom(style: BorderStyle, rgb: string): this {
    this.style.border.bottom = {
      style,
      color: { rgb }
    }
    return this;
  }
  public setBorderLeft(style: BorderStyle, rgb: string): this {
    this.style.border.left = {
      style,
      color: { rgb }
    }
    return this;
  }
}
