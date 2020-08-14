var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
var MessageTransferService = /** @class */ (function () {
    function MessageTransferService() {
        this.handler = new Subject();
    }
    MessageTransferService.prototype.broadcast = function (type, payload) {
        this.handler.next({ type: type, payload: payload });
    };
    MessageTransferService.prototype.subscribe = function (type, callback) {
        return this.handler.pipe(filter(function (message) { return message.type === type; }), map(function (message) { return message.payload; })).subscribe(callback);
    };
    MessageTransferService = __decorate([
        Injectable()
    ], MessageTransferService);
    return MessageTransferService;
}());
export { MessageTransferService };
//# sourceMappingURL=message-transfer.service.js.map