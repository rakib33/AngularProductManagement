var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, EventEmitter, Input, Output, ElementRef, Renderer2 } from "@angular/core";
import { MessageTransferService } from './message-transfer.service';
import { ClientPaginationService } from './client-pagination.service';
import { NgExTableConfig } from './ngex-table.config';
import { Subject } from 'rxjs';
import * as commonMethods from './common-methods';
var TableMainDirective = /** @class */ (function () {
    function TableMainDirective(element, ngExTableConfig, clientPaginationService, messageService, renderer) {
        this.element = element;
        this.ngExTableConfig = ngExTableConfig;
        this.clientPaginationService = clientPaginationService;
        this.messageService = messageService;
        this.renderer = renderer;
        this.isFilterForInit = false;
        this.hasInitDone = false;
        //----------------------------------------------------------
        //Values here are defaults and can be overwritted from table-hosting component-level settings.    
        this.sortingRunMode = 0; //0: single column sorting only, 1: single/multiple column sorting.
        this.sortingTypeSwitch = 0; //0: dropdown selection mode, or 1: Ctrl/Shift key mode - used only for sortingRunMode = 1.
        this.sortingOption = 'multiple'; //'single' or 'multiple' - initial loading type used only for sortingRunMode = 1.    
        this.enableOptionBoard = ''; //'yes' or 'no'('' the same as 'no').
        this.showOptionBoardContent = ''; //'yes' or 'no'('' the same as 'no').
        this.showGroupingLines = ''; //yes' or 'no'('' the same as 'no').
        //----------------------------------------------------------
        this.prevSortingOption = '';
        this.sortableList = new Array();
        this.sortableListBk = [];
        this.sortableListInit = [];
        this.baseSequenceOptions = [{
                value: -1, text: 'x'
            }];
        this.tableChanged = new EventEmitter();
        //Calling components.
        this.columnSortComponent = new Subject();
        this.columnSortComponent$ = this.columnSortComponent.asObservable();
        this.multiSortCommandComponent = new Subject();
        this.multiSortCommandComponent$ = this.multiSortCommandComponent.asObservable();
    }
    TableMainDirective.prototype.ngOnInit = function () {
        this.config = this.ngExTableConfig.main;
        if (this.sortingRunMode == 1) {
            //Make sure it's single-colmn sorting type by default when setting switch is for ctrl-key.
            if (this.sortingTypeSwitch == 1) {
                this.sortingOption = 'single';
            }
        }
        else {
            this.sortingOption = 'single';
        }
        this.prevSortingOption = this.sortingOption;
        this.sortableColumnCount = this.element.nativeElement.getElementsByTagName('column-sort').length;
        var pThis = this;
        //Call from other structures via message service to set pagingParams before data loading.
        this.subscription_1 = this.messageService.subscribe('tableMain_setPagingParamsBeforeData', function (eventData) {
            pThis.setPagingParamsBeforeData();
        });
    };
    TableMainDirective.prototype.ngOnDestroy = function () {
        this.subscription_1.unsubscribe();
    };
    //ngOnChanges(changes: { [key: string]: SimpleChange }): any {
    //    let tc = changes;
    //    let te = this.pagingParams;
    //}
    //Called from each columnSortComponent.
    TableMainDirective.prototype.initSortableList = function (sortableItem) {
        //If no active sort item specified in HTML template, then check for default init settings in grid component ts.
        if (sortableItem.sequence == -1 || sortableItem.sortDirection == '') {
            if (this.pagingParams.sortList.length > 0) {
                for (var seq = 1; seq <= this.pagingParams.sortList.length; seq++) {
                    if (this.pagingParams.sortList[seq].sortBy == sortableItem.sortBy) {
                        sortableItem.sortDirection = this.pagingParams.sortList[seq].sortDirection;
                        sortableItem.sequence = seq;
                        break;
                    }
                }
            }
        }
        //In case more than one sorted columns for single sorting option.
        if (this.sortingOption == 'single' && sortableItem.sequence > 1) {
            sortableItem.sortDirection = '';
            sortableItem.sequence = -1;
        }
        this.sortableList.push(sortableItem);
        //Set all init sorting parameters when completed building sortableList.
        if (this.sortableList.length == this.sortableColumnCount) {
            //Set sequenceOptions.
            this.refreshSortSettings();
            //Transfer active sortable items to pagingParams.sortList.
            this.updatePagingParamsWithSortSettings();
            //Cache pagingParams.sortList for getting init settings when needed later.
            this.sortableListInit = commonMethods.deepClone(this.sortableList);
            //Cache for cancel action.
            this.sortableListBk = commonMethods.deepClone(this.sortableList);
            //For server-side pagination and when all init sortableItems have been loaded.
            //if (this.paginationType == PaginationType.server) {
            //    this.initDataLoadWithSorting();
            //}            
        }
    };
    TableMainDirective.prototype.initDataLoadWithSorting = function () {
        //In init phase and with isFilterForInit = false, call this method will directly load data and show the grid.
        //If filtering data for init data loading with isFilterForInit = true, then see the setPagingParamsBeforeData() method.
        if (!this.isFilterForInit) {
            this.tableChanged.emit(this.pagingParams);
            this.hasInitDone = true;
        }
    };
    TableMainDirective.prototype.refreshSortSettings = function () {
        //Reset sequence options.
        this.baseSequenceOptions.length = 1;
        if (this.sortingOption == 'multiple') {
            //type: init or column. Build sequenceOptions.
            for (var seq = 1; seq <= this.sortableList.length; seq++) {
                for (var idx = 0; idx < this.sortableList.length; idx++) {
                    if (this.sortableList[idx].sequence == seq) {
                        this.baseSequenceOptions.push({
                            value: seq, text: seq.toString()
                        });
                        break;
                    }
                }
            }
        }
        //Refresh sorting icons, both single and multiple.
        var params = {
            name: 'refreshSortingIcon',
            value: undefined
        };
        this.columnSortComponent.next(params);
        params = {
            name: 'refreshSequenceSelected',
            value: undefined
        };
        this.columnSortComponent.next(params);
    };
    TableMainDirective.prototype.updatePagingParamsWithSortSettings = function () {
        //Transfer active sortable items to pagingParams.sortList.
        this.pagingParams.sortList = [];
        for (var num = 1; num <= this.sortableList.length; num++) {
            for (var idx = 0; idx < this.sortableList.length; idx++) {
                if (this.sortableList[idx].sequence == num) {
                    var sortItem = {
                        sortBy: this.sortableList[idx].sortBy,
                        sortDirection: this.sortableList[idx].sortDirection
                    };
                    this.pagingParams.sortList.push(sortItem);
                    break;
                }
            }
            if (this.sortingOption == 'single' && num == 1) {
                break;
            }
        }
    };
    TableMainDirective.prototype.sortChanged = function (type) {
        //Call to transfer active sortable items to pagingParams.sortList.
        this.updatePagingParamsWithSortSettings();
        this.pagingParams.changeType = 4 /* sorting */;
        //Set pagingParams before data loading based on config value.
        this.setPagingParamsBeforeData();
        if (this.sortingOption == 'single') {
            //Call table consumer with updated pagingParams.
            this.tableChanged.emit();
        }
        else if (this.sortingOption == 'multiple') {
            switch (type) {
                case 1 /* column */:
                    if (this.pagingParams.sortList.length == 1) {
                        //Directly submit changes and do not show command panel.
                        this.tableChanged.emit();
                        this.setShowMultiSortPanelFlag(false);
                        //Save Bk arrays from last action for possible cancel action later.
                        this.sortableListBk = commonMethods.deepClone(this.sortableList);
                    }
                    else if (this.pagingParams.sortList.length > 1) {
                        //Call multiSortCommandComponent method to show panel which will emit tableChanged there.                
                        this.setShowMultiSortPanelFlag(true);
                    }
                    else {
                        //Close multi sort panel if no sorted column selected.
                        this.setShowMultiSortPanelFlag(false);
                    }
                    break;
                case 4 /* option */:
                    this.tableChanged.emit();
                    this.setShowMultiSortPanelFlag(false);
                    break;
                case 3 /* clearAll */:
                    this.tableChanged.emit();
                    break;
                default:
                //Do nothing, such as SortChangedType.cancel                    
            }
        }
    };
    TableMainDirective.prototype.getShowMultiSortPanelFlag = function () {
        var subjectParam = {
            name: 'getShowMultiSortPanelFlag',
            value: undefined
        };
        this.multiSortCommandComponent.next(subjectParam);
        return subjectParam.value;
    };
    TableMainDirective.prototype.setShowMultiSortPanelFlag = function (flagValue) {
        var subjectParam = {
            name: 'setShowMultiSortPanelFlag',
            value: flagValue
        };
        this.multiSortCommandComponent.next(subjectParam);
    };
    //Multipe sorting.
    TableMainDirective.prototype.rearrangeSequence = function (oldSeq, newSeq, sortBy) {
        if (oldSeq > 0 && newSeq == -1) {
            //Re-arrange sequence if any sortableItem.sequence reset to -1.
            this.sortableList.forEach(function (item, index) {
                if (item.sequence > oldSeq) {
                    item.sequence--;
                }
            });
        }
        else {
            //Change any sequence number in positive range.
            this.sortableList.forEach(function (item, index) {
                if (item.sortBy != sortBy) {
                    if (item.sequence >= newSeq && item.sequence < oldSeq) {
                        item.sequence++;
                    }
                    else if (item.sequence <= newSeq && item.sequence > oldSeq) {
                        item.sequence--;
                    }
                }
            });
        }
    };
    TableMainDirective.prototype.submitMultiSortAction = function () {
        //Send actual multi sorting command to grid page.
        this.tableChanged.emit(this.pagingParams);
        //Save Bk arrays from last action for possible cancel action later.
        this.sortableListBk = commonMethods.deepClone(this.sortableList);
    };
    TableMainDirective.prototype.cancelMultiSortAction = function () {
        var _this = this;
        //Need to assign BK object back one by one. Use deepClone will lose object reference.
        this.sortableListBk.forEach(function (item, index) {
            _this.sortableList[index].sortDirection = item.sortDirection;
            _this.sortableList[index].sequence = item.sequence;
        });
        this.refreshSortSettings();
        this.sortChanged(2 /* cancel */);
        //Reset to single type for using Ctrl/Shift key mode.
        if (this.sortingTypeSwitch == 1 && !this.baseSequenceOptions.find(function (a) { return a.sequence > 1; })) {
            this.sortingOption = 'single';
        }
    };
    TableMainDirective.prototype.clearMultiSortings = function () {
        this.sortableList.forEach(function (item, index) {
            item.sequence = -1;
            item.sortDirection = '';
        });
        this.refreshSortSettings();
        this.sortChanged(3 /* clearAll */);
        //Reset to single type for using Ctrl/Shift key mode.
        if (this.sortingTypeSwitch == 1) {
            this.sortingOption = 'single';
        }
    };
    TableMainDirective.prototype.toSingleColumnSorting_S1 = function () {
        this.sortingOption = 'single';
        this.switchSortingOption();
        //Save Bk arrays from last action for possible cancel action later.
        this.sortableListBk = commonMethods.deepClone(this.sortableList);
    };
    TableMainDirective.prototype.switchSortingOption = function () {
        if (this.sortingRunMode == 1 && this.sortingTypeSwitch == 0 && this.sortingOption == this.prevSortingOption) {
            //Do not proceed if no change is made for dropdown selection type.
            return;
        }
        if (this.sortingOption == 'single') {
            var pThis = this;
            this.sortableList.forEach(function (item, index) {
                if (item.sequence != 1) {
                    item.sequence = -1;
                    item.sortDirection = '';
                }
            });
            //Close multi sort panel if opened.
            this.setShowMultiSortPanelFlag(false);
        }
        else if (this.sortingOption == 'multiple') {
            //Set the active sortableItem.sequence to 1.
            for (var idx = 0; idx < this.sortableList.length; idx++) {
                if (this.sortableList[idx].sortDirection != '') {
                    this.sortableList[idx].sequence = 1;
                    break;
                }
            }
        }
        this.refreshSortSettings();
        this.sortChanged(4 /* option */);
        this.prevSortingOption = this.sortingOption;
    };
    TableMainDirective.prototype.undoSortSettingsAndSortList = function () {
        var _this = this;
        //Need to assign BK object back one by one. Use deepClone will lose object reference.
        this.sortableListBk.forEach(function (item, index) {
            _this.sortableList[index].sortDirection = item.sortDirection;
            _this.sortableList[index].sequence = item.sequence;
        });
        this.refreshSortSettings();
        this.updatePagingParamsWithSortSettings();
    };
    TableMainDirective.prototype.resetToInitSortList = function () {
        var _this = this;
        //Not called for init step. 
        if (this.hasInitDone) {
            this.sortableListInit.forEach(function (item, index) {
                if (_this.sortingOption == 'multiple' ||
                    (_this.sortingOption == 'single' && item.sequence == 1)) {
                    _this.sortableList[index].sortDirection = item.sortDirection;
                    _this.sortableList[index].sequence = item.sequence;
                }
                else {
                    _this.sortableList[index].sortDirection = '';
                    _this.sortableList[index].sequence = -1;
                }
            });
            this.refreshSortSettings();
            this.updatePagingParamsWithSortSettings();
        }
        else {
            this.hasInitDone = true;
        }
    };
    //Method called from table-hosting component before data retrieval.
    TableMainDirective.prototype.setPagingParamsBeforeData = function (pagingParams) {
        if (pagingParams == undefined) {
            pagingParams = this.pagingParams;
        }
        if (pagingParams.changeType == 1 /* search */) {
            //Set pageNumber based on config.
            if (this.config.pageNumberWhenSearchChange != -1) {
                pagingParams.pageNumber = this.config.pageNumberWhenSearchChange;
            }
            //Set to init sortList if not using current.
            if (this.config.sortingWhenSearchChange != "current") {
                this.resetToInitSortList();
            }
            else {
                if (this.sortingOption == 'multiple' && this.getShowMultiSortPanelFlag() == true) {
                    this.undoSortSettingsAndSortList();
                }
            }
            if (this.sortingOption == 'multiple' && this.getShowMultiSortPanelFlag() == true) {
                //Closing the multi sort panel if it's open.
                this.setShowMultiSortPanelFlag(false);
            }
        }
        else if (pagingParams.changeType == 4 /* sorting */) {
            ////For sorting change, set pageNumber based on config.
            if (this.config.pageNumberWhenSortingChange != -1) {
                pagingParams.pageNumber = this.config.pageNumberWhenSortingChange;
            }
        }
        else if (pagingParams.changeType == 3 /* pageSize */) {
            //Set to init sortList if not using current.
            if (this.config.sortingWhenPageSizeChange != "current") {
                this.resetToInitSortList();
            }
            else {
                if (this.sortingOption == 'multiple' && this.getShowMultiSortPanelFlag() == true) {
                    this.undoSortSettingsAndSortList();
                }
            }
            if (this.sortingOption == 'multiple' && this.getShowMultiSortPanelFlag() == true) {
                //Closing the multi sort panel if it's open.
                this.setShowMultiSortPanelFlag(false);
            }
        }
        else if (pagingParams.changeType == 2 /* pageNumber */) {
            //Undo sort settings and close multi sort panel if it's open.
            if (this.sortingOption == 'multiple' && this.getShowMultiSortPanelFlag() == true) {
                this.undoSortSettingsAndSortList();
                this.setShowMultiSortPanelFlag(false);
            }
        }
    };
    //Method called from table-hosting component after obtaining data. No need for TableChange.init.
    TableMainDirective.prototype.updatePagerAfterData = function (pagingParams, totalLength) {
        if (pagingParams.changeType == 1 /* search */) {
            //Data items can only fit page 1.
            if (totalLength && (totalLength <= pagingParams.pageSize && pagingParams.pageNumber != 1)) {
                pagingParams.pageNumber = 1;
            }
            //Call PaginationComponent to set changeType and run selectPage method.
            this.updatePagerForChangeType(pagingParams.changeType, pagingParams.pageNumber);
        }
        else {
            //For sorting or pageSize change, set pageNumber based on config.
            if (pagingParams.changeType == 4 /* sorting */ ||
                pagingParams.changeType == 3 /* pageSize */) {
                this.updatePagerForChangeType(pagingParams.changeType, pagingParams.pageNumber);
            }
        }
    };
    //Generic method.
    TableMainDirective.prototype.updatePagerForChangeType = function (changeType, pageNumber) {
        //Call PaginationComponent to set changeType and run selectPage method.
        var paramesToUpdatePager = {
            changeType: changeType,
            pageNumber: pageNumber
        };
        this.messageService.broadcast('tableMain_paginationComponent', paramesToUpdatePager);
    };
    TableMainDirective.prototype.setRowGroupLines = function (trHead, trItems) {
        var pThis = this;
        var sortColumnIndex = -1;
        //Remove any exist grouping line.
        trItems.changes.subscribe(function (trList) {
            trList.forEach(function (tr, index) {
                pThis.renderer.removeClass(tr.nativeElement, 'row-group-line');
            });
        });
        if (this.showGroupingLines == 'yes' && this.pagingParams.sortList.length > 0) {
            //Need conversion to true array.
            var thItems = Array.prototype.slice.call(trHead.nativeElement.childNodes);
            for (var idx = 0; idx < thItems.length; idx++) {
                if (thItems[idx].innerHTML.indexOf(this.pagingParams.sortList[0].sortBy) > 0) {
                    sortColumnIndex = idx;
                    break;
                }
            }
            trItems.changes.subscribe(function (trList) {
                //let trList = this.tableRows.nativeElement.getElementsByTagName("tr");               
                var prevInnerText = trList.first.nativeElement.childNodes[sortColumnIndex].innerText;
                var isSameCount = 1;
                trList.forEach(function (tr, index) {
                    if (index > 0 && tr.nativeElement.childNodes[sortColumnIndex].innerText != prevInnerText) {
                        pThis.renderer.addClass(tr.nativeElement, 'row-group-line');
                    }
                    prevInnerText = tr.nativeElement.childNodes[sortColumnIndex].innerText;
                });
            });
        }
    };
    var _a, _b, _c;
    __decorate([
        Input("table-main"),
        __metadata("design:type", Object)
    ], TableMainDirective.prototype, "pagingParams", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], TableMainDirective.prototype, "tableChanged", void 0);
    TableMainDirective = __decorate([
        Directive({
            selector: 'table[table-main]',
            exportAs: 'ngExTable'
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _b : Object, NgExTableConfig,
            ClientPaginationService, MessageTransferService, typeof (_c = typeof Renderer2 !== "undefined" && Renderer2) === "function" ? _c : Object])
    ], TableMainDirective);
    return TableMainDirective;
}());
export { TableMainDirective };
//# sourceMappingURL=table-main.directive.js.map