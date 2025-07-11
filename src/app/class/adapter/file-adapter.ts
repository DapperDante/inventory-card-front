import { JSONBalanceXLSX, JSONMovementXLSX, JSONTableXLSX, TableBalance, TableMovement, TableMovementCSV } from "../../interface/util.interface";

export class FileAdapter{
  static toCSVMovements(movements: TableMovement[]): TableMovementCSV {
      return {
        fields: [
          'Date',
          'Concept',
          'Income',
          'Expense',
          'Unit Cost',
          'Stock',
          'Debit',
          'Credit',
          'Final Balance',
          'Created By',
        ],
        data: movements.map((movement) => [
          movement.date,
          movement.concept,
          movement.income.toString(),
          movement.expense.toString(),
          `$ ${movement.unit_cost}`,
          movement.stock.toString(),
          `$ ${movement.debit}`,
          `$ ${movement.credit}`,
          `$ ${movement.final_balance}`,
          movement.created_by,
        ]),
      };
    }
  static toXLSXMovements(movements: TableMovement[]): JSONMovementXLSX[] {
    return movements.map((movement) => ({
      'date': movement.date,
      'concept': movement.concept,
      'income': movement.income,
      'expense': movement.expense,
      'stock': movement.stock,
      'unit_cost': `$ ${movement.unit_cost}`,
      'debit': `$ ${movement.debit}`,
      'credit': `$ ${movement.credit}`,
      'final_balance': `$ ${movement.final_balance}`,
      'created_by': movement.created_by,
    }));
  }
  static toXLSXBalances(balances: TableBalance[]): JSONBalanceXLSX[] {
    return balances.map((balance) => ({
      'available_stock': balance.available_stock,
      'unit_cost': `$ ${balance.unit_cost}`,
      'final_balance': `$ ${balance.final_balance}`,
    }));
  }
}
