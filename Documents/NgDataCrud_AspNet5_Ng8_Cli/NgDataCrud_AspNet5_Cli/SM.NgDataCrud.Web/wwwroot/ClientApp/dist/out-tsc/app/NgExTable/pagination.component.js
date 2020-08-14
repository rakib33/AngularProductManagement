var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgExTableConfig } from './ngex-table.config';
import { MessageTransferService } from './message-transfer.service';
var PaginationComponent = /** @class */ (function () {
    function PaginationComponent(ngExTableConfig, messageService) {
        this.ngExTableConfig = ngExTableConfig;
        this.messageService = messageService;
        /** fired when total pages count changes, $event:number equals to total pages count */
        this.numPages = new EventEmitter();
        /** fired when page was changed, $event:{page, pageSize} equals to object with current page index and number of items per page */
        this.pageChanged = new EventEmitter();
        this.sizeSelected = {};
        /** maximum number of items per page. If value less than 1 will display all items on one page */
        this._pageSize = 10;
        this._pageNumber = 1;
        this._paginationMaxBlocks = 5;
        this._paginationMinBlocks = 2;
        this._startItemNumber = 0;
        this._endItemNumber = 0;
        this._sizeOptions = [];
    }
    Object.defineProperty(PaginationComponent.prototype, "totalItems", {
        get: function () {
            return this._totalItems;
        },
        set: function (v) {
            this._totalItems = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "pageSize", {
        get: function () {
            return this._pageSize;
        },
        set: function (v) {
            this._pageSize = v;
            //this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "totalPages", {
        get: function () {
            return this._totalPages;
        },
        set: function (v) {
            this._totalPages = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "pageNumber", {
        get: function () {
            return this._pageNumber;
        },
        set: function (value) {
            this._pageNumber = (value > this.totalPages) ? this.totalPages : (value || 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "paginationMaxBlocks", {
        get: function () {
            return this._paginationMaxBlocks;
        },
        set: function (v) {
            this._paginationMaxBlocks = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "paginationMinBlocks", {
        get: function () {
            return this._paginationMinBlocks;
        },
        set: function (v) {
            this._paginationMinBlocks = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "startItemNumber", {
        get: function () {
            return this._startItemNumber;
        },
        set: function (v) {
            this._startItemNumber = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "endItemNumber", {
        get: function () {
            return this._endItemNumber;
        },
        set: function (v) {
            this._endItemNumber = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "sizeOptions", {
        get: function () {
            return this._sizeOptions;
        },
        set: function (v) {
            this._sizeOptions = v;
        },
        enumerable: true,
        configurable: true
    });
    PaginationComponent.prototype.ngOnInit = function () {
        var pThis = this;
        this.config = this.ngExTableConfig.main;
        //Get default pageSize.
        if (this.pagingParams && this.pagingParams.pageSize) {
            this.pageSize = this.pagingParams.pageSize;
        }
        else {
            this.pageSize = typeof this.config.pageSize !== undefined
                ? this.config.pageSize
                : this.pageSize;
        }
        this.pageNumber = this.pagingParams.pageNumber || 1;
        this.totalPages = this.calculateTotalPages();
        //Pager settings.
        this.paginationMaxBlocks = this.config.paginationMaxBlocks || this._paginationMaxBlocks;
        this.paginationMinBlocks = this.config.paginationMinBlocks || this._paginationMinBlocks;
        this.setStartItemNumber();
        this.setEndItemNumber();
        this.sizeOptions = this.ngExTableConfig.pageSizeList;
        this.sizeOptions.forEach(function (option) {
            if (option.value == pThis.pageSize) {
                pThis.sizeSelected = option; //this.sizeOptions[1];
                return;
            }
        });
        //Service call from tableMainDirective to update pager after data loading.
        this.subscription_1 = this.messageService.subscribe('tableMain_paginationComponent', function (eventData) {
            if (eventData.changeType == 1 /* search */) {
                pThis.pagingParams.changeType = 1 /* search */;
                pThis.selectPage(eventData.pageNumber);
            }
            else {
                if (eventData.changeType == 4 /* sorting */) {
                    pThis.pagingParams.changeType = 4 /* sorting */;
                    pThis.selectPage(eventData.pageNumber);
                }
                else if (eventData.changeType == 3 /* pageSize */) {
                    pThis.setPagerForSizeChange();
                }
            }
        });
    };
    PaginationComponent.prototype.ngOnDestroy = function () {
        this.subscription_1.unsubscribe();
    };
    PaginationComponent.prototype.ngOnChanges = function (changes) {
        //When changing pages, changed pagedLength value is not passed from parent at select-page time.
        //Need to get real EndItemNumber after pagedLength value is changed in this event.
        if (changes["pagedLength"]) {
            this.setEndItemNumber();
        }
    };
    //Pager command from HTML template. Can also be called from parent.
    PaginationComponent.prototype.selectPage = function (pageNumber, event) {
        if (event) {
            //Set change type.
            this.pagingParams.changeType = 2 /* pageNumber */;
            //If clicking the same page button.
            if (pageNumber == this.pageNumber)
                return;
            event.preventDefault();
        }
        if (event && event.target) {
            var target = event.target;
            target.blur();
        }
        this.pageNumber = pageNumber;
        //Update value in base pagingParams.
        this.pagingParams.pageNumber = this.pageNumber;
        //Set pagers.
        this.pages = this.getPages();
        this.setStartItemNumber();
        this.setEndItemNumber();
        //Fire event for pageNumber changeType.
        if (this.pagingParams.changeType == 2 /* pageNumber */) {
            //Call tableMainDirective to set pagingParams before data loading.
            this.messageService.broadcast('tableMain_setPagingParamsBeforeData', this.pagingParams);
            this.pageChanged.emit();
        }
    };
    PaginationComponent.prototype.calculateTotalPages = function () {
        var totalPages = this.pageSize < 1 ? 1 : Math.ceil(this.totalItems / this.pageSize);
        return Math.max(totalPages || 0, 1);
    };
    PaginationComponent.prototype.getPages = function (currentPage, totalItems, pageSize) {
        if (currentPage === void 0) { currentPage = this.pageNumber; }
        if (totalItems === void 0) { totalItems = this.totalItems; }
        if (pageSize === void 0) { pageSize = this.pageSize; }
        var pages = [];
        var numPages = Math.ceil(totalItems / pageSize);
        if (numPages > 1) {
            pages.push({
                type: 'prev',
                number: Math.max(1, currentPage - 1),
                active: currentPage > 1
            });
            pages.push({
                type: 'first',
                number: 1,
                active: currentPage > 1,
                current: currentPage === 1
            });
            var maxPivotPages = Math.round((this.paginationMaxBlocks - this.paginationMinBlocks) / 2);
            var minPage = Math.max(2, currentPage - maxPivotPages);
            var maxPage = Math.min(numPages - 1, currentPage + maxPivotPages * 2 - (currentPage - minPage));
            minPage = Math.max(2, minPage - (maxPivotPages * 2 - (maxPage - minPage)));
            var i = minPage;
            while (i <= maxPage) {
                if ((i === minPage && i !== 2) || (i === maxPage && i !== numPages - 1)) {
                    pages.push({
                        type: 'more',
                        active: false
                    });
                }
                else {
                    pages.push({
                        type: 'page',
                        number: i,
                        active: currentPage !== i,
                        current: currentPage === i
                    });
                }
                i++;
            }
            pages.push({
                type: 'last',
                number: numPages,
                active: currentPage !== numPages,
                current: currentPage === numPages
            });
            pages.push({
                type: 'next',
                number: Math.min(numPages, currentPage + 1),
                active: currentPage < numPages
            });
        }
        return pages;
    };
    ;
    PaginationComponent.prototype.onSizeChange = function (event) {
        if (event.value == this.pageSize) {
            return;
        }
        else {
            this.pageSize = event.value;
            this.pagingParams.pageSize = this.pageSize;
        }
        //Refresh pager with page number based on config.
        if (this.config.pageNumberWhenPageSizeChange && this.config.pageNumberWhenPageSizeChange != -1) {
            this.pageNumber = this.config.pageNumberWhenPageSizeChange;
            this.pagingParams.pageNumber = this.pageNumber;
        }
        this.pagingParams.changeType = 3 /* pageSize */;
        //Call tableMainDirective to set pagingParams before data loading.
        this.messageService.broadcast('tableMain_setPagingParamsBeforeData', this.pagingParams);
        //Emit event for refresh data and pager.
        this.pageChanged.emit();
    };
    //Called from parent via service.
    PaginationComponent.prototype.setPagerForSizeChange = function () {
        //In case changing pageSize from small to large and data items can only fit page 1.
        if (this.totalItems <= this.pagingParams.pageSize && this.pagingParams.pageNumber != 1) {
            this.pagingParams.pageNumber = 1;
        }
        else if (this.pagingParams.pageNumber > this.totalPages) {
            //Set to last page if pageNumber is out of range.
            this.pagingParams.pageNumber = this.totalPages;
        }
        this.selectPage(this.pagingParams.pageNumber);
    };
    PaginationComponent.prototype.setStartItemNumber = function (pageNum) {
        if (pageNum === void 0) { pageNum = undefined; }
        var currentPageNum = pageNum != undefined ? pageNum : this.pageNumber;
        this.startItemNumber = (currentPageNum - 1) * this.pageSize + 1;
    };
    PaginationComponent.prototype.setEndItemNumber = function (pagedCount) {
        if (pagedCount === void 0) { pagedCount = undefined; }
        var currentLength = pagedCount != undefined ? pagedCount : this.pagedLength;
        this.endItemNumber = this.startItemNumber + currentLength - 1;
    };
    var _a, _b;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PaginationComponent.prototype, "pagingParams", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], PaginationComponent.prototype, "totalItems", null);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PaginationComponent.prototype, "pagedLength", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], PaginationComponent.prototype, "numPages", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], PaginationComponent.prototype, "pageChanged", void 0);
    PaginationComponent = __decorate([
        Component({
            moduleId: module.id.toString(),
            selector: 'pagination',
            templateUrl: "./pagination.component.html",
            styleUrls: ["./pagination.component.css"]
        }),
        __metadata("design:paramtypes", [NgExTableConfig, MessageTransferService])
    ], PaginationComponent);
    return PaginationComponent;
}());
export { PaginationComponent };
//# sourceMappingURL=pagination.component.js.map