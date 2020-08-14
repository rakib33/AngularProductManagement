import { FormArray, AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValueArgs, RangeArgs, ValidatorCommon } from "./validator-common";

export class Validator2 {
    //required.
    static required(args?: ValueArgs): ValidatorFn {
        return (fc: AbstractControl): ValidationErrors => {
            const isValid = (fc.value != undefined && fc.value != "");            
            if (isValid) {
                return null;
            }
            else {
                //Usually label is Title Case. If not, use custom passed error message text.
                let label = "Field";
                if (args && args.label) label = args.label;
                const errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : label + " is required."
                    }
                };
                return errRtn;                                
            }                        
        }
    }
    //minLength.
    static minLength(args: ValueArgs): ValidatorFn {
        return (fc: AbstractControl): ValidationErrors => {
            if (fc.value) {                
                const isValid = (fc.value.length >= args.value);
                let label = "Field";
                if (args && args.label) label = args.label;
                const errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : label + " length no less than " + args.value + "."
                    }
                }; 
                return isValid ? null : errRtn;                
            }
        }
    }
    //maxLength.
    static maxLength(args: ValueArgs): ValidatorFn {
        return (fc: AbstractControl): ValidationErrors => {
            if (fc.value) {
                const isValid = (fc.value.length <= args.value);
                let label = "Field";
                if (args && args.label) label = args.label;
                const errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : label + " length no more than " + args.value + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        }
    }
    //number.
    static number(args?: ValueArgs): ValidatorFn {
        return (fc: AbstractControl): ValidationErrors => {
            if (fc.value) {
                let isValid: boolean = (!isNaN(Number(fc.value)) && isFinite(fc.value));
                //Above checker return true for '0000' or '0001'.
                if (fc.value.length > 1 && fc.value.indexOf('0') == 0 && fc.value.indexOf('.') != 1) {
                   isValid = false;
                }
                let label = "number";
                if (args && args.label) label = args.label;
                const errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : "Invalid " + label + "."
                    }
                };
                return isValid ? null : errRtn;                
            }            
        }
    }
    //minNumber.
    static minNumber(args: ValueArgs): ValidatorFn {
        return (fc: AbstractControl): ValidationErrors => {
            if (fc.value && !isNaN(Number(fc.value)) && isFinite(fc.value)) {
                let label = "Number";
                if (args && args.label) label = args.label;
                const isValid = (fc.value >= args.value);
                const errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : label + " no less then " + args.value + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        }
    }
    //maxNumber.
    static maxNumber(args: ValueArgs): ValidatorFn {
        return (fc: AbstractControl): ValidationErrors => {
            if (fc.value && !isNaN(Number(fc.value)) && isFinite(fc.value)) {
                const isValid = (fc.value <= args.value);
                let label = "Number";
                if (args && args.label) label = args.label;
                const errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : label + " no more then " + args.value + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        }
    }
    //numberRange.
    static numberRange(args: RangeArgs): ValidatorFn {
        return (fc: AbstractControl): ValidationErrors => {
            if (fc.value) {
                const isValid = (fc.value >= args.minValue && fc.value <= args.maxValue);
                let label = "Number";
                if (args && args.label) label = args.label;
                const errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : label + " should be between " + args.minValue.toString() + " and " + args.maxValue.toString() + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        }
    }
    //date.
    static date(args?: ValueArgs): ValidatorFn {
        return (fc: AbstractControl): ValidationErrors => {
            if (fc.value) {
                const isValid = (ValidatorCommon.validateDate(fc.value) && !isNaN(Date.parse(fc.value)));
                let label = "date";
                if (args && args.label) label = args.label;
                const errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : "Invalid " + label + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        }
    }
    //minDate.
    static minDate(args: ValueArgs): ValidatorFn {
        return (fc: AbstractControl): ValidationErrors => {
            if (fc.value) {
                const dateStr = ValidatorCommon.validateDate(fc.value);
                if (dateStr) {
                    const isValid = (Date.parse(dateStr) >= Date.parse(args.value.toString().replace(/'/g, "")));
                    let label = "Date";
                    if (args && args.label) label = args.label;
                    const errRtn = {
                        "custom": {
                            "message": args && args.message ? args.message : label + " no earlier then " + args.value.toString() + "."
                        }
                    };
                    return isValid ? null : errRtn;
                }
            }
        }
    }
    //maxDate.
    static maxDate(args: ValueArgs): ValidatorFn {        
        return (fc: AbstractControl): ValidationErrors => {
            if (fc.value) {
                const dateStr = ValidatorCommon.validateDate(fc.value);
                if (dateStr) {
                    const isValid = (Date.parse(dateStr) <= Date.parse(args.value.toString().replace(/'/g, "")));
                    let label = "Date";
                    if (args && args.label) label = args.label;
                    const errRtn = {
                        "custom": {
                            "message": args && args.message ? args.message : label + " no later then " + args.value.toString() + "."
                        }
                    };
                    return isValid ? null : errRtn;
                }
            }
        }
    }
    //dateRange.
    static DateRange(args: RangeArgs): ValidatorFn {
        return (fc: AbstractControl): ValidationErrors => {
            if (fc.value) {
                const dateStr = ValidatorCommon.validateDate(fc.value);
                if (dateStr) {
                    const isValid = (
                        Date.parse(dateStr) >= Date.parse(args.minValue.toString().replace(/'/g, "")) &&
                        Date.parse(dateStr) <= Date.parse(args.maxValue.toString().replace(/'/g, "")));
                    let label = "Date";
                    if (args && args.label) label = args.label;
                    const errRtn = {
                        "custom": {
                            "message": args && args.message ? args.message : label + " should be between " + args.minValue.toString() + " and " + args.maxValue.toString() + "."
                        }
                    };
                    return isValid ? null : errRtn;
                }
            }
        }
    }
    //email.
    static email(args?: ValueArgs): ValidatorFn {        
        return (fc: AbstractControl): ValidationErrors => {
            if (fc.value) {
                let reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                if (args && args.value) {
                    //Set first arg as message if error text passed from the first arg.
                    if (typeof args.value === "string") {
                        args.message = args.value;
                    }
                    else {
                        reg = args.value;
                    }
                }
                const isValid = reg.test(fc.value);
                let label = "email address";
                if (args && args.label) label = args.label;
                const errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : "Invalid " + label + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        }
    }
    //usPhone
    static usPhone(args?: ValueArgs): ValidatorFn {
        return (fc: AbstractControl): ValidationErrors => {
            if (fc.value) {
                let reg = /^([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                if (args && args.value) {
                    //Set first arg as message if error text passed from the first arg.
                    if (typeof args.value === "string") {
                        args.message = args.value;
                    }
                    else {
                        reg = args.value;
                    }
                }
                const isValid = reg.test(fc.value);
                let label = "phone number";
                if (args && args.label) label = args.label;
                const errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : "Invalid " + label + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        }
    }
    //fieldMatch.
    static fieldMatch(args: ValueArgs): ValidatorFn {
        return (fc: AbstractControl): ValidationErrors => {
            if (fc.value && args.value) {
                const isValid = (fc.value === args.value);
                let label = "Field values";
                if (args && args.label) label = args.label;
                const errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : label + " not match."
                    }
                };
                return isValid ? null : errRtn;
            }
        }
    }   
}