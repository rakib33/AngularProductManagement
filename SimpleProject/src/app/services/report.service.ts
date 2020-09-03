import { Injectable } from '@angular/core';
import {Product,CatagoryResponse,Invoice,Purchase} from '../../Model/Category';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  
  getInvoiceReportData(invoice) {
   
    let strOrderDate = 'Order Date :' +  invoice.InvoiceDate;   
    let strClientName = 'Client Name :' +  invoice.CustomerName;   
    let strClientContact = 'Client Contact :' +  invoice.Phone;   
    let strSupplierName = 'Supplier Name :' +  invoice.Customer_Id;     
     return {
       content: [
         {
           text: "Order Invoice - KiniCom",
           bold: true,
           fontSize: 20,
           alignment: 'center',
           margin: [0, 0, 0, 20]
         },
         {
           text: "Invoice No: "+ invoice.InvoiceNo
         },
         {
          text: strOrderDate
         },
         {
          text: strClientName
         },
         {
          text: strClientContact
         },
         {
          text: strSupplierName
         },
         {
          text: ''
         },
        {
          text: 'Product List',
          style: 'header'
        },
        this.getPurchasesObject(invoice.Purchases),
        {
          text: '',
          style: 'header'
        }, 
        {
           columns: [
             [{
               text: "Sub Total      :" + invoice.Total,
              
             },
             {
               text: "Vat(0%)         :" + invoice.OtherExpense
             },
             {
               text: "Discount       :" + invoice.OtherExpense,
             },
             {
               text: "Total Amount    :" + invoice.Payable,
               //style: 'name'
             },
             {
              text: "Paid Amount     :" + invoice.Paid,
             },
             {
              text: "Due Amount      :" + invoice.Due,
             },
             {
               text: "Payement Type  :"+ invoice.PaymentType
             },
             {
              text: "Status          :"+ invoice.Status
            },
            {
              text: ''
            },
            {
              text: "Description:"+ invoice.Description
            },
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
           }
         }
     };
   }


   getPurchasesObject(Purchases: Purchase[]) {
    return {
      table: {
        widths: ['*', '*', '*', '*'],
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

}
