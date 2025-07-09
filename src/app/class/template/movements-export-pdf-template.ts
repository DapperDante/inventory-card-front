import { ExportPdfTemplate } from './export-pdf-template';
import { TableBalance, TableMovement } from '../../interface/util.interface';
import { PDFStyleBuilder } from '../builder/pdf-style-builder';
import {
  Content,
  ContextPageSize,
  CustomTableLayout,
  DynamicContent,
  Margins,
  Style,
} from 'pdfmake/interfaces';
import { PDFContentBuilder } from '../builder/pdf-content-builder';
import { PDFStyleDirector } from '../director/pdf-style-director';
import { PDFStyleTableBuilder } from '../builder/pdf-style-table-builder';

export class MovementsExportPdfTemplate extends ExportPdfTemplate {
  name!: string;
  movements: TableMovement[];
  balance: TableBalance[];
  override pageMargins: Margins;
  constructor(movements: TableMovement[], balance: TableBalance[]) {
    super();
    this.name = 'Movements Report';
    this.movements = movements;
    this.balance = balance;
    this.pageMargins = [40, 90, 40, 30];
  }
  applyFormatting() {
    const contentBuilder = new PDFContentBuilder();
    this.createTableMovements(contentBuilder);
    this.createTableBalances(contentBuilder);
    return contentBuilder.getFormatting();
  }
  applyHeader() {
    return (
      currentPage: number,
      pageCount: number,
      pageSize: ContextPageSize
    ) => {
      const builder = new PDFContentBuilder();
      builder.setSVG(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#7A5EDD" fill-opacity="1" d="M0,256L48,229.3C96,203,192,149,288,149.3C384,149,480,203,576,213.3C672,224,768,192,864,154.7C960,117,1056,75,1152,58.7C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>',
        pageSize.width
      );
      return builder.getFormatting();
    };
  }
  private createTableMovements(builder: PDFContentBuilder): void {
    builder
      .setH1('Movements')
      .setH2('Report')
      .setTable(
        (table) => {
          table.setHeader((header) => {
            header
              .setText('DATE', 'headerTable')
              .setText('CONCEPT', 'headerTable')
              .setText('ENTRIES', 'headerTable')
              .setText('EXITS', 'headerTable')
              .setText('STOCK', 'headerTable')
              .setText('ACQUISITION', 'headerTable')
              .setText('DEBIT', 'headerTable')
              .setText('CREDIT', 'headerTable')
              .setText('BALANCE', 'headerTable')
              .setText('CREATED BY', 'headerTable');
          });
          this.movements.forEach((movement) => {
            table.setRow((row) => {
              row
                .setText(movement.date, 'rowTable')
                .setText(movement.concept, 'rowTable')
                .setText(movement.income + '', 'rowTable')
                .setText(movement.expense + '', 'rowTable')
                .setText(movement.stock + '', 'rowTable')
                .setText(movement.unit_cost + '', 'rowTable')
                .setText(movement.debit + '', 'rowTable')
                .setText(movement.credit + '', 'rowTable')
                .setText(movement.final_balance + '', 'rowTable')
                .setText(movement.created_by + '', 'rowTable');
            });
          });
        },
        'customTableLayout',
        [
          '*',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          '*',
        ]
      );
  }
  private createTableBalances(builder: PDFContentBuilder): void {
    builder
      .setH1('Balances')
      .setH2('Report')
      .setTable(
        (table) => {
          table.setHeader((header) => {
            header
              .setText('AVAILABLE STOCK', 'headerTable')
              .setText('UNIT PRICE', 'headerTable')
              .setText('FINAL BALANCE', 'headerTable');
          });
          this.balance.forEach((balance) => {
            table.setRow((row) => {
              row
                .setText(balance.available_stock + '', 'rowTable')
                .setText(balance.unit_cost + '', 'rowTable')
                .setText(balance.final_balance + '', 'rowTable');
            });
          });
        },
        'customTableLayout',
        ['*', '*', '*']
      );
  }
  applyStyling() {
    return {
      ...this.createStyleDoc(),
      ...this.createStyleTable(),
    };
  }
  private createStyleDoc(): { [key: string]: Style } {
    const styleBuilder = new PDFStyleBuilder();
    const directorStyle = new PDFStyleDirector();
    directorStyle.buildH1Style(styleBuilder);
    const h1Style = styleBuilder.getStyle();
    styleBuilder.reset();
    directorStyle.buildH2Style(styleBuilder);
    const h2Style = styleBuilder.getStyle();
    styleBuilder.reset();
    styleBuilder.setAlignment('center');
    const footerStyle = styleBuilder.getStyle();
    styleBuilder.reset();
    return {
      h1: h1Style,
      h2: h2Style,
      footerText: footerStyle,
    };
  }
  private createStyleTable(): { [key: string]: Style } {
    const styleBuilder = new PDFStyleBuilder();
    styleBuilder.setFontSize(9).setBold();
    const headerTableStyle = styleBuilder.getStyle();
    styleBuilder.reset();
    styleBuilder.setFontSize(6);
    const rowTableStyle = styleBuilder.getStyle();
    styleBuilder.reset();
    return {
      headerTable: headerTableStyle,
      rowTable: rowTableStyle,
    };
  }
  createCustomStyleTable(): { [key: string]: CustomTableLayout } {
    const tableBuilder = new PDFStyleTableBuilder();
    tableBuilder
      .setWidthBorderHorizontal(0.2)
      .setWidthBorderVertical(0.9)
      .setBackgroundHeader('#7A5EDD')
      .setBackgroundRow('#F3F3F3')
    const customTableLayout = tableBuilder.getStyle();
    return {
      customTableLayout,
    };
  }
  override applyFooter(): DynamicContent | Content | undefined {
    const builder = new PDFContentBuilder();
    builder.setText('Generated by Inventory Card', 'footerText');
    return builder.getFormatting();
  }
}
