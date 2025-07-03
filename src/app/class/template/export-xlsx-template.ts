import * as XLSX from 'xlsx-js-style';

export abstract class ExportXLSXTemplate {
  public export(): void {
    const workbook = XLSX.utils.book_new();
    this.prepareData();
    const data = this.createStructuredData();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    this.applyFormatting();
    this.applyStyling();
  }
  protected abstract prepareData(): void;
  protected abstract createStructuredData(): any[][];
  protected abstract applyFormatting(): void;
  protected abstract applyStyling(): void;
}
