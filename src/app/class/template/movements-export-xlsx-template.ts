import { TableBalance, TableMovement } from '../../interface/util.interface';
import { FileAdapter } from '../adapter/file-adapter';
import { ExportXLSXTemplate } from './export-xlsx-template';

export class MovementsExportXLSXTemplate extends ExportXLSXTemplate {
  private movements: TableMovement[];
  private balances: TableBalance[];
  constructor(movements: TableMovement[], balances: TableBalance[]) {
    super();
    this.movements = movements;
    this.balances = balances;
  }
  prepareData(): void {
    const movements = FileAdapter.toXLSXMovements(this.movements);
    const balances = FileAdapter.toXLSXBalances(this.balances);
  }

  applyFormatting(): void {

  }
  applyStyling(): void {}
}
