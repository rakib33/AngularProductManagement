var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector } from "@angular/core";
import { DialogHostComponent } from "./dialog-host.component";
var DialogService = /** @class */ (function () {
    function DialogService(resolver, applicationRef, injector) {
        this.resolver = resolver;
        this.applicationRef = applicationRef;
        this.injector = injector;
    }
    /**
    * Adds dialog.
    * @return {Observable<any>}
    */
    DialogService.prototype.addDialog = function (component, data, index) {
        //Create an instance of dialogMainComponent if not exist.
        if (!this.dialogHostComponent) {
            this.dialogHostComponent = this.createDialogHost();
        }
        //Populate dialogs array for access by service caller.
        this.dialogs = this.dialogHostComponent.dialogs;
        return this.dialogHostComponent.addDialog(component, data, index);
    };
    //Hides and removes dialog from DOM    
    DialogService.prototype.removeDialog = function (component, clearAll) {
        if (clearAll === void 0) { clearAll = false; }
        if (!this.dialogHostComponent) {
            return;
        }
        //Close all dialogs if clearAll flag is passed.
        if (clearAll) {
            this.dialogHostComponent.removeAllDialogs();
        }
        //Closing all dialogs.
        else if (component.closeAllDialogs) {
            this.dialogHostComponent.removeAllDialogs();
        }
        else if (component.closeImmediateParent) {
            this.dialogHostComponent.removeDialogAndParent(component);
        }
        else {
            this.dialogHostComponent.removeDialog(component);
        }
    };
    /**
    * Creates and add to DOM top-level dialog host component
    * @return {DialogHostComponent}
    */
    DialogService.prototype.createDialogHost = function () {
        var _this = this;
        var componentFactory = this.resolver.resolveComponentFactory(DialogHostComponent);
        var componentRef = componentFactory.create(this.injector);
        var componentRootNode = componentRef.hostView.rootNodes[0];
        //SW 1/14/2018 Change for Angular 5
        //let componentRootViewConainer = this.applicationRef["_rootComponents"][0]; //Angular 4
        var componentRootViewConainer = this.applicationRef["components"][0];
        var rootLocation = componentRootViewConainer.hostView.rootNodes[0];
        this.applicationRef.attachView(componentRef.hostView);
        componentRef.onDestroy(function () {
            _this.applicationRef.detachView(componentRef.hostView);
        });
        rootLocation.appendChild(componentRootNode);
        return componentRef.instance;
    };
    var _a, _b, _c;
    DialogService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof ComponentFactoryResolver !== "undefined" && ComponentFactoryResolver) === "function" ? _a : Object, typeof (_b = typeof ApplicationRef !== "undefined" && ApplicationRef) === "function" ? _b : Object, typeof (_c = typeof Injector !== "undefined" && Injector) === "function" ? _c : Object])
    ], DialogService);
    return DialogService;
}());
export { DialogService };
//# sourceMappingURL=dialog.service.js.map