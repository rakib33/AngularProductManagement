var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { NgExTableConfig } from './ngex-table.config';
import * as commonMethods from './common-methods';
var ClientPaginationService = /** @class */ (function () {
    //initSortList: Array<SortItem>; 
    function ClientPaginationService(ngExTableConfig) {
        this.config = ngExTableConfig.main;
    }
    ClientPaginationService.prototype.processData = function (pagingParams, dataList) {
        var sortedData;
        var dataListClone;
        //Keep passed dataList unchanged after sorting.
        dataListClone = commonMethods.deepClone(dataList);
        //Get sortList from column-sort.component html template if specified there.
        var output = {
            pagingParams: {
                pageSize: pagingParams.pageSize,
                pageNumber: pagingParams.pageNumber,
                sortList: pagingParams.sortList,
                changeType: pagingParams.changeType
            },
            dataList: []
        };
        if (pagingParams) {
            //single sort.
            if (pagingParams.sortList.length == 0) {
                //Initial.
                sortedData = dataList;
            }
            else if (pagingParams.sortList.length > 0) {
                sortedData = this.changeSort(pagingParams, dataListClone);
            }
            output = this.getPagedData(pagingParams, sortedData);
            //Return refreshed pagingParams.
            output.pagingParams.sortList = pagingParams.sortList;
            return output;
        }
    };
    //Sorting logic.
    ClientPaginationService.prototype.changeSort = function (pagingParams, data) {
        var pThis = this;
        var rtnArr = data.sort(function (previous, current) {
            //Sort firstly-available column with different comparison items along the sortList.
            var idx = 0;
            while (idx < pagingParams.sortList.length) {
                if (current[pagingParams.sortList[idx].sortBy] !== previous[pagingParams.sortList[idx].sortBy]) {
                    return pThis.doSort(previous, current, pagingParams.sortList, idx);
                }
                idx++;
            }
            return 0;
        });
        return rtnArr;
    };
    ClientPaginationService.prototype.doSort = function (previous, current, sortList, idx) {
        //Null is sorted to the last for both asc and desc.
        if (previous[sortList[idx].sortBy] === null) {
            return 1;
        }
        else if (current[sortList[idx].sortBy] === null) {
            return -1;
        }
        else if (previous[sortList[idx].sortBy] > current[sortList[idx].sortBy]) {
            return sortList[idx].sortDirection === 'desc' ? -1 : 1;
        }
        else if (previous[sortList[idx].sortBy] < current[sortList[idx].sortBy]) {
            return sortList[idx].sortDirection === 'asc' ? -1 : 1;
        }
        return 0;
    };
    ClientPaginationService.prototype.getPagedData = function (pagingParams, sortedData) {
        var pagedData;
        var output = {
            pagingParams: {
                pageSize: pagingParams.pageSize,
                pageNumber: pagingParams.pageNumber,
                sortList: pagingParams.sortList,
                changeType: pagingParams.changeType
            },
            dataList: []
        };
        if (!sortedData) {
            return output;
        }
        if (pagingParams && pagingParams.pageNumber && pagingParams.pageSize) {
            //Handle pageNumber no available for data length.
            var allowedPageNumber = Math.ceil(sortedData.length / pagingParams.pageSize);
            if (allowedPageNumber < pagingParams.pageNumber) {
                pagingParams.pageNumber = allowedPageNumber;
            }
            var start = (pagingParams.pageNumber - 1) * pagingParams.pageSize;
            var end = pagingParams.pageSize > -1 ? (start + pagingParams.pageSize) : sortedData.length;
            output.dataList = sortedData.slice(start, end);
            //Return refreshed pagingParams.
            output.pagingParams.pageNumber = pagingParams.pageNumber;
            output.pagingParams.pageSize = pagingParams.pageSize;
        }
        else {
            output.dataList = sortedData;
        }
        return output;
    };
    ClientPaginationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [NgExTableConfig])
    ], ClientPaginationService);
    return ClientPaginationService;
}());
export { ClientPaginationService };
//# sourceMappingURL=client-pagination.service.js.map