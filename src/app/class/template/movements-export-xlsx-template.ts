import { TableBalance, TableMovement } from '../../interface/util.interface';
import { XLSXFormattingBuilder } from '../builder/xlsx-formatting-builder';
import { XLSXMatrixBuilder } from '../builder/xlsx-matrix-builder';
import { XLSXStyleBuilder } from '../builder/xlsx-style-builder';
import { XLSXStyleDirector } from '../director/xlsx-style-director';
import { XLSXStylingStrategy } from '../strategy/xlsx-styling-strategy';
import { ExportXLSXTemplate } from './export-xlsx-template';
import * as XLSX from 'xlsx-js-style';
export class MovementsExportXLSXTemplate extends ExportXLSXTemplate {
  override nameWorksheet: string;
  override nameWorkbook: string;
  private movements: TableMovement[];
  private balances: TableBalance[];
  constructor(movements: TableMovement[], balances: TableBalance[]) {
    super();
    this.nameWorksheet = 'Movements';
    this.nameWorkbook = 'Movements.xlsx';
    this.movements = movements;
    this.balances = balances;
  }
  createStructuredData(): any[][] {
    const builder = new XLSXMatrixBuilder();
    builder.setHeaders(['', '', 'ITEM', '', '', 'VALUES', '', '', '', '']);
    builder.setHeaders([
      'DATE',
      'CONCEPT',
      'ENTRIES',
      'EXITS',
      'STOCK',
      'ACQUISITION',
      'DEBIT',
      'CREDIT',
      'BALANCE',
      'CREATED BY',
    ]);
    this.movements.forEach((movement) => {
      builder.setRow([
        movement.date,
        movement.concept,
        movement.income,
        movement.expense,
        movement.stock,
        movement.unit_cost,
        movement.debit,
        movement.credit,
        movement.final_balance,
        movement.created_by
      ]);
    });
    builder.setSpacing();
    builder.setHeaders(['AVAILABLE STOCK', 'UNIT PRICE', 'FINAL BALANCE']);
    this.balances.forEach((movement) => {
      builder.setRow(Object.values(movement));
    });
    return builder.getMatrix();
  }
  applyFormatting(worksheet: XLSX.WorkSheet, data: any[][]): void {
    const builder = new XLSXFormattingBuilder();
    const yLength = data.length;
    const xLength = data[0].length;
    builder.setRange(0, 0, yLength - 1, xLength - 1);
    builder.setMergedCell(0, 2, 0, 4);
    builder.setMergedCell(0, 5, 0, 8);
    for (let i = 0; i < xLength; i++) {
      builder.setColumnWidth(20);
    }
    const config = builder.getConfig();
    // Define range
    worksheet['!ref'] = XLSX.utils.encode_range(config.range!);
    // Merge cells for main headers
    worksheet['!merges'] = config.mergedCells;
    // Configure column widths
    worksheet['!cols'] = config.columnWidths;
  }
  applyStyling(worksheet: XLSX.WorkSheet, data: any[][]): void {
    const yLength = data.length;
    const xLength = data[0].length;
    // Create styles for headers and sub-headers
    const director = new XLSXStyleDirector();
    const builder = new XLSXStyleBuilder();
    director.buildHeaderStyle(builder);
    const headerStyle = builder.getStyle();
    builder.reset();
    director.buildSubHeaderStyle(builder);
    const subHeaderStyle = builder.getStyle();
    builder.reset();
    director.buildDataRowStyle(builder);
    const dataRowStyle = builder.getStyle();
    const strategy = new XLSXStylingStrategy(dataRowStyle);
    for (let row = 0; row < yLength; row++) {
      this.applyStyleRow(worksheet, strategy, row, xLength);
    }
    strategy.setStyling(headerStyle);
    this.applyStyleRow(worksheet, strategy, 0, xLength);
    strategy.setStyling(subHeaderStyle);
    this.applyStyleRow(worksheet, strategy, 1, xLength);
  }
  private applyStyleRow(Worksheet: XLSX.WorkSheet, strategy: XLSXStylingStrategy, numRow: number, nColumns: number): void{
      for(let col = 0; col <= nColumns; col++){
        const cellAddress = XLSX.utils.encode_cell({c: col, r: numRow});
        if(!Worksheet[cellAddress]){
          Worksheet[cellAddress] = {};
        }
        strategy.applyStyle(Worksheet[cellAddress]);
      }
    }
}
