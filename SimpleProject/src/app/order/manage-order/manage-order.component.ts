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
    header:{
      text:'www.fb.com/kini24.com.bd',
      alignment: 'left',
      margin: [5, 2, 0, 0]
    },
    footer: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
     content: [
       {
         text: "Order Invoice",
         bold: true,
         fontSize: 13,
         alignment: 'center',
         margin: [0, 0, 0, 5]
       },
      {
        columns: [         
          {
            width: '43%',
            text: 'www.kini24.com',
            alignment: 'left'
          },
          {          
            width: '*',
            text:  "Invoice No:"+ invoice.InvoiceNo,
            style: 'contentText',
            alignment: 'left'
          }
        ],       
      },
      {
        columns: [         
          {
            // % width
            width: '43%',
            text: '213/7A West Agargaon',
            alignment: 'left'
          },
          {          
            width: '*',
            text: strOrderDate,
            style: 'contentText',
            alignment: 'left'
          }
        ],       
      },

      {
        columns: [         
          {
            // % width
            width: '43%',
            text: 'Shapla Housing.Dhaka-1207',
            alignment: 'left'
          },
          {          
            width: '*',
            text: strClientName,
            style: 'contentText',
            alignment: 'left'
          }
        ],       
      },
      
      {
        columns: [         
          {
            // % width
            width: '43%',
            text: '01704387973',
            alignment: 'left'
          },
          {          
            width: '*',
            text: strClientContact,
            style: 'contentText',    
            alignment: 'left'
          }
        ],       
      },
      
      {
        columns: [         
          {
            // % width
            width: '43%',
            text: '',
            alignment: 'left'
          },
          {          
            width: '*',
            text: strSupplierName,
            style: 'contentText',
            alignment: 'left' 
          }
        ],       
      },
       
      {
        columns: [         
          {
            // % width
            width: '43%',
            text: '',
            alignment: 'left'
          },
          {          
            width: '*',
            text: '',
            style: 'contentText',
            alignment: 'left' 
          }
        ],       
      },
       
      this.getPurchasesObject(invoice.Purchases),
      {
        text: '',
        margin: [0, 0, 0, 2]
      }, 
    
      {
        columns: [     
          {width: '70%',
          text: invoice.Description,
          //rowSpan: 6,
          alignment: 'left',
          margin: [0, 0, 15, 0],
          
        },    
          
          {
            width: '15%',
            text: 'Sub Total:',
            alignment: 'left'
          },
          {          
            width: '*',
            text: invoice.Total,
            style: 'contentText',    
            alignment: 'right',
            margin: [0, 0, 0, 2]
          }
        ],       
      },
      {
        columns: [     
          {width: '70%',text: ''},  
          
          {
            width: '15%',
            text: 'Vat:',
            alignment: 'left'
          },
          {          
            width: '*',
            text: invoice.OtherExpense,
            style: 'contentText',    
            alignment: 'right',
            margin: [0, 0, 0, 2]
          }
        ],       
      },
      {
        columns: [     
          {width: '70%',text: ''},  
          
          {
            width: '15%',
            text: 'Discount:',
            alignment: 'left'
          },
          {          
            width: '*',
            text: invoice.Discount,
            style: 'contentText',    
            alignment: 'right',
            margin: [0, 0, 0, 2]
          }
        ],       
      },
      {
        columns: [     
          {width: '70%',text: ''},  
          {
            width: '15%',
            text: 'Total Amount:',
            alignment: 'left'
          },
          {          
            width: '*',
            text:  invoice.Payable,
            style: 'contentText',    
            alignment: 'right',
            margin: [0, 0, 0, 2]
          }
        ],       
      },
      {
        columns: [     
          {width: '70%',text: ''},  
          
          {
            width: '15%',
            text: 'Paid Amount:',
            alignment: 'left'
          },
          {          
            width: '*',
            text:  invoice.Paid,
            style: 'contentText',    
            alignment: 'right',
            margin: [0, 0, 0, 2]
          }
        ],       
      },
      {
        columns: [     
          {width: '70%',text: ''},          
          {
            width: '15%',
            text: 'Due Amount:',
            alignment: 'left'
          },
          {          
            width: '*',
            text:  invoice.Due,
            style: 'contentText',    
            alignment: 'right',
            margin: [0, 0, 0, 2]
          }
        ],       
      },
            
      ],
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
      // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
      headerRows: 1,
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

