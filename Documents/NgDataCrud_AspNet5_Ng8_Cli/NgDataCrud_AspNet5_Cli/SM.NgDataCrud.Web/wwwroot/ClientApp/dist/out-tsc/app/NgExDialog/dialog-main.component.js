var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, ReflectiveInjector, HostListener, ElementRef } from "@angular/core";
import { AlignmentDirective } from "./alignment.directive";
import { NgExDialogConfig } from "./dialog-config";
var DialogMainComponent = /** @class */ (function () {
    function DialogMainComponent(resolver, ngExDialogConfig) {
        this.resolver = resolver;
        this.ngExDialogConfig = ngExDialogConfig;
        this.shown = false;
        this.dialogPaddingTop = 0;
    }
    DialogMainComponent.prototype.ngOnInit = function () {
        if (this.content.basicType == "prime") {
            this.alignmentDirective.isPrimeType = true;
        }
        //Set for start position based on cursor point if used.
        if (this.content.initElement) {
            this.alignmentDirective.setPosition = {
                initElement: this.content.initElement,
                h_Offset: this.content.h_Offset,
                v_Offset: this.content.v_Offset,
                h_event: this.content.h_event,
                v_event: this.content.v_event
            };
        }
        //Pass configured top offset value to alignmentDirective.
        this.alignmentDirective.topOffset = this.content.topOffset == undefined ? this.ngExDialogConfig.merged.topOffset : this.content.topOffset;
    };
    /**
    * Creates and add to DOM main dialog (overlay) parent component
    * @return {DialogHostComponent}
    */
    DialogMainComponent.prototype.addComponent = function (component) {
        var factory = this.resolver.resolveComponentFactory(component);
        var injector = ReflectiveInjector.fromResolvedProviders([], this.element.injector);
        var componentRef = factory.create(injector);
        this.element.insert(componentRef.hostView);
        this.content = componentRef.instance;
        this.content.dialogMain = this;
        return this.content;
    };
    DialogMainComponent.prototype.show = function () {
        this.config = this.ngExDialogConfig.merged;
        //Check and overwrite default settings by dialog-level custom configs.
        this.dialogWidth = this.content.width == undefined ? this.config.width : this.content.width;
        if (this.content.width == undefined)
            this.content.width = this.dialogWidth;
        this.isGrayBackground = this.content.grayBackground == undefined ? this.config.grayBackground : this.content.grayBackground;
        if (this.content.grayBackground == undefined)
            this.content.grayBackground = this.isGrayBackground;
        this.isAnimation = this.content.animation == undefined ? this.config.animation : this.content.animation;
        if (this.content.animation == undefined)
            this.content.animation = this.isAnimation;
        this.isDraggable = this.content.draggable == undefined ? this.config.draggable : this.content.draggable;
        if (this.content.draggable == undefined)
            this.content.draggable = this.isDraggable;
        if (this.content.closeByEnter == undefined)
            this.content.closeByEnter = this.config.closeByEnter;
        if (this.content.closeByEscape == undefined)
            this.content.closeByEscape = this.config.closeByEscape;
        if (this.content.closeByClickOutside == undefined)
            this.content.closeByClickOutside = this.config.closeByClickOutside;
        if (this.content.closeAllDialogs == undefined)
            this.content.closeAllDialogs = this.config.closeAllDialogs;
        if (this.content.closeImmediateParent == undefined)
            this.content.closeImmediateParent = this.config.closeImmediateParent;
        if (this.content.keepOpenForAction == undefined)
            this.content.keepOpenForAction = this.config.keepOpenForAction;
        if (this.content.keepOpenForClose == undefined)
            this.content.keepOpenForClose = this.config.keepOpenForClose;
        if (this.content.closeDelay == undefined)
            this.content.closeDelay = this.config.closeDelay;
        if (this.content.closeDelayParent == undefined)
            this.content.closeDelayParent = this.config.closeDelayParent;
        //For basic type dialogs only.
        if (this.content.showIcon == undefined && !this.content.showIcon)
            this.content.showIcon = this.config.showIcon;
        if (this.content.basicType == "message") {
            if (this.content.title == undefined)
                this.content.title = this.config.messageTitle;
            if (this.content.showIcon)
                if (this.content.icon == undefined || this.content.icon == "")
                    this.content.icon = this.config.messageIcon;
            if (this.content.closeButtonLabel == undefined || this.content.closeButtonLabel == "") {
                this.content.closeButtonLabel = this.config.messageCloseButtonLabel;
                //Use action button pattern if no value for closeButtonLabel.
                if ((this.content.closeButtonLabel == undefined || this.content.closeButtonLabel == "") &&
                    this.content.actionButtonLabel == undefined) {
                    this.content.actionButtonLabel = this.config.messageActionButtonLabel;
                }
            }
        }
        else if (this.content.basicType == "confirm") {
            if (this.content.title == undefined)
                this.content.title = this.config.confirmTitle;
            if (this.content.showIcon)
                if (this.content.icon == undefined || this.content.icon == "")
                    this.content.icon = this.config.confirmIcon;
            if (this.content.actionButtonLabel == undefined)
                this.content.actionButtonLabel = this.config.confirmActionButtonLabel;
            if (this.content.closeButtonLabel == undefined)
                this.content.closeButtonLabel = this.config.confirmCloseButtonLabel;
        }
        this.shown = true;
    };
    DialogMainComponent.prototype.hide = function () {
        this.shown = false;
    };
    DialogMainComponent.prototype.clickOutside = function (event) {
        if (this.content.closeByClickOutside && event.target.classList.contains('dialog-frame')) {
            this.content.dialogResult();
        }
    };
    //Press Esc or Enter key to close dialog.
    DialogMainComponent.prototype.keyboardInput = function (event) {
        //event.preventDefault();
        event.stopPropagation();
        if ((this.content.closeByEnter && event.keyCode == 13) ||
            (this.content.closeByEscape && event.keyCode == 27)) {
            this.content.dialogResult();
        }
    };
    var _a, _b, _c;
    __decorate([
        ViewChild(AlignmentDirective, { static: true }),
        __metadata("design:type", AlignmentDirective)
    ], DialogMainComponent.prototype, "alignmentDirective", void 0);
    __decorate([
        ViewChild('element', { static: true, read: ViewContainerRef }),
        __metadata("design:type", typeof (_a = typeof ViewContainerRef !== "undefined" && ViewContainerRef) === "function" ? _a : Object)
    ], DialogMainComponent.prototype, "element", void 0);
    __decorate([
        ViewChild('dialogMainElem', { static: true }),
        __metadata("design:type", typeof (_b = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _b : Object)
    ], DialogMainComponent.prototype, "dialogMainElem", void 0);
    __decorate([
        HostListener('window:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DialogMainComponent.prototype, "keyboardInput", null);
    DialogMainComponent = __decorate([
        Component({
            moduleId: module.id.toString(),
            selector: "dialog-main",
            templateUrl: "./dialog-main.component.html"
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof ComponentFactoryResolver !== "undefined" && ComponentFactoryResolver) === "function" ? _c : Object, NgExDialogConfig])
    ], DialogMainComponent);
    return DialogMainComponent;
}());
export { DialogMainComponent };
//# sourceMappingURL=dialog-main.component.js.map