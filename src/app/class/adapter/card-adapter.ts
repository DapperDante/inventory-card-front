import { CardRequest } from "../../interface/card.interface";
import { ItemGrid } from "../../interface/util.interface";

export class CardAdapter {
  static toGridItem(card: CardRequest): ItemGrid {
    return {
      id: card.id,
      title: card.name,
      background: 'card.svg'
    };
  }

  static toGridItems(cards: any[]): ItemGrid[] {
    return cards.map(card => this.toGridItem(card));
  }
}
