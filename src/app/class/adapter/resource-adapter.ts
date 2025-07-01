import { Concept, Currency, Method } from "../../interface/resource.interface";

export class ResourceAdapter {
  static MethodsToSelectOptions(methods: Method[]){
    return methods.map((method)=>{
      return {
        id: method.id,
        name: method.name,
        code: method.name
      }
    })
  }
  static ConceptsToSelectOptions(concepts: Concept[]){
    return concepts.map((concept)=>{
      return {
        id: concept.id,
        name: concept.name,
        code: concept.name
      }
    })
  }
  static CurrenciesToSelectOptions(currencies: Currency[]){
    return currencies.map((currency)=>{
      return {
        id: currency.id,
        name: currency.name,
        code: currency.code
      }
    })
  }
}
