import { Movement } from "../../interface/movement.interface";
import { TableMovement } from "../../interface/util.interface";

export class MovementAdapter {
  static toTableMovement(movement: Movement): TableMovement {
    movement.date = new Date(movement.date);
    if(this.isCreditMovement(movement.movement_concept)) {
      return {
        id: movement.id,
        date: this.formatDate(movement.date),
        concept: movement.movement_concept,
        stock: movement.stock,
        quantity: movement.quantity,
        unit_cost: movement.unit_cost,
        created_by: movement.created_by,
        debit: 0,
        credit: (movement.quantity * movement.unit_cost),
        final_balance: movement.final_balance
      };
    }
    return {
      id: movement.id,
      date: this.formatDate(movement.date),
      concept: movement.movement_concept,
      stock: movement.stock,
      quantity: movement.quantity,
      unit_cost: movement.unit_cost,
      created_by: movement.created_by,
      debit: (movement.quantity * movement.unit_cost),
      credit: 0,
      final_balance: movement.final_balance
    }
  }
  static toTableMovements(movements: Movement[]): TableMovement[] {
    return movements.map(movement => this.toTableMovement(movement));
  }
  private static isCreditMovement(concept: string): boolean {
    return ["purchase return", "sale", "production required"].includes(concept.toLocaleLowerCase());
  }
  private static formatDate(date: Date): string{
    return date.toLocaleDateString();
  }
}
