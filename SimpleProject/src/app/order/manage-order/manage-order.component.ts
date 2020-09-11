import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef,ModalOptions } from 'ngx-bootstrap/modal';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Catagory , CatagoryResponse, Invoice,InvoiceResponse, Purchase } from '../../../Model/Category';
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
  PurchaseList: Purchase[];
  invoiceObj : Invoice;
  invoiceList: Invoice[];
  ModalHeading : string;
  orderForm : FormGroup; 
  IsDisplay : string;
  Message : string;
  submitted = false;

  constructor(public datepipe: DatePipe ,private formBuilder: FormBuilder,private modalService: BsModalService,private orderService: OrderService, private reportService: ReportService) { 
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
   
    recordsTotal: this.invoiceList.length ,
    recordsFiltered:  this.invoiceList.length,
    
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
      if(response.IsSuccess == false){
        this.IsDisplay = '0';   
        this.Message = response.message;     
      }else{
        this.IsDisplay = '1'; 
        this.Message = "Save Successful";  
        this.invoiceList = response.invoiceList;           
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
         
        }else{
          this.IsDisplay = '1'; 
          this.Message = 'Save Success';
          this.getInvoice();
        }   
  },(error:any)=>console.log(error))  
}


  
getInvoiceReportData(invoice:Invoice) {
   
  let strOrderDate = 'Order Date :' +  invoice.StrInvoiceDate;   
  let strClientName = 'Client Name :' +  invoice.CustomerName;   
  let strClientContact = 'Client Contact :' +  invoice.Phone;   
  let strSupplierName = 'Supplier Contact :' +  invoice.Customer_Id;     
   return {
     content: [
       {
         text: "Order Invoice - KiniCom",
         bold: true,
         fontSize: 14,
         alignment: 'center',
         margin: [0, 0, 0, 2]
       },
       {
         text: "Invoice No: "+ invoice.InvoiceNo,
         style: 'contentText',
         alignment: 'center'
       },
       {
        text: strOrderDate,
        style: 'contentText',
        alignment: 'center'
       },
       {
        text: strClientName,
        style: 'contentText',
        alignment: 'center'
       },
       {
        text: strClientContact,
        style: 'contentText',
        alignment: 'center'
       },
       {
        text: strSupplierName,
        style: 'contentText',
        alignment: 'center'
       },        
      
      this.getPurchasesObject(invoice.Purchases),
      {
        text: '',
        margin: [0, 0, 0, 2]
      }, 
      {
         columns: [
           [{
             text: "Sub Total:" + invoice.Total,
             style: 'contentText'
           },
           {
             text: "Vat:" + invoice.OtherExpense,
             style: 'contentText'
           },
           {
             text: "Discount:" + invoice.OtherExpense,
             style: 'contentText'
           },
           {
             text: "Total Amount:" + invoice.Payable,
             style: 'contentText',              
           },
           {
            text: "Paid Amount:" + invoice.Paid,
            style: 'contentText'
           },
           {
            text: "Due Amount:" + invoice.Due,
            style: 'contentText'
           },
          //  {
          //    text: "Payement Type  :"+ invoice.PaymentType,
          //    style: 'contentText'
          //  },
          //  {
          //   text: "Status          :"+ invoice.Status,
          //   style: 'contentText'
          // },
         
          // {
          //   text: "Description:"+ invoice.Description,
          //   style: 'contentText'
          // },
          //  {
          //    text: 'GitHub: ',
          //    link: 'asdg jsdgja',
          //    color: 'blue',
          //  }
           ],
           [
             // Document definition for Profile pic
           ]
         ]
       }],
       info: {
        title: 'Order Invoice',
        author: 'KiniCom',
        subject: 'Invoice',
        keywords: 'KiniCom, Order Invoice',
      },
       styles: {
         name: {
           fontSize: 16,
           bold: true
         },
         contentText:{
           fontSize:11,
           margin: [0, 0, 0, 1]
         }
         
       }
   };
 }


 getPurchasesObject(Purchases: Purchase[]) {
  return {
    table: {
      widths: [250, '*', '*', '*'],
      body: [
        [{
          text: 'Product Name',
          style: 'tableHeader'
        },
        {
          text: 'Quantity',
          style: 'tableHeader'
        },
        {
          text: 'Rate',
          style: 'tableHeader'
        },
        {
          text: 'Total',
          style: 'tableHeader'
        },
        ],
        ...Purchases.map(ed => {
          return [ed.ProductName, ed.Qty, ed.BuyRate, ed.BuyTotal];
        })
      ]
    }
  };
}

generatePdf(val:Invoice){
 
  let response = new InvoiceResponse()
  this.orderService.getInvoicePurchaseById(val.Id)
  .subscribe((res) => {
    response = res;    
    if(response.IsSuccess == false){
      alert(response.message);
    }else{
     this.invoiceObj = response.InvoiceModel;
     this.PurchaseList = response.purchaseList;
     let InvoiceCreateDate =this.datepipe.transform(Date.now(), 'yyyy-MM-dd-HH-mm-ss');
     pdfMake.createPdf(this.getInvoiceReportData(this.invoiceObj)).download('Invoice-'+ InvoiceCreateDate+'.pdf');
     pdfMake.createPdf(this.getInvoiceReportData(this.invoiceObj)).open();
    }
 },(error:any)=>{
   console.log(error),alert(error)
  })


  }
}

