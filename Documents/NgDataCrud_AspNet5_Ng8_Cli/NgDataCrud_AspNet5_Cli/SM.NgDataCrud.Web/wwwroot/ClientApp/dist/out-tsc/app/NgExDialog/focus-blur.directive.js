var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, ElementRef } from '@angular/core';
var FocusBlurDirective = /** @class */ (function () {
    function FocusBlurDirective(element) {
        this.element = element;
    }
    FocusBlurDirective.prototype.ngAfterViewInit = function () {
        var pThis = this;
        setTimeout(function () {
            if (pThis.option == "focus" || pThis.option == "focus_blur") {
                pThis.element.nativeElement.focus();
            }
            if (pThis.option == "blur" || pThis.option == "focus_blur") {
                pThis.element.nativeElement.blur();
            }
        }, 10);
    };
    var _a;
    __decorate([
        Input('focus-blur'),
        __metadata("design:type", String)
    ], FocusBlurDirective.prototype, "option", void 0);
    FocusBlurDirective = __decorate([
        Directive({
            selector: '[focus-blur]'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object])
    ], FocusBlurDirective);
    return FocusBlurDirective;
}());
export { FocusBlurDirective };
//# sourceMappingURL=focus-blur.directive.js.map