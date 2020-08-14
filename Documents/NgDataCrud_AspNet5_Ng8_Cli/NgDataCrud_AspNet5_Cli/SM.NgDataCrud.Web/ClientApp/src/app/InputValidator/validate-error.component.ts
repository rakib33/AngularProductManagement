import { Component, Input, OnInit, ElementRef, Renderer} from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'errors',
  template: `
    <div *ngIf="showErrors()" style="color: red;" >
      {{errors()[0]}}
    </div>
  `,
})
export class ValidateErrorComponent {
    //Not working for Chrome??
    private static readonly errorMessages = {
      'required': () => 'Field is required.',
      'minlength': (params) => 'Minimum length is ' + params.requiredLength + ".",
      'maxlength': (params) => 'Maximum length is ' + params.requiredLength + ".",
      'pattern': (params) => 'Required pattern is: ' + params.requiredPattern + ".",
      'custom': (params) => params.message,
      //messasge for mgx-mydatepicker date validation.
      'invalidDateFormat': () => 'Invalid date.'
    };   

    //@ViewChild('element') element: ElementRef;
    //Use any type for dynamically added showInvalid property.
    //@Input() private control: AbstractControlDirective | AbstractControl;
    @Input() private control: any;

    constructor(private renderer: Renderer) {        
    }  
    //ngOnInit() {        
    //}

    showErrors(): boolean { 
        let showErr: boolean = false;
        if (this.control &&
            this.control.errors &&
            (this.control.dirty || this.control.touched) &&
            this.control.showInvalid) {            
            showErr = true;            
        }
        return showErr;
    }

    errors(): string[] {
        return Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field]));
    }

    private getMessage(type: string, params: any) {        
        return ValidateErrorComponent.errorMessages[type](params);
    }    
}
