export var caches = {
    productListThis: undefined,
    pageDirty: false,
    showLoader: false
};
export var getFormattedDate = function (date) {
    if (date == "")
        return "";
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
export var isNumeric = function (value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
};
//Convert to UpperCamelCase.
export var camelize = function (str) {
    return str.replace(/\b\w/g, function (chr) { return chr.toUpperCase(); }).replace(/ /g, "");
};
export var deepClone = function (source) {
    // return value is input is not an Object or Array.
    if (typeof (source) !== 'object' || source === null) {
        return source;
    }
    var clone;
    if (Array.isArray(source)) {
        clone = source.slice(); // unlink Array reference.
    }
    else {
        clone = Object.assign({}, source); // Unlink Object reference.
    }
    var keys = Object.keys(clone);
    for (var i = 0; i < keys.length; i++) {
        clone[keys[i]] = deepClone(clone[keys[i]]); // recursively unlink reference to nested objects.
    }
    return clone; // return unlinked clone.
};
export var isArray = function (source) {
    return Array.isArray(source);
};
//# sourceMappingURL=globals.js.map