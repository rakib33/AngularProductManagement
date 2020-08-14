var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, HostListener, ElementRef, Renderer } from '@angular/core';
import { NgExDialogConfig } from './dialog-config';
var AlignmentDirective = /** @class */ (function () {
    function AlignmentDirective(element, renderer, ngExDialogConfig) {
        this.element = element;
        this.renderer = renderer;
        this.ngExDialogConfig = ngExDialogConfig;
        //Passed from parent view. x?
        this.dialogPaddingTop = 0;
        this.topOffset = 0;
        this.setPosition = {
            initElement: undefined,
            h_Offset: 0,
            v_Offset: 0,
            h_event: undefined,
            v_event: undefined,
            h_scroll: undefined,
            v_scroll: undefined
        };
    }
    AlignmentDirective.prototype.ngOnInit = function () {
        //Initial load need a little top offset.
        this.SetCenter(undefined, true);
    };
    AlignmentDirective.prototype.onResize = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.SetCenter(event);
        }, 150);
    };
    AlignmentDirective.prototype.SetCenter = function (event, isInit) {
        var eventTarget = event == undefined ? window : event.target;
        var wh = eventTarget.innerHeight;
        var sx = eventTarget.scrollX; //left invisible width when scroll right.
        var sy = eventTarget.scrollY; //Top invisible height when scroll down.
        var ot = this.element.nativeElement.offsetTop;
        var cho = this.element.nativeElement.offsetHeight;
        var ch = this.element.nativeElement.offsetHeight - this.dialogPaddingTop; //Dialog visible height
        //IE doesn't support scrollY but it automatically scrolls back to the top 0 position.
        //The scrollY needs to be added for Google Chrome, Firefox, and Microsoft Edge.
        //let paddingTopValue = (wh - ch) / 2 + (sy || 0) - DialogConfig.topOffset; 
        if (this.setPosition.initElement) {
            //Set position based on cursor point if used.
            //Horizontal alignment. 
            var rstLeft = this.setPosition.initElement.offsetLeft + this.setPosition.h_Offset;
            if (sx) {
                rstLeft -= sx;
            }
            else {
                //Browsers not support scrollX.
                if (this.setPosition.h_scroll == undefined && this.setPosition.h_event) {
                    //Get scroll length value.
                    this.setPosition.h_scroll = this.setPosition.initElement.offsetLeft - this.setPosition.h_event;
                }
                rstLeft -= this.setPosition.h_scroll;
            }
            this.element.nativeElement.style.position = 'absolute';
            this.element.nativeElement.style.left = rstLeft.toString() + 'px';
            //Vertical alignment if specifying start position.            
            var rstTop = this.setPosition.initElement.offsetTop + this.setPosition.v_Offset;
            if (sy) {
                rstTop -= sy;
            }
            else {
                //Browsers not support scrollY.
                if (this.setPosition.v_scroll == undefined && this.setPosition.v_event) {
                    //Get scroll length value.
                    this.setPosition.v_scroll = this.setPosition.initElement.offsetTop - this.setPosition.v_event;
                }
                rstTop -= this.setPosition.v_scroll;
            }
            this.element.nativeElement.style.top = rstTop.toString() + 'px';
        }
        else {
            //For most dynamic filled content, offsetHeight is very small.
            if (this.isPrimeType) {
                if (ch < 350) {
                    ch = 350;
                }
            }
            var paddingTopValue = (wh - ch) / 2.1; //- this.topOffset; 
            if (paddingTopValue < 0) {
                paddingTopValue = 0;
            }
            else {
                //Need to adjust padding-top.
                if (this.isPrimeType) {
                    if (paddingTopValue > this.topOffset) {
                        paddingTopValue = this.topOffset;
                    }
                    if (wh <= cho) {
                        paddingTopValue = 0;
                    }
                }
                else {
                    paddingTopValue = paddingTopValue * 0.9 - this.topOffset;
                }
            }
            //Cache dialogPaddingTop value for use in next resize.
            this.dialogPaddingTop = paddingTopValue;
            //if (isInit) {
            //    paddingTopValue = paddingTopValue - this.ngExDialogConfig.merged.topOffset / 1.5;
            //}
            this.renderer.setElementStyle(this.element.nativeElement, 'padding-top', paddingTopValue + 'px');
            this.renderer.setElementStyle(this.element.nativeElement, 'margin-right', 'auto');
            this.renderer.setElementStyle(this.element.nativeElement, 'margin-left', 'auto');
        }
    };
    var _a, _b;
    __decorate([
        HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AlignmentDirective.prototype, "onResize", null);
    AlignmentDirective = __decorate([
        Directive({
            selector: '[vertical-center]'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object, typeof (_b = typeof Renderer !== "undefined" && Renderer) === "function" ? _b : Object, NgExDialogConfig])
    ], AlignmentDirective);
    return AlignmentDirective;
}());
export { AlignmentDirective };
//# sourceMappingURL=alignment.directive.js.map