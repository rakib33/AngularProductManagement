import { ValidatorCommon } from "./validator-common";
var Validator2 = /** @class */ (function () {
    function Validator2() {
    }
    //required.
    Validator2.required = function (args) {
        return function (fc) {
            var isValid = (fc.value != undefined && fc.value != "");
            if (isValid) {
                return null;
            }
            else {
                //Usually label is Title Case. If not, use custom passed error message text.
                var label = "Field";
                if (args && args.label)
                    label = args.label;
                var errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : label + " is required."
                    }
                };
                return errRtn;
            }
        };
    };
    //minLength.
    Validator2.minLength = function (args) {
        return function (fc) {
            if (fc.value) {
                var isValid = (fc.value.length >= args.value);
                var label = "Field";
                if (args && args.label)
                    label = args.label;
                var errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : label + " length no less than " + args.value + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        };
    };
    //maxLength.
    Validator2.maxLength = function (args) {
        return function (fc) {
            if (fc.value) {
                var isValid = (fc.value.length <= args.value);
                var label = "Field";
                if (args && args.label)
                    label = args.label;
                var errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : label + " length no more than " + args.value + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        };
    };
    //number.
    Validator2.number = function (args) {
        return function (fc) {
            if (fc.value) {
                var isValid = (!isNaN(Number(fc.value)) && isFinite(fc.value));
                //Above checker return true for '0000' or '0001'.
                if (fc.value.length > 1 && fc.value.indexOf('0') == 0 && fc.value.indexOf('.') != 1) {
                    isValid = false;
                }
                var label = "number";
                if (args && args.label)
                    label = args.label;
                var errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : "Invalid " + label + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        };
    };
    //minNumber.
    Validator2.minNumber = function (args) {
        return function (fc) {
            if (fc.value && !isNaN(Number(fc.value)) && isFinite(fc.value)) {
                var label = "Number";
                if (args && args.label)
                    label = args.label;
                var isValid = (fc.value >= args.value);
                var errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : label + " no less then " + args.value + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        };
    };
    //maxNumber.
    Validator2.maxNumber = function (args) {
        return function (fc) {
            if (fc.value && !isNaN(Number(fc.value)) && isFinite(fc.value)) {
                var isValid = (fc.value <= args.value);
                var label = "Number";
                if (args && args.label)
                    label = args.label;
                var errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : label + " no more then " + args.value + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        };
    };
    //numberRange.
    Validator2.numberRange = function (args) {
        return function (fc) {
            if (fc.value) {
                var isValid = (fc.value >= args.minValue && fc.value <= args.maxValue);
                var label = "Number";
                if (args && args.label)
                    label = args.label;
                var errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : label + " should be between " + args.minValue.toString() + " and " + args.maxValue.toString() + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        };
    };
    //date.
    Validator2.date = function (args) {
        return function (fc) {
            if (fc.value) {
                var isValid = (ValidatorCommon.validateDate(fc.value) && !isNaN(Date.parse(fc.value)));
                var label = "date";
                if (args && args.label)
                    label = args.label;
                var errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : "Invalid " + label + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        };
    };
    //minDate.
    Validator2.minDate = function (args) {
        return function (fc) {
            if (fc.value) {
                var dateStr = ValidatorCommon.validateDate(fc.value);
                if (dateStr) {
                    var isValid = (Date.parse(dateStr) >= Date.parse(args.value.toString().replace(/'/g, "")));
                    var label = "Date";
                    if (args && args.label)
                        label = args.label;
                    var errRtn = {
                        "custom": {
                            "message": args && args.message ? args.message : label + " no earlier then " + args.value.toString() + "."
                        }
                    };
                    return isValid ? null : errRtn;
                }
            }
        };
    };
    //maxDate.
    Validator2.maxDate = function (args) {
        return function (fc) {
            if (fc.value) {
                var dateStr = ValidatorCommon.validateDate(fc.value);
                if (dateStr) {
                    var isValid = (Date.parse(dateStr) <= Date.parse(args.value.toString().replace(/'/g, "")));
                    var label = "Date";
                    if (args && args.label)
                        label = args.label;
                    var errRtn = {
                        "custom": {
                            "message": args && args.message ? args.message : label + " no later then " + args.value.toString() + "."
                        }
                    };
                    return isValid ? null : errRtn;
                }
            }
        };
    };
    //dateRange.
    Validator2.DateRange = function (args) {
        return function (fc) {
            if (fc.value) {
                var dateStr = ValidatorCommon.validateDate(fc.value);
                if (dateStr) {
                    var isValid = (Date.parse(dateStr) >= Date.parse(args.minValue.toString().replace(/'/g, "")) &&
                        Date.parse(dateStr) <= Date.parse(args.maxValue.toString().replace(/'/g, "")));
                    var label = "Date";
                    if (args && args.label)
                        label = args.label;
                    var errRtn = {
                        "custom": {
                            "message": args && args.message ? args.message : label + " should be between " + args.minValue.toString() + " and " + args.maxValue.toString() + "."
                        }
                    };
                    return isValid ? null : errRtn;
                }
            }
        };
    };
    //email.
    Validator2.email = function (args) {
        return function (fc) {
            if (fc.value) {
                var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                if (args && args.value) {
                    //Set first arg as message if error text passed from the first arg.
                    if (typeof args.value === "string") {
                        args.message = args.value;
                    }
                    else {
                        reg = args.value;
                    }
                }
                var isValid = reg.test(fc.value);
                var label = "email address";
                if (args && args.label)
                    label = args.label;
                var errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : "Invalid " + label + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        };
    };
    //usPhone
    Validator2.usPhone = function (args) {
        return function (fc) {
            if (fc.value) {
                var reg = /^([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                if (args && args.value) {
                    //Set first arg as message if error text passed from the first arg.
                    if (typeof args.value === "string") {
                        args.message = args.value;
                    }
                    else {
                        reg = args.value;
                    }
                }
                var isValid = reg.test(fc.value);
                var label = "phone number";
                if (args && args.label)
                    label = args.label;
                var errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : "Invalid " + label + "."
                    }
                };
                return isValid ? null : errRtn;
            }
        };
    };
    //fieldMatch.
    Validator2.fieldMatch = function (args) {
        return function (fc) {
            if (fc.value && args.value) {
                var isValid = (fc.value === args.value);
                var label = "Field values";
                if (args && args.label)
                    label = args.label;
                var errRtn = {
                    "custom": {
                        "message": args && args.message ? args.message : label + " not match."
                    }
                };
                return isValid ? null : errRtn;
            }
        };
    };
    return Validator2;
}());
export { Validator2 };
//# sourceMappingURL=reactive-validator.js.map