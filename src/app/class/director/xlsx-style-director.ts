import { XLSXStyleBuilder } from "../builder/xlsx-style-builder";

export class XLSXStyleDirector{
  buildHeaderStyle(builder: XLSXStyleBuilder){
    builder.setForegroundColor('5E42CA');
    builder.setFontColor('000000');
    builder.setFontBold();
    builder.setBorderAll('thin', '000000');
    builder.setHorizontal('center');
  }
  buildSubHeaderStyle(builder: XLSXStyleBuilder){
    builder.setForegroundColor('8E73E8');
    builder.setFontColor('000000');
    builder.setHorizontal('center');
    builder.setBorderAll('thin', '000000');
    builder.setFontBold();
  }
  buildDataRowStyle(builder: XLSXStyleBuilder){
    builder.setBorderAll('thin', '000000');
    builder.setHorizontal('center');
  }
}
