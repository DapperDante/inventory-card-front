import { PDFStyleBuilder } from "../builder/pdf-style-builder";

export class PDFStyleDirector{
  getHeaderStyle(builder: PDFStyleBuilder){
    builder.setFillColor('#800080');
    builder.setLineColor('#000000');
    builder.setVertical('middle');
    builder.setHorizontal('center');
    builder.setLineWidth(0.1);
  }
  getSubHeaderStyle(builder: PDFStyleBuilder){
    builder.setFillColor('#b266b2');
    builder.setLineColor('#000000');
    builder.setVertical('middle');
    builder.setHorizontal('center');
    builder.setLineWidth(0.1);
  }
  getDataRowStyle(builder: PDFStyleBuilder){
    builder.setVertical('middle');
    builder.setHorizontal('center');
    builder.setLineColor('#000000');
    builder.setLineWidth(0.1);
  }
}
