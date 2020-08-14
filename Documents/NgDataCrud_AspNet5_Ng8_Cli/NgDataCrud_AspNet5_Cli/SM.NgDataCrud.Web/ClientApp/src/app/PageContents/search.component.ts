import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChange, ViewChild } from '@angular/core';
import { INgxMyDpOptions, IMyDateModel, IMyInputFieldChanged, IMyCalendarViewChanged, IMyMarkedDate, IMyDate, IMyDefaultMonth } from '../ngxMyDatePicker/interfaces';
import { NgxMyDatePickerDirective } from '../ngxMyDatePicker/ngx-my-date-picker.input';
import { MyDatePickConfig } from '../Services/app.config';
import { ProductSearchTypes, ProductStautsTypes } from '../Services/local-data';
import * as commonMethods from '../NgExTable/common-methods';
import * as glob from '../Services/globals';

@Component({
    moduleId: module.id.toString(),
    selector: 'search',
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {

    @Input() searchType: any;
    @Input() clientDataList: Array<any>; //Client pagination.
    @Input() searchParams: any;  //Server pagination.
    @Output() searchChanged: EventEmitter<any> = new EventEmitter<any>();

    searchTitle: string = "Search Products";
    errorMessage: string = "";
    search: any = {};
    previousSearch: any = {};
    productSearchTypes: any;
    productStatusTypes: any;

    //MyDatePicker.
    myDatePickerOptions: INgxMyDpOptions = MyDatePickConfig;
    @ViewChild('dpFrom', { static: true }) dpFrom: NgxMyDatePickerDirective;
    @ViewChild('dpTo', { static: true }) dpTo: NgxMyDatePickerDirective;

    defMonth: IMyDefaultMonth = {
        defMonth: ''
    };
    dpDisabled: boolean = false;
    //End of MyDatePicker.

    constructor() {
    }

    ngOnInit(): void {
        this.setDefaultSearchItems();
        this.productSearchTypes = ProductSearchTypes;
        this.productStatusTypes = ProductStautsTypes;
    }

    onChange(newValue) {
        //Clear value if any when selecting none.
        if (newValue == "") {
            this.search.searchText = "";
        }
    }

    setDefaultSearchItems() {
        //Dropdowns.
        this.search.searchType = "";
        this.search.statusCode = "";

        //Search parameter.
        this.search.searchText = "";
        this.search.priceLow = "";
        this.search.priceHigh = "";
        this.search.dateFrom = "";
        this.search.dateTo = "";

        this.errorMessage = "";
        //this.showProductList = false;
    }

    //MyDatePicker.
    onDpFromToggle(event: number): void {
        //console.log('onCalendarToggle(): Reason: ', event);
        if (event == 1 && this.dpTo.isOpen) {
            //Close dpTo.
            this.dpTo.closeCalendar();
        }
    }
    onDpToToggle(event: number): void {
        if (event == 1 && this.dpFrom.isOpen) {
            //Close dpFrom.
            this.dpFrom.closeCalendar();
        }
    }

    searchGo(event?: Event): void {
        //Clear error message if any.
        this.errorMessage = "";

        //Check if search parameters change. -- Not good after adding/updating.
        //if (JSON.stringify(this.search) === JSON.stringify(this.searchParams)) {
        //    return;
        //}

        //Validate search inputs.
        let isValid: boolean = false;

        if ((this.search.searchType != "" && this.search.searchText == "") ||
            (this.search.searchType == "" && this.search.searchText != "")) {
            this.errorMessage = "Invalid Search by values.";
        }

        if (this.search.priceLow != "" || this.search.priceHigh != "") {
            let priceLow = this.search.priceLow;
            if (priceLow != "" && !glob.isNumeric(priceLow)) {
                this.errorMessage += "Invalid Price Low value.\n";
                //priceLow = ""; //Enable this if non-obstructive.
            }
            let priceHigh = this.search.priceHigh;
            if (priceHigh != "" && !glob.isNumeric(priceHigh)) {
                this.errorMessage += "Invalid Price High value.\n";
                //priceHigh = ""; //Enable this if non-obstructive.
            }
            //High should not be smaller than Low.
            if (priceLow != "" && priceHigh != "") {
                if (parseFloat(priceLow) > parseFloat(priceHigh)) {
                    this.errorMessage += "Price High should be greater or equal to Price Low.\n";
                }
            }
        }
        //Datepicker input ngModel:
        //object: valid date; null: invalid date; "": blank entry. 
        if (this.search.dateFrom != "" || this.search.dateTo != "") {
            let dateFrom = this.search.dateFrom;
            if (dateFrom == null) {
                //validate some values such as "02/30/2014" as invalid.
                this.errorMessage += "Invalid Available From date.\n";
            }
            let dateTo = this.search.dateTo;
            if (dateTo == null) {
                this.errorMessage += "Invalid Available To date.\n";
            }
            //From should not be later than To.
            if (dateFrom && dateFrom != "" && dateTo && dateTo != "") {
                if (dateFrom.jsdate > dateTo.jsdate) {
                    this.errorMessage += "Available To date should be greater or equal to Available From date.\n";
                }
            }
        }
        if (this.errorMessage != "") {
            return;
        }

        //Clone search to searchParams.
        this.searchParams = commonMethods.deepClone(this.search);
        this.searchChanged.emit(this.search);
    }

    //Convert to UpperCamelCase.
    camelize(str: string): string {
        return str.replace(/\b\w/g, chr => chr.toUpperCase()).replace(/ /g, "");
    }
}