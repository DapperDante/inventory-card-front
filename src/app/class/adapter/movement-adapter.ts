import { Balance, Movement } from '../../interface/movement.interface';
import { TableBalance, TableMovement } from '../../interface/util.interface';

export class MovementAdapter {
  static toTableMovement(movement: Movement): TableMovement {
    movement.date = new Date(movement.date);
    if (this.isCreditMovement(movement.movement_concept)) {
      return {
        id: movement.id,
        date: this.formatDate(movement.date),
        concept: movement.movement_concept,
        stock: movement.stock,
        income: 0,
        expense: movement.quantity,
        unit_cost: this.formatNumber(movement.unit_cost),
        created_by: movement.created_by,
        debit: '0.00',
        credit: this.formatNumber(movement.quantity * movement.unit_cost),
        final_balance: this.formatNumber(movement.final_balance),
      };
    }
    return {
      id: movement.id,
      date: this.formatDate(movement.date),
      concept: movement.movement_concept,
      stock: movement.stock,
      expense: 0,
      income: movement.quantity,
      unit_cost: this.formatNumber(movement.unit_cost),
      created_by: movement.created_by,
      debit: this.formatNumber(movement.quantity * movement.unit_cost),
      credit: '0.00',
      final_balance: this.formatNumber(movement.final_balance),
    };
  }
  static toTableMovements(movements: Movement[]): TableMovement[] {
    return movements.map((movement) => this.toTableMovement(movement));
  }
  static toTableBalance(balance: Balance): TableBalance{
    return {
      available_stock: balance.available_stock,
      unit_cost: this.formatNumber(balance.unit_cost),
      final_balance: this.formatNumber(balance.total_cost),
    };
  }
  static toTableBalances(balances: Balance[]): TableBalance[] {
    return balances.map((balance) => this.toTableBalance(balance));
  }
  private static isCreditMovement(concept: string): boolean {
    return ['purchase return', 'sale', 'production required'].includes(
      concept.toLocaleLowerCase()
    );
  }
  private static formatDate(date: Date): string {
    return date.toLocaleDateString();
  }
  private static formatNumber(value: number): string {
    return value.toFixed(2);
  }
}
