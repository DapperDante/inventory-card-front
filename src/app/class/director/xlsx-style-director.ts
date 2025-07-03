import { XLSXStyleBuilder } from "../builder/xlsx-style-builder";

export class XLSXStyleDirector{
  private builder: XLSXStyleBuilder;
  constructor(){
    this.builder = new XLSXStyleBuilder();
  }
  getHeaderStyle(){
    this.builder.reset();
    this.builder.setForegroundColor('5E42CA');
    this.builder.setFontColor('000000');
    this.builder.setFontBold();
    this.builder.setBorderAll('thin', '000000');
    this.builder.setHorizontal('center');
    return this.builder.getStyle();
  }
  getSubHeaderStyle(){
    this.builder.reset();
    this.builder.setForegroundColor('8E73E8');
    this.builder.setFontColor('000000');
    this.builder.setHorizontal('center');
    this.builder.setBorderAll('thin', '000000');
    this.builder.setFontBold();
    return this.builder.getStyle();
  }
  getDataRowStyle(){
    this.builder.reset();
    this.builder.setBorderAll('thin', '000000');
    this.builder.setHorizontal('center');
    return this.builder.getStyle();
  }
}
