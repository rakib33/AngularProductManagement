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
import { FormGroup, FormArray, FormBuilder } from '@angular/forms'

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
  private options: string[] = ["10", "20", "50"];
  selectedQuantity = "10";
 
  constructor(private fb:FormBuilder) {
 
    this.empForm=this.fb.group({
      employees: this.fb.array([]) ,
    })
  }
  ngOnInit(): void {
    this.nestedForm = this.fb.group({
      InvoiceDate: [], //order date
      CustomerName: [], //ClientName
      Phone: [], //Contact
      Customer_Id: [], //Supplier Id, from dropdown
      InvoiceNo: [],
      Purchase: this.fb.array([this.addPurchaseGroup()])
      //skills:this.fb.array([])
    });  
   }

addPurchaseGroup(){
 return this.fb.group({
    // Id:[],
    // InvoiceNo:[],
    Qty: [], //Quantity
    BuyRate:[], //Rate
    BuyTotal:[], //Total
    Product_Id: [],
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
 
 