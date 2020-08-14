var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input } from "@angular/core";
import { NG_VALIDATORS } from "@angular/forms";
import { ValueArgs, RangeArgs, ValidatorCommon } from "./validator-common";
//required.
var RequiredValidatorDirective = /** @class */ (function () {
    function RequiredValidatorDirective() {
    }
    RequiredValidatorDirective_1 = RequiredValidatorDirective;
    RequiredValidatorDirective.prototype.validate = function (fc) {
        var isValid = (fc.value != undefined && fc.value != "");
        if (isValid) {
            return null;
        }
        else {
            //Usually label is Title Case. If not, use custom passed error message text.
            var label = "Field";
            if (this.args.label)
                label = this.args.label;
            var errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : label + " is required."
                }
            };
            return errRtn;
        }
    };
    var RequiredValidatorDirective_1;
    __decorate([
        Input('requiredValidator'),
        __metadata("design:type", ValueArgs)
    ], RequiredValidatorDirective.prototype, "args", void 0);
    RequiredValidatorDirective = RequiredValidatorDirective_1 = __decorate([
        Directive({
            selector: '[requiredValidator]',
            providers: [{ provide: NG_VALIDATORS, useExisting: RequiredValidatorDirective_1, multi: true }]
        })
    ], RequiredValidatorDirective);
    return RequiredValidatorDirective;
}());
export { RequiredValidatorDirective };
//minLength.
var MinLengthValidatorDirective = /** @class */ (function () {
    function MinLengthValidatorDirective() {
    }
    MinLengthValidatorDirective_1 = MinLengthValidatorDirective;
    MinLengthValidatorDirective.prototype.validate = function (fc) {
        if (fc.value) {
            var isValid = (fc.value.length >= this.args.value);
            var label = "Field";
            if (this.args.label)
                label = this.args.label;
            var errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : label + " length no less than " + this.args.value + "."
                }
            };
            return isValid ? null : errRtn;
        }
    };
    var MinLengthValidatorDirective_1;
    __decorate([
        Input('minLengthValidator'),
        __metadata("design:type", ValueArgs)
    ], MinLengthValidatorDirective.prototype, "args", void 0);
    MinLengthValidatorDirective = MinLengthValidatorDirective_1 = __decorate([
        Directive({
            selector: '[minLengthValidator]',
            providers: [{ provide: NG_VALIDATORS, useExisting: MinLengthValidatorDirective_1, multi: true }]
        })
    ], MinLengthValidatorDirective);
    return MinLengthValidatorDirective;
}());
export { MinLengthValidatorDirective };
//maxLength.
var MaxLengthValidatorDirective = /** @class */ (function () {
    function MaxLengthValidatorDirective() {
    }
    MaxLengthValidatorDirective_1 = MaxLengthValidatorDirective;
    MaxLengthValidatorDirective.prototype.validate = function (fc) {
        if (fc.value) {
            var isValid = (fc.value.length <= this.args.value);
            var label = "Field";
            if (this.args.label)
                label = this.args.label;
            var errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : label + " length no more than " + this.args.value + "."
                }
            };
            return isValid ? null : errRtn;
        }
    };
    var MaxLengthValidatorDirective_1;
    __decorate([
        Input('maxLengthValidator'),
        __metadata("design:type", ValueArgs)
    ], MaxLengthValidatorDirective.prototype, "args", void 0);
    MaxLengthValidatorDirective = MaxLengthValidatorDirective_1 = __decorate([
        Directive({
            selector: '[maxLengthValidator]',
            providers: [{ provide: NG_VALIDATORS, useExisting: MaxLengthValidatorDirective_1, multi: true }]
        })
    ], MaxLengthValidatorDirective);
    return MaxLengthValidatorDirective;
}());
export { MaxLengthValidatorDirective };
//number.
var NumberValidatorDirective = /** @class */ (function () {
    function NumberValidatorDirective() {
    }
    NumberValidatorDirective_1 = NumberValidatorDirective;
    NumberValidatorDirective.prototype.validate = function (fc) {
        if (fc.value) {
            var isValid = (!isNaN(Number(fc.value)) && isFinite(fc.value));
            var label = "number";
            if (this.args.label)
                label = this.args.label;
            var errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : "Invalid " + label + "."
                }
            };
            return isValid ? null : errRtn;
        }
    };
    var NumberValidatorDirective_1;
    __decorate([
        Input('numberValidator'),
        __metadata("design:type", ValueArgs)
    ], NumberValidatorDirective.prototype, "args", void 0);
    NumberValidatorDirective = NumberValidatorDirective_1 = __decorate([
        Directive({
            selector: '[numberValidator]',
            providers: [{ provide: NG_VALIDATORS, useExisting: NumberValidatorDirective_1, multi: true }]
        })
    ], NumberValidatorDirective);
    return NumberValidatorDirective;
}());
export { NumberValidatorDirective };
//minNumber.
var MinNumberValidatorDirective = /** @class */ (function () {
    function MinNumberValidatorDirective() {
    }
    MinNumberValidatorDirective_1 = MinNumberValidatorDirective;
    MinNumberValidatorDirective.prototype.validate = function (fc) {
        if (fc.value && !isNaN(Number(fc.value)) && isFinite(fc.value)) {
            var label = "Number";
            if (this.args.label)
                label = this.args.label;
            var isValid = (fc.value >= this.args.value);
            var errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : label + " no less then " + this.args.value + "."
                }
            };
            return isValid ? null : errRtn;
        }
    };
    var MinNumberValidatorDirective_1;
    __decorate([
        Input('minNumberValidator'),
        __metadata("design:type", ValueArgs)
    ], MinNumberValidatorDirective.prototype, "args", void 0);
    MinNumberValidatorDirective = MinNumberValidatorDirective_1 = __decorate([
        Directive({
            selector: '[minNumberValidator]',
            providers: [{ provide: NG_VALIDATORS, useExisting: MinNumberValidatorDirective_1, multi: true }]
        })
    ], MinNumberValidatorDirective);
    return MinNumberValidatorDirective;
}());
export { MinNumberValidatorDirective };
//maxNumber.
var MaxNumberValidatorDirective = /** @class */ (function () {
    function MaxNumberValidatorDirective() {
    }
    MaxNumberValidatorDirective_1 = MaxNumberValidatorDirective;
    MaxNumberValidatorDirective.prototype.validate = function (fc) {
        if (fc.value && !isNaN(Number(fc.value)) && isFinite(fc.value)) {
            var isValid = (fc.value <= this.args.value);
            var label = "Number";
            if (this.args.label)
                label = this.args.label;
            var errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : label + " no more then " + this.args.value + "."
                }
            };
            return isValid ? null : errRtn;
        }
    };
    var MaxNumberValidatorDirective_1;
    __decorate([
        Input('maxNumberValidator'),
        __metadata("design:type", ValueArgs)
    ], MaxNumberValidatorDirective.prototype, "args", void 0);
    MaxNumberValidatorDirective = MaxNumberValidatorDirective_1 = __decorate([
        Directive({
            selector: '[maxNumberValidator]',
            providers: [{ provide: NG_VALIDATORS, useExisting: MaxNumberValidatorDirective_1, multi: true }]
        })
    ], MaxNumberValidatorDirective);
    return MaxNumberValidatorDirective;
}());
export { MaxNumberValidatorDirective };
//numberRange.
var NumberRangeValidatorDirective = /** @class */ (function () {
    function NumberRangeValidatorDirective() {
    }
    NumberRangeValidatorDirective_1 = NumberRangeValidatorDirective;
    NumberRangeValidatorDirective.prototype.validate = function (fc) {
        if (fc.value) {
            var isValid = (fc.value >= this.args.minValue && fc.value <= this.args.maxValue);
            var label = "Number";
            if (this.args.label)
                label = this.args.label;
            var errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : label + " should be between " + this.args.minValue.toString() + " and " + this.args.maxValue.toString() + "."
                }
            };
            return isValid ? null : errRtn;
        }
    };
    var NumberRangeValidatorDirective_1;
    __decorate([
        Input('numberRangeValidator'),
        __metadata("design:type", RangeArgs)
    ], NumberRangeValidatorDirective.prototype, "args", void 0);
    NumberRangeValidatorDirective = NumberRangeValidatorDirective_1 = __decorate([
        Directive({
            selector: '[numberRangeValidator]',
            providers: [{ provide: NG_VALIDATORS, useExisting: NumberRangeValidatorDirective_1, multi: true }]
        })
    ], NumberRangeValidatorDirective);
    return NumberRangeValidatorDirective;
}());
export { NumberRangeValidatorDirective };
//date.
var DateValidatorDirective = /** @class */ (function () {
    function DateValidatorDirective() {
    }
    DateValidatorDirective_1 = DateValidatorDirective;
    DateValidatorDirective.prototype.validate = function (fc) {
        if (fc.value) {
            var isValid = (ValidatorCommon.validateDate(fc.value) && !isNaN(Date.parse(fc.value)));
            var label = "date";
            if (this.args.label)
                label = this.args.label;
            var errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : "Invalid " + label + "."
                }
            };
            return isValid ? null : errRtn;
        }
    };
    var DateValidatorDirective_1;
    __decorate([
        Input('dateValidator'),
        __metadata("design:type", ValueArgs)
    ], DateValidatorDirective.prototype, "args", void 0);
    DateValidatorDirective = DateValidatorDirective_1 = __decorate([
        Directive({
            selector: '[dateValidator]',
            providers: [{ provide: NG_VALIDATORS, useExisting: DateValidatorDirective_1, multi: true }]
        })
    ], DateValidatorDirective);
    return DateValidatorDirective;
}());
export { DateValidatorDirective };
//minDate.
var MinDateValidatorDirective = /** @class */ (function () {
    function MinDateValidatorDirective() {
    }
    MinDateValidatorDirective.prototype.validate = function (fc) {
        if (fc.value) {
            var dateStr = ValidatorCommon.validateDate(fc.value);
            if (dateStr) {
                var isValid = (Date.parse(dateStr) >= Date.parse(this.args.value.toString().replace(/'/g, "")));
                var label = "Date";
                if (this.args.label)
                    label = this.args.label;
                var errRtn = {
                    "custom": {
                        "message": this.args.message ? this.args.message : label + " no earlier then " + this.args.value.toString() + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        }
    };
    __decorate([
        Input('minDateValidator'),
        __metadata("design:type", ValueArgs)
    ], MinDateValidatorDirective.prototype, "args", void 0);
    MinDateValidatorDirective = __decorate([
        Directive({
            selector: '[minDateValidator]',
            providers: [{ provide: NG_VALIDATORS, useExisting: MinNumberValidatorDirective, multi: true }]
        })
    ], MinDateValidatorDirective);
    return MinDateValidatorDirective;
}());
export { MinDateValidatorDirective };
//maxDate.
var MaxDateValidatorDirective = /** @class */ (function () {
    function MaxDateValidatorDirective() {
    }
    MaxDateValidatorDirective_1 = MaxDateValidatorDirective;
    MaxDateValidatorDirective.prototype.validate = function (fc) {
        if (fc.value) {
            var dateStr = ValidatorCommon.validateDate(fc.value);
            if (dateStr) {
                var isValid = (Date.parse(dateStr) <= Date.parse(this.args.value.toString().replace(/'/g, "")));
                var label = "Date";
                if (this.args.label)
                    label = this.args.label;
                var errRtn = {
                    "custom": {
                        "message": this.args.message ? this.args.message : label + " no later then " + this.args.value.toString() + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        }
    };
    var MaxDateValidatorDirective_1;
    __decorate([
        Input('maxDateValidator'),
        __metadata("design:type", ValueArgs)
    ], MaxDateValidatorDirective.prototype, "args", void 0);
    MaxDateValidatorDirective = MaxDateValidatorDirective_1 = __decorate([
        Directive({
            selector: '[maxDateValidator]',
            providers: [{ provide: NG_VALIDATORS, useExisting: MaxDateValidatorDirective_1, multi: true }]
        })
    ], MaxDateValidatorDirective);
    return MaxDateValidatorDirective;
}());
export { MaxDateValidatorDirective };
//dateRange.
var DateRangeValidatorDirective = /** @class */ (function () {
    function DateRangeValidatorDirective() {
    }
    DateRangeValidatorDirective_1 = DateRangeValidatorDirective;
    DateRangeValidatorDirective.prototype.validate = function (fc) {
        //Test
        //let te = new Date("2018/3/1");
        //let tr = ValidatorCommon.validateDate(te);
        if (fc.value) {
            var dateStr = ValidatorCommon.validateDate(fc.value);
            if (dateStr) {
                var isValid = (Date.parse(dateStr) >= Date.parse(this.args.minValue.toString().replace(/'/g, "")) &&
                    Date.parse(dateStr) <= Date.parse(this.args.maxValue.toString().replace(/'/g, "")));
                var label = "Date";
                if (this.args.label)
                    label = this.args.label;
                var errRtn = {
                    "custom": {
                        "message": this.args.message ? this.args.message : label + " should be between " + this.args.minValue.toString() + " and " + this.args.maxValue.toString() + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        }
    };
    var DateRangeValidatorDirective_1;
    __decorate([
        Input('dateRangeValidator'),
        __metadata("design:type", RangeArgs)
    ], DateRangeValidatorDirective.prototype, "args", void 0);
    DateRangeValidatorDirective = DateRangeValidatorDirective_1 = __decorate([
        Directive({
            selector: '[dateRangeValidator]',
            providers: [{ provide: NG_VALIDATORS, useExisting: DateRangeValidatorDirective_1, multi: true }]
        })
    ], DateRangeValidatorDirective);
    return DateRangeValidatorDirective;
}());
export { DateRangeValidatorDirective };
//email.
var EmailValidatorDirective = /** @class */ (function () {
    function EmailValidatorDirective() {
    }
    EmailValidatorDirective_1 = EmailValidatorDirective;
    EmailValidatorDirective.prototype.validate = function (fc) {
        if (fc.value) {
            var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if (this.args.value) {
                //Set first arg as message if error text passed from the first arg.
                if (typeof this.args.value === "string") {
                    this.args.message = this.args.value;
                }
                else {
                    reg = this.args.value;
                }
            }
            var isValid = reg.test(fc.value);
            var label = "email address";
            if (this.args.label)
                label = this.args.label;
            var errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : "Invalid " + label + "."
                }
            };
            return isValid ? null : errRtn;
        }
    };
    var EmailValidatorDirective_1;
    __decorate([
        Input('emailValidator'),
        __metadata("design:type", ValueArgs)
    ], EmailValidatorDirective.prototype, "args", void 0);
    EmailValidatorDirective = EmailValidatorDirective_1 = __decorate([
        Directive({
            selector: '[emailValidator]',
            providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective_1, multi: true }]
        })
    ], EmailValidatorDirective);
    return EmailValidatorDirective;
}());
export { EmailValidatorDirective };
//phone.
var PhoneValidatorDirective = /** @class */ (function () {
    function PhoneValidatorDirective() {
    }
    PhoneValidatorDirective_1 = PhoneValidatorDirective;
    PhoneValidatorDirective.prototype.validate = function (fc) {
        if (fc.value) {
            var reg = /^([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (this.args.value) {
                //Set first arg as message if error text passed from the first arg.
                if (typeof this.args.value === "string") {
                    this.args.message = this.args.value;
                }
                else {
                    reg = this.args.value;
                }
            }
            var isValid = reg.test(fc.value);
            var label = "phone number";
            if (this.args.label)
                label = this.args.label;
            var errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : "Invalid " + label + "."
                }
            };
            return isValid ? null : errRtn;
        }
    };
    var PhoneValidatorDirective_1;
    __decorate([
        Input('phoneValidator'),
        __metadata("design:type", ValueArgs)
    ], PhoneValidatorDirective.prototype, "args", void 0);
    PhoneValidatorDirective = PhoneValidatorDirective_1 = __decorate([
        Directive({
            selector: '[phoneValidator]',
            providers: [{ provide: NG_VALIDATORS, useExisting: PhoneValidatorDirective_1, multi: true }]
        })
    ], PhoneValidatorDirective);
    return PhoneValidatorDirective;
}());
export { PhoneValidatorDirective };
//fieldMatch.
var FieldMatchValidatorDirective = /** @class */ (function () {
    function FieldMatchValidatorDirective() {
    }
    FieldMatchValidatorDirective_1 = FieldMatchValidatorDirective;
    FieldMatchValidatorDirective.prototype.validate = function (fc) {
        if (fc.value && this.args.value) {
            var isValid = (fc.value === this.args.value);
            var label = "Field values";
            if (this.args.label)
                label = this.args.label;
            var errRtn = {
                "custom": {
                    "message": this.args.message ? this.args.message : label + " not match."
                }
            };
            return isValid ? null : errRtn;
        }
    };
    var FieldMatchValidatorDirective_1;
    __decorate([
        Input('fieldMatchValidator'),
        __metadata("design:type", ValueArgs)
    ], FieldMatchValidatorDirective.prototype, "args", void 0);
    FieldMatchValidatorDirective = FieldMatchValidatorDirective_1 = __decorate([
        Directive({
            selector: '[fieldMatchValidator]',
            providers: [{ provide: NG_VALIDATORS, useExisting: FieldMatchValidatorDirective_1, multi: true }]
        })
    ], FieldMatchValidatorDirective);
    return FieldMatchValidatorDirective;
}());
export { FieldMatchValidatorDirective };
//# sourceMappingURL=template-validator.directive.js.map