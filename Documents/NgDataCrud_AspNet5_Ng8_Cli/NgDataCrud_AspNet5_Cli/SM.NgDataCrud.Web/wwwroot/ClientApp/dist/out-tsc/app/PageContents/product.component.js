var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogComponent, DialogService, ExDialog, DialogCache } from "../NgExDialog/dialog.module";
import { NgxMyDatePickerDirective } from '../ngxMyDatePicker/ngx-my-date-picker.input';
import { ApiUrl, MiscConfig, MyDatePickConfig } from '../Services/app.config';
import { HttpDataService } from '../Services/http-data.service';
import { Validator2 } from "../InputValidator/reactive-validator";
import { ValidateErrorComponent } from "../InputValidator/validate-error.component";
import * as glob from '../Services/globals';
var ProductComponent = /** @class */ (function (_super) {
    __extends(ProductComponent, _super);
    //End of MyDatePicker.
    function ProductComponent(dialogService, httpDataService, exDialog, _http) {
        var _this = _super.call(this, dialogService) || this;
        _this.httpDataService = httpDataService;
        _this.exDialog = exDialog;
        _this._http = _http;
        //Set product model for:
        //1. Mapping differences between form and model,
        //2. Manually checking dirty if needed, e.g., datepicker input.
        //3. Saving data to equivalent server model sturctures.
        _this.model = {
            product: {}
        };
        _this.errorMsg = "";
        _this.showInvalid = false;
        //MyDatePicker.
        _this.myDatePickerOptions = MyDatePickConfig;
        _this.defMonth = {
            defMonth: ''
        };
        _this.dpDisabled = false;
        return _this;
    }
    //Not used.
    ProductComponent.prototype.checkValidDate = function () {
        //let valid: boolean = this.dpFrom.isDateValid();
        //this.availableSince.setErrors({ 'invalidDate': true }); //Not needed
    };
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        var pThis = this;
        glob.caches.pageDirty = false;
        //Set reactive form and validators.
        //formbuilder not working for updateOn.
        this.productForm = new FormGroup({
            //Form controls for input fields.
            'productName': new FormControl('', Validators.required),
            'category': new FormControl('', [Validator2.required()]),
            'unitPrice': new FormControl('', [Validator2.required(), Validator2.number(), Validator2.maxNumber({ value: 5000, label: "Price" })]),
            'status': new FormControl(''),
            'availableSince': new FormControl('', Validator2.DateRange({ minValue: "1/1/2010", maxValue: "12/31/2023" }))
        });
        //Add showInvalid property for onBlur display validation error message.
        for (var prop in this.productForm.controls) {
            if (this.productForm.controls.hasOwnProperty(prop)) {
                this.productForm.controls[prop]['showInvalid'] = true;
            }
        }
        this.httpDataService.get(ApiUrl.getCategory).subscribe(function (data) {
            setTimeout(function () {
                pThis.model.CategoryList = data;
            }, 50);
        }, function (err) {
            _this.exDialog.openMessage("Error getting category list data.", "Error", "error");
        });
        this.httpDataService.get(ApiUrl.getStatusTypes).subscribe(function (data) {
            setTimeout(function () {
                pThis.model.ProductStatusTypes = data;
            }, 50);
        }, function (err) {
            _this.exDialog.openMessage("Error getting product status type data.", "Error", "error");
        });
        //callerData defined in base DialogComponent.
        if (this.callerData.callId == undefined) {
            this.model.productDialogTitle = "Add Product";
            this.resetAddForm();
        }
        else {
            this.model.productDialogTitle = "Update Product";
            //AngularJs $resource auto replaces ":id" in URL. But here we just add id value to URL.
            var url = this.callerData.callId ? ApiUrl.getProduct + "/" + this.callerData.callId : "";
            //Use getWithoutCache for calling in-memory database if display results not refreshed correctly. 
            this.httpDataService.getWithoutCache(url).subscribe(
            //this.httpDataService.get(url).subscribe(
            function (data) {
                //Format and conversion. 
                data.UnitPrice = parseFloat(data.UnitPrice.toFixed(2));
                data.AvailableSince = { jsdate: new Date(data.AvailableSince) };
                //Assign data to class-level model object. 
                pThis.model.product = data;
                //Populate reactive form controls with model object properties.
                pThis.productForm.setValue({
                    productName: pThis.model.product.ProductName,
                    category: pThis.model.product.CategoryId,
                    unitPrice: pThis.model.product.UnitPrice,
                    status: pThis.model.product.StatusCode,
                    availableSince: pThis.model.product.AvailableSince
                });
            }, function (err) {
                _this.exDialog.openMessage("Error getting product data.", "Error", "error");
            });
        }
        //Update global dirty flag.
        this.productForm.valueChanges.subscribe(function (x) {
            if (_this.productForm.dirty) {
                glob.caches.pageDirty = true;
            }
            else {
                glob.caches.pageDirty = false;
            }
        });
    };
    ProductComponent.prototype.ngAfterViewInit = function () {
        //For add new product.
        if (this.callerData.callId == undefined) {
            this.focusProductName();
        }
    };
    //Disable click-on input field drag/move.
    ProductComponent.prototype.setDrag = function (flag) {
        DialogCache.noDrag = flag;
    };
    //Not used - Changed to use { updataOn: changes }.
    //Check datepicker input on blur. Built-in update on blur not working.
    //checkControlDirty(control: AbstractControl) {        
    //    if (control === this.productForm.controls.availableSince) {
    //        if (this.productForm.value.availableSince !== this.model.product.availableSince) {
    //            control.markAsDirty();
    //        }
    //    }
    //}
    ProductComponent.prototype.saveProduct = function (productForm) {
        //Need to check and exit if form is invalid for "onblur" validation.
        if (productForm.invalid || !productForm.dirty)
            return;
        var pThis = this;
        //Assign form control values back to model.
        this.model.product.ProductName = productForm.value.productName;
        this.model.product.CategoryId = productForm.value.category;
        this.model.product.UnitPrice = productForm.value.unitPrice;
        this.model.product.StatusCode = productForm.value.status;
        if (productForm.value.availableSince) {
            this.model.product.AvailableSince = productForm.value.availableSince.jsdate;
        }
        var title, message;
        if (this.model.product.ProductId > 0) {
            title = "Update Confirmation";
            message = "Are you sure to update the product?";
        }
        else {
            title = "Add Confirmation";
            message = "Are you sure to add the product?";
        }
        this.exDialog.openConfirm({
            title: title,
            message: message
        }).subscribe(function (result) {
            if (result) {
                //Code to save product here...
                if (pThis.model.product.ProductId > 0) {
                    pThis.httpDataService.post(ApiUrl.updateProduct, pThis.model.product).subscribe(function (data) {
                        //remove dirty flag.                            
                        pThis.productForm.reset();
                        glob.caches.pageDirty = false;
                        pThis.exDialog.openMessage({
                            message: "The product has successfully been updated.",
                            closeAllDialogs: true
                        });
                    }, function (err) {
                        //remove dirty flag.                            
                        pThis.productForm.reset();
                        glob.caches.pageDirty = false;
                        pThis.exDialog.openMessage("Error updating product data.", "Error", "error");
                    });
                }
                else {
                    pThis.httpDataService.post(ApiUrl.addProduct, pThis.model.product).subscribe(function (data) {
                        //remove dirty flag.                            
                        pThis.productForm.reset();
                        glob.caches.pageDirty = false;
                        //Get parent.
                        var pParent = glob.caches.productListThis;
                        //Adding productId to array.
                        pParent.model.newProductIds.push(data.ProductId);
                        //let te = MiscConfig.maxAddProductPerLoad;
                        if (pParent.model.newProductIds.length < MiscConfig.maxAddProductPerLoad) {
                            //Continue to add product items.
                            pThis.exDialog.openConfirm({
                                message: "The new product has successfully been added. \n\nWould you like to add another?",
                                messageAddClass: 'ng-with-newlines'
                                //closeImmediateParentByAction: true
                            }).subscribe(function (result) {
                                if (result) {
                                    pThis.resetAddForm();
                                }
                                else {
                                    pThis.exDialog.clearAllDialogs();
                                }
                                glob.caches.pageDirty = false;
                            });
                        }
                        else {
                            //Reach maximum number of records for one load/refresh cycle.
                            pThis.exDialog.openMessage({
                                message: "The new product has successfully been added. \n\nThis is the last new product that can be added in current data load operation.",
                                messageAddClass: 'ng-with-newlines',
                                closeAllDialogs: true
                            });
                            glob.caches.pageDirty = false;
                        }
                    }, function (err) {
                        //remove dirty flag.                            
                        pThis.productForm.reset();
                        glob.caches.pageDirty = false;
                        pThis.exDialog.openMessage("Error adding product data.", "Error", "error");
                    });
                }
            }
        });
    };
    ProductComponent.prototype.cancel = function () {
        var pThis = this;
        if (this.productForm.dirty) {
            this.exDialog.openConfirm({
                title: "Cancel Warning",
                icon: "warning",
                message: "Do you really want to cancel the data change?"
            }).subscribe(function (result) {
                if (result) {
                    //remove dirty flag.                    
                    pThis.productForm.reset();
                    glob.caches.pageDirty = false;
                    pThis.exDialog.clearAllDialogs();
                }
                else {
                    //Do nothing (will keep form open).
                }
            });
        }
        else {
            this.result = false;
            this.dialogResult();
        }
    };
    ProductComponent.prototype.resetAddForm = function () {
        this.model.product = {
            ProducId: 0,
            ProductName: "",
            CategoryId: "",
            UnitPrice: "",
            StatusCode: "",
            AvailableSince: ""
        };
        this.productForm.reset({
            productName: this.model.product.ProductName,
            category: this.model.product.CategoryId,
            unitPrice: this.model.product.UnitPrice,
            status: this.model.product.StatusCode,
            availableSince: this.model.product.AvailableSince
        });
        this.focusProductName();
    };
    ProductComponent.prototype.focusOnButton = function (buttonType) {
        //Focus on Save button causes onblur of previous focused input element.        
        switch (buttonType) {
            case "save":
                this.saveButton.nativeElement.focus();
                break;
            case "cancel":
                this.cancelButton.nativeElement.focus();
                break;
        }
    };
    ProductComponent.prototype.focusProductName = function () {
        var _this = this;
        ////IE 11 only.
        //let windowObj: any = window, documentObj: any = document;
        //if (!!windowObj.MSInputMethodContext && !!documentObj.documentMode) {
        //    this.productNameElem.nativeElement.focus();
        //}
        //else {
        //    //Need setTimeout for MS-Edge, Chrome, Firefox (but not IE). Otherwise the box will be focused with "required" validation error.
        setTimeout(function () {
            //Not working.
            //this.element.nativeElement.querySelector('#txtProductName')[0].focus()
            //let td = this.productNameElem.nativeElement;
            _this.productNameElem.nativeElement.focus();
        }, 500);
        //}        
    };
    //Set flag for control to display validation error message onBlur.
    ProductComponent.prototype.setShowInvalid = function (control, actionType) {
        if (actionType == 0) {
            control.showInvalid = false;
        }
        else if (actionType == 1) {
            control.showInvalid = true;
        }
    };
    var _a, _b, _c, _d;
    __decorate([
        ViewChild(ValidateErrorComponent, { static: false }),
        __metadata("design:type", ValidateErrorComponent)
    ], ProductComponent.prototype, "validateErrorComponent", void 0);
    __decorate([
        ViewChild('productNameElem', { static: true }),
        __metadata("design:type", typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object)
    ], ProductComponent.prototype, "productNameElem", void 0);
    __decorate([
        ViewChild('saveButton', { static: true }),
        __metadata("design:type", typeof (_b = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _b : Object)
    ], ProductComponent.prototype, "saveButton", void 0);
    __decorate([
        ViewChild('cancelButton', { static: true }),
        __metadata("design:type", typeof (_c = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _c : Object)
    ], ProductComponent.prototype, "cancelButton", void 0);
    __decorate([
        ViewChild('dpFrom', { static: true }),
        __metadata("design:type", NgxMyDatePickerDirective)
    ], ProductComponent.prototype, "dpFrom", void 0);
    ProductComponent = __decorate([
        Component({
            moduleId: module.id.toString(),
            selector: 'product-dialog',
            templateUrl: "./product.component.html",
            styleUrls: ["./product.component.css"]
        }),
        __metadata("design:paramtypes", [DialogService, HttpDataService,
            ExDialog, typeof (_d = typeof HttpClient !== "undefined" && HttpClient) === "function" ? _d : Object])
    ], ProductComponent);
    return ProductComponent;
}(DialogComponent));
export { ProductComponent };
//# sourceMappingURL=product.component.js.map