var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgxMyDatePickerDirective } from '../ngxMyDatePicker/ngx-my-date-picker.input';
import { MyDatePickConfig } from '../Services/app.config';
import { ProductSearchTypes, ProductStautsTypes } from '../Services/local-data';
import * as commonMethods from '../NgExTable/common-methods';
import * as glob from '../Services/globals';
var SearchComponent = /** @class */ (function () {
    //End of MyDatePicker.
    function SearchComponent() {
        this.searchChanged = new EventEmitter();
        this.searchTitle = "Search Products";
        this.errorMessage = "";
        this.search = {};
        this.previousSearch = {};
        //MyDatePicker.
        this.myDatePickerOptions = MyDatePickConfig;
        this.defMonth = {
            defMonth: ''
        };
        this.dpDisabled = false;
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.setDefaultSearchItems();
        this.productSearchTypes = ProductSearchTypes;
        this.productStatusTypes = ProductStautsTypes;
    };
    SearchComponent.prototype.onChange = function (newValue) {
        //Clear value if any when selecting none.
        if (newValue == "") {
            this.search.searchText = "";
        }
    };
    SearchComponent.prototype.setDefaultSearchItems = function () {
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
    };
    //MyDatePicker.
    SearchComponent.prototype.onDpFromToggle = function (event) {
        //console.log('onCalendarToggle(): Reason: ', event);
        if (event == 1 && this.dpTo.isOpen) {
            //Close dpTo.
            this.dpTo.closeCalendar();
        }
    };
    SearchComponent.prototype.onDpToToggle = function (event) {
        if (event == 1 && this.dpFrom.isOpen) {
            //Close dpFrom.
            this.dpFrom.closeCalendar();
        }
    };
    SearchComponent.prototype.searchGo = function (event) {
        //Clear error message if any.
        this.errorMessage = "";
        //Check if search parameters change. -- Not good after adding/updating.
        //if (JSON.stringify(this.search) === JSON.stringify(this.searchParams)) {
        //    return;
        //}
        //Validate search inputs.
        var isValid = false;
        if ((this.search.searchType != "" && this.search.searchText == "") ||
            (this.search.searchType == "" && this.search.searchText != "")) {
            this.errorMessage = "Invalid Search by values.";
        }
        if (this.search.priceLow != "" || this.search.priceHigh != "") {
            var priceLow = this.search.priceLow;
            if (priceLow != "" && !glob.isNumeric(priceLow)) {
                this.errorMessage += "Invalid Price Low value.\n";
                //priceLow = ""; //Enable this if non-obstructive.
            }
            var priceHigh = this.search.priceHigh;
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
            var dateFrom = this.search.dateFrom;
            if (dateFrom == null) {
                //validate some values such as "02/30/2014" as invalid.
                this.errorMessage += "Invalid Available From date.\n";
            }
            var dateTo = this.search.dateTo;
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
    };
    //Convert to UpperCamelCase.
    SearchComponent.prototype.camelize = function (str) {
        return str.replace(/\b\w/g, function (chr) { return chr.toUpperCase(); }).replace(/ /g, "");
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SearchComponent.prototype, "searchType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SearchComponent.prototype, "clientDataList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SearchComponent.prototype, "searchParams", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], SearchComponent.prototype, "searchChanged", void 0);
    __decorate([
        ViewChild('dpFrom', { static: true }),
        __metadata("design:type", NgxMyDatePickerDirective)
    ], SearchComponent.prototype, "dpFrom", void 0);
    __decorate([
        ViewChild('dpTo', { static: true }),
        __metadata("design:type", NgxMyDatePickerDirective)
    ], SearchComponent.prototype, "dpTo", void 0);
    SearchComponent = __decorate([
        Component({
            moduleId: module.id.toString(),
            selector: 'search',
            templateUrl: "./search.component.html",
            styleUrls: ["./search.component.css"]
        }),
        __metadata("design:paramtypes", [])
    ], SearchComponent);
    return SearchComponent;
}());
export { SearchComponent };
//# sourceMappingURL=search.component.js.map