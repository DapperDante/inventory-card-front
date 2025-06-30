export interface method{
  id: number,
  name: string,
  description: string
};
export interface methodsRequest{
  result: method[]
};
export interface currency{
  id: number,
  name: string,
  code: string
};
export interface currenciesRequest{
  result: currency[]
};
export interface concept{
  id: number,
  name: string,
  description: string
};
export interface conceptsRequest{
  result: concept[]
};
