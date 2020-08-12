export class Brand {
  Name: string;
  CountryName?: any;
  ISIN: string;
  Description: string;
  Status?: any;
  Catagory_Id: string;
  Catagory?: any;
  Id: string;
  CreatedBy: string;
  CreatedDate: Date;
  UpdateBy?: any;
  UpdateDate?: any;
}
class RootObject {
  IsSuccess: boolean;
  brands: Brand[];
  message: string;
}
