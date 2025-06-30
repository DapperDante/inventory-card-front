export interface ProductRequest{
  product_id: number;
  product_name: string;
  product_description: string;
}
export interface ProductsRequest{
  result : ProductRequest[];
}
