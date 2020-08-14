var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { DialogService } from "./dialog.service";
var DialogComponent = /** @class */ (function () {
    function DialogComponent(dialogService) {
        this.dialogService = dialogService;
        //Set position based on cursor point if used.
        this.initElement = undefined;
        this.h_Offset = undefined;
        this.v_Offset = undefined;
        //Alternatives for IE 11 which not support scrollX and scrollY.
        this.h_event = undefined;
        this.v_event = undefined;
        //End of Set position.
        //Declared for any component-level custom setting used by TypeScript.
        //Component-level values will be passed from original callers.
        this.width = undefined;
        this.grayBackground = undefined;
        this.animation = undefined;
        this.draggable = undefined;
        this.topOffset = undefined;
        this.closeDelay = undefined;
        this.closeDelayParent = undefined;
        this.closeByClickOutside = undefined;
        this.closeByEnter = undefined;
        this.closeByEscape = undefined;
        this.closeAllDialogs = undefined;
        this.closeImmediateParent = undefined;
        this.keepOpenForAction = undefined;
        this.keepOpenForClose = undefined;
        this.beforeActionCallback = undefined;
        this.beforeCloseCallback = undefined;
        //For basic type dialogs only.
        this.title = undefined;
        this.showIcon = undefined;
        this.icon = undefined;
        this.actionButtonLabel = undefined;
        this.closeButtonLabel = undefined;
        this.dialogAddClass = undefined;
        this.headerAddClass = undefined;
        this.titleAddClass = undefined;
        this.bodyAddClass = undefined;
        this.messageAddClass = undefined;
        this.footerAddClass = undefined;
        this.actionButtonAddClass = undefined;
        this.closeButtonAddClass = undefined;
        //Basic dialog type flag (internal use). 
        //Value is set in ExDialog service and used in BasicDialogComponent and DialogMainComponent.
        this.basicType = undefined;
    }
    //Set input parameters to component properties.
    DialogComponent.prototype.fillData = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        var keys = Object.keys(data);
        for (var idx = 0, length_1 = keys.length; idx < length_1; idx++) {
            var key = keys[idx];
            this[key] = data[key];
        }
        return Observable.create(function (observer) {
            _this.observer = observer;
            return function () {
                _this.dialogResult();
            };
        });
    };
    //Conditionally close or keep opened dialog and return observer result.
    DialogComponent.prototype.dialogResult = function () {
        var _this = this;
        //Callback function for cases when this.result has value.        
        var callBackResult;
        if (this.result !== undefined) {
            if (this.result == false && this.beforeCloseCallback && typeof this.beforeCloseCallback === "function") {
                callBackResult = this.beforeCloseCallback.call(this);
            }
            else if (this.result == true && this.beforeActionCallback && typeof this.beforeActionCallback === "function") {
                callBackResult = this.beforeActionCallback.call(this);
            }
            else {
                this.closeDialog();
                return;
            }
            //Callback function can either returning boolean value or observable object.
            if (callBackResult !== undefined && callBackResult == true) {
                this.closeDialog();
            }
            else if (callBackResult && typeof callBackResult === "object") {
                callBackResult.subscribe(function (result) {
                    if (result) {
                        _this.closeDialog();
                    }
                });
            }
        }
        else {
            //Just close dialog.
            this.closeDialog();
        }
    };
    DialogComponent.prototype.closeDialog = function () {
        if (this.observer) {
            this.observer.next(this.result);
        }
        if ((this.result == true && !this.keepOpenForAction) ||
            (this.result == false && !this.keepOpenForClose) ||
            this.result == undefined) {
            this.dialogService.removeDialog(this);
        }
    };
    DialogComponent = __decorate([
        Component({
            selector: "dialog-component"
        }),
        __metadata("design:paramtypes", [DialogService])
    ], DialogComponent);
    return DialogComponent;
}());
export { DialogComponent };
//# sourceMappingURL=dialog.component.js.map