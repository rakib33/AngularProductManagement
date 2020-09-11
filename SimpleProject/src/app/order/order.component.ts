import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../services/order-service.service';
import {ProductService} from '../services/product.service';
import {SelectList,kiniOrder} from '../../Model/ViewModel';
import {Product,CatagoryResponse,Invoice,Purchase} from '../../Model/Category';
import { from } from 'rxjs';
import { DatePipe } from '@angular/common';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
  ]
})
//https://www.tektutorialshub.com/angular/nested-formarray-example-add-form-fields-dynamically/
export class OrderComponent implements OnInit {
  
  title = 'Nested FormArray Example Add Form Fields Dynamically';
  
  InvoiceNo : string;
  IsDisplay : string;
  Message : string;
  submitted = false;
  nestedForm : FormGroup; 
  selectedQuantity = "10";
  ProductList : Product[]; //for dropdownList
  productObj : Product;
  selectedProduct: String;
  modifedtext : string;
  constructor(public datepipe: DatePipe,private fb:FormBuilder,private service:OrderService, private productService:ProductService) {
    this.IsDisplay = 'none'; 
    this.Message = ''; 
   
  }
  InvoiceCreateDate : string;
  generatePdf(val){
   this.InvoiceCreateDate =this.datepipe.transform(Date.now(), 'yyyy-MM-dd-HH-mm-ss');
   pdfMake.createPdf(this.getInvoiceReportData(this.OrderFromValue)).download('Invoice-'+this.InvoiceCreateDate+'.pdf');
   pdfMake.createPdf(this.getInvoiceReportData(  this.OrderFromValue)).open();
   }

   resetForm(){
    
   }
   profilePic ='';
   fileChanged(event){

   }
   getProfilePicObject() {
    // if (this.nestedForm.profilePic) {
    //   return {
    //     image: this.nestedForm.profilePic ,
    //     width: 75,
    //     alignment : 'right'
    //   };
    // }
    return null;
  }

  //  getDocumentDefinition() {
  //   //sessionStorage.setItem('resume', JSON.stringify(this.nestedForm.value));
  //   let strOrderDate = 'Order Date :' +  this.OrderFromValue.InvoiceDate;   
  //   let strClientName = 'Client Name :' +  this.OrderFromValue.CustomerName;   
  //   let strClientContact = 'Client Contact :' +  this.OrderFromValue.Phone;   
  //   let strSupplierName = 'Supplier Name :' +  this.OrderFromValue.Customer_Id;     
  //    return {
  //      content: [
  //        {
  //          text: "Order Invoice - KiniCom",
  //          bold: true,
  //          fontSize: 20,
  //          alignment: 'center',
  //          margin: [0, 0, 0, 20]
  //        },
  //        {
  //          text: "Invoice No: "+ this.InvoiceNo
  //        },
  //        {
  //         text: strOrderDate
  //        },
  //        {
  //         text: strClientName
  //        },
  //        {
  //         text: strClientContact
  //        },
  //        {
  //         text: strSupplierName
  //        },
  //        {
  //         text: ''
  //        },
  //       {
  //         text: 'Product List',
  //         style: 'header'
  //       },
  //       this.getPurchasesObject(this.OrderFromValue.Purchases),
  //       {
  //         text: '',
  //         style: 'header'
  //       }, 
  //       {
  //          columns: [
  //            [{
  //              text: "Sub Total      :" + this.OrderFromValue.Total,
              
