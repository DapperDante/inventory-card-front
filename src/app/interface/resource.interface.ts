export interface Method{
  id: number,
  name: string,
  description: string
};
export interface MethodsRequest{
  result: Method[]
};
export interface Currency{
  id: number,
  name: string,
  code: string
};
export interface CurrenciesRequest{
  result: Currency[]
};
export interface Concept{
  id: number,
  name: string,
  description: string
};
export interface ConceptsRequest{
  result: Concept[]
};
