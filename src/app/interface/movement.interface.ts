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
