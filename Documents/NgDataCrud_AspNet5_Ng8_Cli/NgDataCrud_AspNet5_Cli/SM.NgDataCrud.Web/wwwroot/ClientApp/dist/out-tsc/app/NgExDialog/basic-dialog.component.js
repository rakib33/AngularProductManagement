var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//SW: added new base component.
import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { DialogComponent } from "./dialog.component";
import { DialogService } from "./dialog.service";
var BasicDialogComponent = /** @class */ (function (_super) {
    __extends(BasicDialogComponent, _super);
    function BasicDialogComponent(dialogService, renderer) {
        var _this = _super.call(this, dialogService) || this;
        _this.renderer = renderer;
        return _this;
    }
    BasicDialogComponent.prototype.ngAfterViewInit = function () {
        if (this.dialogAddClass != undefined && this.dialogAddClass != "")
            this.renderer.setElementClass(this.dialogElem.nativeElement, this.dialogAddClass, true);
        if (this.headerAddClass != undefined && this.headerAddClass != "")
            this.renderer.setElementClass(this.headerElem.nativeElement, this.headerAddClass, true);
        if (this.titleAddClass != undefined && this.titleAddClass != "")
            this.renderer.setElementClass(this.titleElem.nativeElement, this.titleAddClass, true);
        if (this.bodyAddClass != undefined && this.bodyAddClass != "")
            this.renderer.setElementClass(this.bodyElem.nativeElement, this.bodyAddClass, true);
        if (this.messageAddClass != undefined && this.messageAddClass != "")
            this.renderer.setElementClass(this.messageElem.nativeElement, this.messageAddClass, true);
        if (this.footerAddClass != undefined && this.footerAddClass != "")
            this.renderer.setElementClass(this.footerElem.nativeElement, this.footerAddClass, true);
        if (this.actionButtonAddClass != undefined && this.actionButtonAddClass != "")
            this.renderer.setElementClass(this.actionButtonElem.nativeElement, this.actionButtonAddClass, true);
        if (this.closeButtonAddClass != undefined && this.closeButtonAddClass != "")
            this.renderer.setElementClass(this.closeButtonElem.nativeElement, this.closeButtonAddClass, true);
    };
    BasicDialogComponent.prototype.action = function () {
        this.result = true;
        this.dialogResult();
    };
    BasicDialogComponent.prototype.close = function () {
        this.result = false;
        this.dialogResult();
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    __decorate([
        ViewChild("dialogElem", { static: true }),
        __metadata("design:type", typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object)
    ], BasicDialogComponent.prototype, "dialogElem", void 0);
    __decorate([
        ViewChild("headerElem", { static: true }),
        __metadata("design:type", typeof (_b = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _b : Object)
    ], BasicDialogComponent.prototype, "headerElem", void 0);
    __decorate([
        ViewChild("titleElem", { static: true }),
        __metadata("design:type", typeof (_c = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _c : Object)
    ], BasicDialogComponent.prototype, "titleElem", void 0);
    __decorate([
        ViewChild("bodyElem", { static: true }),
        __metadata("design:type", typeof (_d = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _d : Object)
    ], BasicDialogComponent.prototype, "bodyElem", void 0);
    __decorate([
        ViewChild("messageElem", { static: true }),
        __metadata("design:type", typeof (_e = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _e : Object)
    ], BasicDialogComponent.prototype, "messageElem", void 0);
    __decorate([
        ViewChild("footerElem", { static: true }),
        __metadata("design:type", typeof (_f = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _f : Object)
    ], BasicDialogComponent.prototype, "footerElem", void 0);
    __decorate([
        ViewChild("actionButtonElem", { static: true }),
        __metadata("design:type", typeof (_g = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _g : Object)
    ], BasicDialogComponent.prototype, "actionButtonElem", void 0);
    __decorate([
        ViewChild("closeButtonElem", { static: true }),
        __metadata("design:type", typeof (_h = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _h : Object)
    ], BasicDialogComponent.prototype, "closeButtonElem", void 0);
    BasicDialogComponent = __decorate([
        Component({
            moduleId: module.id.toString(),
            selector: 'basic-dialog',
            templateUrl: "./basic-dialog.component.html",
            styleUrls: ["./basic-dialog.component.css"]
        }),
        __metadata("design:paramtypes", [DialogService, typeof (_j = typeof Renderer !== "undefined" && Renderer) === "function" ? _j : Object])
    ], BasicDialogComponent);
    return BasicDialogComponent;
}(DialogComponent));
export { BasicDialogComponent };
//# sourceMappingURL=basic-dialog.component.js.map