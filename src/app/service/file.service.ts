import { Injectable } from '@angular/core';
import {
  JSONBalanceXLSX,
  JSONMovementXLSX,
  TableBalance,
  TableMovement,
} from '../interface/util.interface';
import { FileAdapter } from '../class/adapter/file-adapter';
import * as Papa from 'papaparse';
import * as XLSX from 'xlsx';

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
  exportTableToXLSX(
    tableMovements: TableMovement[],
    tableBalance: TableBalance[]
  ) {
    const workbook = XLSX.utils.book_new();
    // transform the data into a structured format
    const data = this.createStructuredData(tableMovements, tableBalance);
    console.log(data);
    // Create a worksheet from the structured data as an array of arrays
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    // Apply formatting and styling to the worksheet
    this.applyWorksheetFormatting(worksheet, data.length);
    this.applyWorksheetStyling(worksheet, data[0].length - 1, data.length - 1);
    // Set the worksheet name and append it to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Movements');
    XLSX.writeFile(workbook, 'movements.xlsx');
  }
  createStructuredData(
    tableMovements: TableMovement[],
    tableBalance: TableBalance[]
  ): any[] {
    const headersMovement = [
      ['ITEM', '', 'UNIT PRICE', '', '', 'VALUES', '', ''],
      [
        'ENTRIES',
        'EXITS',
        'STOCK',
        'ACQUISITION',
        'DEBIT',
        'CREDIT',
        'BALANCE',
      ],
    ];
    const headersBalance = [['AVAILABLE STOCK', 'UNIT PRICE', 'FINAL BALANCE']];
    const movementRows: any[][] = [];
    tableMovements.forEach((movement) => {
      const row = [
        movement.income,
        movement.expense,
        movement.stock,
        movement.unit_cost,
        movement.debit,
        movement.credit,
        movement.final_balance,
      ];
      movementRows.push(row);
    });
    const balanceRows: any[][] = [];
    tableBalance.forEach((balance) => {
      const row = [
        balance.available_stock,
        balance.unit_cost,
        balance.final_balance,
      ];
      balanceRows.push(row);
    });
    return [
      ...headersMovement,
      ...movementRows,
      ...headersBalance,
      ...balanceRows,
    ];
  }
  private applyWorksheetFormatting(
    worksheet: XLSX.WorkSheet,
    longArray: number
  ): void {
    // Define range
    worksheet['!ref'] = XLSX.utils.encode_range({
      s: { c: 0, r: 0 },
      e: { c: 6, r: longArray - 1 },
    });

    // Merge cells for main headers
    worksheet['!merges'] = [
      //Each object is as cell, 's' is the start cell and 'e' is the end cell, and 'r' is the row, 'c' is the column
      { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }, // ITEM
      { s: { r: 0, c: 2 }, e: { r: 0, c: 4 } }, // UNIT PRICE
      { s: { r: 0, c: 5 }, e: { r: 0, c: 6 } }, // VALUES
    ];

    // Configure column widths
    worksheet['!cols'] = [
      { wch: 20 }, // ENTRIES
      { wch: 20 }, // EXITS
      { wch: 20 }, // STOCK
      { wch: 20 }, // ACQUISITION
      { wch: 20 }, // DEBIT
      { wch: 20 }, // CREDIT
      { wch: 20 }, // BALANCE
    ];
  }
  private applyWorksheetStyling(worksheet: XLSX.WorkSheet, columnLength: number, rowLength: number): void {
    console.log(columnLength);
    const headerStyle = {
      fill: {
        fgColor: { rgb: '4472C4' }, // Azul
      },
      font: {
        color: { rgb: 'FFFFFF' }, // Texto blanco
        bold: true,
      },
      alignment: {
        horizontal: 'center',
      },
    };
    const subHeaderStyle = {
      fill: {
        fgColor: { rgb: 'D9E2F3' }, // Azul claro
      },
      font: {
        bold: true,
      },
      alignment: {
        horizontal: 'center',
      },
    };
    // Iterate over the columns
    for(let col = 0; col <= columnLength; col++ ){
      const cellAddress = XLSX.utils.encode_cell({ c: col, r: 0 });
      if (!worksheet[cellAddress]) {
        worksheet[cellAddress] = {};
      }
      worksheet[cellAddress].s = headerStyle;
    }
    // Iterate over the sub-header row
    for(let col = 0; col <= columnLength; col++ ){
      const cellAddress = XLSX.utils.encode_cell({ c: col, r: 1 });
      if (!worksheet[cellAddress]) {
        worksheet[cellAddress] = {};
      }
      worksheet[cellAddress].s = subHeaderStyle;
    }
  }
}
