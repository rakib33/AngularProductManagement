var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
var SideMenuComponent = /** @class */ (function () {
    function SideMenuComponent() {
        this.menuItemVisited = new EventEmitter();
    }
    SideMenuComponent.prototype.menuItemClicked = function () {
        this.menuItemVisited.emit(true);
    };
    var _a, _b;
    __decorate([
        ViewChild('menuItems', { static: true }),
        __metadata("design:type", typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object)
    ], SideMenuComponent.prototype, "menuItems", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], SideMenuComponent.prototype, "menuItemVisited", void 0);
    SideMenuComponent = __decorate([
        Component({
            moduleId: module.id.toString(),
            selector: 'side-menu',
            templateUrl: "./side-menu.component.html",
            styleUrls: ["./side-menu.component.css"]
        }),
        __metadata("design:paramtypes", [])
    ], SideMenuComponent);
    return SideMenuComponent;
}());
export { SideMenuComponent };
//# sourceMappingURL=side-menu.component.js.map