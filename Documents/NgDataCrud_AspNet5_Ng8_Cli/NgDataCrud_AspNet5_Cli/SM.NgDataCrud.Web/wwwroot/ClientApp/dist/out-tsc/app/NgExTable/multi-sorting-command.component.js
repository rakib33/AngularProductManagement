var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Renderer2 } from '@angular/core';
import { TableMainDirective } from './table-main.directive';
import { NgExTableConfig } from './ngex-table.config';
var MultiSortingCommandComponent = /** @class */ (function () {
    function MultiSortingCommandComponent(ngExTableConfig, tableMainDirective, renderer) {
        this.ngExTableConfig = ngExTableConfig;
        this.tableMainDirective = tableMainDirective;
        this.renderer = renderer;
        this.showMultiSortPanel = false;
        var pThis = this;
        //Called from TableMainDirective to open this panel.
        this.tableMainDirective.multiSortCommandComponent$.subscribe(function (subjectParam) {
            if (subjectParam.name == "setShowMultiSortPanelFlag") {
                //subjectParam.value: true or false.
                pThis.showMultiSortPanel = subjectParam.value;
            }
            else if (subjectParam.name == "getShowMultiSortPanelFlag") {
                subjectParam.value = pThis.showMultiSortPanel;
            }
        });
    }
    MultiSortingCommandComponent.prototype.ngOnInit = function () {
        this.config = this.ngExTableConfig.main;
    };
    MultiSortingCommandComponent.prototype.sortOk = function () {
        this.tableMainDirective.submitMultiSortAction();
        this.showMultiSortPanel = false;
    };
    MultiSortingCommandComponent.prototype.cancel = function () {
        this.tableMainDirective.cancelMultiSortAction();
        this.showMultiSortPanel = false;
    };
    MultiSortingCommandComponent.prototype.clear = function () {
        this.tableMainDirective.clearMultiSortings();
        this.showMultiSortPanel = false;
    };
    MultiSortingCommandComponent.prototype.toSingleColumnSorting = function () {
        //In Ctrl/Shift key mode, switch to 'single' needs to save result status for cancel operation
        //in case doing 'multiple' later so that call method in tableMainDirective to process details.
        this.tableMainDirective.toSingleColumnSorting_S1();
    };
    var _a;
    MultiSortingCommandComponent = __decorate([
        Component({
            moduleId: module.id.toString(),
            selector: 'multi-sort-command',
            templateUrl: "./multi-sorting-command.component.html",
            styleUrls: ["./multi-sorting-command.component.css"]
        }),
        __metadata("design:paramtypes", [NgExTableConfig, TableMainDirective, typeof (_a = typeof Renderer2 !== "undefined" && Renderer2) === "function" ? _a : Object])
    ], MultiSortingCommandComponent);
    return MultiSortingCommandComponent;
}());
export { MultiSortingCommandComponent };
//# sourceMappingURL=multi-sorting-command.component.js.map