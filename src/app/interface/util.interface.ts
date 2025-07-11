export interface ItemGrid {
  id: number,
  title: string,
  background: string
};
export interface TableMovement {
  id: number,
  date: string,
  concept: string,
  stock: number,
  income: number,
  expense: number,
  unit_cost: string,
  created_by: string,
  debit: string,
  credit: string,
  final_balance: string
};
export interface TableMovementCSV {
  fields: string[],
  data: Array<Array<string>>
};
export interface TableBalance{
  available_stock: number,
  unit_cost: string,
  final_balance: string
};
export interface JSONMovementXLSX{
  'date': string,
  'concept': string,
  'income': number,
  'expense': number,
  'stock': number,
  'unit_cost': string,
  'debit': string,
  'credit': string,
  'final_balance': string,
  'created_by': string
};
export interface JSONBalanceXLSX{
  'available_stock': number,
  'unit_cost': string,
  'final_balance': string
};
export interface JSONTableXLSX extends JSONMovementXLSX, JSONBalanceXLSX {}
