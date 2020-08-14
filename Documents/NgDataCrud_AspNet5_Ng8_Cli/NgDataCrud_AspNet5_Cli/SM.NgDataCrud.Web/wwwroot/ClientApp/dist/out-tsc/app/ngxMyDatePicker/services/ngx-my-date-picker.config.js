var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from "@angular/core";
import { Year } from "../enums/year.enum";
/**
 * Configuration service for the NgxMyDatePicker component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepickers used in the application.
 */
var NgxMyDatePickerConfig = /** @class */ (function () {
    function NgxMyDatePickerConfig() {
        this.dayLabels = { su: "Sun", mo: "Mon", tu: "Tue", we: "Wed", th: "Thu", fr: "Fri", sa: "Sat" };
        this.monthLabels = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" };
        this.dateFormat = "mm/dd/yyyy"; //SW: changed default to "mm/dd/yyyy" from "yyyy-mm-dd"
        this.showTodayBtn = true;
        this.todayBtnTxt = "Today";
        this.firstDayOfWeek = "su"; //SW: changed default to "su" from "mo".
        this.satHighlight = false;
        this.sunHighlight = false; //SW: changed default to false.
        this.highlightDates = [];
        this.markCurrentDay = true;
        this.markCurrentMonth = true;
        this.markCurrentYear = true;
        this.monthSelector = true;
        this.yearSelector = true;
        this.disableHeaderButtons = true;
        this.showWeekNumbers = false;
        this.selectorHeight = "232px";
        this.selectorWidth = "252px";
        this.disableUntil = { year: 0, month: 0, day: 0 };
        this.disableSince = { year: 0, month: 0, day: 0 };
        this.disableDates = [];
        this.enableDates = [];
        this.markDates = [];
        this.markWeekends = {};
        this.disableDateRanges = [];
        this.disableWeekends = false;
        this.alignSelectorRight = false;
        this.openSelectorTopOfInput = false;
        this.closeSelectorOnDateSelect = true;
        this.closeSelectorOnDocumentClick = true;
        this.minYear = Year.min;
        this.maxYear = Year.max;
        this.showSelectorArrow = true;
        this.allowSelectionOnlyInCurrentMonth = true;
        this.appendSelectorToBody = false;
        this.ariaLabelPrevMonth = "Previous Month";
        this.ariaLabelNextMonth = "Next Month";
        this.ariaLabelPrevYear = "Previous Year";
        this.ariaLabelNextYear = "Next Year";
    }
    NgxMyDatePickerConfig = __decorate([
        Injectable()
    ], NgxMyDatePickerConfig);
    return NgxMyDatePickerConfig;
}());
export { NgxMyDatePickerConfig };
//# sourceMappingURL=ngx-my-date-picker.config.js.map