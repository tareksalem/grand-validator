"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * =========================================
 * file role: base class for validation
 * =========================================
 */
// dependencies
var helpers_1 = require("./helpers");
//  define validation class
var Validator = /** @class */ (function () {
    function Validator() {
        this.validation = helpers_1.helpers.validation;
        this.imagMimeTypes = {
            "image/png": ".png",
            "image/jpeg": ".jpeg",
            "image/jpg": ".jpg",
            "image/webp": ".webp",
            "image/tiff": ".tif",
            "image/bmp": ".bnp",
            "image/gif": ".gif"
        };
    }
    // method to validate all types of inputs
    Validator.prototype.validateRequired = function (inputs) {
        var _this = this;
        // define validation result
        var validations = [];
        var _loop_1 = function (input) {
            if (Array.isArray(input.type)) {
                var types = input.type;
                var inputType = typeof input.data;
                if (input.data == null) {
                    inputType = "null";
                }
                if (Array.isArray(input.data)) {
                    inputType = "array";
                }
                // check if the input type is one of the available types
                if (!types.includes(inputType)) {
                    var result = {
                        message: input.message ||
                            input.name + " is required and should be one of these types " + types.join(" , "),
                        fieldName: input.name
                    };
                    // push the result into validations array
                    validations.push(result);
                }
            }
            if (input.type == "string-number") {
                if (this_1.validation.isString(input.data) && this_1.validation.notEmptyString(input.data)) {
                    // continue
                }
                else {
                    if (Number.isNaN(input.data - input.data)) {
                        var result = {
                            message: input.message ||
                                input.name + " is required and should be string or number",
                            fieldName: input.name
                        };
                        // push the result into validations array
                        validations.push(result);
                    }
                }
            }
            // check if type of input is string
            if (input.type == "string") {
                if (this_1.validation.isString(input.data) && this_1.validation.notEmptyString(input.data)) {
                    // continue
                }
                else {
                    var result = {
                        message: input.message ||
                            input.name + " is required and should be a valid " + input.type,
                        fieldName: input.name
                    };
                    validations.push(result);
                }
            }
            // method to check if the input is number
            if (input.type == "number") {
                if (Number.isNaN(input.data - input.data)) {
                    var result = {
                        message: input.message ||
                            input.name + " is required and should be a valid " + input.type,
                        fieldName: input.name
                    };
                    // push the result into validations array
                    validations.push(result);
                }
            }
            // check if type of input is object
            if (input.type == "object") {
                if (this_1.validation.isObject(input.data) && this_1.validation.notEmpty(input.data)) {
                    // continue
                }
                else {
                    var result = {
                        message: input.message ||
                            input.name + " is required and should be an " + input.type,
                        fieldName: input.name
                    };
                    validations.push(result);
                }
            }
            // check if the input is email
            if (input.type == "email") {
                // continue
                if (this_1.validation.isString(input.data) &&
                    this_1.validation.notEmptyString(input.data) &&
                    this_1.validation.checkEmail(input.data)) {
                    // continue
                }
                else {
                    var result = {
                        message: input.message ||
                            input.name + " is required and should be a valid " + input.type,
                        fieldName: input.name
                    };
                    validations.push(result);
                }
            }
            // check if the input is phone number
            if (input.type == "phone") {
                if (this_1.validation.isString(input.data) &&
                    this_1.validation.notEmptyString(input.data) &&
                    input.data.length == 11 &&
                    input.data.startsWith("0")) {
                    // continue
                }
                else {
                    var result = {
                        message: input.message ||
                            input.name + " is required and should be a valid " + input.type + ", with 11 digit",
                        fieldName: input.name
                    };
                    validations.push(result);
                }
            }
            // check if the type is file
            if (input.type == "image") {
                // check if there are data
                if (!input.data) {
                    // return error
                    var result = {
                        message: input.message ||
                            input.name + " is required and should be an " + input.type,
                        fieldName: input.name
                    };
                    // push validation errors into validations array
                    validations.push(result);
                }
                else {
                    // check if the mime type is image
                    if (this_1.imagMimeTypes[input.data.mimetype]) {
                        // continue
                    }
                    else {
                        var result = {
                            message: input.message || input.name + " should be an " + input.type,
                            fieldName: input.name
                        };
                        validations.push(result);
                    }
                }
            }
            if (input.type == "array") {
                if (Array.isArray(input.data) && input.data.length > 0) {
                    // continue
                    // check if there is of property
                    if (this_1.validation.isString(input.of) && this_1.validation.notEmptyString(input.of)) {
                        var existType = input.data.find(function (item) {
                            if (input.of == "object") {
                                if (typeof item == "object" && !Array.isArray(item) && item !== null) {
                                    return item;
                                    // continue
                                }
                                else {
                                    return undefined;
                                }
                            }
                            else if (input.of == "array") {
                                if (Array.isArray(item)) {
                                    return item;
                                    // continue
                                }
                                else {
                                    return undefined;
                                }
                            }
                            else if (input.of == "string") {
                                if (_this.validation.isString(item)) {
                                    return item;
                                    // continue
                                }
                                else {
                                    return undefined;
                                }
                            }
                            else if (input.of == "number") {
                                if (item && Number.isNaN(item - item)) {
                                    // continue
                                    return item;
                                }
                                else {
                                    return undefined;
                                }
                            }
                        });
                        if (!existType) {
                            var result = {
                                message: input.message ||
                                    input.name + " should be an " + input.type + " and should includes valid items",
                                fieldName: input.name
                            };
                            validations.push(result);
                        }
                    }
                }
                else {
                    var result = {
                        message: input.message ||
                            input.name + " should be an " + input.type + " and shouldn't be empty",
                        fieldName: input.name
                    };
                    validations.push(result);
                }
            }
            // check the object has two properties
            if (input.type == "object" && input.length == ">=2") {
                if (this_1.validation.isObject(input.data) &&
                    this_1.validation.notEmpty(input.data) &&
                    Object.keys(input.data).length >= 2) {
                    // continue
                }
                else {
                    var result = {
                        message: input.message ||
                            input.name + " should be an " + input.type + " and shouldn't be empty",
                        fieldName: input.name
                    };
                    validations.push(result);
                }
            }
            if (input.type == "boolean") {
                if (input.data == true || input.data == false) {
                    // continue
                }
                else {
                    var result = {
                        message: input.message || input.name + " should be a " + input.type,
                        fieldName: input.name
                    };
                    validations.push(result);
                }
            }
        };
        var this_1 = this;
        // loop through data array
        for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
            var input = inputs_1[_i];
            _loop_1(input);
        }
        // return validations array
        return validations;
    };
    // method to validate optional fields
    Validator.prototype.validateOptional = function (inputs) {
        var validations = [];
        // loop through data array
        for (var _i = 0, inputs_2 = inputs; _i < inputs_2.length; _i++) {
            var input = inputs_2[_i];
            // check if the type of input is number
            if (input.type == "number") {
                // check if the input is exist
                if (input.data && Number.isNaN(input.data - input.data)) {
                    var result = {
                        message: input.message || input.name + " should be an " + input.type,
                        fieldName: input.name
                    };
                    validations.push(result);
                }
            }
        }
        // return validations errors
        return validations;
    };
    return Validator;
}());
// export validation class
exports.default = new Validator();
