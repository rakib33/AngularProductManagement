import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../services/order-service.service';
import {ProductService} from '../services/product.service';
import {SelectList,kiniOrder} from '../../Model/ViewModel';
import {OrderReport,CatagoryResponse,Invoice,Purchase} from '../../Model/Category';
import { from } from 'rxjs';
import { DatePipe } from '@angular/common';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styles: [
  ]
})
export class ReportsComponent implements OnInit {
  OrderReportForm : FormGroup; 
  submitted = false;
  invoiceList: Invoice[];
  response : CatagoryResponse;
  orderReport : OrderReport;
  constructor(public datepipe: DatePipe,private fb:FormBuilder,private orderService:OrderService, private productService:ProductService) { }

  ngOnInit(): void {
    this.CreateForm(); 
  
  }
  CreateForm(){
    this.OrderReportForm = this.fb.group({
      StartDate: [''], 
      EndDate: ['',Validators.required], 
    });
  }
  get f() { return this.OrderReportForm.controls; }

  getInvoiceByDate(StartDate,EndDate) {
    let response = new CatagoryResponse();
    this.orderService.getInvoiceListByDate(StartDate,EndDate)
    .subscribe((res) => {
      response = res;
      console.log('response:'+ response);
      if(response.IsSuccess == false){
        alert(response.message);
      }else{
       this.invoiceList = response.invoiceList; 
       let InvoiceCreateDate =this.datepipe.transform(Date.now(), 'yyyy-MM-dd-HH-mm-ss');
       pdfMake.createPdf(this.getDocumentDefinition()).download('Invoice-'+ InvoiceCreateDate+'.pdf');
       pdfMake.createPdf(this.getDocumentDefinition()).open();
      }
   },(error:any)=>{
     debugger;
     console.log(error),alert(error)
    })
  
  }

  GetSum(List,key) {
    return List.reduce((a, b) => a + (b[key] || 0), 0);
}

  getDocumentDefinition() {
    let InvoiceCreateDate =this.datepipe.transform(Date.now(), 'yyyy-MM-dd:HH-mm-ss');
    let Total = this.GetSum(this.invoiceList,'Payable');
      return {
       content: [
         {
           text: "KiniCom Order Report Slip",
           bold: true,
           fontSize: 20,
           alignment: 'center',
           margin: [0, 0, 0, 20]
         },       
        {
          text: InvoiceCreateDate,      
        }, 
        this.getPurchasesObject(this.invoiceList),
        {
          text:"Total :" + Total,
          style:'name',
          alignment: 'right',
        }
        ],
         info: {
          title: 'Order Report Slip',
          author: 'KiniCom',
          subject: 'Invoice',
          keywords: 'KiniCom, Order ,Report',
        },
         styles: {
           name: {
             fontSize: 16,
             bold: true
           },
           content:{
             fontSize:11,
             alignment: 'center',
           },
           tableHeader:{
            fontSize: 12,
            bold: true,
            margin: [0, 1, 0, 1],
            alignment: 'center',
           },
           tablecolRight:{
            fontSize: 12,
            bold: true,
            margin: [0, 1, 0, 1],
            alignment: 'right',
           }


         }
     };
   }


   getPurchasesObject(Purchases: Invoice[]) {
    return {
      table: {
        widths: [20,30,'auto', '*', '*', '*'],
        body: [
          [
            {
              text: 'Sl no',
              style: 'tableHeader'
            },
            {
              text: 'Invoice no',
              style: 'tableHeader'
            },            
            {
            text: 'Order Date',
            style: 'tableHeader'
          },
          {
            text: 'Client Name',
            style: 'tableHeader'
          },
          {
            text: 'Contact',
            style: 'tableHeader'
          },
          {
            text: 'Grand Total',
            style: 'tablecolRight'
          },
          ],
       
          ...Purchases.map((ed ,index)=> {
            return [index +1, ed.InvoiceNo, ed.StrInvoiceDate, ed.CustomerName, ed.Phone, ed.Payable];
          })
        ]
      }
    };
  }

  submitHandler() {
    debugger;
    this.submitted = true;
    this.orderReport = this.OrderReportForm.value;
    console.log(this.OrderReportForm);
    this.getInvoiceByDate(this.orderReport.StartDate, this.orderReport.EndDate);  
    this.CreateForm();
  }
  

}
