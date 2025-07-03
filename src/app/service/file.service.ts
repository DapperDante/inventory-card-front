import { Injectable } from '@angular/core';
import {
  JSONBalanceXLSX,
  JSONMovementXLSX,
  TableBalance,
  TableMovement,
} from '../interface/util.interface';
import { FileAdapter } from '../class/adapter/file-adapter';
import * as Papa from 'papaparse';
import * as XLSX from 'xlsx-js-style';
import { XLSXMatrixBuilder } from '../class/builder/xlsx-matrix-builder';
import { XLSXFormattingBuilder } from '../class/builder/xlsx-formatting-builder';
import { XLSXStylingStrategy } from '../class/strategy/xlsx-styling-strategy';
import { XLSXStyleDirector } from '../class/director/xlsx-style-director';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  exportTableToCSV(table: TableMovement[]) {
    const csv = Papa.unparse(FileAdapter.toCSVMovements(table));
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'movements.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportTableToXLSX(tableMovements: TableMovement[], tableBalance: TableBalance[]) {
    const workbook = XLSX.utils.book_new();
    // Convert the table data to the required format for XLSX
    const movements = FileAdapter.toXLSXMovements(tableMovements);
    const balances = FileAdapter.toXLSXBalances(tableBalance);
    // transform the data into a structured format
    const data = this.createStructuredData(movements, balances);
    // Create a worksheet from the structured data as an array of arrays
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    // Apply formatting and styling to the worksheet
    this.applyWorksheetFormatting(worksheet, data[0].length, data.length);
    this.applyWorksheetStyling(worksheet, data[0].length, data.length);
    // Set the worksheet name and append it to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Movements');
    XLSX.writeFile(workbook, 'movements.xlsx');
  }

  private createStructuredData(tableMovements: JSONMovementXLSX[], tableBalance: JSONBalanceXLSX[]): any[] {
    const builder = new XLSXMatrixBuilder();
    builder.setHeaders(['', '', 'ITEM', '', '', 'VALUES', '', '', '', '']);
    builder.setHeaders(['DATE', 'CONCEPT', 'ENTRIES', 'EXITS', 'STOCK', 'ACQUISITION', 'DEBIT', 'CREDIT', 'BALANCE', 'CREATED BY']);
    tableMovements.forEach(movement => {
      builder.setRow(Object.values(movement));
    })
    builder.setSpacing();
    builder.setHeaders(['AVAILABLE STOCK', 'UNIT PRICE', 'FINAL BALANCE']);
    tableBalance.forEach(movement => {
      builder.setRow(Object.values(movement));
    })
    return builder.getMatrix();
  }

  private applyWorksheetFormatting(worksheet: XLSX.WorkSheet, xLength: number, yLength: number): void {
    const builder = new XLSXFormattingBuilder();
    builder.setRange(0, 0, yLength - 1, xLength - 1);
    builder.setMergedCell(0, 2, 0, 4);
    builder.setMergedCell(0, 5, 0, 8);
    for(let i = 0; i < xLength; i++){
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

  private applyWorksheetStyling(worksheet: XLSX.WorkSheet, xLength: number, yLength: number): void {
    // Create styles for headers and sub-headers
    const director = new XLSXStyleDirector();
    const headerStyle = director.getHeaderStyle();
    const subHeaderStyle = director.getSubHeaderStyle();
    const dataRowStyle = director.getDataRowStyle();
    const strategy = new XLSXStylingStrategy(dataRowStyle);
    for(let row = 0; row < yLength; row++){
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
