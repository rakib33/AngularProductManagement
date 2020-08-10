import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

class Brand {
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

class Person {
  id: number;
  firstName: string;
  lastName: string;
}
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
    './products.component.css'
  ]
})
export class ProductsComponent implements OnInit {

  persons: Person[];
  constructor(private http: HttpClient) { }

  dtOptions: any  = {};
  ngOnInit(): void {
    const that = this;
    //this.performGET();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            'https://angular-datatables-demo-server.herokuapp.com/',
            dataTablesParameters, {}
          ).subscribe(resp => {
            that.persons = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }]
    };
  }

  performGET() {  
    console.log("GET");  
    let url = `http://inv-medi.kini24.com/KiniApi/GetBrand`;  
    this.http.get<RootObject>(url).subscribe(res => console.log(res.brands));  
  }
}
