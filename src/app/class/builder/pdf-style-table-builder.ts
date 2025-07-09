import { Content, ContentTable, ContentText, CustomTableLayout, TableCell } from "pdfmake/interfaces";

export class PDFStyleTableBuilder {
  private style!: CustomTableLayout;
  constructor(){
    this.reset();
  }
  reset(): this{
    this.style = {};
    return this;
  }
  setWidthBorderHorizontal(width: number): this{
    this.style.hLineWidth = () => width;
    return this;
  }
  setWidthBorderVertical(width: number): this{
    this.style.vLineWidth = () => width;
    return this;
  }
  setColorBorderHorizontal(color: string): this{
    this.style.hLineColor = () => color;
    return this;
  }
  setColorBorderVertical(color: string): this{
    this.style.vLineColor = () => color;
    return this;
  }
  setPaddingTop(padding: number): this {
    this.style.paddingTop = () => padding;
    return this;
  }
  setPaddingBottom(padding: number): this {
    this.style.paddingBottom = () => padding;
    return this;
  }
  setPaddingLeft(padding: number): this {
    this.style.paddingLeft = () => padding;
    return this;
  }
  setPaddingRight(padding: number): this {
    this.style.paddingRight = () => padding;
    return this;
  }
  setBackgroundHeader(color: string): this {
    this.style.fillColor = (rowIndex: number, node: ContentTable, columnIndex: number) => {
      return node.table.body.find(row => {(row[0] as ContentText).style === 'headerStyle'}) ? color : 'white';
    };
    return this;
  }
  setBackgroundRow(color: string): this {
    this.style.fillColor = (rowIndex: number, node: ContentTable, columnIndex: number) => {
      return node.table.body.find(row => {(row[0] as ContentText).style === 'rowTable'}) ? color : 'white';
    };
    return this;
  }
  getStyle(): CustomTableLayout{
    return this.style;
  }
}
