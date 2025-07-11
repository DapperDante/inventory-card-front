import { CellObject } from "xlsx-js-style";
import { XLSXStyle } from "../builder/xlsx-style-builder";

export class XLSXStylingStrategy{
  private styling: XLSXStyle;
  constructor(styling: XLSXStyle){
    this.styling = styling;
  }
  setStyling(styling: XLSXStyle): void{
    this.styling = styling;
  }
  applyStyle(cellObject: CellObject): void{
    cellObject.s = this.styling;
  }
}
