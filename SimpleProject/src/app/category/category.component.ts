import { Component, OnInit,TemplateRef } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BsModalService, BsModalRef,ModalOptions } from 'ngx-bootstrap/modal';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Catagory , CatagoryResponse } from '../../Model/Category';
import { CatagoryService} from '../services/catagory.service';
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
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: [
    './category.component.css'
  ]
})
export class CategoryComponent implements OnInit {
  modalRef: BsModalRef;  
  persons: Person[];
  categoryObj : Catagory;
  categoryList: Catagory[];
  ModalHeading : string;
  categoryForm : FormGroup; 
  IsDisplay : string;
  Message : string;
  constructor(private formBuilder: FormBuilder,private modalService: BsModalService,private catagoryService: CatagoryService) { 
    this.categoryForm = this.formBuilder.group({
      Id:"",
      Name: "",
      Status:"",
      Description:""
      });
      this.IsDisplay = 'none'; 
      this.Message = '';    
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
      //Object.assign({}, { class: 'gray modal-lg' }
      this.config 
    );    
    
  
  } 

  openModalFromAdd(){

  }
  openModalFromEdit(){

  }
  closeModal(){
    console.log('modal close');
    
    this.modalService.setDismissReason('close');
    this.modalService.hide(1);
  }


  //this is submitted from Form
  submitCategory(){
    debugger;
    this.categoryObj =  this.categoryForm.value;
    let PostData = this.categoryForm.value;
    this.PostUpdateCatagory();
  }

  dtOptions: any  = {};
  ngOnInit(): void {
    const that = this;
    this.GetCatagoryList();
    this.ModalHeading = 'Add Catagory';
    let getUrl = globalConstant.BaseUrl + 'GetCategory';
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
    debugger;
  
    let response = new CatagoryResponse();
    this.catagoryService.SubmitTransaction(this.categoryObj)
    .subscribe((res) => {
      response = res;
      this.Message = response.message;
      if(response.IsSuccess == false){
        this.IsDisplay = '0';     
        console.log(res.message);
      }else if(response.IsSuccess == true){
        //this.GetCatagoryList();    
        this.IsDisplay = '1'; 
        if(response.model.Id !='')
         this.categoryList.push(response.model);
      }   
      this.categoryList.push(response.model);
   },(error:any)=>{console.log(error)})
  }


}
