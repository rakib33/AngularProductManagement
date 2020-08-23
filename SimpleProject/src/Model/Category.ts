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
    model: any;
    message: string;
  }