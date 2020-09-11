import { Component, OnInit,TemplateRef } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BsModalService, BsModalRef,ModalOptions } from 'ngx-bootstrap/modal';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Catagory , CatagoryResponse } from '../../Model/Category';
import { Brand } from '../../Model/brand';
import { BrandService } from '../services/brand.service';
import { from } from 'rxjs';
import {globalConstant} from '../../Model/appVariable';

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
  modalRef: BsModalRef;  
  persons: Person[];
  categoryObj : Catagory;
  categoryList: Catagory[];
  ModalHeading : string;
  categoryForm : FormGroup; 
  IsDisplay : string;
  Message : string;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private modalService: BsModalService,private catagoryService: BrandService,private http: HttpClient) { 
    this.CreateForm(false, '');
      this.IsDisplay = 'none'; 
      this.Message = '';   
   }

 
   CreateForm(isEdit, data){

    if(isEdit == false){
    this.categoryForm = this.formBuilder.group({
      Id:['',Validators.required],
      Name: ['',Validators.required],
      Status:['',Validators.required],
      Description:['',Validators.required]
      });
    }else if(isEdit == true){
      this.categoryForm = this.formBuilder.group({
        Id:[data.Id,Validators.required],
        Name: [data.Name,Validators.required],
        Status:[data.Status,Validators.required],
        Description:[data.Description,Validators.required]
        });
    }
  }
    
  config: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    animated: true,
    ignoreBackdropClick: true,
    class: 'gray modal-lg',
    initialState: {
      data1: 'new-user',
      username: 'test'
    }
  };

  openModalWithClass(template: TemplateRef<any>) {       
    this.modalRef = this.modalService.show(  
      template,       
      this.config 
    );    
  } 

  openModalFromAdd(){

  }
  openModalFromEdit(template: TemplateRef<any>,controlValue,index){
   this.CreateForm(true,controlValue);
   this.modalRef = this.modalService.show(  
    template,     
    this.config 
  );    
  }


  closeModal(){
    console.log('modal close');
    this.IsDisplay = 'none'; 
    this.onReset();
    this.modalService.setDismissReason('close');
    this.modalService.hide(1);
  }

  // convenience getter for easy access to form fields
  get f() { return this.categoryForm.controls; }

  
  //this is submitted from Form
  submitCategory(){
    this.submitted = true;
    // stop here if form is invalid
    // if (this.categoryForm.invalid) {
    //     return;
    // }
 
    this.categoryObj =  this.categoryForm.value;    
    this.PostUpdateCatagory();
  }

  onReset() {
    this.submitted = false;
    this.categoryForm.reset();
    this.CreateForm(false,'');
}

  dtOptions: any  = {};
  ngOnInit(): void {
    const that = this;
    this.GetCatagoryList();
    this.ModalHeading = 'Add Brand';

    let response = new CatagoryResponse();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      // ajax: (dataTablesParameters: any, callback) => {

      //   //return this.httpClient.get(getUrl); 
      //   this.catagoryService.getCategoryList()
      //   .subscribe((res) => {
      //     response = res;
      //     if(res.IsSuccess == false){
      //       alert(res.message);
      //       console.log(res.message);
      //     }else{
      //       this.categoryList = res.categories;
          
      //     callback({
      //       recordsTotal: response.categories.length,
      //       recordsFiltered: response.categories.length,
      //       data: []
      //     });
      //   }
      //  },(error:any)=>{console.log(error),alert(error)})

      //   // that.http
      //   //   .post<DataTablesResponse>(
      //   //     'https://angular-datatables-demo-server.herokuapp.com/',
      //   //     dataTablesParameters, {}
      //   //   ).subscribe(resp => {
      //   //     that.persons = resp.data;

      //   //     callback({
      //   //       recordsTotal: resp.recordsTotal,
      //   //       recordsFiltered: resp.recordsFiltered,
      //   //       data: []
      //   //     });
      //   //   });
      // },
      recordsTotal: this.categoryList.length,
      recordsFiltered: this.categoryList.length,
      columns: [{ data: 'Id' }, { data: 'Name' }, { data: 'Status' },{data:'Description'},{data:'CreatedBy'},{data:'CreatedDate'}]
    };
  }

  GetCatagoryList(){
    debugger;
    let response = new CatagoryResponse();
    this.catagoryService.getCategoryList()
    .subscribe((res) => {
      response = res;
      if(res.IsSuccess == false){
        alert(res.message);
        console.log(res.message);
      }else{
        this.categoryList = res.categories;
      }
   },(error:any)=>{console.log(error),alert(error)})
  }

  PostUpdateCatagory(){ 
   
    let response = new CatagoryResponse();
    let IsEdit = 0;
    let index ;
    
    if(this.categoryObj.Id ){
      IsEdit = 1;
      index = this.categoryList.indexOf(this.categoryObj);   
    }

    this.catagoryService.SubmitTransaction(this.categoryObj)
    .subscribe((res) => {
      response = res;
      this.Message = response.message;
      if(response.IsSuccess == false){
        this.IsDisplay = '0';     
        console.log(res.message);
      }else if(response.IsSuccess == true){
        this.GetCatagoryList();    
        this.IsDisplay = '1'; 
         
        if(IsEdit == 1){
          this.Message ="Update Success";
           //this.categoryObj = response.model;
           //this.categoryList[index] = response.model;
        } else{
          this.Message ="Save Success";   
          //this.categoryList.push(response.model);
        }
      }   
      this.categoryList.push(response.model);
   },(error:any)=>{console.log(error)})

   this.categoryObj = new Catagory();
  }

}
