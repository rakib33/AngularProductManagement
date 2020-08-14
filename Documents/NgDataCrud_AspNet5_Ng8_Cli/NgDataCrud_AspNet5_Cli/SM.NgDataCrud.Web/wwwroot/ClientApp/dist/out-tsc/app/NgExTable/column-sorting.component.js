var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef, Input, Renderer2 } from '@angular/core';
import { TableMainDirective } from './table-main.directive';
import { NgExTableConfig } from './ngex-table.config';
import * as commonMethods from './common-methods';
var ColumnSortingComponent = /** @class */ (function () {
    function ColumnSortingComponent(ngExTableConfig, tableMainDirective, renderer) {
        this.ngExTableConfig = ngExTableConfig;
        this.tableMainDirective = tableMainDirective;
        this.renderer = renderer;
        this.sequenceOptions = [];
        this.sequenceSelected = {};
        this.showSequenceOption = false;
        var pThis = this;
        //Method called from TableMainDirective to reset sorting UI.
        this.tableMainDirective.columnSortComponent$.subscribe(function (params) {
            if (params.name == 'refreshSortingIcon') {
                pThis.refreshSortingIcon();
            }
            else if (params.name == 'refreshSequenceSelected') {
                pThis.refreshSequenceSelected();
            }
        });
    }
    ColumnSortingComponent.prototype.ngOnInit = function () {
        this.config = this.ngExTableConfig.main;
        if (this.config.toggleWithOriginalDataOrder !== undefined) {
            this.toggleWithOriginalDataOrder = this.config.toggleWithOriginalDataOrder;
        }
        //Set sorting icon styles.
        this.renderer.addClass(this.sortIcon.nativeElement, this.config.sortingIconCssLib);
        this.renderer.setStyle(this.sortIcon.nativeElement, 'color', this.config.sortingIconColor);
        if (this.config.sortingIconLocation == 'column-right') {
            this.renderer.addClass(this.sortIcon.nativeElement, 'float-pad-right');
        }
        //Populate sortableItem and add sortable column to sortableList in parent.
        this.sortableItem = {
            sortBy: this.sortBy,
            sortDirection: this.sortDirection || '',
            sequence: this.sequence || -1
        };
        if (this.tableMainDirective.sortingOption == 'single' && this.sortableItem.sortDirection != '' && this.sortableItem.sequence == undefined) {
            this.sortableItem.sequence == 1;
        }
        this.tableMainDirective.initSortableList(this.sortableItem);
    };
    ColumnSortingComponent.prototype.ngOnChanges = function (changes) {
    };
    ColumnSortingComponent.prototype.toggleSort = function (obj, $event) {
        var _this = this;
        var pThis = this;
        if (this.tableMainDirective.sortingRunMode == 1 && this.tableMainDirective.sortingTypeSwitch == 1 &&
            ($event.ctrlKey || $event.shiftKey) && !this.tableMainDirective.baseSequenceOptions.find(function (a) { return a.value > 1; })) {
            if (this.tableMainDirective.sortingOption == 'single') {
                //Switch to multiple mode.
                this.tableMainDirective.sortingOption = 'multiple';
            }
        }
        switch (this.sortableItem.sortDirection) {
            case 'asc':
                this.sortableItem.sortDirection = 'desc';
                break;
            case 'desc':
                //Toggle for "no-sort" status is not needed for multi-column sorting if > 1 columns are selected. 
                if (this.tableMainDirective.sortingOption == 'multiple' && this.sequenceOptions.find(function (a) { return a.value > 1; })) {
                    this.sortableItem.sortDirection = 'asc';
                }
                else {
                    this.sortableItem.sortDirection = this.toggleWithOriginalDataOrder ? '' : 'asc';
                }
                break;
            default:
                //Existing sortDirection is ''.
                this.sortableItem.sortDirection = 'asc';
                break;
        }
        if (this.tableMainDirective.sortingOption == 'single') {
            //For single column sorting - set sequence for this item and remove sequence values for all othsers.
            this.tableMainDirective.sortableList.forEach(function (item, index) {
                if (item === pThis.sortableItem) {
                    //This ColumnSortComponent item.
                    if (_this.sortableItem.sortDirection != '') {
                        item.sequence = 1;
                    }
                    else {
                        item.sequence = -1;
                    }
                }
                else {
                    //Other ColumnSortComponent items.
                    item.sequence = -1;
                }
            });
        }
        else if (this.tableMainDirective.sortingOption == 'multiple') {
            if (this.sortableItem.sortDirection == '') {
                //Condition changes from sorting to no sorting.
                if (this.sortableItem.sequence != -1) {
                    var oldSeq = this.sortableItem.sequence;
                    this.sortableItem.sequence = -1;
                    //Call to re-arrange sequence numbers. 
                    this.tableMainDirective.rearrangeSequence(oldSeq, this.sortableItem.sequence, this.sortBy);
                }
            }
            else {
                //Auto check and set sequence num, if not already set, for this item.
                if (this.sortableItem.sequence == -1) {
                    this.sortableItem.sequence = this.tableMainDirective.pagingParams.sortList.length + 1;
                }
            }
        }
        //Call TableMainDirective and then back call each ColumnSortComponent to reset sorting settings if changed.
        this.tableMainDirective.refreshSortSettings();
        //Refresh pagingParams.sortList and open multiSortCommand panel.
        this.tableMainDirective.sortChanged(1 /* column */);
    };
    ColumnSortingComponent.prototype.onSequenceChange = function (event) {
        //Click dropdown and can only select "x" (close) or switch sequence number used by other columns. 
        if (event.value == this.sortableItem.sequence) {
            return;
        }
        else {
            var oldSeq = this.sortableItem.sequence;
            this.sortableItem.sequence = event.value;
            //Call to re-arrange sequence numbers. 
            this.tableMainDirective.rearrangeSequence(oldSeq, this.sortableItem.sequence, this.sortBy);
            //Call TableMainDirective and then back call each ColumnSortComponent to reset sorting settings if changed.
            this.tableMainDirective.refreshSortSettings();
            //Refresh pagingParams.sortList and open multiSortCommand panel.
            this.tableMainDirective.sortChanged(1 /* column */);
        }
    };
    ColumnSortingComponent.prototype.refreshSortingIcon = function () {
        //For both single and multiple column sorting.
        if (this.sortableItem.sequence == -1) {
            this.sortableItem.sortDirection = '';
        }
        if (this.sortableItem.sortDirection == '') {
            this.renderer.removeClass(this.sortIcon.nativeElement, this.config.sortingAscIcon);
            this.renderer.removeClass(this.sortIcon.nativeElement, this.config.sortingDescIcon);
            this.renderer.addClass(this.sortIcon.nativeElement, this.config.sortingBaseIcon);
        }
        else if (this.sortableItem.sortDirection == 'asc') {
            this.renderer.removeClass(this.sortIcon.nativeElement, this.config.sortingBaseIcon);
            this.renderer.removeClass(this.sortIcon.nativeElement, this.config.sortingDescIcon);
            this.renderer.addClass(this.sortIcon.nativeElement, this.config.sortingAscIcon);
        }
        else if (this.sortableItem.sortDirection == 'desc') {
            this.renderer.removeClass(this.sortIcon.nativeElement, this.config.sortingBaseIcon);
            this.renderer.removeClass(this.sortIcon.nativeElement, this.config.sortingAscIcon);
            this.renderer.addClass(this.sortIcon.nativeElement, this.config.sortingDescIcon);
        }
    };
    ColumnSortingComponent.prototype.refreshSequenceSelected = function () {
        if (this.tableMainDirective.sortingOption == 'single') {
            this.showSequenceOption = false;
        }
        else if (this.tableMainDirective.sortingOption == 'multiple') {
            //Refreshing sequenceSelected.
            if (this.sortableItem.sequence != -1) { // && this.sortableItem.sequence != this.sequenceSelected.value) {
                //Load current sequenceOptions dropdown.
                this.sequenceOptions = commonMethods.deepClone(this.tableMainDirective.baseSequenceOptions);
                for (var idx = 0; idx < this.sequenceOptions.length; idx++) {
                    if (this.sequenceOptions[idx].value == this.sortableItem.sequence) {
                        this.sequenceSelected = this.sequenceOptions[idx];
                        //Hide sequence if only one sorted column.
                        if (this.sequenceOptions.find(function (a) { return a.value > 1; })) {
                            this.showSequenceOption = true;
                        }
                        else {
                            this.showSequenceOption = false;
                            //Switch to single column sorting for ctrl-key type.
                            if (this.tableMainDirective.sortingRunMode == 1 && this.tableMainDirective.sortingTypeSwitch == 1) {
                                this.tableMainDirective.sortingOption = 'single';
                                this.tableMainDirective.setShowMultiSortPanelFlag(false);
                            }
                        }
                        break;
                    }
                }
            }
            else { //if (this.sortableItem.sequence == -1 && this.sequenceOptions) {
                if (this.sequenceOptions && this.sequenceOptions.length > 1) {
                    this.sequenceOptions.length = 1;
                }
                this.showSequenceOption = false;
            }
        }
    };
    var _a, _b, _c, _d;
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ColumnSortingComponent.prototype, "sortBy", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ColumnSortingComponent.prototype, "sortDirection", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ColumnSortingComponent.prototype, "sequence", void 0);
    __decorate([
        ViewChild('sortIcon', { static: true }),
        __metadata("design:type", typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object)
    ], ColumnSortingComponent.prototype, "sortIcon", void 0);
    __decorate([
        ViewChild('sequenceDiv', { static: false }),
        __metadata("design:type", typeof (_b = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _b : Object)
    ], ColumnSortingComponent.prototype, "sequenceDiv", void 0);
    __decorate([
        ViewChild('sequenceSelect', { static: false }),
        __metadata("design:type", typeof (_c = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _c : Object)
    ], ColumnSortingComponent.prototype, "sequenceSelect", void 0);
    ColumnSortingComponent = __decorate([
        Component({
            moduleId: module.id.toString(),
            selector: 'column-sort',
            templateUrl: './column-sorting.component.html',
            styleUrls: ['./column-sorting.component.css']
        }),
        __metadata("design:paramtypes", [NgExTableConfig, TableMainDirective, typeof (_d = typeof Renderer2 !== "undefined" && Renderer2) === "function" ? _d : Object])
    ], ColumnSortingComponent);
    return ColumnSortingComponent;
}());
export { ColumnSortingComponent };
//# sourceMappingURL=column-sorting.component.js.map