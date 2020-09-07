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

  
  getInvoiceReportData(invoice:Invoice) {
   
    let strOrderDate = 'Order Date :' +  invoice.InvoiceDate;   
    let strClientName = 'Client Name :' +  invoice.CustomerName;   
    let strClientContact = 'Client Contact :' +  invoice.Phone;   
    let strSupplierName = 'Supplier Name :' +  invoice.Customer_Id;     
     return {
       content: [
         {
           text: "Order Invoice - KiniCom",
           bold: true,
           fontSize: 14,
           alignment: 'center',
           margin: [0, 0, 0, 20]
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
               text: "Sub Total      :" + invoice.Total,
               style: 'contentText'
             },
             {
               text: "Vat         :" + invoice.OtherExpense,
               style: 'contentText'
             },
             {
               text: "Discount       :" + invoice.OtherExpense,
               style: 'contentText'
             },
             {
               text: "Total Amount    :" + invoice.Payable,
               style: 'contentText',              
             },
             {
              text: "Paid Amount     :" + invoice.Paid,
              style: 'contentText'
             },
             {
              text: "Due Amount      :" + invoice.Due,
              style: 'contentText'
             },
             {
               text: "Payement Type  :"+ invoice.PaymentType,
               style: 'contentText'
             },
             {
              text: "Status          :"+ invoice.Status,
              style: 'contentText'
            },
           
            {
              text: "Description:"+ invoice.Description,
              style: 'contentText'
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
