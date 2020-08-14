import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpDataService } from '../Services/http-data.service';
import { TableMainDirective } from '../NgExTable/table-main.directive';
import { PaginationComponent } from '../NgExTable/pagination.component';
import { NgExTableConfig } from '../NgExTable/ngex-table.config';
import { PagingParams, ClientPaginationOutput } from '../NgExTable/model-interface';
import { TableChange } from '../NgExTable/constants';
import { ExDialog } from "../NgExDialog/dialog.module";
import { ComponentCanDeactivate } from '../Services/dirty-warning';
import { ProductComponent } from './product.component';
import { ApiUrl } from '../Services/app.config';
import * as glob from '../Services/globals';

@Component({
    moduleId: module.id.toString(),
    selector: 'product-list',
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
    config: any;
    searchEnabled: boolean = true;
    pagingEnabled: boolean = true;     
    showProductList: boolean = false;
    model: any = {
        productList: []
    };
    checkboxes: any = [];     
    reloadType: glob.ReloadType;

    //Current values.
    pagingParams: PagingParams;    
    numPages: number = 1;
    totalLength: number = 0;
    pagedLength: number = 0;
    searchParams: any;        
    errorMsg: string = "";
    @ViewChild(TableMainDirective, { static: true }) tableMainDirective: TableMainDirective;
    @ViewChild(PaginationComponent, { static: false }) paginationComponent: PaginationComponent;    

    constructor(private ngExTableConfig: NgExTableConfig, private httpDataService: HttpDataService, private exDialog: ExDialog) {
    }

    ngOnInit():void {
        //Set global object for productComponent callback.
        glob.caches.productListThis = this;        

        //Config for NgExTable.
        this.config = this.ngExTableConfig.main;
        
        //Set initial paging parameters.
        this.setInitPagingParams(); 
    }
    //Initial Parameters.
    setInitPagingParams() {    
        let pageSize = this.config.pageSize;
        this.pagingParams = {
            //pageSize: overwrite default setting in ngex-table.config.ts.
            pageSize: pageSize !== undefined ? pageSize : 10,
            pageNumber: 1,
            sortList: [],
            changeType: TableChange.init
        }  
    }

    ngOnDestroy() {  
        glob.caches.productListThis = {};
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

    //Before data access.
    onChangeSearch(searchParams: any) {
        this.pagingParams.changeType = TableChange.search;
        this.searchParams = searchParams;
        this.tableMainDirective.setPagingParamsBeforeData(this.pagingParams);
        this.reloadType = glob.ReloadType.refresh;
        this.getProductList();
    }
        
    onChangeTable(): any {  
        //NgExTable loads pagingParams internally.
        this.reloadType = glob.ReloadType.refresh;
        this.getProductList();     
    }
    
    getProductList() {
        let pThis = this;
        let input = this.getProductListRequest();
        this.httpDataService.post(ApiUrl.getProductList, input).subscribe(            
            data => {                
              if (data) {
                pThis.model.productList = data.Products;
                    
                if (pThis.reloadType == glob.ReloadType.add) {
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
                for (let i = 0; i < data.Products.length; i++) {
                    pThis.checkboxes.items[i] = false;
                }
                pThis.model.hasEditItemChecked = false;
          
                pThis.showProductList = true;
            }
        },
        (err: HttpErrorResponse) => {
            //pThis.errorMsg = this.httpDataService.parseErrorMessage(err);
            pThis.errorMsg = err.message;
        });
    } 
    
    //Parameters for data access.
    getProductListRequest(): any {
        let req: any = {};

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
    }

    //Functions for check boxes.
    hasUnChecked() {
        //Loop to get flag if any item box unchecked.
        let rtn: boolean = false;
        for (let i = 0; i < this.checkboxes.items.length; i++) {
            if (!this.checkboxes.items[i]) {
                rtn = true;
                break;
            }
        }
        return rtn;
    }
    topCheckboxChange() {
        let aThis: any = this;
        this.checkboxes.items.forEach(function (item, index) {
            aThis.checkboxes.items[index] = aThis.checkboxes.topChecked;
        });
        this.model.hasEditItemChecked = this.checkboxes.topChecked;
    }
    listCheckboxChange(idx: number) {
        this.checkboxes.topChecked = !this.hasUnChecked();

        //Set flag for disabling/enabing buttons related to checkbox status.
        this.model.hasEditItemChecked = false;
        for (let i = 0; i < this.checkboxes.items.length; i++) {
            if (this.checkboxes.items[i]) {
                this.model.hasEditItemChecked = true;
                break;
            }
        }
    }

    deleteSelectedProducts() {
        let idsForDelete: Array<number> = [];
        let pThis: any = this;
        this.checkboxes.items.forEach(function (item, index) {
            if (item == true) {
                idsForDelete.push(pThis.model.productList[index].ProductId);
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
                message: "Are you sure to delete selected product" + temp + "?"                
            }).subscribe((result) => {
                if (result) { 
                    //let vThis = pThis;                    
                    pThis.httpDataService.post(ApiUrl.deleteProducts, idsForDelete).subscribe(                        
                        data => {
                            pThis.exDialog.openMessage({
                                message: "The product" + temp2 + " successfully been deleted.",
                                closeAllDialogs: true
                            });
                            //Refresh table data.
                            pThis.reloadType = glob.ReloadType.refresh;
                            pThis.getProductList();
                        },
                        (err: HttpErrorResponse) => {
                            //pThis.errorMsg = this.httpDataService.parseErrorMessage(err);
                            pThis.errorMsg = err.message;
                        });                    
                }
                else {
                    //Do nothing.
                }
            });            
        }
    }

    //Called from clicking Product Name link in table.
    openProductForm(id) { 
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
        })
    }

    //Callback function to refresh the table. 
    refreshGrid() {
        let pThis: any = glob.caches.productListThis;
        if (pThis.model.newProductIds.length > 0) {
            pThis.reloadType = glob.ReloadType.add;
            //Set initial paging parameter.
            pThis.setInitPagingParams();
        }
        else {
            pThis.reloadType = glob.ReloadType.refresh;  
        }
        //Check dirty...

        pThis.pagingParams.changeType = TableChange.search;
        pThis.getProductList();
        //false will keep form open.
        return true;
    } 
}
