export interface Movement{
  id: number,
  date: Date
  stock: number,
  quantity: number,
  unit_cost: number,
  created_by: string,
  final_balance: number,
  movement_concept: string,
};
export interface MovementRequest {
  result: Movement[];
};
export enum MovementConceptId {
  INITIAL_BALANCE = 4,
  PURCHASE = 1,
  PURCHASE_RETURN = 3,
  SALE = 2,
  SALE_RETURN = 5,
  PRODUCTION_REQUIRED = 6,
  PRODUCTION_RETURN = 7,
}
export interface Balance{
  available_stock: number,
  unit_cost: number,
  total_cost: number,
}
export interface BalanceRequest {
  result: Balance[];
}
