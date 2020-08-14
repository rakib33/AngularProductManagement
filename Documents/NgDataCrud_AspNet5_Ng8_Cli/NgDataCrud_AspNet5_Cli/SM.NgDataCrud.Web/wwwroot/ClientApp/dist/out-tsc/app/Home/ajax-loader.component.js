var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { MessageService } from '../Services/message.service';
var AjaxLoaderComponent = /** @class */ (function () {
    function AjaxLoaderComponent(messageService) {
        this.messageService = messageService;
        this.showLoader = false;
    }
    AjaxLoaderComponent.prototype.ngOnInit = function () {
        this.subscribe();
    };
    AjaxLoaderComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe();
    };
    AjaxLoaderComponent.prototype.subscribe = function () {
        var pThis = this;
        this.subscription = this.messageService.subscribe('showAjaxLoader', function (eventData) {
            pThis.showLoader = eventData;
        });
    };
    AjaxLoaderComponent.prototype.unsubscribe = function () {
        this.subscription.unsubscribe();
    };
    AjaxLoaderComponent = __decorate([
        Component({
            moduleId: module.id.toString(),
            selector: 'ajax-loader',
            template: "<div class=\"loader-div\" *ngIf=\"showLoader\">\n            <img src=\"assets/images/animatedCircle.gif\" class=\"ajax-loader\" />\n        </div>  "
        }),
        __metadata("design:paramtypes", [MessageService])
    ], AjaxLoaderComponent);
    return AjaxLoaderComponent;
}());
export { AjaxLoaderComponent };
//# sourceMappingURL=ajax-loader.component.js.map