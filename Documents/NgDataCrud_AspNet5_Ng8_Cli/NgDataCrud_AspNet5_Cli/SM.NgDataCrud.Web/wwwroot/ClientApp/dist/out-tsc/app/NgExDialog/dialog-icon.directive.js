var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, ElementRef, Renderer } from '@angular/core';
var DialogIconDirective = /** @class */ (function () {
    function DialogIconDirective(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    DialogIconDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            var cssClass = "";
            switch (_this.option) {
                case "info":
                    cssClass = "dialog-icon-info";
                    break;
                case "warning":
                    cssClass = "dialog-icon-warning";
                    break;
                case "error":
                    cssClass = "dialog-icon-error";
                    break;
                case "question":
                    cssClass = "dialog-icon-question";
                    break;
                default:
                    break;
            }
            if (cssClass != "")
                _this.renderer.setElementClass(_this.element.nativeElement, cssClass, true);
        }, 100);
    };
    var _a, _b;
    __decorate([
        Input('dialog-icon'),
        __metadata("design:type", String)
    ], DialogIconDirective.prototype, "option", void 0);
    DialogIconDirective = __decorate([
        Directive({
            selector: '[dialog-icon]'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object, typeof (_b = typeof Renderer !== "undefined" && Renderer) === "function" ? _b : Object])
    ], DialogIconDirective);
    return DialogIconDirective;
}());
export { DialogIconDirective };
//# sourceMappingURL=dialog-icon.directive.js.map