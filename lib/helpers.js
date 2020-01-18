/**
 * ====================================================
 * file role: Helpers for validation
 * ====================================================
 */

const helpers = {};


helpers.validation = {};

// remove strip tags
helpers.validation.strip_html_tags = function(str) {
        if ((str === null) || (str === ''))
            return false;
        else
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }
    // validate the email
helpers.validation.checkEmail = function(string, cb) {
    var elementVal = string;
    elementVal = elementVal.trim();
    var regEx = new RegExp("@", "gi");
    if (elementVal !== "" || elementVal.length < 1) {
        if (cb) {
            var test = regEx.test(elementVal);
            return cb(test);
        } else {
            return regEx.test(elementVal);
        }
    }
}
helpers.validation.notEmptyString = function(string, cb) {
        elementVal = string !== undefined ? string : "";
        elementVal = elementVal.trim();
        if (elementVal === "" || elementVal.length < 1) {
            if (!cb) {
                return false;
            }
            if (cb) {
                var empty = false;
                return cb(empty)
            }
        } else {
            if (cb) {
                return cb(elementVal);
            } else {
                return elementVal;
            }
        }
    }
    // method to check if the value is contains a number
helpers.validation.checkContainsNumber = function(string, count, cb) {
        var elementVal = string.trim();
        if (typeof count === "function" && !cb) {
            cb = count;
        }
        count = typeof count === "number" ? count : 1;
        var numArr = [];
        if (elementVal !== "" || elementVal.length < 1) {
            Array.from(elementVal).forEach(function(letter) {
                if (Number.isInteger(Number(letter))) {
                    numArr.push(letter);
                }
            });
            if (numArr.length === count) {
                let result = true;
                if (cb) {
                    return cb(result);
                } else {
                    return result;
                }
            } else {
                let result = false;
                if (cb) {
                    return cb(result);
                } else {
                    return result;
                }
            }
        }
    }
    // method to check if the input is Object
helpers.validation.isObject = function(obj) {
        if (typeof obj == "object") {
            return obj;
        } else {
            return false;
        }
    }
    // method to check if the object is not empty
helpers.validation.notEmpty = function(obj) {
        if (Object.keys(obj).length > 0) {
            return obj;
        } else {
            return false;
        }
    }
    // method to check if the input is string
helpers.validation.isString = function(str) {
        if (typeof str === "string") {
            return str;
        } else {
            return false;
        }
    }
    // method to check if the input is number
helpers.validation.checkIsNumber = function(element, cb) {
        var elementVal = element;
        if (elementVal !== "") {
            var testNumber = Number.isInteger(Number(elementVal));
            if (cb) {
                return cb(testNumber);
            } else {
                return testNumber;
            }
        }
    }

// export it

module.exports = helpers;