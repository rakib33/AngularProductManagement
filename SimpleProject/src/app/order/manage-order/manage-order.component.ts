import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef,ModalOptions } from 'ngx-bootstrap/modal';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Catagory , CatagoryResponse, Invoice } from '../../../Model/Category';
import { OrderService } from 'src/services/order-service.service';
import { ReportService } from '../../services/report.service';
import { DatePipe } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {

  modalRef: BsModalRef;  
  Invoice: Invoice[];
  invoiceObj : Invoice;
  invoiceList: Invoice[];
  ModalHeading : string;
  orderForm : FormGroup; 
  IsDisplay : string;
  Message : string;
  submitted = false;

  constructor(public datepipe: DatePipe ,private formBuilder: FormBuilder,private modalService: BsModalService,private orderService: OrderService, private reportService: ReportService) { 
    //this.CreateForm('');
    this.IsDisplay = 'none'; 
    this.Message = '';  
 
} 

CreateForm(isEdit,data){
  this.IsDisplay = 'none'; 

  if(isEdit == false){
    this.orderForm = this.formBuilder.group({
      Id:['',Validators.required],
      Due: ['',Validators.required],
      Paid :['',Validators.required],
      PaymentType:['',Validators.required],
      Status:['',Validators.required]       
      });  
  }else{
    this.orderForm = this.formBuilder.group({
      Id:[data.Id,Validators.required],
      Due: [data.Due,Validators.required],
      Paid :[data.Paid,Validators.required],
      PaymentType:[data.PaymentType,Validators.required],
      Status:[data.Status,Validators.required]       
      });   
   }      
  }
// convenience getter for easy access to form fields
  get f() { return this.orderForm.controls; }

  dtOptions: any  = {};
  ngOnInit(): void {
    const that = this;  
    this.getInvoice();
    this.ModalHeading = 'Order Payment';  
    let response = new CatagoryResponse();
    this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    serverSide: true,
    processing: true,
   
    recordsTotal: this.invoiceList !== undefined  ? this.invoiceList.length : 0,
    recordsFiltered: this.invoiceList !== undefined ? this.invoiceList.length: 0,
    
    columns: [
    { data:'Id' }, 
    {data:'InvoiceDate'},
    {data:'CustomerName' }, 
    {data:'Phone'},
    {data:'TotalPurchase'},
    {data:'Status' },
    {data:'InvoiceNo'} ,
    {data:'StrInvoiceDate'} ,
    {data:'PaymentType'},
    {data: 'Purchases'},
    {data:'Total'},
    {data:'OtherExpense'},
    {data:'Discount'},
    {data:'Payable'},
    {data:'Paid'},
    {data:'Due'},
    {data:'Description'}   
    ]

  };
  
}



  getInvoice() {
    let response = new CatagoryResponse();
    this.orderService.getInvoiceList()
    .subscribe((res) => {
      response = res;
      console.log('response:'+ response);
      if(response.IsSuccess == false){
        this.IsDisplay = '0';   
        this.Message = response.message;
        console.log(res.message);
      }else{
        this.IsDisplay = '1'; 
        this.Message = "Save Successful";  
        this.invoiceList = response.invoiceList; 
        console.log(this.invoiceList);      
      }
   },(error:any)=>{
     debugger;
     console.log(error),alert(error)
    })
  
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

  closeModal(){
    console.log('modal close');
    this.IsDisplay = 'none'; 
    this.onReset();
    this.modalService.setDismissReason('close');
    this.modalService.hide(1);
  }
  onReset() {
    this.submitted = false;
    this.orderForm.reset();
    this.CreateForm(false,'');
}

  openModalFromEdit(template: TemplateRef<any>,controlValue,index){

    this.CreateForm(true,controlValue);
    this.modalRef = this.modalService.show(  
     template,     
     this.config 
   );    
   }

submitOrder(){
    this.submitted = true;
    let response = new CatagoryResponse();
    this.invoiceObj = this.orderForm.value;   
     this.orderService.SavePayment(this.invoiceObj)
      .subscribe((res) => {  
        response = res;
        if(res.IsSuccess == false){
          this.IsDisplay = '0'; 
          this.Message=response.message;
          console.log(response.message);
        }else{
          this.IsDisplay = '1'; 
          this.Message = 'Save Success';
          this.getInvoice();
        }   
  },(error:any)=>console.log(error))  
}

generatePdf(val){
  let InvoiceCreateDate =this.datepipe.transform(Date.now(), 'yyyy-MM-dd-HH-mm-ss');
  pdfMake.createPdf(this.reportService.getInvoiceReportData(val)).download('Invoice-'+InvoiceCreateDate+'.pdf');
  pdfMake.createPdf(this.reportService.getInvoiceReportData(val)).open();
  }

}
