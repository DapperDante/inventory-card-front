import { Color, FontType, HAlignType, LineWidths, Styles, VAlignType } from 'jspdf-autotable';

export class PDFStyleBuilder {
  private style!: Partial<Styles>;

  constructor() {
    this.reset();
  }

  reset() {
    this.style = {};
  }

  setFont(font: FontType): void {
    this.style.font = font;
  }

  setFontSize(size: number): void {
    this.style.fontSize = size;
  }

  setTextColor(color: Color): void {
    this.style.textColor = color;
  }

  setFillColor(color: Color): void {
    this.style.fillColor = color;
  }

  setLineColor(color: Color): void {
    this.style.lineColor = color;
  }

  setLineWidth(width: number | Partial<LineWidths>) {
    this.style.lineWidth = width;
  }

  setVertical(alignment: VAlignType){
    this.style.valign = alignment;
  }

  setHorizontal(alignment: HAlignType){
    this.style.halign = alignment;
  }

  getStyle(): Partial<Styles> {
    return this.style;
  }
}
