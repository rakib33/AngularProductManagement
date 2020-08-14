var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, ElementRef, ViewContainerRef, Renderer, ChangeDetectorRef, ComponentFactoryResolver, forwardRef, EventEmitter, Output, HostListener } from "@angular/core";
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NgxMyDatePicker } from "./ngx-my-date-picker.component";
import { UtilService } from "./services/ngx-my-date-picker.util.service";
import { NgxMyDatePickerConfig } from "./services/ngx-my-date-picker.config";
import { CalToggle } from "./enums/cal-toggle.enum";
import { Year } from "./enums/year.enum";
import { KeyCode } from "./enums/key-code.enum";
var NGX_DP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgxMyDatePickerDirective; }),
    multi: true
};
var NGX_DP_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return NgxMyDatePickerDirective; }),
    multi: true
};
var NgxMyDatePickerDirective = /** @class */ (function () {
    function NgxMyDatePickerDirective(utilService, vcRef, cfr, renderer, cdr, elem, config) {
        var _this = this;
        this.utilService = utilService;
        this.vcRef = vcRef;
        this.cfr = cfr;
        this.renderer = renderer;
        this.cdr = cdr;
        this.elem = elem;
        this.config = config;
        //SW: added
        this.isOpen = false;
        this.dateChanged = new EventEmitter();
        this.inputFieldChanged = new EventEmitter();
        this.calendarViewChanged = new EventEmitter();
        this.calendarToggle = new EventEmitter();
        this.cRef = null;
        this.inputText = "";
        this.preventClose = false;
        this.disabled = false;
        this.onChangeCb = function () { };
        this.onTouchedCb = function () { };
        // wrapper with arrow function to preserve the use of 'this' word
        this.onClickWrapper = function (ev) { _this.onClick(ev); };
        this.opts = Object.assign({}, config);
        this.parseOptions(config);
    }
    NgxMyDatePickerDirective.prototype.onKeyUp = function (evt) {
        if (this.ignoreKeyPress(evt.keyCode)) {
            return;
        }
        else if (evt.keyCode === KeyCode.esc) {
            this.closeSelector(CalToggle.CloseByEsc);
        }
        else {
            var date = this.utilService.isDateValid(this.elem.nativeElement.value, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.monthLabels, this.opts.enableDates);
            if (this.utilService.isInitializedDate(date)) {
                var dateModel = this.utilService.getDateModel(date, this.opts.dateFormat, this.opts.monthLabels, this.elem.nativeElement.value);
                this.emitDateChanged(dateModel);
                this.updateModel(dateModel);
                this.emitInputFieldChanged(dateModel.formatted, true);
                if (this.opts.closeSelectorOnDateSelect) {
                    this.closeSelector(CalToggle.CloseByDateSel);
                }
                else if (this.cRef !== null) {
                    this.cRef.instance.setCalendarView(date);
                }
            }
            else {
                if (this.inputText !== this.elem.nativeElement.value) {
                    if (this.elem.nativeElement.value === "") {
                        this.clearDate();
                    }
                    else {
                        this.onChangeCb(null);
                        this.emitInputFieldChanged(this.elem.nativeElement.value, false);
                    }
                }
            }
            this.inputText = this.elem.nativeElement.value;
        }
    };
    NgxMyDatePickerDirective.prototype.onBlur = function () {
        this.onTouchedCb();
    };
    NgxMyDatePickerDirective.prototype.onClick = function (evt) {
        if (this.opts.closeSelectorOnDocumentClick && !this.preventClose && evt.target && this.cRef !== null && this.elem.nativeElement !== evt.target && !this.cRef.location.nativeElement.contains(evt.target) && !this.disabled) {
            this.closeSelector(CalToggle.CloseByOutClick);
        }
    };
    NgxMyDatePickerDirective.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty("options")) {
            this.parseOptions(changes["options"].currentValue);
        }
        if (changes.hasOwnProperty("defaultMonth")) {
            var dm = changes["defaultMonth"].currentValue;
            if (typeof dm === "object") {
                dm = dm.defMonth;
            }
            this.defaultMonth = dm;
        }
    };
    NgxMyDatePickerDirective.prototype.ngOnDestroy = function () {
        this.closeCalendar();
    };
    NgxMyDatePickerDirective.prototype.parseOptions = function (opts) {
        var _this = this;
        if (opts !== undefined) {
            Object.keys(opts).forEach(function (k) {
                _this.opts[k] = opts[k];
            });
        }
        if (this.opts.minYear < Year.min) {
            this.opts.minYear = Year.min;
        }
        if (this.opts.maxYear > Year.max) {
            this.opts.maxYear = Year.max;
        }
    };
    NgxMyDatePickerDirective.prototype.writeValue = function (value) {
        if (!this.disabled) {
            if (value && (value["date"] || value["jsdate"])) {
                var formatted = this.utilService.formatDate(value["date"] ? value["date"] : this.jsDateToMyDate(value["jsdate"]), this.opts.dateFormat, this.opts.monthLabels);
                var date = this.utilService.isDateValid(formatted, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.monthLabels, this.opts.enableDates);
                this.setInputValue(formatted);
                this.emitInputFieldChanged(formatted, this.utilService.isInitializedDate(date));
            }
            else if (value === null || value === "") {
                this.setInputValue("");
                this.emitInputFieldChanged("", false);
            }
        }
    };
    NgxMyDatePickerDirective.prototype.registerOnChange = function (fn) {
        this.onChangeCb = fn;
    };
    NgxMyDatePickerDirective.prototype.registerOnTouched = function (fn) {
        this.onTouchedCb = fn;
    };
    NgxMyDatePickerDirective.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.renderer.setElementProperty(this.elem.nativeElement, "disabled", isDisabled);
        if (isDisabled) {
            this.closeCalendar();
        }
    };
    NgxMyDatePickerDirective.prototype.validate = function (c) {
        if (this.elem.nativeElement.value === null || this.elem.nativeElement.value === "") {
            return null;
        }
        var date = this.utilService.isDateValid(this.elem.nativeElement.value, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.monthLabels, this.opts.enableDates);
        if (!this.utilService.isInitializedDate(date)) {
            return { invalidDateFormat: true };
        }
        return null;
    };
    NgxMyDatePickerDirective.prototype.openCalendar = function () {
        var _this = this;
        if (this.disabled) {
            return;
        }
        this.preventClose = true;
        this.cdr.detectChanges();
        if (this.cRef === null) {
            this.cRef = this.vcRef.createComponent(this.cfr.resolveComponentFactory(NgxMyDatePicker));
            this.appendSelector(this.cRef.location.nativeElement);
            this.cRef.instance.initialize(this.opts, this.defaultMonth, this.getSelectorPosition(this.elem.nativeElement), this.elem.nativeElement.value, function (dm, close) {
                _this.focusToInput();
                _this.emitDateChanged(dm);
                _this.emitInputFieldChanged(dm.formatted, true);
                _this.updateModel(dm);
                if (close) {
                    _this.closeSelector(CalToggle.CloseByDateSel);
                }
            }, function (cvc) {
                _this.emitCalendarChanged(cvc);
            }, function () {
                _this.closeSelector(CalToggle.CloseByEsc);
            });
            this.emitCalendarToggle(CalToggle.Open);
        }
        setTimeout(function () {
            _this.preventClose = false;
        }, 50);
    };
    NgxMyDatePickerDirective.prototype.closeCalendar = function () {
        this.closeSelector(CalToggle.CloseByCalBtn);
    };
    NgxMyDatePickerDirective.prototype.toggleCalendar = function () {
        if (this.disabled) {
            return;
        }
        if (this.cRef === null) {
            document.addEventListener("click", this.onClickWrapper);
            this.openCalendar();
        }
        else {
            document.removeEventListener("click", this.onClickWrapper);
            this.closeSelector(CalToggle.CloseByCalBtn);
        }
    };
    NgxMyDatePickerDirective.prototype.clearDate = function () {
        if (this.disabled) {
            return;
        }
        this.emitDateChanged({ date: { year: 0, month: 0, day: 0 }, jsdate: null, formatted: "", epoc: 0 });
        this.emitInputFieldChanged("", false);
        this.onChangeCb(null);
        this.onTouchedCb();
        this.setInputValue("");
        this.closeSelector(CalToggle.CloseByCalBtn);
    };
    NgxMyDatePickerDirective.prototype.isDateValid = function () {
        if (this.elem.nativeElement.value !== "") {
            var date = this.utilService.isDateValid(this.elem.nativeElement.value, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.monthLabels, this.opts.enableDates);
            if (this.utilService.isInitializedDate(date)) {
                this.emitInputFieldChanged(this.elem.nativeElement.value, true);
                return true;
            }
        }
        this.emitInputFieldChanged(this.elem.nativeElement.value, false);
        return false;
    };
    NgxMyDatePickerDirective.prototype.ignoreKeyPress = function (keyCode) {
        return keyCode === KeyCode.leftArrow || keyCode === KeyCode.rightArrow || keyCode === KeyCode.upArrow || keyCode === KeyCode.downArrow || keyCode === KeyCode.tab || keyCode === KeyCode.shift;
    };
    NgxMyDatePickerDirective.prototype.closeSelector = function (reason) {
        if (this.cRef !== null) {
            this.vcRef.remove(this.vcRef.indexOf(this.cRef.hostView));
            this.cRef = null;
            this.emitCalendarToggle(reason);
        }
    };
    NgxMyDatePickerDirective.prototype.updateModel = function (model) {
        this.setInputValue(model.formatted);
        this.onChangeCb(model);
        this.onTouchedCb();
    };
    NgxMyDatePickerDirective.prototype.setInputValue = function (value) {
        this.inputText = value;
        this.renderer.setElementProperty(this.elem.nativeElement, "value", value);
    };
    NgxMyDatePickerDirective.prototype.focusToInput = function () {
        var _this = this;
        setTimeout(function () {
            _this.elem.nativeElement.focus();
        });
    };
    NgxMyDatePickerDirective.prototype.emitDateChanged = function (dateModel) {
        this.dateChanged.emit(dateModel);
    };
    NgxMyDatePickerDirective.prototype.emitInputFieldChanged = function (value, valid) {
        this.inputFieldChanged.emit({ value: value, dateFormat: this.opts.dateFormat, valid: valid });
    };
    NgxMyDatePickerDirective.prototype.emitCalendarChanged = function (cvc) {
        this.calendarViewChanged.emit(cvc);
    };
    NgxMyDatePickerDirective.prototype.emitCalendarToggle = function (reason) {
        this.calendarToggle.emit(reason);
        //SW: added.
        if (reason == 1) {
            this.isOpen = true;
        }
        else {
            this.isOpen = false;
        }
    };
    NgxMyDatePickerDirective.prototype.jsDateToMyDate = function (date) {
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    };
    NgxMyDatePickerDirective.prototype.appendSelector = function (elem) {
        if (this.opts.appendSelectorToBody) {
            document.querySelector("body").appendChild(elem);
        }
    };
    NgxMyDatePickerDirective.prototype.getSelectorPosition = function (elem) {
        var top = 0;
        var left = 0;
        if (this.opts.appendSelectorToBody) {
            var b = document.body.getBoundingClientRect();
            var e = elem.getBoundingClientRect();
            top = e.top - b.top;
            left = e.left - b.left;
        }
        if (this.opts.openSelectorTopOfInput) {
            top = top - this.getSelectorDimension(this.opts.selectorHeight) - 2;
        }
        else {
            top = top + elem.offsetHeight + (this.opts.showSelectorArrow ? 12 : 2);
        }
        if (this.opts.alignSelectorRight) {
            left = left + elem.offsetWidth - this.getSelectorDimension(this.opts.selectorWidth);
        }
        return { top: top + "px", left: left + "px" };
    };
    NgxMyDatePickerDirective.prototype.getSelectorDimension = function (value) {
        return Number(value.replace("px", ""));
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgxMyDatePickerDirective.prototype, "options", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NgxMyDatePickerDirective.prototype, "defaultMonth", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Boolean)
    ], NgxMyDatePickerDirective.prototype, "isOpen", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], NgxMyDatePickerDirective.prototype, "dateChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], NgxMyDatePickerDirective.prototype, "inputFieldChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_c = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _c : Object)
    ], NgxMyDatePickerDirective.prototype, "calendarViewChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_d = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _d : Object)
    ], NgxMyDatePickerDirective.prototype, "calendarToggle", void 0);
    __decorate([
        HostListener("keyup", ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], NgxMyDatePickerDirective.prototype, "onKeyUp", null);
    __decorate([
        HostListener("blur"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NgxMyDatePickerDirective.prototype, "onBlur", null);
    NgxMyDatePickerDirective = __decorate([
        Directive({
            selector: "[ngx-mydatepicker]",
            exportAs: "ngx-mydatepicker",
            providers: [UtilService, NGX_DP_VALUE_ACCESSOR, NGX_DP_VALIDATORS]
        }),
        __metadata("design:paramtypes", [UtilService, typeof (_e = typeof ViewContainerRef !== "undefined" && ViewContainerRef) === "function" ? _e : Object, typeof (_f = typeof ComponentFactoryResolver !== "undefined" && ComponentFactoryResolver) === "function" ? _f : Object, typeof (_g = typeof Renderer !== "undefined" && Renderer) === "function" ? _g : Object, typeof (_h = typeof ChangeDetectorRef !== "undefined" && ChangeDetectorRef) === "function" ? _h : Object, typeof (_j = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _j : Object, NgxMyDatePickerConfig])
    ], NgxMyDatePickerDirective);
    return NgxMyDatePickerDirective;
}());
export { NgxMyDatePickerDirective };
//# sourceMappingURL=ngx-my-date-picker.input.js.map