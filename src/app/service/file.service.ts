import { Injectable } from '@angular/core';
import { TableBalance, TableMovement } from '../interface/util.interface';
import { FileAdapter } from '../class/adapter/file-adapter';
import * as Papa from 'papaparse';
import { MovementsExportXLSXTemplate } from '../class/template/movements-export-xlsx-template';
import { MovementsExportPdfTemplate } from '../class/template/movements-export-pdf-template';

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
  exportTableMovementsToXLSX(
    tableMovements: TableMovement[],
    tableBalance: TableBalance[]
  ) {
    new MovementsExportXLSXTemplate(tableMovements, tableBalance).export();
  }
  exportTableMovementsToPDF(
    tableMovements: TableMovement[],
    tableBalance: TableBalance[]
  ) {
    new MovementsExportPdfTemplate(tableMovements, tableBalance).export();
  }
}
