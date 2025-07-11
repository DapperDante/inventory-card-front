import { Content, CustomTableLayout, DynamicContent, Margins, PageOrientation, PageSize, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import pdfmake from "pdfmake/build/pdfmake";
import 'pdfmake/build/vfs_fonts';
export abstract class ExportPdfTemplate {
  abstract name: string;
  pageSize: PageSize = 'LETTER';
  pageOrientation: PageOrientation = 'portrait';
  pageMargins: Margins = [40, 60, 40, 60];
  export() {
    const doc: TDocumentDefinitions = {
      pageSize: this.pageSize,
      pageOrientation: this.pageOrientation,
      pageMargins: this.pageMargins,
      header: this.applyHeader(),
      content: this.applyFormatting(),
      styles: this.applyStyling(),
      footer: this.applyFooter()
    };
    console.log(doc);
    const customTableLayout = this.createCustomStyleTable();
    pdfmake.createPdf(doc, customTableLayout).download(`${this.name}.pdf`);
  }
  abstract applyHeader(): DynamicContent | Content | undefined;
  abstract applyFormatting(): Content;
  abstract applyStyling(): StyleDictionary | undefined;
  abstract createCustomStyleTable(): { [key: string]: CustomTableLayout };
  abstract applyFooter(): DynamicContent | Content | undefined;
}
