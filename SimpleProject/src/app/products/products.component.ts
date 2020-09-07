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
  productList: Product[];
  categoryList: Catagory[];
  brandList : Catagory[];
  ModalHeading : string;
  productForm : FormGroup; 
  IsDisplay : string;
  Message : string;
  submitted = false;

  // constructor(private http: HttpClient) { }

  constructor(private formBuilder: FormBuilder,private modalService: BsModalService,
    private productService: ProductService,private categoryService: CatagoryService, 
    private brandService: BrandService) { 

    this.CreateForm(false, '');
    this.IsDisplay = 'none'; 
    this.Message = '';    
} 
CreateForm(isEdit, data){

  this.GetBrandList();
  this.GetCatagoryList();


  if(isEdit == false){
    this.productForm = this.formBuilder.group({
      Id:['',Validators.required],
      Name: ['',[Validators.required, Validators.minLength(50)]],
      Status:['',Validators.required],
      Description:['',[Validators.required, Validators.minLength(150)]],
      ProductQuantity:['',[Validators.required, Validators.minLength(20),Number]],
      CostPrice : ['',[Validators.required, Validators.minLength(20),Number]],
      Catagory_Id : ['',Validators.required],
      Brand_Id : ['',Validators.required],
      file: ['', [Validators.required]],
      fileSource:['', [Validators.required]]
      });
    }
    else if(isEdit == true){
      this.productForm = this.formBuilder.group({
        Id:[data.Id,Validators.required],
        Name: [data.Name,[Validators.required, Validators.minLength(50)]],
        Status:[data.Status,Validators.required],
        Description:[data.Description,[Validators.required, Validators.minLength(150)]],
        ProductQuantity:[data.ProductQuantity,[Validators.required, Validators.minLength(150),Number]],
        CostPrice : [data.CostPrice,[Validators.required, Validators.minLength(150),Number]],
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
    console.log('modal close');
    this.IsDisplay = 'none'; 
    this.onReset();
    this.modalService.setDismissReason('close');
    this.modalService.hide(1);
  }
  onReset() {
    this.submitted = false;
    this.productForm.reset();
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
    this.productService.getProductList()
    .subscribe((res) => {
      response = res;
      if(res.IsSuccess == false){
        alert(res.message);
        console.log(res.message);
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
      { data: 'Name' }, 
      { data: 'Status' },
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
    debugger;
    let response = new CatagoryResponse();
    this.categoryService.getCategoryList()
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
  GetBrandList(){
    debugger;
    let response = new CatagoryResponse();
    this.brandService.getCategoryList()
    .subscribe((res) => {
      response = res;
      if(res.IsSuccess == false){
        alert(res.message);
        console.log(res.message);
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
      let Uploadedfile: File = files[0];
      this.productForm.get('file').setValue(Uploadedfile);
      let productObj = this.productForm.value;

      // let headers = new Headers();
      //   /** In Angular 5, including the header Content-Type can invalidate your request */
      //   headers.append('Content-Type', 'multipart/form-data');
      //   headers.append('Accept', 'application/json');
        // let options = new RequestOptions({ headers: headers });
        // this.http.post(`${this.apiEndPoint}`, formData, options)
        //     .map(res => res.json())
        //     .catch(error => Observable.throw(error))
        //     .subscribe(
        //         data => console.log('success'),
        //         error => console.log(error)
        //     )

      //   this.productService.SubmitTransaction(productObj)
      //   .subscribe((res) => {
      //    let  response = res;
      //  },(error:any)=>{console.log(error)})
    }
}

    submitProduct(){
      this.submitted = true;
      let ProductValue = this.productForm.value;
      var bytes = [];  
        
      let response = new CatagoryResponse();
      let IsEdit = 0;
      let index ;
      
      // if(this.categoryObj.Id ){
      //   IsEdit = 1;
      //   index = this.categoryList.indexOf(this.categoryObj);   
      // }
  
      this.productService.SubmitTransaction(ProductValue)
      .subscribe((res) => {
        response = res;
        this.Message = response.message;
        if(response.IsSuccess == false){
          this.IsDisplay = '0';     
          console.log(res.message);
        }else if(response.IsSuccess == true){
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


