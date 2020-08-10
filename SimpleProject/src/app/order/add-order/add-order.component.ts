import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validator, FormArray} from '@angular/forms'
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styles: [
  ]
})
export class AddOrderComponent implements OnInit {

  public carForm: FormGroup;
  TotalRow: number;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

        this.carForm = this.fb.group({
            details: this.fb.array([this.items()]),
        });
  }
  items(){
    return this.fb.group({
      type: [''],
      model: [''],
      year: [''],
      make: [''],
      color: [''],
      plateNumber: ['']
    });

  }
  addRow() {
    const details = <FormArray>this.carForm.controls['details'];
    details.push(this.items());
  }

  createItem(): FormGroup {
    return this.fb.group({
        type: [],
        model: [],
        year: [],
        make: [],
        color: [],
        plateNumber: []
    });
  }
}
