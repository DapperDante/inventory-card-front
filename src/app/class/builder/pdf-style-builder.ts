import { Alignment, Style } from 'pdfmake/interfaces';

export class PDFStyleBuilder {
  private style!: Style;

  constructor() {
    this.reset();
  }

  reset() {
    this.style = {};
  }

  setFont(font: string): this {
    this.style.font = font;
    return this;
  }

  setFontSize(size: number): this {
    this.style.fontSize = size;
    return this;
  }

  setBold(): this {
    this.style.bold = true;
    return this;
  }

  setItalic(): this {
    this.style.italics = true;
    return this;
  }

  setColor(color: string): this {
    this.style.color = color;
    return this;
  }

  setAlignment(alignment: Alignment): this {
    this.style.alignment = alignment;
    return this;
  }

  setBackgroundColor(color: string): this {
    this.style.background = color;
    return this;
  }

  setMargin(margin: number): this {
    this.style.margin = margin;
    return this;
  }

  setMarginTop(margin: number): this {
    this.style.marginTop = margin;
    return this;
  }

  setMarginBottom(margin: number): this {
    this.style.marginBottom = margin;
    return this;
  }

  setMarginLeft(margin: number): this {
    this.style.marginLeft = margin;
    return this;
  }

  setMarginRight(margin: number): this {
    this.style.marginRight = margin;
    return this;
  }

  getStyle(): any {
    return this.style;
  }
}
