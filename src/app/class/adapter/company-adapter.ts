import { CompanyRequest } from "../../interface/company.interface";
import { ItemGrid } from "../../interface/util.interface";

export class CompanyAdapter {
  static toGridItem(company: CompanyRequest): ItemGrid{
    return {
      id: company.company_id,
      title: company.company_name,
      background: 'company.svg'
    };
  }
  static toGridItems(companies: CompanyRequest[]): ItemGrid[] {
    return companies.map(company => this.toGridItem(company));
  }
}
