var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter, Renderer2 } from '@angular/core';
import { NgExTableConfig } from './ngex-table.config';
import { TableMainDirective } from './table-main.directive';
var OptionsComponent = /** @class */ (function () {
    function OptionsComponent(ngExTableConfig, tableMainDirective, renderer) {
        this.ngExTableConfig = ngExTableConfig;
        this.tableMainDirective = tableMainDirective;
        this.renderer = renderer;
        this.optionChanged = new EventEmitter();
    }
    OptionsComponent.prototype.ngOnInit = function () {
        this.config = this.ngExTableConfig.main;
        this.enableOptionBoard = this.tableMainDirective.enableOptionBoard == 'yes' ? true : false;
        this.showOptionBoardContent = this.tableMainDirective.showOptionBoardContent == 'yes' ? true : false;
        if (this.tableMainDirective.sortingRunMode == 1) {
            if (this.tableMainDirective.sortingTypeSwitch == 0) {
                this.showSortingOptions = true;
            }
            else {
                this.showSortingOptions = false;
                //Hide option board by default for crtl-key type. 
                this.showOptionBoardContent = false;
            }
            this.sortingOption = this.tableMainDirective.sortingOption;
        }
        else {
            this.showSortingOptions = false;
        }
        this.showGroupingLines = this.tableMainDirective.showGroupingLines == 'yes' ? true : false;
        this.toggleOptionLinkHint();
    };
    OptionsComponent.prototype.onSortingOptionChange = function ($event) {
        this.tableMainDirective.sortingOption = this.sortingOption;
        this.tableMainDirective.switchSortingOption();
        ////Auto close option board.
        //this.showOptionBoardContent = true;
        //this.toggleOptionLinkHint();
    };
    OptionsComponent.prototype.onShowGroupingLinesChange = function ($event) {
        if (this.showGroupingLines) {
            this.tableMainDirective.showGroupingLines = 'yes';
        }
        else {
            this.tableMainDirective.showGroupingLines = 'no';
        }
        //Reload data to grid if set row group lines.
        if (this.tableMainDirective.showGroupingLines != this.showGroupingLines_0) {
            this.showGroupingLines_0 = this.tableMainDirective.showGroupingLines;
            this.optionChanged.emit('grouping');
        }
    };
    OptionsComponent.prototype.toggleOptions = function ($event) {
        this.showOptionBoardContent = !this.showOptionBoardContent;
        this.toggleOptionLinkHint();
    };
    OptionsComponent.prototype.toggleOptionLinkHint = function () {
        if (this.showOptionBoardContent) {
            this.optionToggleHint = 'Click to show Option Board';
        }
        else {
            this.optionToggleHint = 'Click to hide Option Board';
        }
    };
    var _a, _b;
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], OptionsComponent.prototype, "optionChanged", void 0);
    OptionsComponent = __decorate([
        Component({
            moduleId: module.id.toString(),
            selector: 'options',
            templateUrl: "./options.component.html",
            styleUrls: ["./options.component.css"]
        }),
        __metadata("design:paramtypes", [NgExTableConfig, TableMainDirective, typeof (_b = typeof Renderer2 !== "undefined" && Renderer2) === "function" ? _b : Object])
    ], OptionsComponent);
    return OptionsComponent;
}());
export { OptionsComponent };
//# sourceMappingURL=options.component.js.map