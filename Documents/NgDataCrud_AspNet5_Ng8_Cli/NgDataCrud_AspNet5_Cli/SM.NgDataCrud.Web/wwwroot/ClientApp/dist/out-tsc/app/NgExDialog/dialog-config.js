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
var NgExDialogConfig = /** @class */ (function () {
    function NgExDialogConfig() {
        this.defaults = {
            //Please see properties of calling parameter object in dialog.component.ts.
            //App level settings ----------------
            topOffset: 50,
            draggable: true,
            moveCursor: 'default',
            //Animation fade-in time is set in bootstrap.css by default (0.3s).
            //You can overwrite the value in dialog-main.component.css.
            animation: true,
            //Dialog level settings --------------------
            //Background color can also be set in dialog-main.component.css.
            grayBackground: true,
            width: '40%',
            ////Set postion usually specified in client openPrime call.        
            //initElement: undefined, //nativeElement
            //h_Offset: 0,
            //v_Offset: 0,
            //h_event: 0,  //IE 11
            //v_event: 0,   //IE 11
            //Animation fade-out time in milliseconds.
            closeDelay: 500,
            //Fade-out time delay in milliseconds for multiple parent dialogs when closing all together.
            closeDelayParent: 50,
            closeByEnter: false,
            closeByEscape: true,
            closeByClickOutside: true,
            //Usually dialog-level only:
            closeAllDialogs: false,
            closeImmediateParent: false,
            keepOpenForAction: false,
            keepOpenForClose: false,
            //Dialog-level exclusive, no default set but listed here for reference.
            //beforeActionCallback: undefined,
            //beforeCloseCallback: undefined,
            //Default values for predefined base type dialogs (message or confirm) only:
            messageTitle: 'Information',
            confirmTitle: 'Confirmation',
            //Two kinds of button labels in Parameter object for Opening dialog are:
            //actionButtonLabel
            //closeButtonLabel
            //These are for setting defaults only. If passed from parameter object, use these:
            //actionButtonLabel
            //closeButtonLabel
            //--------------------------------------------------------------------
            //Only singel button should be used for basic message dialog, which uses close button pattern by default.
            //Switch to use action button pattern will change button CSS style and set Observable.result = true.
            messageActionButtonLabel: '',
            messageCloseButtonLabel: 'OK',
            confirmActionButtonLabel: 'Yes',
            confirmCloseButtonLabel: 'No',
            //End for setting defaults only----------------------------------------
            showIcon: true,
            messageIcon: 'info',
            confirmIcon: 'question',
        };
        this._appConfig = {};
        this.merged = this.defaults;
    }
    Object.defineProperty(NgExDialogConfig.prototype, "appConfig", {
        get: function () {
            return this._appConfig;
        },
        set: function (v) {
            this._appConfig = v;
            this.merged = Object.keys(this._appConfig).length ? Object.assign(this.defaults, this._appConfig) : this.defaults;
        },
        enumerable: true,
        configurable: true
    });
    NgExDialogConfig = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], NgExDialogConfig);
    return NgExDialogConfig;
}());
export { NgExDialogConfig };
//# sourceMappingURL=dialog-config.js.map