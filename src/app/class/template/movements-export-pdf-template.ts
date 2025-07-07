import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ExportPdfTemplate } from './export-pdf-template';
import { TableBalance, TableMovement } from '../../interface/util.interface';
import { PDFStyleDirector } from '../director/pdf-style-director';
import { PDFStyleBuilder } from '../builder/pdf-style-builder';

export class MovementsExportPdfTemplate extends ExportPdfTemplate {
  name = 'Movements Report';
  orientation: 'portrait' | 'landscape' = 'portrait';
  unit: 'pt' | 'mm' | 'cm' | 'in' = 'mm';
  format: [number, number] = [210, 297]; // A4 size in mm
  movements: TableMovement[];
  balance: TableBalance[];
  private styleDirector: PDFStyleDirector;
  private styleBuilder: PDFStyleBuilder;
  constructor(movements: TableMovement[], balance: TableBalance[]) {
    super();
    this.movements = movements;
    this.balance = balance;
    this.styleDirector = new PDFStyleDirector();
    this.styleBuilder = new PDFStyleBuilder();
  }
  applyFormatting(doc: jsPDF): void {
    this.styleDirector.getHeaderStyle(this.styleBuilder);
    const headStyles = this.styleBuilder.getStyle();
    this.styleBuilder.reset();
    this.styleDirector.getDataRowStyle(this.styleBuilder);
    const bodyStyles = this.styleBuilder.getStyle();
    this.styleBuilder.reset();
    doc.text('Movements Report', 105, 10, {
      align: 'center',
    });
    autoTable(doc, {
      startY: 20,
      headStyles,
      bodyStyles,
      head: [
        [
          'Date',
          'Movement Concept',
          'Income',
          'Expense',
          'Stock',
          'Unit Cost',
          'Debit',
          'Credit',
          'Final Balance',
        ],
      ],
      body: this.movements.map((movement) => [
        movement.date,
        movement.concept,
        movement.income,
        movement.expense,
        movement.stock,
        movement.unit_cost,
        movement.debit,
        movement.credit,
        movement.final_balance,
      ]),
      theme: 'grid',
    });
  }
  applyStyling(doc: jsPDF): void {

  }
}
