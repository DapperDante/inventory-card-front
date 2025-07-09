import { PDFStyleBuilder } from '../builder/pdf-style-builder';

export class PDFStyleDirector {
  buildH1Style(builder: PDFStyleBuilder) {
    builder
      .setBold()
      .setFontSize(22)
      .setAlignment('center')
      .setMarginBottom(10)
      .setMarginTop(10)
      .setColor('#000000');
  }
  buildH2Style(builder: PDFStyleBuilder) {
    builder
      .setFontSize(16)
      .setBold()
      .setAlignment('center')
      .setMarginBottom(8)
      .setMarginTop(8)
      .setColor('#000000');
  }
  buildH3Style(builder: PDFStyleBuilder) {
    builder
      .setFontSize(14)
      .setBold()
      .setAlignment('center')
      .setMarginBottom(6)
      .setMarginTop(6)
      .setColor('#000000');
  }
}
