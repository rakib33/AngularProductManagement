var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { NgExDialogConfig } from "./dialog-config";
import { DialogCache } from "./dialog-cache";
var DraggableDirective = /** @class */ (function () {
    function DraggableDirective(element, ngExDialogConfig) {
        this.element = element;
        this.ngExDialogConfig = ngExDialogConfig;
        this.startX = 0;
        this.startY = 0;
    }
    DraggableDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        var pThis = this;
        setTimeout(function () {
            //Set CSS.
            if (_this.isDraggable) {
                _this.element.nativeElement.style.position = 'relative';
                _this.element.nativeElement.style.cursor = pThis.ngExDialogConfig.merged.moveCursor; //'move';
            }
        }, 10);
    };
    DraggableDirective.prototype.onMouseDown = function (event) {
        if (event.button === 2)
            return; // Prevents right click drag or remove this if you don't want it.
        if (this.isDraggable) {
            this.md = true;
            this.startY = event.clientY - this.element.nativeElement.style.top.replace('px', '');
            this.startX = event.clientX - this.element.nativeElement.style.left.replace('px', '');
        }
    };
    DraggableDirective.prototype.onMouseMove = function (event) {
        if (this.md && this.isDraggable && !DialogCache.noDrag) {
            //DialogCache.noDrag for mouse on input elements.
            //Disable element/text selection.
            window.getSelection().removeAllRanges();
            this.element.nativeElement.style.top = (event.clientY - this.startY) + 'px';
            this.element.nativeElement.style.left = (event.clientX - this.startX) + 'px';
        }
    };
    DraggableDirective.prototype.onMouseUp = function (event) {
        this.md = false;
    };
    var _a;
    __decorate([
        Input('ng2-draggable'),
        __metadata("design:type", Boolean)
    ], DraggableDirective.prototype, "isDraggable", void 0);
    __decorate([
        HostListener('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], DraggableDirective.prototype, "onMouseDown", null);
    __decorate([
        HostListener('document:mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], DraggableDirective.prototype, "onMouseMove", null);
    __decorate([
        HostListener('document:mouseup'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], DraggableDirective.prototype, "onMouseUp", null);
    DraggableDirective = __decorate([
        Directive({
            selector: '[ng2-draggable]'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object, NgExDialogConfig])
    ], DraggableDirective);
    return DraggableDirective;
}());
export { DraggableDirective };
//# sourceMappingURL=draggable.directive.js.map