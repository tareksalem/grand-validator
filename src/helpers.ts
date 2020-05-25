/**
 * ====================================================
 * file role: Helpers for validation
 * ====================================================
 */

interface OptionalObject {
    [key: string]: any
}
export interface Validation {
    strip_html_tags(str: string): any
    checkEmail(str: string, cb?: Function): any
    notEmptyString(str: string, cb?: Function): any
    checkContainsNumber(str: string, count: number, cb?: Function): any
    isObject(obj: OptionalObject): any
    notEmpty(obj: OptionalObject): any
    isString(str: string): any
    checkIsNumber(number: string | number, cb: Function): any
}
const helpers: { validation?: Validation } = {};


helpers.validation = {
    strip_html_tags: function (str) {
        if ((str === null) || (str === ''))
            return false;
        else
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    },
    checkEmail: function (string, cb) {
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
    },
    notEmptyString: function (string, cb) {
        let elementVal = string !== undefined ? string : "";
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
    },
    // method to check if the value is contains a number
    checkContainsNumber: function (string: string, count: number, cb: Function) {
        var elementVal = string.trim();
        if (typeof count === "function" && !cb) {
            cb = count;
        }
        count = typeof count === "number" ? count : 1;
        var numArr = [];
        if (elementVal !== "" || elementVal.length < 1) {
            Array.from(elementVal).forEach(function (letter) {
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
    },
    // method to check if the input is Object
    isObject: function (obj: OptionalObject) {
        if (typeof obj == "object") {
            return obj;
        } else {
            return false;
        }
    },
    // method to check if the object is not empty
    notEmpty: function (obj: OptionalObject) {
        if (Object.keys(obj).length > 0) {
            return obj;
        } else {
            return false;
        }
    },
    // method to check if the input is string
    isString: function (str: string) {
        if (typeof str === "string") {
            return str;
        } else {
            return false;
        }
    },
    // method to check if the input is number
    checkIsNumber: function (number: string | number, cb: Function) {
        var elementVal = number;
        if (elementVal !== "") {
            var testNumber = Number.isInteger(Number(elementVal));
            if (cb) {
                return cb(testNumber);
            } else {
                return testNumber;
            }
        }
    }
};



export {helpers};