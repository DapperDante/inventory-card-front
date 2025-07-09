import {
  Column,
  Content,
  ContentColumns,
  ContentTable,
  Size,
  TableCell,
} from 'pdfmake/interfaces';

export class PDFContentBuilder {
  protected content!: Content;
  constructor() {
    this.reset();
  }
  reset() {
    this.content = [];
  }
  setText(text: string, style?: string | string[]): this {
    (this.content as Content[]).push({ text, style });
    return this;
  }
  setH1(text: string): this {
    (this.content as Content[]).push({ text, style: 'h1' });
    return this;
  }
  setH2(text: string): this {
    (this.content as Content[]).push({ text, style: 'h2' });
    return this;
  }
  setH3(text: string): this {
    (this.content as Content[]).push({ text, style: 'h3' });
    return this;
  }
  setTable(
    callback: (tableBuilder: PDFTableBuilder) => void,
    layout?: string,
    widths?: Size[]
  ): this {
    const tableBuilder = new PDFTableBuilder();
    callback(tableBuilder);
    (this.content as ContentTable[]).push({
      table: {
        widths,
        body: tableBuilder.getTableContent(),
      },
      layout,
    });
    return this;
  }
  setColumn(
    callback: (columnBuilder: PDFContentBuilder) => void,
  ): this {
    const columnBuilder = new PDFContentBuilder();
    callback(columnBuilder);
    (this.content as ContentColumns[]).push({
      columns: columnBuilder.getFormatting() as Column[],
    });
    return this;
  }
  getFormatting(): Content {
    return this.content;
  }
  setSVG(svg: string, width?: number, height?: number): this {
    (this.content as Content[]).push({ svg, width, height });
    return this;
  }
}
class PDFTableBuilder {
  private tableContent: TableCell[][];
  constructor() {
    this.tableContent = [];
  }
  setHeader(callback: (formattingBuilder: PDFContentBuilder) => void): this {
    const formattingBuilder = new PDFContentBuilder();
    callback(formattingBuilder);
    const header = formattingBuilder.getFormatting();
    (this.tableContent as TableCell[]).push(header);
    return this;
  }
  setRow(callback: (formattingBuilder: PDFContentBuilder) => void): this {
    const formattingBuilder = new PDFContentBuilder();
    callback(formattingBuilder);
    const row = formattingBuilder.getFormatting();
    (this.tableContent as TableCell[]).push(row);
    return this;
  }
  getTableContent(): TableCell[][] {
    return this.tableContent;
  }
}
