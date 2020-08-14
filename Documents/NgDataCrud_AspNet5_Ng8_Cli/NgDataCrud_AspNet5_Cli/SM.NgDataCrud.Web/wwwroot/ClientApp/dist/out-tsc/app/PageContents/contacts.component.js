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
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpDataService } from '../Services/http-data.service';
import { ExDialog } from "../NgExDialog/dialog.module";
import { Validator2 } from "../InputValidator/reactive-validator";
import { ValidateErrorComponent } from "../InputValidator/validate-error.component";
import { PrimaryContactTypes } from '../Services/local-data';
import { ApiUrl, MiscConfig } from '../Services/app.config';
import * as glob from '../Services/globals';
var ContactsComponent = /** @class */ (function () {
    function ContactsComponent(httpDataService, exDialog) {
        this.httpDataService = httpDataService;
        this.exDialog = exDialog;
        this.loadingCount = 0;
        this.errorMessage = undefined;
        this.model = {
            contactList_0: [] //Original data deep copy.        
        };
        this.checkboxes = {
            'topChecked': false,
            items: []
        };
        this.formLoaded = false;
        this.showContactList = false;
        this.maxEditableIndex = 0;
        this.maxAddNumber = MiscConfig.maxAddContactPerLoad;
        this.addRowCount = 0;
        this.editRowCount = 0;
        this.ddlPrimaryTypeDirty = [];
        this.showInvalid = false;
    }
    ContactsComponent.prototype.ngOnInit = function () {
        var _this = this;
        glob.caches.pageDirty = false;
        this.loadingCount = 0;
        this.labelType = "other";
        //Get primary types from localData.
        this.model.primaryTypes = PrimaryContactTypes;
        this.contactForm = new FormGroup({
            contactFmArr: new FormArray([])
            //}, { updateOn: 'blur' });        
        });
        //Update global dirty flag.
        this.contactForm.get('contactFmArr').valueChanges.subscribe(function (x) {
            //let te = (<FormArray>this.contactForm.controls.contactFmArr).value;
            if (_this.contactForm.controls.contactFmArr.dirty) {
                glob.caches.pageDirty = true;
            }
            else {
                glob.caches.pageDirty = false;
            }
        });
        //Initial call to load data to table.
        this.getContactList();
    };
    ContactsComponent.prototype.ngOnDestroy = function () {
    };
    //Route deactivate for dirty warning.
    ContactsComponent.prototype.canDeactivate = function () {
        //Not working.
        //this.cancelChangesButton.nativeElement.focus();
        //Returning true will navigate away silently.
        //Returning false will pass handler to caller for dirty warning.
        if (glob.caches.pageDirty) {
            return false;
        }
        else {
            return true;
        }
    };
    ////Set element blurred when mouse moves out of element.
    //setBlur(elemId: string) {
    //    this.frmContact.nativeElement.querySelector('#' + elemId).blur();
    //}
    //contactList count contains disabledRow count when removing added rows.
    //displayCount should be original loading count plus active addRowCount.
    ContactsComponent.prototype.displayCount = function () {
        return this.loadingCount + this.addRowCount;
    };
    ;
    ContactsComponent.prototype.resetContactFormArray = function () {
        var pThis = this;
        this.checkboxes.items = [];
        this.addRowCount = 0;
        this.editRowCount = 0;
        //Need to use original structures, not referred contactControlList.
        pThis.contactForm.controls.contactFmArr.controls = [];
        this.contactForm.controls.contactFmArr.reset([]);
        this.model.contactList_0.forEach(function (item, index) {
            pThis.contactForm.controls.contactFmArr.push(pThis.loadContactFormGroup(item));
            pThis.checkboxes.items[index] = false;
        });
        //Set reference for data binding.
        this.contactControlList = pThis.contactForm.controls.contactFmArr.controls;
        this.checkboxes.topChecked = false;
    };
    ContactsComponent.prototype.loadContactFormGroup = function (contact) {
        //return this.fb.group({
        var fg = new FormGroup({
            "ContactId": new FormControl(contact.ContactId),
            "ContactName": new FormControl(contact.ContactName, Validators.required),
            "Phone": new FormControl(contact.Phone, [Validators.required, Validator2.usPhone()]),
            "Email": new FormControl(contact.Email, [Validator2.required(), Validator2.email()]),
            "PrimaryType": new FormControl(contact.PrimaryType //, { updateOn: 'change' }
            )
        });
        //Add showInvalid property for onBlur display validation error message.
        for (var prop in fg.controls) {
            if (fg.controls.hasOwnProperty(prop)) {
                fg.controls[prop]['showInvalid'] = true;
            }
        }
        return fg;
    };
    ContactsComponent.prototype.getContactList = function () {
        var _this = this;
        var pThis = this;
        var url = ApiUrl.getContactList;
        this.httpDataService.getWithoutCache(url).subscribe(function (data) {
            if (data) {
                //Make deep clone of data list for record-based cancel/undo.
                pThis.model.contactList_0 = glob.deepClone(data.Contacts);
                _this.resetContactFormArray();
                //Example:
                //let te = pThis.model.contactFmArr[0].rowCheckbox;
                //let td = pThis.contactForm.controls.contactFmArr.controls[0];
                //let tw = pThis.contactForm.controls.contactFmArr.controls[0].get('phone');
                //let te = (<FormArray>this.contactForm.controls.contactFmArr).controls[0];
                //Set last index number before adding new.
                pThis.maxEditableIndex = data.Contacts.length - 1;
                //Set original load data row count.
                pThis.loadingCount = data.Contacts.length;
                //Reset add and edit counts, and scope dirty flags for refreshing data.
                pThis.addRowCount = 0;
                pThis.editRowCount = 0;
                //Show table.
                pThis.showContactList = true;
            }
        }, function (err) {
            //pThis.errorMsg = this.httpDataService.parseErrorMessage(err);
            pThis.errorMessage = err.message;
        });
    };
    //For checkboxes.
    ContactsComponent.prototype.hasUnChecked = function () {
        //Loop to get flag if any item box unchecked.
        var rtn = false;
        for (var i = 0; i < this.checkboxes.items.length; i++) {
            if (!this.checkboxes.items[i]) {
                rtn = true;
                break;
            }
        }
        return rtn;
    };
    ContactsComponent.prototype.topCheckboxChange = function () {
        //Click the top checkbox.
        if (this.checkboxes.topChecked) {
            //Check all only affect editable rows. Add-new rows always have checkbox checked.
            for (var i = 0; i <= this.maxEditableIndex; i++) {
                if (!this.checkboxes.items[i]) {
                    this.checkboxes.items[i] = true;
                }
            }
            //Update editRowCount.
            this.editRowCount = this.maxEditableIndex + 1;
        }
        else {
            //Uncheck top box which affects both edit and add-new rows.
            this.cancelAllChangeRows("topCheckbox");
        }
    };
    ContactsComponent.prototype.listCheckboxChange = function (listIndex) {
        var pThis = this;
        //Click a single checkbox for row.
        if (this.checkboxes.items[listIndex]) {
            //Increase editRowCount when checking the checkbox.
            this.editRowCount += 1;
            //Syn top check box.
            this.checkboxes.topChecked = !this.hasUnChecked();
        }
        else {
            //Cancel row operation when unchecking the checkbox.
            var message = "Are you sure to discard changes and cancel editing for this row?";
            if (listIndex > this.maxEditableIndex) {
                //Add new status.
                message = "Are you sure to discard changes and remove this new row?";
            }
            if (this.contactForm.controls.contactFmArr.controls[listIndex].dirty) {
                this.exDialog.openConfirm({
                    title: "Cancel Confirmation",
                    message: message
                }).subscribe(function (result) {
                    if (result) {
                        pThis.cancelChangeRow(listIndex);
                    }
                    else {
                        pThis.undoCancelRow(listIndex);
                    }
                } //,(err: HttpErrorResponse) => {
                //pThis.exDialog.openMessage("Error cancelling operaton.", "Error", "error");
                //}
                );
            }
            else {
                //Remove added row silently.
                this.cancelChangeRow(listIndex);
            }
        }
    };
    ContactsComponent.prototype.cancelChangeRow = function (listIndex) {
        //Reset form if no checkbox checked, else do individual row.
        var hasChecked = false;
        for (var i = 0; i < this.checkboxes.items.length; i++) {
            if (this.checkboxes.items[i]) {
                hasChecked = true;
                break;
            }
        }
        if (!hasChecked) {
            //Reset entire array.
            this.resetContactFormArray();
        }
        else {
            if (listIndex > this.maxEditableIndex) {
                //Remove add-new row.
                this.contactForm.controls.contactFmArr.removeAt(listIndex);
                this.checkboxes.items.splice(listIndex, 1);
                //Reduce addRowCount.
                this.addRowCount -= 1;
            }
            else {
                //Edit row: reset array item.
                this.contactForm.controls.contactFmArr.controls[listIndex].reset(glob.deepClone(this.model.contactList_0[listIndex]));
                //Reduce editRowCount.
                this.editRowCount -= 1;
            }
        }
    };
    ContactsComponent.prototype.cancelAllChangeRows = function (callFrom) {
        var pThis = this;
        var message = "Are you sure to discard changes and cancel updates for all rows?";
        if (callFrom == "cancelButton") {
            message = "Are you sure to discard changes and cancel updates for selected rows?";
        }
        //Check dirty for call from topCheckbox only.
        if (this.contactForm.controls.contactFmArr.dirty || callFrom == "cancelButton") {
            this.exDialog.openConfirm({
                title: "Cancel Confirmation",
                message: message
            }).subscribe(function (result) {
                if (result) {
                    //Reset all.
                    pThis.resetContactFormArray();
                }
                else {
                    //Set back checked.
                    if (callFrom == "topCheckbox")
                        pThis.checkboxes.topChecked = true;
                }
            });
        }
        else {
            //Uncheck all checkboxes in edit rows.
            for (var i = 0; i <= this.maxEditableIndex; i++) {
                if (this.checkboxes.items[i]) {
                    this.checkboxes.items[i] = false;
                }
            }
            this.checkboxes.topChecked = false;
            this.editRowCount = 0;
        }
    };
    ContactsComponent.prototype.clearAddNewRows = function () {
        //Needed for cancelling add-new rows.
        for (var i = this.contactForm.controls.contactFmArr.length - 1; i > this.maxEditableIndex; i--) {
            this.contactForm.controls.contactFmArr.removeAt(i);
        }
        //Remove add-new element in checkboxes.items all at once.
        if (this.checkboxes.items[this.maxEditableIndex + 1] != undefined) {
            this.checkboxes.items.splice(this.maxEditableIndex + 1);
        }
    };
    ContactsComponent.prototype.undoCancelRow = function (listIndex) {
        //Cancel edit or add - reset checked back and sync topChecked.                    
        this.checkboxes.items[listIndex] = true;
        //Syn top check box.
        this.checkboxes.topChecked = !this.hasUnChecked();
    };
    ContactsComponent.prototype.addNewContact = function () {
        //Add new row to table.
        var pThis = this;
        //Set max added-row number limit.
        if (this.addRowCount + 1 == this.maxAddNumber) {
            this.exDialog.openMessage({
                title: "Warning",
                icon: "warning",
                message: "The maximum number (" + pThis.maxAddNumber + ") of added rows for one submission is approached."
            });
        }
        //Add empty row to the bottom of table.
        var newContact = {
            ContactId: 0,
            ContactName: '',
            Phone: '',
            Email: '',
            PrimaryType: 0
        };
        pThis.contactForm.controls.contactFmArr.push(this.loadContactFormGroup(newContact));
        //Test
        //let te = pThis.contactForm.controls.contactFmArr.value;
        //let td = this.contactControlList;
        //Add to checkboxes.items.        
        this.checkboxes.items[this.checkboxes.items.length] = true;
        //Update addRowCount.
        this.addRowCount += 1;
    };
    ContactsComponent.prototype.deleteContacts = function () {
        //Virtual disable button.
        if (this.contactForm.controls.contactFmArr.dirty || this.editRowCount < 1)
            return;
        var pThis = this;
        var idsForDelete = [];
        this.checkboxes.items.forEach(function (item, index) {
            if (item) {
                idsForDelete.push(pThis.contactForm.controls.contactFmArr.value[index].ContactId);
            }
        });
        if (idsForDelete.length > 0) {
            var temp = "s";
            var temp2_1 = "s have";
            if (idsForDelete.length == 1) {
                temp = "";
                temp2_1 = " has";
            }
            this.exDialog.openConfirm({
                title: "Delete Confirmation",
                message: "Are you sure to delete selected contact" + temp + "?"
            }).subscribe(function (result) {
                if (result) {
                    pThis.httpDataService.post(ApiUrl.deleteContacts, idsForDelete)
                        .subscribe(function (data) {
                        pThis.exDialog.openMessage({
                            scope: pThis.$scope,
                            message: "The " + temp2_1 + " successfully been deleted."
                        });
                        //Refresh table.
                        pThis.getContactList();
                    }, function (err) {
                        //pThis.errorMsg = this.httpDataService.parseErrorMessage(err);
                        pThis.errorMessage = err.message;
                    });
                }
            });
        }
    };
    ContactsComponent.prototype.saveChanges = function () {
        //Virtual button disabled
        if (!(this.contactForm.controls.contactFmArr.dirty && this.contactForm.controls.contactFmArr.valid))
            return;
        var pThis = this;
        //test
        //let tm = pThis.contactForm.controls.contactFmArr.value;
        //Prepare message text.        
        var temp = "s";
        var temp2 = "s have";
        if (this.addRowCount + this.editRowCount == 1) {
            temp = "";
            temp2 = " has";
        }
        var title = "Save Confirmation";
        var message = "Are you sure to submit changes for selected contact" + temp + "?";
        this.exDialog.openConfirm({
            title: title,
            message: message //,
            //keepOpenForAction: true
        }).subscribe(function (result) {
            if (result) {
                //Update data for edit rows.
                if (pThis.editRowCount > 0) {
                    //maxEditableIndex
                    //let updateContactUrl = ApiUrl.updateContacts;
                    //Prepare data list of edited rows.
                    var editItemList_1 = [];
                    pThis.contactControlList.forEach(function (item, index) {
                        if (item.value.ContactId != 0 && item.dirty) {
                            editItemList_1.push(item.value);
                        }
                    });
                    pThis.httpDataService.post(ApiUrl.updateContacts, editItemList_1).subscribe(function (data) {
                        if (pThis.addRowCount > 0) {
                            //Process add-new rows if exist.
                            pThis.doSaveAddNewRows(temp2);
                        }
                        else {
                            pThis.exDialog.openMessage("Selected contact" + temp2 + " successfully been updated.");
                            //Refresh table.
                            pThis.getContactList();
                        }
                    }, function (err) {
                        pThis.exDialog.openMessage("Error update contact data.", "Error", "error");
                    });
                }
                else if (pThis.addRowCount > 0) {
                    pThis.doSaveAddNewRows(temp2);
                }
            }
        });
    };
    ContactsComponent.prototype.doSaveAddNewRows = function (temp2) {
        var pThis = this;
        var addItemList = [];
        for (var i = this.maxEditableIndex + 1; i < this.contactControlList.length; i++) {
            if (this.contactControlList[i] != undefined) {
                addItemList.push(this.contactControlList[i].value);
            }
        }
        this.httpDataService.post(ApiUrl.addContacts, addItemList).subscribe(function (data) {
            pThis.exDialog.openMessage("Selected contact" + temp2 + " successfully been updated.");
            //Refresh table.
            pThis.getContactList();
        }, function (err) {
            pThis.exDialog.openMessage("Error update contact data.", "Error", "error");
        });
    };
    //Click Cancel Changes button.
    ContactsComponent.prototype.canelChanges = function () {
        //Virtual button disabled
        if (this.editRowCount == 0 && this.addRowCount == 0)
            return;
        ////test:
        //let te = this.contactControlList;
        //let tm = (<FormArray>this.contactForm.controls.contactFmArr).dirty;
        this.cancelAllChangeRows("cancelButton");
    };
    ContactsComponent.prototype.focusOnButton = function (buttonType) {
        //Focus on Save button causes onblur of previous focused input element.        
        switch (buttonType) {
            case "delete":
                this.deleteButton.nativeElement.focus();
                break;
            case "saveChanges":
                this.saveChangesButton.nativeElement.focus();
                break;
            case "cancelChanges":
                this.cancelChangesButton.nativeElement.focus();
                break;
        }
    };
    //Set flag for control to display validation error message onBlur.
    ContactsComponent.prototype.setShowInvalid = function (control, actionType) {
        if (actionType == 0) {
            control.showInvalid = false;
        }
        else if (actionType == 1) {
            control.showInvalid = true;
        }
    };
    var _a, _b, _c;
    __decorate([
        ViewChild(ValidateErrorComponent, { static: false }),
        __metadata("design:type", ValidateErrorComponent)
    ], ContactsComponent.prototype, "validateErrorComponent", void 0);
    __decorate([
        ViewChild('deleteButton', { static: false }),
        __metadata("design:type", typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object)
    ], ContactsComponent.prototype, "deleteButton", void 0);
    __decorate([
        ViewChild('saveChangesButton', { static: false }),
        __metadata("design:type", typeof (_b = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _b : Object)
    ], ContactsComponent.prototype, "saveChangesButton", void 0);
    __decorate([
        ViewChild('cancelChangesButton', { static: false }),
        __metadata("design:type", typeof (_c = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _c : Object)
    ], ContactsComponent.prototype, "cancelChangesButton", void 0);
    ContactsComponent = __decorate([
        Component({
            moduleId: module.id.toString(),
            selector: 'contacts',
            templateUrl: "./contacts.component.html",
            styleUrls: ["./contacts.component.css"]
        }),
        __metadata("design:paramtypes", [HttpDataService, ExDialog])
    ], ContactsComponent);
    return ContactsComponent;
}());
export { ContactsComponent };
//# sourceMappingURL=contacts.component.js.map