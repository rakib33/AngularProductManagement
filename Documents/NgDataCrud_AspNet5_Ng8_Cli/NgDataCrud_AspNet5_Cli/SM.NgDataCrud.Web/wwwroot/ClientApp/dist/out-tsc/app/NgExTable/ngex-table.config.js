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
var NgExTableConfig = /** @class */ (function () {
    function NgExTableConfig() {
        //Base settings.
        this.base = {
            pageSize: 10,
            toggleWithOriginalDataOrder: false,
            previousText: '&laquo;',
            nextText: '&raquo;',
            paginationMaxBlocks: 5,
            paginationMinBlocks: 2,
            pageNumberWhenPageSizeChange: 1,
            //pageNumberWhenPageSizeChange: -1, //use current.
            pageNumberWhenSortingChange: 1,
            //pageNumberWhenSortingChange: -1, //use current.
            sortingWhenPageSizeChange: '',
            //sortingWhenPageSizeChange: 'current', //use current sorting. 
            sortingIconCssLib: 'fa',
            sortingAscIcon: 'fa-chevron-up',
            sortingDescIcon: 'fa-chevron-down',
            //sortingAscIcon: 'fa-caret-up',
            //sortingDescIcon: 'fa-caret-down',
            //sortingAscIcon: 'fa-sort-asc',
            //sortingDescIcon: 'fa-sort-desc',
            sortingBaseIcon: 'fa-sort',
            sortingIconColor: '#c5c5c5'
            //sortingIconColor: '#999999'
        };
        this._appConfig = {};
        this.pageSizeListBase = [
            { value: 5, text: '5' },
            { value: 10, text: '10' },
            { value: 25, text: '25' },
            { value: 50, text: '50' },
            { value: 100, text: '100' },
            { value: -1, text: 'both' }
        ];
        this._appPageSizeList = [];
        this.main = this.base;
        this.pageSizeList = this.pageSizeListBase;
    }
    Object.defineProperty(NgExTableConfig.prototype, "appConfig", {
        get: function () {
            return this._appConfig;
        },
        set: function (v) {
            this._appConfig = v;
            this.main = Object.keys(this._appConfig).length ? Object.assign(this.base, this._appConfig) : this.base;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgExTableConfig.prototype, "appPageSizeList", {
        get: function () {
            return this._appPageSizeList;
        },
        set: function (v) {
            this._appPageSizeList = v;
            this.pageSizeList = Object.keys(this._appPageSizeList).length ? Object.assign(this.pageSizeListBase, this._appPageSizeList) : this.pageSizeListBase;
        },
        enumerable: true,
        configurable: true
    });
    NgExTableConfig = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], NgExTableConfig);
    return NgExTableConfig;
}());
export { NgExTableConfig };
//# sourceMappingURL=ngex-table.config.js.map