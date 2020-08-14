import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { DialogComponent, DialogService, ExDialog, DialogCache, FocusBlurDirective } from "../NgExDialog/dialog.module";
import { INgxMyDpOptions, IMyDateModel, IMyInputFieldChanged, IMyCalendarViewChanged, IMyMarkedDate, IMyDate, IMyDefaultMonth } from '../ngxMyDatePicker/interfaces';
import { NgxMyDatePickerDirective } from '../ngxMyDatePicker/ngx-my-date-picker.input';
import { ApiUrl, MiscConfig, MyDatePickConfig } from '../Services/app.config';
import { HttpDataService } from '../Services/http-data.service';
import { Validator2 } from "../InputValidator/reactive-validator";
import { ValidateErrorComponent } from "../InputValidator/validate-error.component";
import * as glob from '../Services/globals';

@Component({
    moduleId: module.id.toString(),
    selector: 'product-dialog',
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.css"]
})
export class ProductComponent extends DialogComponent implements OnInit, AfterViewInit {     
    @ViewChild(ValidateErrorComponent, { static: false }) validateErrorComponent: ValidateErrorComponent;
    @ViewChild('productNameElem', { static: true }) productNameElem: ElementRef;
    @ViewChild('saveButton', { static: true }) saveButton: ElementRef;
    @ViewChild('cancelButton', { static: true }) cancelButton: ElementRef;

    productForm: FormGroup;
    //Set product model for:
    //1. Mapping differences between form and model,
    //2. Manually checking dirty if needed, e.g., datepicker input.
    //3. Saving data to equivalent server model sturctures.
    model: any = {
        product: {}
    };    
    errorMsg: string = ""; 
    showInvalid: boolean = false;
        
    //MyDatePicker.
    myDatePickerOptions: INgxMyDpOptions = MyDatePickConfig;
    @ViewChild('dpFrom', { static: true }) dpFrom: NgxMyDatePickerDirective;

    defMonth: IMyDefaultMonth = {
        defMonth: ''
    };
    dpDisabled: boolean = false;

    //Not used.
    checkValidDate(): void {
        //let valid: boolean = this.dpFrom.isDateValid();
        //this.availableSince.setErrors({ 'invalidDate': true }); //Not needed
    }
    //End of MyDatePicker.

    constructor(dialogService: DialogService, private httpDataService: HttpDataService, 
        private exDialog: ExDialog, private _http: HttpClient) {
        super(dialogService);        
    }  

    ngOnInit() {        
        let pThis: any = this;
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
        for (let prop in this.productForm.controls) {
            if (this.productForm.controls.hasOwnProperty(prop)) {
                this.productForm.controls[prop]['showInvalid'] = true;
            }
        }

        this.httpDataService.get(ApiUrl.getCategory).subscribe(
            data => {
                setTimeout(() => {
                    pThis.model.CategoryList = data;
                }, 50); 
                
            },
            (err: HttpErrorResponse) => {
                this.exDialog.openMessage("Error getting category list data.", "Error", "error");
            }); 
        
        this.httpDataService.get(ApiUrl.getStatusTypes).subscribe(
            data => {
                setTimeout(() => {
                    pThis.model.ProductStatusTypes = data;
                }, 50);                
            },
            (err: HttpErrorResponse) => {
                this.exDialog.openMessage("Error getting product status type data.", "Error", "error");
            });

        //callerData defined in base DialogComponent.
        if (this.callerData.callId == undefined) {
            this.model.productDialogTitle = "Add Product";
            this.resetAddForm();            
        }
        else {
            this.model.productDialogTitle = "Update Product";
            //AngularJs $resource auto replaces ":id" in URL. But here we just add id value to URL.
            let url = this.callerData.callId ? ApiUrl.getProduct + "/" + this.callerData.callId : "";
            //Use getWithoutCache for calling in-memory database if display results not refreshed correctly. 
            this.httpDataService.getWithoutCache(url).subscribe(
            //this.httpDataService.get(url).subscribe(
                data => {
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
                },
                (err: HttpErrorResponse) => {
                    this.exDialog.openMessage("Error getting product data.", "Error", "error");
                });             
        }

        //Update global dirty flag.
        this.productForm.valueChanges.subscribe((x) => {
            if (this.productForm.dirty) {
                glob.caches.pageDirty = true;
            }
            else {
                glob.caches.pageDirty = false;
            }
        })
    } 

    ngAfterViewInit() {        
        //For add new product.
        if (this.callerData.callId == undefined) {            
            this.focusProductName();
        }
    }
    
