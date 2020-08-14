var ValueArgs = /** @class */ (function () {
    function ValueArgs() {
    }
    return ValueArgs;
}());
export { ValueArgs };
var RangeArgs = /** @class */ (function () {
    function RangeArgs() {
    }
    return RangeArgs;
}());
export { RangeArgs };
var ValidatorCommon = /** @class */ (function () {
    function ValidatorCommon() {
    }
    //will be removed. 
    ValidatorCommon.isValidDate = function (value) {
        var d = new Date(value);
        if (typeof value === 'string' || value instanceof String) {
            return isFinite(d) && value.split('/')[0] == (d.getMonth() + 1);
        }
        else {
            return isFinite(d);
        }
    };
    ValidatorCommon.validateDate = function (value) {
        if (value == null || value == undefined)
            return null;
        //ngx-mydatepicker data object.
        if (typeof value === 'object' && value.formatted)
            return value.formatted;
        //Generic javascript date object.
        if (value instanceof Date && !isNaN(value.getTime())) {
            return ValidatorCommon.getFormattedDate(value);
        }
        //String input.
        if (typeof value === 'string' || value instanceof String) {
            for (var i = 0; i < ValidatorCommon.acceptableFormats.length; i++) {
                var match = value.toString().match(ValidatorCommon.acceptableFormats[i]);
                if (match) {
                    var yyyy = match[3];
                    var mm = match[1];
                    var dd = match[2];
                    if (ValidatorCommon.checkValidDate(Number(mm), Number(dd), Number(yyyy))) {
                        var givenDate = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
                        var minDate = new Date(1800, 0, 1);
                        if (yyyy && yyyy.length === 4 && yyyy.charAt(0) === '0') {
                            return undefined;
                        }
                        else if (givenDate < minDate) {
                            return null;
                        }
                        else {
                            return value.toString();
                        }
                    }
                    else {
                        return null;
                    }
                }
            }
        }
        return null;
    };
    ValidatorCommon.checkValidDate = function (MM, DD, YYYY) {
        if (MM < 1 || MM > 12) {
            return false;
        }
        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // Adjust for leap years
        if (YYYY % 400 === 0 || (YYYY % 100 !== 0 && YYYY % 4 === 0)) {
            monthLength[1] = 29;
        }
        // Check the range of the day
        if (DD <= 0 || DD > monthLength[MM - 1]) {
            return false;
        }
        return true;
    };
    ValidatorCommon.getFormattedDate = function (date) {
        try {
            var year = date.getFullYear();
            var month = (1 + date.getMonth()).toString();
            month = month.length > 1 ? month : '0' + month;
            var day = date.getDate().toString();
            day = day.length > 1 ? day : '0' + day;
            return month + '/' + day + '/' + year;
        }
        catch (err) {
            return "error";
        }
    };
    ValidatorCommon.getCurrentControlName = function (ct) {
        var formGroup;
        var rtn = null;
        if (ct.parent && ct.parent.controls) {
            formGroup = ct.parent.controls;
            rtn = Object.keys(formGroup).find(function (name) { return ct === formGroup[name]; });
        }
        return rtn;
    };
    ValidatorCommon.toTitleCases = function (str) {
        var rtn = "";
        if (str) {
            rtn = str.split(' ')
                .map(function (w) { return w[0].toUpperCase() + w.substr(1).toLowerCase(); })
                .join(' ');
        }
        return rtn;
    };
    ValidatorCommon.acceptableFormats = [
        /^(\d{2})(\d{2})(\d{4})$/,
        /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
        /^(\d{1,2})-(\d{1,2})-(\d{4})$/,
        /^(\d{1,2})\s(\d{1,2})\s(\d{4})$/
    ];
    return ValidatorCommon;
}());
export { ValidatorCommon };
//# sourceMappingURL=validator-common.js.map