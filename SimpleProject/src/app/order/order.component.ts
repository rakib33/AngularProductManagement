import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../services/order-service.service';
import {SelectList,kiniOrder} from '../../Model/ViewModel';
import { from } from 'rxjs';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
  ]
})
//https://www.tektutorialshub.com/angular/nested-formarray-example-add-form-fields-dynamically/
export class OrderComponent implements OnInit {
  
  title = 'Nested FormArray Example Add Form Fields Dynamically';
 
  empForm:FormGroup;
  nestedForm : FormGroup; 
  selectedQuantity = "10";
  ProductList = []; //for dropdownList
  selectedProduct: String;
  modifedtext : string;
  constructor(private fb:FormBuilder,private service:OrderService) {
 
    // this.empForm=this.fb.group({
    //   employees: this.fb.array([]) ,
    // })
   
  }
  ngOnInit(): void {
    this.nestedForm = this.fb.group({
      InvoiceDate: [], //order date
      CustomerName: [], //ClientName
      Phone: [], //Contact
      Customer_Id: [], //Supplier Id, from dropdown
      InvoiceNo: [],
      Total: 0, //sub total
      OtherExpense:0, // Vat
      Discount:0,
      Payable :0 ,// Total Amount or Grand Total
      Paid:0, 
      Due:0,
      Description:[],
      PaymentType:[],
      Status:[],
      Purchases: this.fb.array([this.addPurchaseGroup()])
      //skills:this.fb.array([])
    }); 
    
    this.ProductList = this.getProducts();
    //this.selectedProduct = '4';
   }

   getProducts() {
    return [
      { id: '1', name: 'order 1' },
      { id: '2', name: 'order 2' },
      { id: '3', name: 'order 3' },
      { id: '4', name: 'order 4' }
    ];
  }
onProductSelected(event, index:number,group){
  let selectedProduct = event.target.value;
  let selectedIndex = index;
  this.fetchProductRate(index,group);
}

onQtyChanged(event,group){
  let ProductQty : number = event.target.value;
  let productRate : number = group.controls.BuyRate.value;
  group.get('BuyTotal').setValue(ProductQty * productRate);
}

 fetchProductRate(index:number,group){
   this.modifedtext= "The value " + group.get('Product_Id').Product_Id + " was selected from dropdown";
   group.get('BuyRate').setValue(index * 100);
  }
  
  get capValues(): FormArray {
    return this.nestedForm.get('Purchases') as FormArray;
}
sum: number = 0 ;
getSum() {
    this.sum = this.capValues.value.reduce((prev, next) => prev + +next.fdnTotalShares, 0);
    // OR
    // this.sum = this.capValues.getRawValue().reduce((prev, next) => prev + +next.fdnTotalShares, 0);
}
    
addPurchaseGroup(){
 return this.fb.group({
    // Id:[],
    // InvoiceNo:[],
    Qty: [], //Quantity
    BuyRate:[], //Rate
    BuyTotal:[], //Total
    Product_Id:[]
    // InvoiceDate:[]
 });
}

addAddress(){
  this.addPurchaseArray.push(this.addPurchaseGroup());
}
removeAddress(index){
  this.addPurchaseArray.removeAt(index);
}
 get addPurchaseArray(){
   return <FormArray>this.nestedForm.get('Purchases');
 }
 submitHandler() {
  //console.log(this.empForm.value);
  let PostData = this.nestedForm.value;
  console.log(this.nestedForm.value);
  this.createPost(PostData);

  console.log(this.getSum());
}

createPost(postData){

 let  kinidata = new kiniOrder();
 kinidata.Total = 100; 


  this.service.create(postData)
    .subscribe(res => {
      let Data = res;
       
   })

   this.service.SubmitTransaction(kinidata)
    .subscribe((res) => {
      let Data = res;
      this.nestedForm.reset();
    
   },(error:any)=>console.log(error))
  //  this.service.createTest2()
  //   .subscribe(res => {
  //     let Data = res;
       
  //  })
}

}
 
 
export class country {
  id: string;
  name: string;
 
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
 
 