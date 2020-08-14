var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewEncapsulation, ViewChild, Renderer, ChangeDetectorRef } from "@angular/core";
import { UtilService } from "./services/ngx-my-date-picker.util.service";
import { KeyCode } from "./enums/key-code.enum";
import { MonthId } from "./enums/month-id.enum";
//// webpack1_
//declare var require: any;
//const myDpStyles: string = require("./ngx-my-date-picker.component.css");
//const myDpTpl: string = require("./ngx-my-date-picker.component.html");
//// webpack2_
//const myDpStyles: string = "./ngx-my-date-picker.component.css";
//const myDpTpl: string = "./ngx-my-date-picker.component.html";
var NgxMyDatePicker = /** @class */ (function () {
    function NgxMyDatePicker(elem, renderer, cdr, utilService) {
        var _this = this;
        this.elem = elem;
        this.renderer = renderer;
        this.cdr = cdr;
        this.utilService = utilService;
        this.visibleMonth = { monthTxt: "", monthNbr: 0, year: 0 };
        this.selectedMonth = { monthTxt: "", monthNbr: 0, year: 0 };
        this.selectedDate = { year: 0, month: 0, day: 0 };
        this.weekDays = [];
        this.dates = [];
        this.months = [];
        this.years = [];
        this.disableTodayBtn = false;
        this.dayIdx = 0;
        this.weekDayOpts = ["su", "mo", "tu", "we", "th", "fr", "sa"];
        this.selectMonth = false;
        this.selectYear = false;
        this.selectorPos = null;
        this.prevMonthDisabled = false;
        this.nextMonthDisabled = false;
        this.prevYearDisabled = false;
        this.nextYearDisabled = false;
        this.prevYearsDisabled = false;
        this.nextYearsDisabled = false;
        this.prevMonthId = MonthId.prev;
        this.currMonthId = MonthId.curr;
        this.nextMonthId = MonthId.next;
        this.clickListener = renderer.listen(elem.nativeElement, "click", function (evt) {
            if ((_this.opts.monthSelector || _this.opts.yearSelector) && evt.target) {
                _this.resetMonthYearSelect();
            }
        });
    }
    NgxMyDatePicker.prototype.ngOnDestroy = function () {
        this.clickListener();
    };
    NgxMyDatePicker.prototype.initialize = function (opts, defaultMonth, selectorPos, inputValue, dc, cvc, cbe) {
        this.opts = opts;
        this.selectorPos = selectorPos;
        this.weekDays.length = 0;
        this.isTodayDisabled();
        this.dayIdx = this.weekDayOpts.indexOf(this.opts.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            var idx = this.dayIdx;
            for (var i = 0; i < this.weekDayOpts.length; i++) {
                this.weekDays.push(this.opts.dayLabels[this.weekDayOpts[idx]]);
                idx = this.weekDayOpts[idx] === "sa" ? 0 : idx + 1;
            }
        }
        var date = this.utilService.isDateValid(inputValue, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.monthLabels, this.opts.enableDates);
        if (date.day !== 0 && date.month !== 0 && date.year !== 0) {
            this.selectedDate = date;
        }
        else {
            if (defaultMonth !== null && defaultMonth !== undefined && defaultMonth !== "") {
                this.selectedMonth = this.utilService.parseDefaultMonth(defaultMonth);
            }
        }
        this.dateChanged = dc;
        this.calendarViewChanged = cvc;
        this.closedByEsc = cbe;
        this.setVisibleMonth();
    };
    NgxMyDatePicker.prototype.setCalendarView = function (date) {
        this.selectedDate = date;
        this.setVisibleMonth();
    };
    NgxMyDatePicker.prototype.resetMonthYearSelect = function () {
        this.selectMonth = false;
        this.selectYear = false;
    };
    NgxMyDatePicker.prototype.onSelectMonthClicked = function (event) {
        event.stopPropagation();
        this.selectMonth = !this.selectMonth;
        this.selectYear = false;
        this.cdr.detectChanges();
        if (this.selectMonth) {
            var today = this.getToday();
            this.months.length = 0;
            for (var i = 1; i <= 12; i += 3) {
                var row = [];
                for (var j = i; j < i + 3; j++) {
                    var disabled = this.utilService.isMonthDisabledByDisableUntil({ year: this.visibleMonth.year, month: j, day: this.daysInMonth(j, this.visibleMonth.year) }, this.opts.disableUntil)
                        || this.utilService.isMonthDisabledByDisableSince({ year: this.visibleMonth.year, month: j, day: 1 }, this.opts.disableSince);
                    row.push({ nbr: j, name: this.opts.monthLabels[j], currMonth: j === today.month && this.visibleMonth.year === today.year, selected: j === this.visibleMonth.monthNbr, disabled: disabled });
                }
                this.months.push(row);
            }
        }
    };
    NgxMyDatePicker.prototype.onMonthCellClicked = function (cell) {
        var mc = cell.nbr !== this.visibleMonth.monthNbr;
        this.visibleMonth = { monthTxt: this.opts.monthLabels[cell.nbr], monthNbr: cell.nbr, year: this.visibleMonth.year };
        this.generateCalendar(cell.nbr, this.visibleMonth.year, mc);
        this.selectMonth = false;
        this.selectorEl.nativeElement.focus();
    };
    NgxMyDatePicker.prototype.onMonthCellKeyDown = function (event, cell) {
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onMonthCellClicked(cell);
        }
    };
    NgxMyDatePicker.prototype.onSelectYearClicked = function (event) {
        event.stopPropagation();
        this.selectYear = !this.selectYear;
        this.selectMonth = false;
        this.cdr.detectChanges();
        if (this.selectYear) {
            this.generateYears(this.visibleMonth.year);
        }
    };
    NgxMyDatePicker.prototype.onYearCellClicked = function (cell) {
        var yc = cell.year !== this.visibleMonth.year;
        this.visibleMonth = { monthTxt: this.visibleMonth.monthTxt, monthNbr: this.visibleMonth.monthNbr, year: cell.year };
        this.generateCalendar(this.visibleMonth.monthNbr, cell.year, yc);
        this.selectYear = false;
        this.selectorEl.nativeElement.focus();
    };
    NgxMyDatePicker.prototype.onPrevYears = function (event, year) {
        event.stopPropagation();
        this.generateYears(year - 25);
    };
    NgxMyDatePicker.prototype.onNextYears = function (event, year) {
        event.stopPropagation();
        this.generateYears(year + 25);
    };
    NgxMyDatePicker.prototype.generateYears = function (year) {
        this.years.length = 0;
        var today = this.getToday();
        for (var i = year; i <= 20 + year; i += 5) {
            var row = [];
            for (var j = i; j < i + 5; j++) {
                var disabled = this.utilService.isMonthDisabledByDisableUntil({ year: j, month: this.visibleMonth.monthNbr, day: this.daysInMonth(this.visibleMonth.monthNbr, j) }, this.opts.disableUntil)
                    || this.utilService.isMonthDisabledByDisableSince({ year: j, month: this.visibleMonth.monthNbr, day: 1 }, this.opts.disableSince);
                var minMax = j < this.opts.minYear || j > this.opts.maxYear;
                row.push({ year: j, currYear: j === today.year, selected: j === this.visibleMonth.year, disabled: disabled || minMax });
            }
            this.years.push(row);
        }
        this.prevYearsDisabled = this.years[0][0].year <= this.opts.minYear || this.utilService.isMonthDisabledByDisableUntil({ year: this.years[0][0].year - 1, month: this.visibleMonth.monthNbr, day: this.daysInMonth(this.visibleMonth.monthNbr, this.years[0][0].year - 1) }, this.opts.disableUntil);
        this.nextYearsDisabled = this.years[4][4].year >= this.opts.maxYear || this.utilService.isMonthDisabledByDisableSince({ year: this.years[4][4].year + 1, month: this.visibleMonth.monthNbr, day: 1 }, this.opts.disableSince);
    };
    NgxMyDatePicker.prototype.onYearCellKeyDown = function (event, cell) {
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onYearCellClicked(cell);
        }
    };
    NgxMyDatePicker.prototype.isTodayDisabled = function () {
        this.disableTodayBtn = this.utilService.isDisabledDate(this.getToday(), this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.enableDates);
    };
    NgxMyDatePicker.prototype.setVisibleMonth = function () {
        // Sets visible month of calendar
        var y = 0, m = 0;
        if (this.selectedDate.year === 0 && this.selectedDate.month === 0 && this.selectedDate.day === 0) {
            if (this.selectedMonth.year === 0 && this.selectedMonth.monthNbr === 0) {
                var today = this.getToday();
                y = today.year;
                m = today.month;
            }
            else {
                y = this.selectedMonth.year;
                m = this.selectedMonth.monthNbr;
            }
        }
        else {
            y = this.selectedDate.year;
            m = this.selectedDate.month;
        }
        this.visibleMonth = { monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y };
        // Create current month
        this.generateCalendar(m, y, true);
    };
    NgxMyDatePicker.prototype.onPrevMonth = function () {
        // Previous month from calendar
        var d = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() - 1);
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        this.visibleMonth = { monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    };
    NgxMyDatePicker.prototype.onNextMonth = function () {
        // Next month from calendar
        var d = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() + 1);
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        this.visibleMonth = { monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    };
    NgxMyDatePicker.prototype.onPrevYear = function () {
        // Previous year from calendar
        this.visibleMonth.year--;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    };
    NgxMyDatePicker.prototype.onNextYear = function () {
        // Next year from calendar
        this.visibleMonth.year++;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    };
    NgxMyDatePicker.prototype.onCloseSelector = function (event) {
        if (event.keyCode === KeyCode.esc) {
            this.closedByEsc();
        }
    };
    NgxMyDatePicker.prototype.onTodayClicked = function () {
        // Today button clicked
        var today = this.getToday();
        this.selectDate(today);
        if (!this.opts.closeSelectorOnDateSelect) {
            this.setVisibleMonth();
        }
    };
    NgxMyDatePicker.prototype.onCellClicked = function (cell) {
        // Cell clicked on the calendar
        if (cell.cmo === this.prevMonthId) {
            // Previous month of day
            this.onPrevMonth();
            if (!this.opts.allowSelectionOnlyInCurrentMonth) {
                this.selectDate(cell.dateObj);
            }
        }
        else if (cell.cmo === this.currMonthId) {
            // Current month of day
            this.selectDate(cell.dateObj);
        }
        else if (cell.cmo === this.nextMonthId) {
            // Next month of day
            this.onNextMonth();
            if (!this.opts.allowSelectionOnlyInCurrentMonth) {
                this.selectDate(cell.dateObj);
            }
        }
        this.resetMonthYearSelect();
    };
    NgxMyDatePicker.prototype.onCellKeyDown = function (event, cell) {
        // Cell keyboard handling
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onCellClicked(cell);
        }
    };
    NgxMyDatePicker.prototype.selectDate = function (date) {
        // Notifies parent using callback
        this.selectedDate = date;
        this.dateChanged(this.utilService.getDateModel(date, this.opts.dateFormat, this.opts.monthLabels), this.opts.closeSelectorOnDateSelect);
    };
    NgxMyDatePicker.prototype.monthStartIdx = function (y, m) {
        // Month start index
        var d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        var idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    };
    NgxMyDatePicker.prototype.daysInMonth = function (m, y) {
        // Return number of days of current month
        return new Date(y, m, 0).getDate();
    };
    NgxMyDatePicker.prototype.daysInPrevMonth = function (m, y) {
        // Return number of days of the previous month
        var d = this.getDate(y, m, 1);
        d.setMonth(d.getMonth() - 1);
        return this.daysInMonth(d.getMonth() + 1, d.getFullYear());
    };
    NgxMyDatePicker.prototype.isCurrDay = function (d, m, y, cmo, today) {
        // Check is a given date the today
        return d === today.day && m === today.month && y === today.year && cmo === this.currMonthId;
    };
    NgxMyDatePicker.prototype.getToday = function () {
        var date = new Date();
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    };
    NgxMyDatePicker.prototype.getDayNumber = function (date) {
        // Get day number: su=0, mo=1, tu=2, we=3 ...
        var d = this.getDate(date.year, date.month, date.day);
        return d.getDay();
    };
    NgxMyDatePicker.prototype.getWeekday = function (date) {
        // Get weekday: su, mo, tu, we ...
        return this.weekDayOpts[this.getDayNumber(date)];
    };
    NgxMyDatePicker.prototype.getDate = function (year, month, day) {
        // Creates a date object from given year, month and day
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    };
    NgxMyDatePicker.prototype.sundayIdx = function () {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    };
    NgxMyDatePicker.prototype.generateCalendar = function (m, y, notifyChange) {
        this.dates.length = 0;
        var today = this.getToday();
        var monthStart = this.monthStartIdx(y, m);
        var dInThisM = this.daysInMonth(m, y);
        var dInPrevM = this.daysInPrevMonth(m, y);
        var dayNbr = 1;
        var cmo = this.prevMonthId;
        for (var i = 1; i < 7; i++) {
            var week = [];
            if (i === 1) {
                // First week
                var pm = dInPrevM - monthStart + 1;
                // Previous month
                for (var j = pm; j <= dInPrevM; j++) {
                    var date = { year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: j };
                    week.push({ dateObj: date,
                        cmo: cmo,
                        currDay: this.isCurrDay(j, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDate(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.enableDates),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates) });
                }
                cmo = this.currMonthId;
                // Current month
                var daysLeft = 7 - week.length;
                for (var j = 0; j < daysLeft; j++) {
                    var date = { year: y, month: m, day: dayNbr };
                    week.push({ dateObj: date,
                        cmo: cmo,
                        currDay: this.isCurrDay(dayNbr, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDate(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.enableDates),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates) });
                    dayNbr++;
                }
            }
            else {
                // Rest of the weeks
                for (var j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        // Next month
                        dayNbr = 1;
                        cmo = this.nextMonthId;
                    }
                    var date = { year: cmo === this.nextMonthId && m === 12 ? y + 1 : y, month: cmo === this.currMonthId ? m : cmo === this.nextMonthId && m < 12 ? m + 1 : 1, day: dayNbr };
                    week.push({ dateObj: date,
                        cmo: cmo,
                        currDay: this.isCurrDay(dayNbr, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDate(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.enableDates),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates) });
                    dayNbr++;
                }
            }
            var weekNbr = this.opts.showWeekNumbers && this.opts.firstDayOfWeek === "mo" ? this.utilService.getWeekNumber(week[0].dateObj) : 0;
            this.dates.push({ week: week, weekNbr: weekNbr });
        }
        this.setHeaderBtnDisabledState(m, y);
        if (notifyChange) {
            // Notify parent
            this.calendarViewChanged({ year: y, month: m, first: { number: 1, weekday: this.getWeekday({ year: y, month: m, day: 1 }) }, last: { number: dInThisM, weekday: this.getWeekday({ year: y, month: m, day: dInThisM }) } });
        }
    };
    NgxMyDatePicker.prototype.setHeaderBtnDisabledState = function (m, y) {
        var dpm = false;
        var dpy = false;
        var dnm = false;
        var dny = false;
        if (this.opts.disableHeaderButtons) {
            dpm = this.utilService.isMonthDisabledByDisableUntil({ year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: this.daysInMonth(m === 1 ? 12 : m - 1, m === 1 ? y - 1 : y) }, this.opts.disableUntil);
            dpy = this.utilService.isMonthDisabledByDisableUntil({ year: y - 1, month: m, day: this.daysInMonth(m, y - 1) }, this.opts.disableUntil);
            dnm = this.utilService.isMonthDisabledByDisableSince({ year: m === 12 ? y + 1 : y, month: m === 12 ? 1 : m + 1, day: 1 }, this.opts.disableSince);
            dny = this.utilService.isMonthDisabledByDisableSince({ year: y + 1, month: m, day: 1 }, this.opts.disableSince);
        }
        this.prevMonthDisabled = m === 1 && y === this.opts.minYear || dpm;
        this.prevYearDisabled = y - 1 < this.opts.minYear || dpy;
        this.nextMonthDisabled = m === 12 && y === this.opts.maxYear || dnm;
        this.nextYearDisabled = y + 1 > this.opts.maxYear || dny;
    };
    var _a, _b, _c;
    __decorate([
        ViewChild("selectorEl", { static: true }),
        __metadata("design:type", Object)
    ], NgxMyDatePicker.prototype, "selectorEl", void 0);
    NgxMyDatePicker = __decorate([
        Component({
            moduleId: module.id.toString(),
            selector: "ngx-my-date-picker",
            //For webpack only.
            //styles: [myDpStyles],
            //template: myDpTpl,    
            styleUrls: ["./ngx-my-date-picker.component.css"],
            templateUrl: "./ngx-my-date-picker.component.html",
            providers: [UtilService],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object, typeof (_b = typeof Renderer !== "undefined" && Renderer) === "function" ? _b : Object, typeof (_c = typeof ChangeDetectorRef !== "undefined" && ChangeDetectorRef) === "function" ? _c : Object, UtilService])
    ], NgxMyDatePicker);
    return NgxMyDatePicker;
}());
export { NgxMyDatePicker };
//# sourceMappingURL=ngx-my-date-picker.component.js.map