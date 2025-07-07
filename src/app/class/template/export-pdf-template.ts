import { jsPDF } from 'jspdf';
export abstract class ExportPdfTemplate {
  abstract name: string;
  abstract orientation: 'portrait' | 'landscape';
  abstract unit: 'pt' | 'mm' | 'cm' | 'in';
  abstract format: [number, number];
  export() {
    const doc = new jsPDF({
      orientation: this.orientation,
      unit: this.unit,
      format: this.format,
    });
    this.applyFormatting(doc);
    this.applyStyling(doc);
    doc.save(`${this.name}.pdf`);
  }
  abstract applyFormatting(doc: jsPDF): void;
  abstract applyStyling(doc: jsPDF): void;
}
