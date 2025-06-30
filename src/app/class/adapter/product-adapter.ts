import { ItemGrid } from "../../interface/util.interface";
import { ProductRequest } from "../../interface/product.interface";

export class ProductAdapter {
  static toGridItem(product: ProductRequest): ItemGrid {
    return {
      id: product.product_id,
      title: product.product_name,
      background: 'product.svg'
    };
  }

  static toGridItems(products: any[]): ItemGrid[] {
    return products.map(product => this.toGridItem(product));
  }
}
