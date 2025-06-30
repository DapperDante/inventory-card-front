export interface CompanyRequest{
  company_id: number;
  company_name: string;
}
export interface CompaniesRequest{
  result: CompanyRequest[];
}
