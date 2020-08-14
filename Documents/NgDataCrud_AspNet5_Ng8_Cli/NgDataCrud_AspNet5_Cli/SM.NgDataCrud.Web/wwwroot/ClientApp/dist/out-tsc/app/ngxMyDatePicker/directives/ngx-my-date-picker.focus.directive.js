var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Renderer, Input } from "@angular/core";
var FocusDirective = /** @class */ (function () {
    function FocusDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    // Focus to element: if value 0 = don't set focus, 1 = set only focus
    FocusDirective.prototype.ngAfterViewInit = function () {
        if (this.value === "0") {
            return;
        }
        this.renderer.invokeElementMethod(this.el.nativeElement, "focus", []);
    };
    var _a, _b;
    __decorate([
        Input("ngxfocus"),
        __metadata("design:type", String)
    ], FocusDirective.prototype, "value", void 0);
    FocusDirective = __decorate([
        Directive({
            selector: "[ngxfocus]"
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object, typeof (_b = typeof Renderer !== "undefined" && Renderer) === "function" ? _b : Object])
    ], FocusDirective);
    return FocusDirective;
}());
export { FocusDirective };
//# sourceMappingURL=ngx-my-date-picker.focus.directive.js.map