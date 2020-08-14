var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Injector } from "@angular/core";
import { DialogService } from "./dialog.service";
import { BasicDialogComponent } from "./basic-dialog.component";
var ExDialog = /** @class */ (function () {
    function ExDialog(injector, dialogService) {
        this.dialogService = dialogService;
    }
    ExDialog.prototype.openMessage = function (param, title, icon) {
        var params = this.getParams(param, title, icon);
        params.basicType = "message";
        this.dialogService.addDialog(BasicDialogComponent, params);
    };
    ExDialog.prototype.openConfirm = function (param, title, icon) {
        var params = this.getParams(param, title, icon);
        params.basicType = "confirm";
        return this.dialogService.addDialog(BasicDialogComponent, params);
    };
    ExDialog.prototype.getParams = function (param, title, icon) {
        var params = {};
        if (param && typeof param === "string") {
            //Sigle line inputs.
            params.message = param;
            if (title != undefined && title != "")
                params.title = title;
            if (icon != undefined && icon != "")
                params.icon = icon;
        }
        else if (param && typeof param === "object") {
            params = param;
        }
        return params;
    };
    //Open custom or data dialog by passing custom dialog component and parameters.
    ExDialog.prototype.openPrime = function (component, params) {
        params.basicType = "prime";
        return this.dialogService.addDialog(component, params);
    };
    //Allow external call to get dialog components.
    ExDialog.prototype.getDialogArray = function () {
        return this.dialogService.dialogs;
    };
    //Allow external call to close dialogs.
    //clearAllDialogs(dialogComponent: DialogComponent) {
    //    this.dialogService.removeDialog(dialogComponent, true)
    //} 
    ExDialog.prototype.clearAllDialogs = function () {
        this.dialogService.removeDialog(undefined, true);
    };
    //Externally knowing existence of any open dialog.
    ExDialog.prototype.hasOpenDialog = function () {
        if (document.querySelector('.dialog-main')) {
            return true;
        }
        else {
            return false;
        }
    };
    var _a;
    ExDialog = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof Injector !== "undefined" && Injector) === "function" ? _a : Object, DialogService])
    ], ExDialog);
    return ExDialog;
}());
export { ExDialog };
//# sourceMappingURL=ex-dialog.service.js.map