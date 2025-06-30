export interface ItemGrid {
  id: number,
  title: string,
  background: string
}
export interface TableMovement {
  id: number,
  date: string,
  concept: string,
  stock: number,
  quantity: number,
  unit_cost: number,
  created_by: string,
  debit: number,
  credit: number
  final_balance: number
}