  //            },
  //            {
  //              text: "Vat(0%)         :" + this.OrderFromValue.OtherExpense
  //            },
  //            {
  //              text: "Discount       :" + this.OrderFromValue.OtherExpense,
  //            },
  //            {
  //              text: "Total Amount    :" + this.OrderFromValue.Payable,
  //              //style: 'name'
  //            },
  //            {
  //             text: "Paid Amount     :" + this.OrderFromValue.Paid,
  //            },
  //            {
  //             text: "Due Amount      :" + this.OrderFromValue.Due,
  //            },
  //            {
  //              text: "Payement Type  :"+ this.OrderFromValue.PaymentType
  //            },
  //            {
  //             text: "Status          :"+ this.OrderFromValue.Status
  //           },
  //           {
  //             text: ''
  //           },
  //           {
  //             text: "Description:"+ this.OrderFromValue.Description
  //           },
  //           //  {
  //           //    text: 'GitHub: ',
  //           //    link: 'asdg jsdgja',
  //           //    color: 'blue',
  //           //  }
  //            ],
  //            [
  //              // Document definition for Profile pic
  //            ]
  //          ]
  //        }],
  //        info: {
  //         title: 'Order Invoice',
  //         author: 'KiniCom',
  //         subject: 'Invoice',
  //         keywords: 'KiniCom, Order Invoice',
  //       },
  //        styles: {
  //          name: {
  //            fontSize: 16,
  //            bold: true
  //          }
  //        }
  //    };
  //  }


  //  getPurchasesObject(Purchases: Purchase[]) {
  //   return {
  //     table: {
  //       widths: ['*', '*', '*', '*'],
  //       body: [
  //         [{
  //           text: 'Product Name',
  //           style: 'tableHeader'
  //         },
  //         {
  //           text: 'Quantity',
  //           style: 'tableHeader'
  //         },
  //         {
  //           text: 'Rate',
  //           style: 'tableHeader'
  //         },
  //         {
  //           text: 'Total',
  //           style: 'tableHeader'
  //         },
  //         ],
  //         ...Purchases.map(ed => {
  //           return [ed.ProductName, ed.Qty, ed.BuyRate, ed.BuyTotal];
  //         })
  //       ]
  //     }
  //   };
  // }


    
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
   

  ngOnInit(): void {
    this.nestedForm = this.fb.group({
      InvoiceDate: ['',Validators.required], //order date
      CustomerName: ['',[Validators.required, Validators.minLength(50)]], //ClientName
      Phone: ['',[Validators.required, Validators.minLength(150),Number]], //Contact
      Customer_Id: ['',Validators.required], //Supplier Id, from dropdown
      InvoiceNo: [],
      Total:[0,[Validators.required, Validators.minLength(20),Number]], //sub total
      OtherExpense:[0,[Validators.required, Validators.minLength(20),Number]], // Vat
      Discount:[0,[Validators.required, Validators.minLength(20),Number]],
      Payable :[0,[Validators.required, Validators.minLength(20),Number]],// Total Amount or Grand Total
      Paid:[0,[Validators.required, Validators.minLength(20),Number]], 
      Due:[0,[Validators.required, Validators.minLength(20),Number]],
      Description:['',[Validators.required, Validators.minLength(150)]],
      PaymentType:['',[Validators.required, Validators.minLength(50)]],
      Status:['',[Validators.required, Validators.minLength(50)]],
      profilePic:[],
      Purchases: this.fb.array([this.addPurchaseGroup()])
    }); 
    

    this.getProducts();
    //this.selectedProduct = '4';
   }
   // convenience getter for easy access to form fields
   get f() { return this.nestedForm.controls; }
   
