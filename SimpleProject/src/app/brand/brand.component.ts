import { Component, OnInit } from '@angular/core';
//import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Brand } from '../../Model/brand';
import { globalConstant } from '../../Model/appVariable'

class RootObject {
  IsSuccess: boolean;
  brands: Brand[];
  message: string;

  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
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
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styles: [
    './brand.component.css'
  ]
})
export class BrandComponent implements OnInit {
  getBrandApi =  'https://angular-datatables-demo-server.herokuapp.com/';
  //globalConstant.BaseUrl + 'KiniApi/GetBrand';
  persons: Person[];

  closeResult: string;
  //modalOptions:NgbModalOptions;

  constructor(private http: HttpClient) { //,private modalService: NgbModal
    // this.modalOptions = {
    //   backdrop:'static',
    //   backdropClass:'customBackdrop'
    // }
   }

  dtOptions: any  = {};

//modal open close
  // open(content) {
  //   this.modalService.open(content, this.modalOptions).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

// above is for modal 


//DataTablesResponse
//'https://angular-datatables-demo-server.herokuapp.com/'
  ngOnInit(): void {
    const that = this;
   // this.performGET();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<RootObject>(
            this.getBrandApi,
            dataTablesParameters, {}
          ).subscribe(resp => {
            that.persons = resp.data;
            console.log(this.persons);
            callback({              
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
              //data: resp.data,
              // draw: 0
            });
          });
      },
      columns: [
        { data: 'Id' }, 
        { data: 'Name' }, 
        { data: 'CountryName' },
        { data: 'ISIN' },
        { data: 'Description' }, 
        { data: 'Status' }, 
        { data: 'Catagory_Id' },
        { data: 'CreatedBy' },
        { data: 'CreatedDate' }, 
        { data: 'UpdateBy' }, 
        { data: 'UpdateDate' }
     
      ]

      //{ data: 'id' }, 
    };
  }

  performGET() {  
    
    console.log("GET");  
    let url = this.getBrandApi;  //`http://inv-medi.kini24.com/KiniApi/GetBrand`;
    let tableResponse = new RootObject(); 
    let IsSuccess = false; 
    
    this.http.get<RootObject>(url).subscribe(res => 
     { 
        // recordsTotal: resp.recordsTotal,
        //recordsFiltered: resp.recordsFiltered,
        //data: []
        //data: resp.brands
                // draw: 0
        IsSuccess: res.IsSuccess;
        brands: res.brands;
        message: res.message;
        
        data: res.brands;
        draw: 0;
        recordsFiltered: 0;
        recordsTotal: 0;
        if(IsSuccess){
        recordsFiltered: res.brands.length;
        recordsTotal: res.brands.length;
        }

        
        console.log(IsSuccess); 
        console.log(res.brands);
        console.log(res.brands.length);
    }); 
  }

}
