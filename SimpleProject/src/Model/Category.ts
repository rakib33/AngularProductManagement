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
    InvoiceNo: string;
  }

export class Product{
  Id : string;
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

export class Invoice{
  InvoiceDate: Date; //order date
  CustomerName: string; //ClientName
  Phone: number; //Contact
  Customer_Id: string; //Supplier Id, from dropdown
  InvoiceNo: string;
  Total:number; //sub total
  OtherExpense: number; // Vat
  Discount:number;
  Payable :number;// Total Amount or Grand Total
  Paid:number;
  Due:number;
  Description:string;
  PaymentType:string;
  Status:string;
  profilePic:File;
  Purchases: Purchase[];
}

export class Purchase{
  Qty:number;
  BuyRate:number;
  BuyTotal:number;
  Product_Id:number;
  ProductName:string;
}