   getProducts() {

    let response = new CatagoryResponse();
    this.productService.getProductList()
    .subscribe((res) => {
      response = res;
      if(res.IsSuccess == false){
        alert(res.message);
        console.log(res.message);
      }else{
        this.ProductList = res.products;
      }
   },(error:any)=>{console.log(error),alert(error)})
  
  }
  
onProductSelected(event, index:number,group){
  let selectedProduct = event.target.value;
  let selectedIndex = index;
  this.fetchProductRate(index,group,selectedProduct);
}

onQtyChanged(event,group,productQty=null){
  let ProductQty : number = 1;
  if(productQty !== null)
    ProductQty = productQty;
  else  
   ProductQty = event.target.value;

  let productRate : number = group.controls.BuyRate.value;
  //check product Quantity
  let productId : string = group.controls.Product_Id.value
  let productObj : Product =  this.ProductList.find(prod=> prod.Id === productId); //.find(t=>t.CostPrice);
  
if(productObj.ProductQuantity >= ProductQty){
  if(ProductQty > 0 && productRate > 0){
   group.get('BuyTotal').setValue(ProductQty * productRate);
  }
  else{
   alert('Invalid Product rate or quantity');
   group.get('BuyTotal').setValue(0);
   }
  }else{
    alert('Maximum Quantity Excced :' + productObj.ProductQuantity);
    group.get('Qty').setValue(0);
    group.get('BuyTotal').setValue(0);
  }
  this.SubTotalCalculation();
  this.TotalPayableCalculation();
  
}


onDiscountChanged(event){
  // let Discount : number = event.target.value;
  // let subTotal = this.nestedForm.controls['Total'].value;
  // if(Discount > 0 && subTotal > 0){
  //   this.SetNestedFromValue('Payable',(subTotal - Discount));
  // }    
  this.TotalPayableCalculation();
}
onVatChanged(event){
 this.TotalPayableCalculation();
}
onPaidChanged(event){
 this.TotalPayableCalculation();
}

TotalPayableCalculation(){
  let SubTotal:number = this.GetNestedFromValue('Total');
  let Discout :number = this.GetNestedFromValue('Discount');
  let vat :number = this.GetNestedFromValue('OtherExpense');
  
  if(SubTotal > 0){
    SubTotal += vat - Discout;
   this.SetNestedFromValue('Payable', SubTotal); 
  }
   
  let paid :number = this.GetNestedFromValue('Paid');
  this.SetNestedFromValue('Due',(SubTotal - paid));
}

SubTotalCalculation(){
  let purchaseList : Purchase[] = this.nestedForm.get('Purchases').value;
  let SubTotal : number = purchaseList.reduce((sum, current) => sum + current.BuyTotal, 0);
  this.nestedForm.controls['Total'].setValue(SubTotal);
}

SetNestedFromValue(fromControlName,Value){
  this.nestedForm.controls[fromControlName].setValue(Value);
}
GetNestedFromValue(fromControlName){
 return this.nestedForm.controls[fromControlName].value;
}
 
 fetchProductRate(index:number,group, productId){
  let productObj : Product =  this.ProductList.find(prod=> prod.Id === productId); //.find(t=>t.CostPrice);
  group.get('ProductName').setValue(productObj.Name);
  group.get('BuyRate').setValue(productObj.CostPrice);  
  group.get('Qty').setValue(1);
  this.onQtyChanged(null,group,1);
}
  
get GetPurchaseGroup(): FormArray {
    return this.nestedForm.get('Purchases') as FormArray;
}
//sum: number = 0 ;
getSum() {
    return this.GetPurchaseGroup.value.reduce((prev, next) => prev + +next.Total, 0);
 }
    
 addPurchaseGroup(){
  return this.fb.group({
     // Id:[],
     // InvoiceNo:[],
     Qty: [], //Quantity
     BuyRate:[], //Rate
     BuyTotal:[], //Total
     Product_Id:[],
     ProductName:[]
     // InvoiceDate:[]
  });
 }

addAddress(){
  this.addPurchaseArray.push(this.addPurchaseGroup());
}
removeAddress(index){
  this.addPurchaseArray.removeAt(index);
  this.SubTotalCalculation();
  this.TotalPayableCalculation();
}
 get addPurchaseArray(){
   return <FormArray>this.nestedForm.get('Purchases');
 }

 onReset() {
  this.submitted = false;
  this.nestedForm.reset();
}

 OrderFromValue : Invoice;
 submitHandler() {
  debugger;
  this.submitted = true;
  this.OrderFromValue = this.nestedForm.value;
  this.createPost(this.OrderFromValue);
}

createPost(postData){
  let response = new CatagoryResponse();
   this.service.SubmitTransaction(postData)
    .subscribe((res) => {
      response = res;
      if(res.IsSuccess == false){
        this.IsDisplay = '0'; 
        this.Message=res.message;      
      }else{
        this.InvoiceNo = response.InvoiceNo;
        this.IsDisplay = '1'; 
        this.Message = 'Save Success';
        this.generatePdf('open');
        this.nestedForm.reset();
      }    
   },(error:any)=>console.log(error))

 }

}
 
 