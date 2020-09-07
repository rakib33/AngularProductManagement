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
    invoiceList: Invoice[];    
    model: any;
    message: string;
    InvoiceNo: string;
  }
  export class InvoiceResponse{
    IsSuccess: boolean;
    InvoiceModel: Invoice;
    purchaseList : Purchase[];
    message: string;
    InvoiceNo: string;
  }
export class OrderReport{
  StartDate : Date;
  EndDate: Date;
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
  Id: string;
  InvoiceDate: Date; //order date
  StrInvoiceDate: string;
  CustomerName: string; //ClientName
  Phone: string; //Contact
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
  TotalPurchase:number; 
  Purchases: Purchase[];
}

export class Purchase{
  Qty:number;
  BuyRate:number;
  BuyTotal:number;
  Product_Id:number;
  ProductName:string;
}
