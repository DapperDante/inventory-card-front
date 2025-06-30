import { Movement } from "./movement.interface";

export interface CardRequest{
  id: number,
  product: string,
  name: string,
  description: string,
  created_by: string,
  method: string,
  currency: string,
  movements: Movement[]
}
export interface CardsRequest{
  result: {
    id: number,
    product: string,
    name: string,
    description: string,
    created_by: string,
    method: string,
    currency: string
  }[]
}
