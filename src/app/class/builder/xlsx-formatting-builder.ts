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
  reset(): void{
    this.config = {
      mergedCells: [],
      columnWidths: [],
    };
  }
  setRange(startRow: number, startCol: number, endRow: number, endCol: number): void {
    this.config.range = {
      s: { r: startRow, c: startCol },
      e: { r: endRow, c: endCol },
    };
  }
  setMergedCell(startRow: number, startCol: number, endRow: number, endCol: number): void {
    this.config.mergedCells.push({
      s: { r: startRow, c: startCol },
      e: { r: endRow, c: endCol },
    });
  }
  setColumnWidth(width: number): void {
    this.config.columnWidths.push({
      wch: width,
    });
  }
  getConfig(): ConfigXLSXFormatting {
    return this.config;
  }
}
