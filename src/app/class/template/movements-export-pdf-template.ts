import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ExportPdfTemplate } from './export-pdf-template';
import { TableBalance, TableMovement } from '../../interface/util.interface';

export class MovementsExportPdfTemplate extends ExportPdfTemplate {
  name = 'Movements Report';
  orientation: 'portrait' | 'landscape' = 'portrait';
  unit: 'pt' | 'mm' | 'cm' | 'in' = 'mm';
  format: [number, number] = [210, 297]; // A4 size in mm
  movements: TableMovement[];
  balance: TableBalance[];
  constructor(movements: TableMovement[], balance: TableBalance[]) {
    super();
    this.movements = movements;
    this.balance = balance;
  }
  applyFormatting(doc: jsPDF): void {
    doc.text('Movements Report', 10, 10);
    autoTable(doc, {
      startY: 10,
      headStyles: {
        fillColor: '#7C3AED', // Morado similar al de la aplicación
        lineColor: '#000000',
        lineWidth: 0.1
      },
      bodyStyles: {
        lineColor: '#000000',
        lineWidth: 0.1
      },
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
    // Additional formatting can be added here
  }
}
