var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from "@angular/core";
import { DialogMainComponent } from "./dialog-main.component";
var DialogHostComponent = /** @class */ (function () {
    function DialogHostComponent(resolver) {
        this.resolver = resolver;
        //Array to hold multiple dialogs.
        this.dialogs = [];
    }
    /**
    * Adds dialog
    * @return {Observable<any>}
    */
    DialogHostComponent.prototype.addDialog = function (component, data, index) {
        var factory = this.resolver.resolveComponentFactory(DialogMainComponent);
        var componentRef = this.element.createComponent(factory, index);
        var dialogMain = componentRef.instance;
        var _component = dialogMain.addComponent(component);
        if (typeof (index) !== "undefined") {
            this.dialogs.splice(index, 0, _component);
        }
        else {
            this.dialogs.push(_component);
        }
        setTimeout(function () {
            dialogMain.show();
        });
        return _component.fillData(data);
    };
    //Removes open dialog.    
    DialogHostComponent.prototype.removeDialog = function (component, closeDelay) {
        var _this = this;
        var pThis = this;
        var delayMs = closeDelay == undefined ? component.closeDelay : closeDelay;
        //No visible delay if no animaion fade in.
        if (!component.animation)
            delayMs = 5;
        //For animation fade-out.
        component.dialogMain.hide();
        //Check and preform callback for dialogs without result value - mostly custom dialogs.
        if (component.result == undefined) {
            var callBackResult = void 0;
            if (component.beforeCloseCallback && typeof component.beforeCloseCallback === "function") {
                callBackResult = component.beforeCloseCallback.call(component);
            }
            else if (component.beforeActionCallback && typeof component.beforeActionCallback === "function") {
                callBackResult = component.beforeActionCallback.call(component);
            }
            else {
                //Close dialog without callback.
                this.removeDialogNow(component, delayMs);
                return;
            }
            //Callback function return supports either boolean value or Observable object.
            if (callBackResult !== undefined && callBackResult == true) {
                this.removeDialogNow(component, delayMs);
            }
            else if (callBackResult && typeof callBackResult === "object") {
                callBackResult.subscribe(function (result) {
                    if (result) {
                        _this.removeDialogNow(component, delayMs);
                    }
                });
            }
        }
        else {
            this.removeDialogNow(component, delayMs);
        }
    };
    DialogHostComponent.prototype.removeDialogNow = function (component, delayMs) {
        var pThis = this;
        setTimeout(function () {
            var index = pThis.dialogs.indexOf(component);
            if (index > -1) {
                pThis.element.remove(index);
                pThis.dialogs.splice(index, 1);
            }
        }, delayMs);
    };
    //Remove open dialog and its immediate parent dialog.
    DialogHostComponent.prototype.removeDialogAndParent = function (component) {
        var pThis = this;
        var dialogIndex = this.dialogs.indexOf(component);
        this.dialogs.forEach(function (value, index) {
            if (index == dialogIndex || index == dialogIndex - 1) {
                pThis.removeDialog(value, pThis.getCloseDelayForParent(value, index));
            }
        });
    };
    //Removes all multiple opened dialogs.    
    DialogHostComponent.prototype.removeAllDialogs = function () {
        var pThis = this;
        this.dialogs.forEach(function (value, index) {
            pThis.removeDialog(value, pThis.getCloseDelayForParent(value, index));
        });
    };
    //Get close delay milliseconds for parent dialog with reduced time.
    DialogHostComponent.prototype.getCloseDelayForParent = function (component, index) {
        var closeDelayParent;
        if (index < this.dialogs.length - 1) {
            closeDelayParent = component.closeDelay == undefined ? component.closeDelayParent : component.closeDelay;
        }
        else {
            closeDelayParent = component.closeDelay;
        }
        return closeDelayParent;
    };
    var _a, _b;
    __decorate([
        ViewChild("element", { static: true, read: ViewContainerRef }),
        __metadata("design:type", typeof (_a = typeof ViewContainerRef !== "undefined" && ViewContainerRef) === "function" ? _a : Object)
    ], DialogHostComponent.prototype, "element", void 0);
    DialogHostComponent = __decorate([
        Component({
            selector: "dialog-host",
            template: "<template #element></template>"
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof ComponentFactoryResolver !== "undefined" && ComponentFactoryResolver) === "function" ? _b : Object])
    ], DialogHostComponent);
    return DialogHostComponent;
}());
export { DialogHostComponent };
//# sourceMappingURL=dialog-host.component.js.map