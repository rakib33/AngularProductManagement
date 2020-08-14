import { Directive, Input } from "@angular/core"; 
import { NG_VALIDATORS, AbstractControl, FormControl, Validator, ValidationErrors } from "@angular/forms"; 
import { ValueArgs, RangeArgs, ValidatorCommon } from "./validator-common";

//required.
@Directive({
    selector: '[requiredValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: RequiredValidatorDirective, multi: true }]
})
export class RequiredValidatorDirective implements Validator {
    @Input('requiredValidator') args: ValueArgs;
    validate(fc: AbstractControl): ValidationErrors {
        const isValid = (fc.value != undefined && fc.value != "");
        if (isValid) {
            return null;
        }
        else {
            //Usually label is Title Case. If not, use custom passed error message text.
            let label = "Field";
            if (this.args.label) label = this.args.label;
            const errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : label + " is required."
                }
            };
            return errRtn;
        } 
    }
}
//minLength.
@Directive({
    selector: '[minLengthValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinLengthValidatorDirective, multi: true }]
})
export class MinLengthValidatorDirective implements Validator {
    @Input('minLengthValidator') args: ValueArgs;
    validate(fc: AbstractControl): ValidationErrors {
        if (fc.value) {
            const isValid = (fc.value.length >= this.args.value); 
            let label = "Field";
            if (this.args.label) label = this.args.label;
            const errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : label + " length no less than " + this.args.value + "."
                }
            }; 
            return isValid ? null : errRtn;
        }
    }
}
//maxLength.
@Directive({
    selector: '[maxLengthValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MaxLengthValidatorDirective, multi: true }]
})
export class MaxLengthValidatorDirective implements Validator {
    @Input('maxLengthValidator') args: ValueArgs;
    validate(fc: AbstractControl): ValidationErrors {
        if (fc.value) {
            const isValid = (fc.value.length <= this.args.value);
            let label = "Field";
            if (this.args.label) label = this.args.label;
            const errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : label + " length no more than " + this.args.value + "."
                }
            };
            return isValid ? null : errRtn;
        }
    }
}
//number.
@Directive({
    selector: '[numberValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: NumberValidatorDirective, multi: true }]
})
export class NumberValidatorDirective implements Validator {
    @Input('numberValidator') args: ValueArgs;
    validate(fc: AbstractControl): ValidationErrors {
        if (fc.value) {
            const isValid = (!isNaN(Number(fc.value)) && isFinite(fc.value));
            let label = "number";
            if (this.args.label) label = this.args.label;
            const errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : "Invalid " + label + "."
                }
            };
            return isValid ? null : errRtn;
        }
    }
}
//minNumber.
@Directive({
    selector: '[minNumberValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinNumberValidatorDirective, multi: true }]
})
export class MinNumberValidatorDirective implements Validator {
    @Input('minNumberValidator') args: ValueArgs;
    validate(fc: AbstractControl): ValidationErrors {
        if (fc.value && !isNaN(Number(fc.value)) && isFinite(fc.value)) {
            let label = "Number";
            if (this.args.label) label = this.args.label;
            const isValid = (fc.value >= this.args.value);
            const errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : label + " no less then " + this.args.value + "."
                }
            };
            return isValid ? null : errRtn;
        }
    }
}
//maxNumber.
@Directive({
    selector: '[maxNumberValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MaxNumberValidatorDirective, multi: true }]
})
export class MaxNumberValidatorDirective implements Validator {
    @Input('maxNumberValidator') args: ValueArgs;
    validate(fc: AbstractControl): ValidationErrors {
        if (fc.value && !isNaN(Number(fc.value)) && isFinite(fc.value)) {
            const isValid = (fc.value <= this.args.value);
            let label = "Number";
            if (this.args.label) label = this.args.label;
            const errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : label + " no more then " + this.args.value + "."
                }
            };
            return isValid ? null : errRtn;
        }
    }
}
//numberRange.
@Directive({
    selector: '[numberRangeValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: NumberRangeValidatorDirective, multi: true}]
})
export class NumberRangeValidatorDirective implements Validator { 
    @Input('numberRangeValidator') args: RangeArgs;
    validate(fc: AbstractControl): ValidationErrors {        
        if (fc.value) {
            const isValid = (fc.value >= this.args.minValue && fc.value <= this.args.maxValue);
            let label = "Number";
            if (this.args.label) label = this.args.label;
            const errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : label + " should be between " + this.args.minValue.toString() + " and " + this.args.maxValue.toString() + "."
                }
            };
            return isValid ? null : errRtn;
        }
    }
}
//date.
@Directive({
    selector: '[dateValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: DateValidatorDirective, multi: true }]
})
export class DateValidatorDirective implements Validator {
    @Input('dateValidator') args: ValueArgs;
    validate(fc: AbstractControl): ValidationErrors {
        if (fc.value) {
            const isValid = (ValidatorCommon.validateDate(fc.value) && !isNaN(Date.parse(fc.value)));
            let label = "date";
            if (this.args.label) label = this.args.label;
            const errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : "Invalid " + label + "."
                }
            };
            return isValid ? null : errRtn;
        }
    }
}
//minDate.
@Directive({
    selector: '[minDateValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinNumberValidatorDirective, multi: true }]
})
export class MinDateValidatorDirective implements Validator {
    @Input('minDateValidator') args: ValueArgs;
    validate(fc: AbstractControl): ValidationErrors {
        if (fc.value) {
            const dateStr = ValidatorCommon.validateDate(fc.value);
            if (dateStr) {
                const isValid = (Date.parse(dateStr) >= Date.parse(this.args.value.toString().replace(/'/g, "")));
                let label = "Date";
                if (this.args.label) label = this.args.label;
                const errRtn = {
                    "custom": {
                        "message": this.args.message ? this.args.message : label + " no earlier then " + this.args.value.toString() + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        }
    }
}
//maxDate.
@Directive({
    selector: '[maxDateValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MaxDateValidatorDirective, multi: true }]
})
export class MaxDateValidatorDirective implements Validator {
    @Input('maxDateValidator') args: ValueArgs;
    validate(fc: AbstractControl): ValidationErrors {
        if (fc.value) {
            const dateStr = ValidatorCommon.validateDate(fc.value);
            if (dateStr) {
                const isValid = (Date.parse(dateStr) <= Date.parse(this.args.value.toString().replace(/'/g, "")));
                let label = "Date";
                if (this.args.label) label = this.args.label;
                const errRtn = {
                    "custom": {
                        "message": this.args.message ? this.args.message : label + " no later then " + this.args.value.toString() + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        }
    }
}
//dateRange.
@Directive({
    selector: '[dateRangeValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: DateRangeValidatorDirective, multi: true }]
})
export class DateRangeValidatorDirective implements Validator {
    @Input('dateRangeValidator') args: RangeArgs;
    validate(fc: AbstractControl): ValidationErrors {        
        //Test
        //let te = new Date("2018/3/1");
        //let tr = ValidatorCommon.validateDate(te);
        if (fc.value) {            
            const dateStr = ValidatorCommon.validateDate(fc.value);
            if (dateStr) {            
                const isValid = (
                    Date.parse(dateStr) >= Date.parse(this.args.minValue.toString().replace(/'/g, "")) &&
                    Date.parse(dateStr) <= Date.parse(this.args.maxValue.toString().replace(/'/g, "")));
                let label = "Date";
                if (this.args.label) label = this.args.label;
                const errRtn = {
                    "custom": {
                        "message": this.args.message ? this.args.message : label + " should be between " + this.args.minValue.toString() + " and " + this.args.maxValue.toString() + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        }
    }
}
//email.
@Directive({
    selector: '[emailValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
export class EmailValidatorDirective implements Validator {
    @Input('emailValidator') args: ValueArgs;
    validate(fc: AbstractControl): ValidationErrors {
        if (fc.value) {
            let reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if (this.args.value) {
                //Set first arg as message if error text passed from the first arg.
                if (typeof this.args.value === "string") {
                    this.args.message = this.args.value;
                }
                else {
                    reg = this.args.value;
                }
            }
            const isValid = reg.test(fc.value);
            let label = "email address";
            if (this.args.label) label = this.args.label;
            const errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : "Invalid " + label + "."
                }
            };
            return isValid ? null : errRtn;
        }
    }
}
//phone.
@Directive({
    selector: '[phoneValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: PhoneValidatorDirective, multi: true }]
})
export class PhoneValidatorDirective implements Validator {
    @Input('phoneValidator') args: ValueArgs;
    validate(fc: AbstractControl): ValidationErrors {
        if (fc.value) {
            let reg = /^([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (this.args.value) {
                //Set first arg as message if error text passed from the first arg.
                if (typeof this.args.value === "string") {
                    this.args.message = this.args.value;
                }
                else {
                    reg = this.args.value;
                }
            }
            const isValid = reg.test(fc.value);
            let label = "phone number";
            if (this.args.label) label = this.args.label;
            const errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : "Invalid " + label + "."
                }
            };
            return isValid ? null : errRtn;
        }
    }
}
//fieldMatch.
@Directive({
    selector: '[fieldMatchValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: FieldMatchValidatorDirective, multi: true }]
})
export class FieldMatchValidatorDirective implements Validator {
    @Input('fieldMatchValidator') args: ValueArgs;
    validate(fc: AbstractControl): ValidationErrors {
        if (fc.value && this.args.value) {
            const isValid = (fc.value === this.args.value);
            let label = "Field values";
            if (this.args.label) label = this.args.label;
            const errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : label + " not match."
                }
            };
            return isValid ? null : errRtn;
        }
    }
}