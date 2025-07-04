import * as XLSX from 'xlsx-js-style';

export abstract class ExportXLSXTemplate {
  abstract nameWorksheet: string;
  abstract nameWorkbook: string;
  public export(): void {
    const workbook = XLSX.utils.book_new();
    this.prepareData();
    const data = this.createStructuredData();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    this.applyFormatting(worksheet, data);
    this.applyStyling(worksheet, data);
    XLSX.utils.book_append_sheet(workbook, worksheet, this.nameWorksheet);
    XLSX.writeFile(workbook, this.nameWorkbook);
  }
  protected abstract prepareData(): void;
  protected abstract createStructuredData(): any[][];
  protected abstract applyFormatting(worksheet: XLSX.WorkSheet,data: any[][]): void;
  protected abstract applyStyling(worksheet: XLSX.WorkSheet, data: any[][]): void;
}
