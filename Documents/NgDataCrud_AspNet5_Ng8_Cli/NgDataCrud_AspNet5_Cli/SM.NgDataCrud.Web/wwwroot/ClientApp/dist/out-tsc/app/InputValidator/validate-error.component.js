var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Renderer } from '@angular/core';
var ValidateErrorComponent = /** @class */ (function () {
    function ValidateErrorComponent(renderer) {
        this.renderer = renderer;
    }
    ValidateErrorComponent_1 = ValidateErrorComponent;
    //ngOnInit() {        
    //}
    ValidateErrorComponent.prototype.showErrors = function () {
        var showErr = false;
        if (this.control &&
            this.control.errors &&
            (this.control.dirty || this.control.touched) &&
            this.control.showInvalid) {
            showErr = true;
        }
        return showErr;
    };
    ValidateErrorComponent.prototype.errors = function () {
        var _this = this;
        return Object.keys(this.control.errors)
            .map(function (field) { return _this.getMessage(field, _this.control.errors[field]); });
    };
    ValidateErrorComponent.prototype.getMessage = function (type, params) {
        return ValidateErrorComponent_1.errorMessages[type](params);
    };
    var ValidateErrorComponent_1, _a;
    //Not working for Chrome??
    ValidateErrorComponent.errorMessages = {
        'required': function () { return 'Field is required.'; },
        'minlength': function (params) { return 'Minimum length is ' + params.requiredLength + "."; },
        'maxlength': function (params) { return 'Maximum length is ' + params.requiredLength + "."; },
        'pattern': function (params) { return 'Required pattern is: ' + params.requiredPattern + "."; },
        'custom': function (params) { return params.message; },
        //messasge for mgx-mydatepicker date validation.
        'invalidDateFormat': function () { return 'Invalid date.'; }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ValidateErrorComponent.prototype, "control", void 0);
    ValidateErrorComponent = ValidateErrorComponent_1 = __decorate([
        Component({
            selector: 'errors',
            template: "\n    <div *ngIf=\"showErrors()\" style=\"color: red;\" >\n      {{errors()[0]}}\n    </div>\n  ",
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof Renderer !== "undefined" && Renderer) === "function" ? _a : Object])
    ], ValidateErrorComponent);
    return ValidateErrorComponent;
}());
export { ValidateErrorComponent };
//# sourceMappingURL=validate-error.component.js.map