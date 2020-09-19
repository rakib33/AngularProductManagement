import { Component, OnInit,TemplateRef } from '@angular/core';
import { HttpClient, HttpResponse ,HttpParams, HttpRequest, HttpEvent} from '@angular/common/http';
import { BsModalService, BsModalRef,ModalOptions } from 'ngx-bootstrap/modal';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Catagory ,Product, CatagoryResponse } from '../../Model/Category';
import { ProductService} from '../services/product.service';
import {BrandService} from '../services/brand.service';
import {CatagoryService } from '../services/catagory.service';
import { from } from 'rxjs';
import {globalConstant} from '../../Model/appVariable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
    './products.component.css'
  ]
})
export class ProductsComponent implements OnInit {

  modalRef: BsModalRef;
  categoryObj : Catagory;
  productObj : Product;
  productList: Product[];
  categoryList: Catagory[];
  brandList : Catagory[];
  ModalHeading : string;
  productForm : FormGroup; 
  IsDisplay : string;
  Message : string;
  submitted : boolean;
  
  selectedFile: File = null;  
  fileByteArray : [];
  // constructor(private http: HttpClient) { }

constructor(private formBuilder: FormBuilder,private modalService: BsModalService,
    private productService: ProductService,private categoryService: CatagoryService, 
    private brandService: BrandService) { 
    this.CreateForm(false, '');
    this.IsDisplay = 'none'; 
    this.Message = '';    
    this.submitted = true;
} 

CreateForm(isEdit, data){
  this.GetBrandList();
  this.GetCatagoryList();

  if(isEdit == false){
    this.productForm = this.formBuilder.group({
      Id:[''],
      Name: ['',[Validators.required]],
      Status:['',Validators.required],
      Description:[''],
      ProductQuantity:['',[Validators.required]],
      CostPrice : ['',[Validators.required]],
      SalePrice :  ['',[Validators.required]],
      Catagory_Id : ['',Validators.required],
      Brand_Id : ['',Validators.required],
      file: ['']
      // fileSource:['']
      });
      this.productForm.reset();
    }
    else if(isEdit == true){
      this.productForm = this.formBuilder.group({
        Id:[data.Id,Validators.required],
        Name: [data.Name,[Validators.required]],
        Status:[data.Status,Validators.required],
        Description:[data.Description],
        ProductQuantity:[data.ProductQuantity,Validators.required],
        CostPrice : [data.CostPrice,Validators.required],
        SalePrice :  [data.SalePrice,Validators.required],
        Catagory_Id : [data.Catagory_Id,Validators.required],
        Brand_Id : [data.Brand_Id,Validators.required]
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
  openModalFromEdit(template: TemplateRef<any>,controlValue,index){
  
   this.CreateForm(true,controlValue);
   this.modalRef = this.modalService.show(  
    template,     
    this.config 
  );    
  }

  closeModal(){   
    this.IsDisplay = 'none'; 
    this.onReset();
    this.modalService.setDismissReason('close');
    this.modalService.hide(1);
  }
  onReset() {
    this.productObj = null;
    this.submitted = false;
    this.productForm.reset();
    this.imgURL = null;
    this.CreateForm(false,'');
}
  // convenience getter for easy access to form fields
  get f() { return this.productForm.controls; }

  dtOptions: any  = {};
  ngOnInit(): void {
   this.GetProductList();
     }

  GetProductList(){
  
    let response = new CatagoryResponse();
    this.productService.getProductList('')
    .subscribe((res) => {
      response = res;
      if(res.IsSuccess == false){
        alert(res.message);
      }else{
        this.productList = res.products;
      }
   },(error:any)=>{console.log(error),alert(error)})
  
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      recordsTotal: this.productList.length,
      recordsFiltered: this.productList.length,
      columns: [{ data: 'Id' }, 
      {data:'Name' }, 
      {data:'Status' },
      {data:'Description'},
      {data:'CreatedBy'},
      {data:'CreatedDate'},
      {data:'CostPrice'},
      {data:'ProductQuantity'},
      {data:'BrandName'},
      {data:'CategoryName'}     
    ]
    };

  }
 
  

  GetCatagoryList(){
  
    let response = new CatagoryResponse();
    this.categoryService.getCategoryList()
    .subscribe((res) => {
      response = res;
      if(res.IsSuccess == false){
        alert(res.message);
      }else{
        this.categoryList = res.categories;
      }
   },(error:any)=>{console.log(error),alert(error)})
  }
  GetBrandList(){

    let response = new CatagoryResponse();
    this.brandService.getCategoryList()
    .subscribe((res) => {
      response = res;
      if(res.IsSuccess == false){
        alert(res.message);
      }else{
        this.brandList = res.categories;
      }
   },(error:any)=>{console.log(error),alert(error)})
  }



  public imagePath;
  imgURL: any;
  public message: string;
  public UploadedFile: Blob;

  preview(files,event) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    //let fileList: FileList = event.target.files;  
    if(files.length > 0) { 
      this.selectedFile = files[0];
      //this.getByteArray(this.selectedFile);
    }
}

getByteArray(file:File) {
  var fileReader = new FileReader(); 
  var reader = new FileReader();
  var fileByteArray = [];
  reader.readAsArrayBuffer(file);
  var fileData = reader.result;  
  fileByteArray = new  Array(fileData);
  fileByteArray = new Array(fileData);
  return fileByteArray;
  // reader.onloadend = function (evt) {  
  //     if (evt.target.readyState == FileReader.DONE) {
  //        var arrayBuffer = evt.target.result;
  //          var  array = new  Array(arrayBuffer);
  //        for (var i = 0; i <  array.length; i++) {
  //         fileByteArray.push(array[i]);
  //         }
  //     }
  // }
  
}

submitProduct(){
      this.submitted = true;
      // this.productForm.append('TileImage', this.selectedFile);
      //this.productForm.get('file').setValue(this.selectedFile);
      //this.productObj = new Product();
      this.productObj = this.productForm.value;
      this.productObj.file  = this.selectedFile; //this.getByteArray(this.selectedFile);  
      let response = new CatagoryResponse();
      let IsEdit = 0;
      this.productService.SubmitTransaction(this.productObj)
      .subscribe((res) => {
        response = res;
        this.Message = response.message;
        if(response.IsSuccess == false){
          this.IsDisplay = '0';
        }
        else if(response.IsSuccess == true){
          this.GetProductList();    
          this.IsDisplay = '1';            
          if(IsEdit == 1){
            this.Message ="Update Success";           
          } else{
            this.Message ="Save Success";
          }
          this.onReset();
        }
     },(error:any)=>{console.log(error)})
  }
}
    
export class Dropdown {
  Id: string;
  Name: string;
 
  constructor(Id: string, Name: string) {
    this.Id = Id;
    this.Name = Name;
  }
}


