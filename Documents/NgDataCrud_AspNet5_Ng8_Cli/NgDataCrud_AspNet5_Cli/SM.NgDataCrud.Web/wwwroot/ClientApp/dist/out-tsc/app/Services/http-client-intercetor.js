var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { MessageService } from './message.service';
var httpClientIntercetor = /** @class */ (function () {
    //private subscription: Subscription;    
    //private name = 'httpCeptor'
    function httpClientIntercetor(messageService) {
        this.messageService = messageService;
        //For registering receiving message.
        //this.subscribe();
    }
    httpClientIntercetor.prototype.intercept = function (req, next) {
        var _this = this;
        this.messageService.broadcast('showAjaxLoader', true);
        return next.handle(req).pipe(tap(function (event) {
            if (event instanceof HttpResponse) {
                _this.messageService.broadcast('showAjaxLoader', false);
            }
        }, function (error) {
            _this.messageService.broadcast('showAjaxLoader', false);
        }));
    };
    httpClientIntercetor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [MessageService])
    ], httpClientIntercetor);
    return httpClientIntercetor;
}());
export { httpClientIntercetor };
//# sourceMappingURL=http-client-intercetor.js.map