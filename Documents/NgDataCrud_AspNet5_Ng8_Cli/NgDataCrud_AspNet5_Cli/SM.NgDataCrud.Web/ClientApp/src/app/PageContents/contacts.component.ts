import { Component, ViewChild, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormArray, FormControl, AbstractControl, Validators } from '@angular/forms';
import { HttpDataService } from '../Services/http-data.service';
import { Observable } from 'rxjs';
import { ExDialog } from "../NgExDialog/dialog.module";
import { ComponentCanDeactivate } from '../Services/dirty-warning';
import { Validator2 } from "../InputValidator/reactive-validator";
import { ValidateErrorComponent } from "../InputValidator/validate-error.component";
import { PrimaryContactTypes } from '../Services/local-data';
import { ApiUrl, MiscConfig } from '../Services/app.config';
import * as glob from '../Services/globals';

@Component({
    moduleId: module.id.toString(),
    selector: 'contacts',
    templateUrl: "./contacts.component.html",
    styleUrls: ["./contacts.component.css"]
})
export class ContactsComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
    @ViewChild(ValidateErrorComponent, { static: false }) validateErrorComponent: ValidateErrorComponent;
    //@ViewChild('frmContact') frmContact: ElementRef;
    //For virtual disable/enable buttons.
    @ViewChild('deleteButton', { static: false }) deleteButton: ElementRef;
    @ViewChild('saveChangesButton', { static: false }) saveChangesButton: ElementRef;
    @ViewChild('cancelChangesButton', { static: false }) cancelChangesButton: ElementRef;
    
    labelType: any; //for loadingCount: 0, 1, and "other".
    loadingCount: number = 0;
    errorMessage: string = undefined;
    contactForm: FormGroup;
    contactControlList: any;
    model: any = {
        contactList_0: [] //Original data deep copy.        
    };
    checkboxes: any = {
        'topChecked': false,        
        items: []
    };
    formLoaded: boolean = false;    
    showContactList: boolean = false; 
    maxEditableIndex: number = 0;
    maxAddNumber: number = MiscConfig.maxAddContactPerLoad;
    addRowCount: number = 0;
    editRowCount: number = 0;    
    ddlPrimaryTypeDirty: any = [];    
    showInvalid: boolean = false;
    
    constructor(private httpDataService: HttpDataService, private exDialog: ExDialog) {
    }

    ngOnInit() {            
        glob.caches.pageDirty = false;
        this.loadingCount = 0;
        this.labelType = "other";
      
        //Get primary types from localData.
        this.model.primaryTypes = PrimaryContactTypes;

        this.contactForm = new FormGroup({            
            contactFmArr: new FormArray([              
            ])
        //}, { updateOn: 'blur' });        
        });

        //Update global dirty flag.
        this.contactForm.get('contactFmArr').valueChanges.subscribe((x) => {
            //let te = (<FormArray>this.contactForm.controls.contactFmArr).value;
            if ((<FormArray>this.contactForm.controls.contactFmArr).dirty) {
                glob.caches.pageDirty = true;
            }
            else {
                glob.caches.pageDirty = false;
            }
        });
                        
        //Initial call to load data to table.
        this.getContactList();
    }

    ngOnDestroy() {
            
    }

    //Route deactivate for dirty warning.
    canDeactivate(): Observable<boolean> | boolean {
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
    }

    ////Set element blurred when mouse moves out of element.
    //setBlur(elemId: string) {
    //    this.frmContact.nativeElement.querySelector('#' + elemId).blur();
    //}

    //contactList count contains disabledRow count when removing added rows.
    //displayCount should be original loading count plus active addRowCount.
    displayCount() {
        return this.loadingCount + this.addRowCount;
    };
        
    resetContactFormArray() {
        let pThis: any = this;        
        this.checkboxes.items = [];
        this.addRowCount = 0;
        this.editRowCount = 0;

        //Need to use original structures, not referred contactControlList.
        pThis.contactForm.controls.contactFmArr.controls = []; 
        this.contactForm.controls.contactFmArr.reset([]); 

        this.model.contactList_0.forEach((item: any, index: number) => {
            pThis.contactForm.controls.contactFmArr.push(pThis.loadContactFormGroup(item));
            pThis.checkboxes.items[index] = false;
        });
        //Set reference for data binding.
        this.contactControlList = pThis.contactForm.controls.contactFmArr.controls;
        this.checkboxes.topChecked = false;
    }

    loadContactFormGroup(contact?: any): FormGroup {
        //return this.fb.group({
        let fg = new FormGroup({
            "ContactId": new FormControl(contact.ContactId), //Dummy control for cache key Id.         
            "ContactName": new FormControl(contact.ContactName, Validators.required),
            "Phone": new FormControl(contact.Phone, [Validators.required, Validator2.usPhone()]),
            "Email": new FormControl(contact.Email, [Validator2.required(), Validator2.email()]),
            "PrimaryType": new FormControl(contact.PrimaryType//, { updateOn: 'change' }
            )
        });
        //Add showInvalid property for onBlur display validation error message.
        for (let prop in fg.controls) {
            if (fg.controls.hasOwnProperty(prop)) {
                fg.controls[prop]['showInvalid'] = true;
            }
        }
        return fg;
    }

    getContactList() {
        let pThis: any = this;        
        let url: string = ApiUrl.getContactList;
        this.httpDataService.getWithoutCache(url).subscribe(            
            data => {
              if (data) {
                    //Make deep clone of data list for record-based cancel/undo.
                    pThis.model.contactList_0 = glob.deepClone(data.Contacts);                    

                    this.resetContactFormArray();
                                        
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
            },
            (err: HttpErrorResponse) => {
                //pThis.errorMsg = this.httpDataService.parseErrorMessage(err);
                pThis.errorMessage = err.message;
            });
    }
    
    //For checkboxes.
    hasUnChecked() {
        //Loop to get flag if any item box unchecked.
        let rtn = false;
        for (let i = 0; i < this.checkboxes.items.length; i++) {
            if (!this.checkboxes.items[i]) {
                rtn = true;
                break;
            }
        }
        return rtn;
    }

    topCheckboxChange() {
        //Click the top checkbox.
        if (this.checkboxes.topChecked) {
            //Check all only affect editable rows. Add-new rows always have checkbox checked.
            for (let i = 0; i <= this.maxEditableIndex; i++) {
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
    }

    listCheckboxChange(listIndex: number) {
        let pThis: any = this;
        
        //Click a single checkbox for row.
        if (this.checkboxes.items[listIndex]) {
            //Increase editRowCount when checking the checkbox.
            this.editRowCount += 1;

            //Syn top check box.
            this.checkboxes.topChecked = !this.hasUnChecked();
        }
        else {
            //Cancel row operation when unchecking the checkbox.
            let message: string = "Are you sure to discard changes and cancel editing for this row?";
            if (listIndex > this.maxEditableIndex) {
                //Add new status.
                message = "Are you sure to discard changes and remove this new row?";
            }
                        
            if ((<FormArray>this.contactForm.controls.contactFmArr).controls[listIndex].dirty) {
                this.exDialog.openConfirm({                        
                    title: "Cancel Confirmation",
                    message: message
                }).subscribe((result) => {
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
    }

    cancelChangeRow(listIndex) {
        //Reset form if no checkbox checked, else do individual row.
        let hasChecked: boolean = false;
        for (let i = 0; i < this.checkboxes.items.length; i++) {
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
                (<FormArray>this.contactForm.controls.contactFmArr).removeAt(listIndex);
                this.checkboxes.items.splice(listIndex, 1);

                //Reduce addRowCount.
                this.addRowCount -= 1;                
            }
            else {
                //Edit row: reset array item.
                (<FormArray>this.contactForm.controls.contactFmArr).controls[listIndex].reset(glob.deepClone(this.model.contactList_0[listIndex]));
                                
                //Reduce editRowCount.
                this.editRowCount -= 1;
            } 
        }        
    }

    cancelAllChangeRows(callFrom) {
        let pThis: any = this;
        let message: string = "Are you sure to discard changes and cancel updates for all rows?";
        if (callFrom == "cancelButton") {
            message = "Are you sure to discard changes and cancel updates for selected rows?"
        }
        //Check dirty for call from topCheckbox only.
        if ((<FormArray>this.contactForm.controls.contactFmArr).dirty || callFrom == "cancelButton") {
            this.exDialog.openConfirm({
                title: "Cancel Confirmation",
                message: message
            }).subscribe((result) => {            
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
            for (let i = 0; i <= this.maxEditableIndex; i++) {
                if (this.checkboxes.items[i]) {
                    this.checkboxes.items[i] = false;
                }
            } 
            this.checkboxes.topChecked = false;
            this.editRowCount = 0;
        }
    }

    clearAddNewRows() {
        //Needed for cancelling add-new rows.
        for (let i = (<FormArray>this.contactForm.controls.contactFmArr).length - 1; i > this.maxEditableIndex; i--) {
            (<FormArray>this.contactForm.controls.contactFmArr).removeAt(i);            
        }
        //Remove add-new element in checkboxes.items all at once.
        if (this.checkboxes.items[this.maxEditableIndex + 1] != undefined) {
            this.checkboxes.items.splice(this.maxEditableIndex + 1);
        }
    }

    undoCancelRow(listIndex) {
        //Cancel edit or add - reset checked back and sync topChecked.                    
        this.checkboxes.items[listIndex] = true;
        //Syn top check box.
        this.checkboxes.topChecked = !this.hasUnChecked();
    }
        
    addNewContact() {
        //Add new row to table.
        let pThis: any = this;
        //Set max added-row number limit.
        if (this.addRowCount + 1 == this.maxAddNumber) {
            this.exDialog.openMessage({                
                title: "Warning",
                icon: "warning",
                message: "The maximum number (" + pThis.maxAddNumber + ") of added rows for one submission is approached."
            });
        } 
        //Add empty row to the bottom of table.
        let newContact = {
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
    }

    deleteContacts() {
        //Virtual disable button.
        if (this.contactForm.controls.contactFmArr.dirty || this.editRowCount < 1) return;

        let pThis: any = this;
        let idsForDelete = [];        
        this.checkboxes.items.forEach(function (item, index) {             
            if (item) {
                idsForDelete.push(pThis.contactForm.controls.contactFmArr.value[index].ContactId);
            }
        });
        if (idsForDelete.length > 0) {
            let temp = "s";
            let temp2 = "s have"
            if (idsForDelete.length == 1) {
                temp = "";
                temp2 = " has";
            }
            this.exDialog.openConfirm({                
                title: "Delete Confirmation",
                message: "Are you sure to delete selected contact" + temp + "?"
            }).subscribe((result) => {
                if (result) {
                    pThis.httpDataService.post(ApiUrl.deleteContacts, idsForDelete)
                        .subscribe(
                        data => {                            
                            pThis.exDialog.openMessage({
                                scope: pThis.$scope,
                                message: "The " + temp2 + " successfully been deleted."
                            });
                            //Refresh table.
                            pThis.getContactList();                            
                        },
                        (err: HttpErrorResponse) => {
                            //pThis.errorMsg = this.httpDataService.parseErrorMessage(err);
                            pThis.errorMessage = err.message;
                        });
                }                
            });
        }
    }

    saveChanges() {
        //Virtual button disabled
        if (!(this.contactForm.controls.contactFmArr.dirty && this.contactForm.controls.contactFmArr.valid)) return;

        let pThis: any = this; 
        //test
        //let tm = pThis.contactForm.controls.contactFmArr.value;

        //Prepare message text.        
        let temp: string = "s";
        let temp2: string  = "s have";
        if (this.addRowCount + this.editRowCount == 1) {
            temp = "";
            temp2 = " has"
        }
        let title = "Save Confirmation";
        let message = "Are you sure to submit changes for selected contact" + temp + "?";
        
        this.exDialog.openConfirm({            
            title: title,
            message: message//,
            //keepOpenForAction: true
        }).subscribe((result) => {
            if (result) {
                //Update data for edit rows.
                if (pThis.editRowCount > 0) {
                    //maxEditableIndex
                    //let updateContactUrl = ApiUrl.updateContacts;

                    //Prepare data list of edited rows.
                    let editItemList: any = [];
                    pThis.contactControlList.forEach((item: any, index: number) => {
                        if (item.value.ContactId != 0 && item.dirty ) {
                            editItemList.push(item.value);
                        }                        
                    });

                    pThis.httpDataService.post(ApiUrl.updateContacts, editItemList).subscribe(
                        data => {
                            if (pThis.addRowCount > 0) {
                                //Process add-new rows if exist.
                                pThis.doSaveAddNewRows(temp2);
                            }
                            else {
                                pThis.exDialog.openMessage("Selected contact" + temp2 + " successfully been updated.");
                                //Refresh table.
                                pThis.getContactList();
                            }
                        },
                        (err: HttpErrorResponse) => {
                            pThis.exDialog.openMessage("Error update contact data.", "Error", "error");
                        }); 
                }
                else if (pThis.addRowCount > 0) {
                    pThis.doSaveAddNewRows(temp2);
                }
            }            
        });
    }

    doSaveAddNewRows(temp2: string) {
        let pThis: any = this;
        let addItemList = [];
        for (let i = this.maxEditableIndex + 1; i < this.contactControlList.length; i++) {
            if (this.contactControlList[i] != undefined) {
                addItemList.push(this.contactControlList[i].value);
            }
        }
        this.httpDataService.post(ApiUrl.addContacts, addItemList).subscribe(
            data => {
                pThis.exDialog.openMessage("Selected contact" + temp2 + " successfully been updated."); 
                //Refresh table.
                pThis.getContactList();
            },
            (err: HttpErrorResponse) => {
                pThis.exDialog.openMessage("Error update contact data.", "Error", "error");
            });
    }

    //Click Cancel Changes button.
    canelChanges() {
        //Virtual button disabled
        if (this.editRowCount == 0 && this.addRowCount == 0) return;

        ////test:
        //let te = this.contactControlList;
        //let tm = (<FormArray>this.contactForm.controls.contactFmArr).dirty;

        this.cancelAllChangeRows("cancelButton");        
    } 

    focusOnButton(buttonType: string) {
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


