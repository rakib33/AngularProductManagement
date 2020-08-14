// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-order',
//   templateUrl: './order.component.html',
//   styles: [
//   ]
// })
// export class OrderComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'
import {SelectList} from '../../Model/ViewModel'
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
  constructor(private fb:FormBuilder) {
 
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
      Purchase: this.fb.array([this.addPurchaseGroup()])
      //skills:this.fb.array([])
    }); 
    
    this.ProductList = this.getProducts();
    //this.selectedProduct = '4';
   }

  //  Purchase(): FormArray {
  //   return this.nestedForm.get("Purchase") as FormArray
  // }
  // Purchase(empIndex:number) : FormArray {
  //   //return this.nestedForm().at(empIndex).get("Purchase") as FormArray
  // }
 

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
    return this.nestedForm.get('Purchase') as FormArray;
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
   return <FormArray>this.nestedForm.get('Purchase');
 }
 submitHandler() {
  //console.log(this.empForm.value);
  console.log(this.nestedForm.value);
  console.log(this.getSum());
}
  // employees(): FormArray {
  //   return this.empForm.get("employees") as FormArray
  // }
 
 
  // newEmployee(): FormGroup {
  //   return this.fb.group({
  //     firstName: '',
  //     lastName: '',
  //     skills:this.fb.array([])
  //   })
  // }
 
 
  // addEmployee() {
  //   console.log("Adding a employee");
  //   this.employees().push(this.newEmployee());
  // }
 
 
  // removeEmployee(empIndex:number) {
  //   this.employees().removeAt(empIndex);
  // }
 
 
  // employeeSkills(empIndex:number) : FormArray {
  //   return this.employees().at(empIndex).get("skills") as FormArray
  // }
 
  // newSkill(): FormGroup {
  //   return this.fb.group({
  //     skill: '',
  //     exp: '',
  //   })
  // }
 
  // addEmployeeSkill(empIndex:number) {
  //   this.employeeSkills(empIndex).push(this.newSkill());
  // }
 
  // removeEmployeeSkill(empIndex:number,skillIndex:number) {
  //   this.employeeSkills(empIndex).removeAt(skillIndex);
  // }
 

 
}
 
 
export class country {
  id: string;
  name: string;
 
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
 
 