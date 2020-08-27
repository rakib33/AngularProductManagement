export class Catagory{
    Id : number;
    Name : string;
    Description : string;
    Status : string;
    CreatedBy : string;
    CreatedDate : Date;
  } 

export  class CatagoryResponse {
    IsSuccess: boolean;
    categories: Catagory[];
    products : Product[];
    model: any;
    message: string;
  }

export class Product{
  Id : number;
  Name : string;
  Description : string;
  Status : string;
  Catagory_Id: string;
  Brand_Id : string;
  CostPrice : number;
  ProductQuantity : number;
  CreatedBy : string;
  CreatedDate : Date;
  BrandName: string;
  CategoryName : string;
}  