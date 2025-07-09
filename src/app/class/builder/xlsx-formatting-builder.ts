export interface CellRange {
  s: { r: number; c: number };
  e: { r: number; c: number };
}

export interface MergedCell {
  s: { r: number; c: number };
  e: { r: number; c: number };
}

export interface ColumnWidth {
  wch: number;
}
export interface ConfigXLSXFormatting {
  range?: CellRange;
  mergedCells: MergedCell[];
  columnWidths: ColumnWidth[];
}
export class XLSXFormattingBuilder {
  private config!: ConfigXLSXFormatting;
  constructor(){
    this.reset();
  }
  reset(): this {
    this.config = {
      mergedCells: [],
      columnWidths: [],
    };
    return this;
  }
  setRange(startRow: number, startCol: number, endRow: number, endCol: number): this {
    this.config.range = {
      s: { r: startRow, c: startCol },
      e: { r: endRow, c: endCol },
    };
    return this;
  }
  setMergedCell(startRow: number, startCol: number, endRow: number, endCol: number): this {
    this.config.mergedCells.push({
      s: { r: startRow, c: startCol },
      e: { r: endRow, c: endCol },
    });
    return this;
  }
  setColumnWidth(width: number): this {
    this.config.columnWidths.push({
      wch: width,
    });
    return this;
  }
  getConfig(): ConfigXLSXFormatting {
    return this.config;
  }
}
