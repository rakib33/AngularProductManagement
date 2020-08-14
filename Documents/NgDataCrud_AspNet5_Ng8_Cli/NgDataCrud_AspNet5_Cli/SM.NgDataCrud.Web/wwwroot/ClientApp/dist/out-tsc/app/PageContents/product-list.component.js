var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { HttpDataService } from '../Services/http-data.service';
import { TableMainDirective } from '../NgExTable/table-main.directive';
import { PaginationComponent } from '../NgExTable/pagination.component';
import { NgExTableConfig } from '../NgExTable/ngex-table.config';
import { ExDialog } from "../NgExDialog/dialog.module";
import { ProductComponent } from './product.component';
import { ApiUrl } from '../Services/app.config';
import * as glob from '../Services/globals';
var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(ngExTableConfig, httpDataService, exDialog) {
        this.ngExTableConfig = ngExTableConfig;
        this.httpDataService = httpDataService;
        this.exDialog = exDialog;
        this.searchEnabled = true;
        this.pagingEnabled = true;
        this.showProductList = false;
        this.model = {
            productList: []
        };
        this.checkboxes = [];
        this.numPages = 1;
        this.totalLength = 0;
        this.pagedLength = 0;
        this.errorMsg = "";
    }
    ProductListComponent.prototype.ngOnInit = function () {
        //Set global object for productComponent callback.
        glob.caches.productListThis = this;
        //Config for NgExTable.
        this.config = this.ngExTableConfig.main;
        //Set initial paging parameters.
        this.setInitPagingParams();
    };
    //Initial Parameters.
    ProductListComponent.prototype.setInitPagingParams = function () {
        var pageSize = this.config.pageSize;
        this.pagingParams = {
            //pageSize: overwrite default setting in ngex-table.config.ts.
            pageSize: pageSize !== undefined ? pageSize : 10,
            pageNumber: 1,
            sortList: [],
            changeType: 0 /* init */
        };
    };
    ProductListComponent.prototype.ngOnDestroy = function () {
        glob.caches.productListThis = {};
    };
    //Route deactivate for dirty warning.
    ProductListComponent.prototype.canDeactivate = function () {
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
    //Before data access.
    ProductListComponent.prototype.onChangeSearch = function (searchParams) {
        this.pagingParams.changeType = 1 /* search */;
        this.searchParams = searchParams;
        this.tableMainDirective.setPagingParamsBeforeData(this.pagingParams);
        this.reloadType = 1 /* refresh */;
        this.getProductList();
    };
    ProductListComponent.prototype.onChangeTable = function () {
        //NgExTable loads pagingParams internally.
        this.reloadType = 1 /* refresh */;
        this.getProductList();
    };
    ProductListComponent.prototype.getProductList = function () {
        var pThis = this;
        var input = this.getProductListRequest();
        this.httpDataService.post(ApiUrl.getProductList, input).subscribe(function (data) {
            if (data) {
                pThis.model.productList = data.Products;
                if (pThis.reloadType == 0 /* add */) {
                    //Currently no pagination for reloading added new products.
                    //Trus, maxAddPerLoad should be no more than minimum pageSize.
                    pThis.totalLength = data.Products.length;
                    //Set for pager display.
                    pThis.paginationComponent.addNewLoad = true;
                }
                else {
                    pThis.totalLength = data.TotalCount;
                    //Check if returning adjusted newPageIndex for auto switching to 
                    //previous page if last item on current page removed.
                    if (data.newPageIndex >= 0) {
                        pThis.pagingParams.pageNumber = data.newPageIndex + 1;
                    }
                    //Reset flag.
                    pThis.paginationComponent.addNewLoad = false;
                }
                //TotalItems needs to be directly updated with component reference.
                //Passing it to child @Input doesn't work since pager processes already done.
                pThis.paginationComponent.totalItems = pThis.totalLength;
                //Change in pagedLength will trigger PaginationComponnet.ngOnChanges to reset endItemNumber.                    
                pThis.pagedLength = pThis.model.productList.length;
                //Call service method to update pager. Also need to pass current data length.
                pThis.tableMainDirective.updatePagerAfterData(pThis.pagingParams, pThis.totalLength);
                //Refresh and populate checkboxes.items array.
                pThis.checkboxes.items = [];
                pThis.checkboxes.topChecked = false;
                for (var i = 0; i < data.Products.length; i++) {
                    pThis.checkboxes.items[i] = false;
                }
                pThis.model.hasEditItemChecked = false;
                pThis.showProductList = true;
            }
        }, function (err) {
            //pThis.errorMsg = this.httpDataService.parseErrorMessage(err);
            pThis.errorMsg = err.message;
        });
    };
    //Parameters for data access.
    ProductListComponent.prototype.getProductListRequest = function () {
        var req = {};
        //For refreshing add-new data. 
        if (this.model.newProductIds && this.model.newProductIds.length > 0) {
            req.NewProductIds = this.model.newProductIds;
            //Reset array.
            this.model.newProductIds = [];
        }
        else {
            req = {
                ProductSearchFilter: {},
                PriceSearchFilter: {},
                DateSearchFilter: {},
                Status: "",
                PaginationRequest: {
                    sortList: []
                },
            };
            if (this.searchParams.searchType != "" && this.searchParams.searchText != "") {
                req.ProductSearchFilter = {
                    ProductSearchField: this.searchParams.searchType,
                    ProductSearchText: this.searchParams.searchText
                };
            }
            if (this.searchParams.priceLow != "") {
                req.PriceSearchFilter.SearchPriceLow = this.searchParams.priceLow;
            }
            if (this.searchParams.priceHigh != "") {
                req.PriceSearchFilter.SearchPriceHigh = this.searchParams.priceHigh;
            }
            if (this.searchParams.dateFrom && this.searchParams.dateFrom != "") {
                req.DateSearchFilter.SearchDateFrom = this.searchParams.dateFrom.jsdate;
            }
            if (this.searchParams.dateTo && this.searchParams.dateTo != "") {
                req.DateSearchFilter.SearchDateTo = this.searchParams.dateTo.jsdate;
            }
            if (this.searchParams.statusCode != "") {
                req.StatusCode = this.searchParams.statusCode;
            }
            if (this.pagingParams.pageNumber > 0) {
                req.PaginationRequest.PageIndex = this.pagingParams.pageNumber - 1;
            }
            if (this.pagingParams.pageSize > 0) {
                req.PaginationRequest.PageSize = this.pagingParams.pageSize;
            }
            if (this.pagingParams.sortList.length > 0) {
                req.PaginationRequest.sortList = this.pagingParams.sortList;
            }
        }
        return req;
    };
    //Functions for check boxes.
    ProductListComponent.prototype.hasUnChecked = function () {
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
    ProductListComponent.prototype.topCheckboxChange = function () {
        var aThis = this;
        this.checkboxes.items.forEach(function (item, index) {
            aThis.checkboxes.items[index] = aThis.checkboxes.topChecked;
        });
        this.model.hasEditItemChecked = this.checkboxes.topChecked;
    };
    ProductListComponent.prototype.listCheckboxChange = function (idx) {
        this.checkboxes.topChecked = !this.hasUnChecked();
        //Set flag for disabling/enabing buttons related to checkbox status.
        this.model.hasEditItemChecked = false;
        for (var i = 0; i < this.checkboxes.items.length; i++) {
            if (this.checkboxes.items[i]) {
                this.model.hasEditItemChecked = true;
                break;
            }
        }
    };
    ProductListComponent.prototype.deleteSelectedProducts = function () {
        var idsForDelete = [];
        var pThis = this;
        this.checkboxes.items.forEach(function (item, index) {
            if (item == true) {
                idsForDelete.push(pThis.model.productList[index].ProductId);
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
                message: "Are you sure to delete selected product" + temp + "?"
            }).subscribe(function (result) {
                if (result) {
                    //let vThis = pThis;                    
                    pThis.httpDataService.post(ApiUrl.deleteProducts, idsForDelete).subscribe(function (data) {
                        pThis.exDialog.openMessage({
                            message: "The product" + temp2_1 + " successfully been deleted.",
                            closeAllDialogs: true
                        });
                        //Refresh table data.
                        pThis.reloadType = 1 /* refresh */;
                        pThis.getProductList();
                    }, function (err) {
                        //pThis.errorMsg = this.httpDataService.parseErrorMessage(err);
                        pThis.errorMsg = err.message;
                    });
                }
                else {
                    //Do nothing.
                }
            });
        }
    };
    //Called from clicking Product Name link in table.
    ProductListComponent.prototype.openProductForm = function (id) {
        //Reset array for return Ids.
        this.model.newProductIds = [];
        this.exDialog.openPrime(ProductComponent, {
            width: '35%',
            beforeCloseCallback: this.refreshGrid,
            callerData: { callId: id },
            closeByEscape: false,
            closeByClickOutside: false
            //animation: false,
            //grayBackground: false            
        });
    };
    //Callback function to refresh the table. 
    ProductListComponent.prototype.refreshGrid = function () {
        var pThis = glob.caches.productListThis;
        if (pThis.model.newProductIds.length > 0) {
            pThis.reloadType = 0 /* add */;
            //Set initial paging parameter.
            pThis.setInitPagingParams();
        }
        else {
            pThis.reloadType = 1 /* refresh */;
        }
        //Check dirty...
        pThis.pagingParams.changeType = 1 /* search */;
        pThis.getProductList();
        //false will keep form open.
        return true;
    };
    __decorate([
        ViewChild(TableMainDirective, { static: true }),
        __metadata("design:type", TableMainDirective)
    ], ProductListComponent.prototype, "tableMainDirective", void 0);
    __decorate([
        ViewChild(PaginationComponent, { static: false }),
        __metadata("design:type", PaginationComponent)
    ], ProductListComponent.prototype, "paginationComponent", void 0);
    ProductListComponent = __decorate([
        Component({
            moduleId: module.id.toString(),
            selector: 'product-list',
            templateUrl: "./product-list.component.html",
            styleUrls: ["./product-list.component.css"]
        }),
        __metadata("design:paramtypes", [NgExTableConfig, HttpDataService, ExDialog])
    ], ProductListComponent);
    return ProductListComponent;
}());
export { ProductListComponent };
//# sourceMappingURL=product-list.component.js.map