    //Disable click-on input field drag/move.
    setDrag(flag) {
        DialogCache.noDrag = flag;
    }

    //Not used - Changed to use { updataOn: changes }.
    //Check datepicker input on blur. Built-in update on blur not working.
    //checkControlDirty(control: AbstractControl) {        
    //    if (control === this.productForm.controls.availableSince) {
    //        if (this.productForm.value.availableSince !== this.model.product.availableSince) {
    //            control.markAsDirty();
    //        }
    //    }
    //}
    
    saveProduct(productForm: FormGroup) {
        //Need to check and exit if form is invalid for "onblur" validation.
        if (productForm.invalid || !productForm.dirty) return;

        let pThis: any = this;

        //Assign form control values back to model.
        this.model.product.ProductName = productForm.value.productName;
        this.model.product.CategoryId = productForm.value.category;
        this.model.product.UnitPrice = productForm.value.unitPrice;
        this.model.product.StatusCode = productForm.value.status;
        if (productForm.value.availableSince) {
            this.model.product.AvailableSince = productForm.value.availableSince.jsdate;
        }        

        let title, message;
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
        }).subscribe((result) => {
            if (result) {
                //Code to save product here...
                if (pThis.model.product.ProductId > 0) { 
                    pThis.httpDataService.post(ApiUrl.updateProduct, pThis.model.product).subscribe(
                        data => {
                            //remove dirty flag.                            
                            pThis.productForm.reset();
                            glob.caches.pageDirty = false;
                            
                            pThis.exDialog.openMessage({
                                message: "The product has successfully been updated.",
                                closeAllDialogs: true
                            });                             
                        },
                        (err: HttpErrorResponse) => {                            
                            //remove dirty flag.                            
                            pThis.productForm.reset();
                            glob.caches.pageDirty = false;
                            pThis.exDialog.openMessage("Error updating product data.", "Error", "error");                             
                        });
                }
                else { 
                    pThis.httpDataService.post(ApiUrl.addProduct, pThis.model.product).subscribe(
                        data => {                            
                            //remove dirty flag.                            
                            pThis.productForm.reset();
                            glob.caches.pageDirty = false;

                            //Get parent.
                            let pParent: any = glob.caches.productListThis; 

                            //Adding productId to array.
                            pParent.model.newProductIds.push(data.ProductId);
                            //let te = MiscConfig.maxAddProductPerLoad;
                            if (pParent.model.newProductIds.length < MiscConfig.maxAddProductPerLoad) {
                                //Continue to add product items.
                                pThis.exDialog.openConfirm({                                    
                                    message: "The new product has successfully been added. \n\nWould you like to add another?",
                                    messageAddClass: 'ng-with-newlines'
                                    //closeImmediateParentByAction: true
                                }).subscribe((result) => {
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
                        },
                        (err: HttpErrorResponse) => {
                            //remove dirty flag.                            
                            pThis.productForm.reset();
                            glob.caches.pageDirty = false;
                            pThis.exDialog.openMessage("Error adding product data.", "Error", "error");                             
                        });                    
                }                
            }
        });        
    }

    cancel() {        
        var pThis: any = this;       
        
        if (this.productForm.dirty) {
            this.exDialog.openConfirm({
                title: "Cancel Warning",
                icon: "warning",
                message: "Do you really want to cancel the data change?"
            }).subscribe((result) => {
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
    } 

    resetAddForm() {
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
    }
    
    focusOnButton(buttonType: string) {
        //Focus on Save button causes onblur of previous focused input element.        
        switch (buttonType) {
            case "save":
                this.saveButton.nativeElement.focus();
                break;
            case "cancel":
                this.cancelButton.nativeElement.focus();
                break;
        }
    }
    
    focusProductName() {
        ////IE 11 only.
        //let windowObj: any = window, documentObj: any = document;
        //if (!!windowObj.MSInputMethodContext && !!documentObj.documentMode) {
        //    this.productNameElem.nativeElement.focus();
        //}
        //else {
        //    //Need setTimeout for MS-Edge, Chrome, Firefox (but not IE). Otherwise the box will be focused with "required" validation error.
            setTimeout(() => {
                //Not working.
                //this.element.nativeElement.querySelector('#txtProductName')[0].focus()
                //let td = this.productNameElem.nativeElement;
                this.productNameElem.nativeElement.focus();
            }, 500);
        //}        
    }

    //Set flag for control to display validation error message onBlur.
    setShowInvalid(control: any, actionType: number) {
        if (actionType == 0) {
            control.showInvalid = false;
        }
        else if (actionType == 1) {
            control.showInvalid = true;
        }
    }
}
