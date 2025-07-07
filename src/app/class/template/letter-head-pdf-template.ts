import jsPDF from 'jspdf';
import { ExportPdfTemplate } from './export-pdf-template';

export class LetterheadExportPdfTemplate extends ExportPdfTemplate {
  override name: string = 'Letterhead';
  override format: [number, number] = [216, 279];
  override orientation: 'portrait' | 'landscape' = 'portrait';
  override unit: 'pt' | 'mm' | 'cm' | 'in' = 'mm';
  doc: jsPDF | null = null;
  override async export() {
    this.doc = new jsPDF({
      orientation: this.orientation,
      unit: this.unit,
      format: this.format,
    });
    await this.applyFormatting(this.doc);
    this.applyStyling(this.doc);
  }
  override async applyFormatting(doc: jsPDF): Promise<void> {
        // const response = await fetch('/wave.png');
    // const blob = await response.blob();
    // const file = new FileReader();
    // file.readAsDataURL(blob);
    // file.onload = (event) => {
    //   console.log('Image loaded:', event.target?.result);
    //   doc.addImage(event.target?.result as string, 'PNG', 10, 10, 50, 20);
    // }
  }
  override applyStyling(doc: jsPDF): void {}

  preview(): string {
    return this.doc?.output('datauristring') || '';
  }
}
