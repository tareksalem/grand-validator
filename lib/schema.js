"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Types = exports.Schema = void 0;
/**
 * ===========================================================
 * validation class
 * ===========================================================
 */
// import helpers from "./helpers";
var helpers_1 = require("./helpers");
var types_1 = __importDefault(require("./types"));
exports.Types = types_1.default;
var Schema = /** @class */ (function () {
    function Schema(schema) {
        if (helpers_1.helpers.validation.isObject(schema)) {
            this.Types = types_1.default;
            this._typesValidators = {
                string: this._validateString,
                number: this._validateNumber,
                object: this._validateObject,
                array: this._validateObject
            };
            schema = schema || {};
            // continue
            this.schema = Object.assign({}, schema);
            // loop through model properties
        }
        else {
            throw new Error("model should be an object");
        }
        this.validations = [];
    }
    // method public method to validate the schema
    Schema.prototype.validate = function (model) {
        this.model = model;
        this._validateModel(model, this.schema, true);
    };
    Schema.prototype._validateModel = function (model, comingSchema, pushToValidation) {
        var _this = this;
        var self = this;
        comingSchema = comingSchema || {};
        return Object.keys(comingSchema).map(function (key) {
            var value = model[key];
            var schemaValue = typeof comingSchema[key] == "object" ? comingSchema[key] : comingSchema;
            var schema = schemaValue.type;
            var required = typeof schemaValue.required == "boolean" ? schemaValue.required : true;
            var keyName = schemaValue.keyName || key;
            // console.log(schema, value, keyName)
            var message = schemaValue.message;
            if ((!Array.isArray(schema)) && ((helpers_1.helpers.validation.isObject(schema)) || (schema == Object || schema === "Object" || schema === "object"))) {
                // check if the required is true
                if (required == true) {
                    return _this._validateObject.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, pushToValidation]);
                }
                else {
                    if (value) {
                        var validation = _this._validateObject.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, false]);
                        // check on the validation
                        if (validation) {
                            return _this._validateObject.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, pushToValidation]);
                        }
                    }
                }
            }
            else if ((Array.isArray(schema) || schema == Array || schema === "Array" || schema === "array") && (schemaValue.multiTypes !== true)) {
                if (required == true) {
                    return _this._validateArray.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, pushToValidation]);
                }
                else {
                    if (value) {
                        var validation = _this._validateArray.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, false]);
                        // check on the validation
                        if (validation) {
                            return _this._validateArray.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, pushToValidation]);
                        }
                    }
                }
            }
            else if (schema == String || schema === "string" || schema === "String") {
                // call the validate string method
                if (required == true) {
                    return _this._validateString.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, pushToValidation]);
                }
                else {
                    if (value) {
                        var validation = _this._validateString.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, false]);
                        // check on the validation
                        if (validation) {
                            return _this._validateString.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, pushToValidation]);
                        }
                    }
                }
            }
            else if (schema == Number || schema === "Number" || schema === "number") {
                if (required == true) {
                    return _this._validateNumber.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, pushToValidation]);
                }
                else {
                    if (value) {
                        var validation = _this._validateNumber.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, false]);
                        // console.log(required)
                        // check on the validation
                        if (validation) {
                            return _this._validateNumber.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, pushToValidation]);
                        }
                    }
                }
            }
            else if (schema == _this.Types.ObjectId || schema === "ObjectId" || schema === "objectId") {
                if (required == true) {
                    return _this._validateObjectId.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, pushToValidation]);
                }
                else {
                    if (value) {
                        var validation = _this._validateObjectId.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, false]);
                        // check on the validation
                        if (validation) {
                            return _this._validateObjectId.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, pushToValidation]);
                        }
                    }
                }
            }
            else if (schema == Function || schema === "Function" || schema === "function") {
                if (required == true) {
                    return _this._validateFunction.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, pushToValidation]);
                }
                else {
                    if (value) {
                        var validation = _this._validateFunction.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, false]);
                        // check on the validation
                        if (validation) {
                            return _this._validateFunction.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, pushToValidation]);
                        }
                    }
                }
            }
            else if (schema == _this.Types.Any || schema === "Any" || schema === "any") {
                // continue
            }
            else if (Array.isArray(schema) && schema.length > 0 && schemaValue.multiTypes == true) {
                if (required == true) {
                    return _this._validateMultiType.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, pushToValidation]);
                }
                else {
                    if (value) {
                        var validation = _this._validateMultiType.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, false]);
                        // check on the validation
                        if (validation) {
                            return _this._validateMultiType.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, pushToValidation]);
                        }
                    }
                }
            }
            else if (schema == Boolean || schema === "Boolean" || schema === "boolean") {
                if (required == true) {
                    return _this._validateBoolean.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, pushToValidation]);
                }
                else {
                    if (value) {
                        var validation = _this._validateBoolean.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, false]);
                        // check on the validation
                        if (validation) {
                            return _this._validateBoolean.apply(self, [{ keyName: keyName, value: value, schema: schema, schemaValue: schemaValue, message: message }, pushToValidation]);
                        }
                    }
                }
            }
        });
    };
    // method to build validation model
    Schema.prototype._buildValidationModel = function (keyName, valueType, currentValueType, message, push) {
        message = message || keyName + " should be " + valueType;
        var validationModel = {
            keyName: keyName,
            message: message,
            valueType: valueType,
            currentValueType: currentValueType
        };
        if (push == true) {
            // push it to validations array
            this.validations.push(validationModel);
        }
        return validationModel;
    };
    // ethod to validate boolean
    Schema.prototype._validateBoolean = function (data, pushToValidation) {
        var keyName = data.keyName, value = data.value, schemaValue = data.schemaValue, schema = data.schema, message = data.message;
        // check if the typeof value is boolean
        if (typeof value == "boolean") {
        }
        else {
            // call build validation model
            return this._buildValidationModel.apply(this, [keyName, "boolean", typeof value, message, pushToValidation]);
        }
    };
    // method to validate multiType data
    Schema.prototype._validateMultiType = function (data, pushToValidation) {
        var _this = this;
        var keyName = data.keyName, value = data.value, schemaValue = data.schemaValue, schema = data.schema, message = data.message;
        var type;
        var types = [];
        schema.forEach(function (schema) {
            if ((!Array.isArray(schema)) && ((helpers_1.helpers.validation.isObject(schema)) || (schema == Object) || schema === "Object" || schema === "object")) {
                types.push("object");
            }
            else if ((Array.isArray(schema) || schema == Array || schema === "Array" || schema === "array") && schemaValue.multiTypes !== true) {
                types.push("array");
            }
            else if (schema == String || schema === "string" || schema === "String") {
                types.push("string");
            }
            else if (schema == Number || schema === "Number" || schema === "number") {
                types.push("number");
            }
            else if (schema == _this.Types.ObjectId || schema === "ObjectId" || schema === "objectId") {
                types.push("objectId");
            }
            else if (schema == Function || schema === "Function" || schema === "function") {
                types.push("function");
            }
            else if (schema == _this.Types.Any || schema === "Any" || schema === "any") {
                types.push("any");
            }
        });
        if ((!Array.isArray(value)) && ((helpers_1.helpers.validation.isObject(value)))) {
            type = Object;
        }
        else if (Array.isArray(value)) {
            type = Array;
        }
        else if (helpers_1.helpers.validation.isString(value)) {
            type = String;
        }
        else if (typeof value == "number") {
            type = Number;
        }
        else if (value == this.Types.ObjectId) {
            type = this.Types.ObjectId;
        }
        else if (typeof value == "function") {
            type = Function;
        }
        if (!schema.includes(type)) {
            return this._buildValidationModel.apply(this, [keyName, "" + types.join(", "), typeof value, message, pushToValidation]);
        }
    };
    // method to validate function
    Schema.prototype._validateFunction = function (data, pushToValidation) {
        var keyName = data.keyName, value = data.value, schemaValue = data.schemaValue, schema = data.schema, message = data.message;
        if (typeof value !== "function") {
            // call build validation model
            return this._buildValidationModel.apply(this, [keyName, "function", typeof value, message, pushToValidation]);
        }
    };
    // method to validate objectId
    Schema.prototype._validateObjectId = function (data, pushToValidation) {
        var regext = new RegExp("^[0-9a-fA-F]{24}$");
        var keyName = data.keyName, value = data.value, schemaValue = data.schemaValue, schema = data.schema, message = data.message;
        // check if the value is object id
        if (!regext.test(value)) {
            // call build validation model
            return this._buildValidationModel.apply(this, [keyName, "objectId", typeof value, message, pushToValidation]);
        }
    };
    // method to validate string
    Schema.prototype._validateString = function (data, pushToValidation) {
        var keyName = data.keyName, value = data.value, schemaValue = data.schemaValue, schema = data.schema, message = data.message;
        if (helpers_1.helpers.validation.isString(value)) {
            // check if there is inot empty option
            if (schemaValue.notEmpty == true) {
                if (!helpers_1.helpers.validation.notEmptyString(value)) {
                    return this._buildValidationModel.apply(this, [keyName, "string", typeof value, message, pushToValidation]);
                }
            }
            // check if the schema has in propery
            if (Array.isArray(schemaValue.in) || Array.isArray(schemaValue.enum)) {
                schemaValue.in = schemaValue.in || schemaValue.enum;
                value = value.trim();
                var inData = Array.from(schemaValue.in);
                if (!inData.includes(value)) {
                    return this._buildValidationModel.apply(this, [keyName, "string", typeof value, message, pushToValidation]);
                }
            }
            // check the minimum length of the string
            if (typeof schemaValue.min === "number" && schemaValue.min.length > -1) {
                if (value.length < schemaValue.min) {
                    return this._buildValidationModel.apply(this, [keyName, "string", typeof value, message, pushToValidation]);
                }
            }
            // check the maximum length of the string
            if (typeof schemaValue.max === "number" && schemaValue.min.length > -1) {
                if (value.length > schemaValue.min) {
                    return this._buildValidationModel.apply(this, [keyName, "string", typeof value, message, pushToValidation]);
                }
            }
            // check if the schema has length property to check the string length
            if (typeof schemaValue.length == "number") {
                var length = Number.parseInt(schemaValue.length);
                if (value.length > length) {
                    message = message || keyName + " length shouldn't be greater than " + length;
                    return this._buildValidationModel.apply(this, [keyName, "string", typeof value, message, pushToValidation]);
                }
            }
            // check if there is regex
            if (schemaValue.regex) {
                var regex = new RegExp(schemaValue.regex);
                var result = regex.test(value);
                if (!result) {
                    return this._buildValidationModel.apply(this, [keyName, "string", typeof value, message, pushToValidation]);
                }
            }
        }
        else {
            return this._buildValidationModel.apply(this, [keyName, "string", typeof value, message, pushToValidation]);
        }
    };
    // method to validate object
    Schema.prototype._validateObject = function (data, pushToValidation) {
        var keyName = data.keyName, value = data.value, schemaValue = data.schemaValue, schema = data.schema, message = data.message;
        // console.log(schemaValue)
        if (!helpers_1.helpers.validation.isObject(value)) {
            // call build validation model
            return this._buildValidationModel.apply(this, [keyName, "object", typeof value, message, pushToValidation]);
        }
        else {
            this._validateModel(value, schema, pushToValidation);
        }
    };
    // method to validate array
    Schema.prototype._validateArray = function (data, pushToValidation) {
        var _this = this;
        var keyName = data.keyName, value = data.value, schemaValue = data.schemaValue, schema = data.schema, message = data.message;
        if (schema == Array || schema === "Array" || schema === "array") {
            if (!Array.isArray(value)) {
                return this._buildValidationModel.apply(this, [keyName, "array", typeof value, message, pushToValidation]);
            }
        }
        else if (Array.isArray(schema) && schema[0] !== undefined) {
            // check if the schema array length is greater than one
            if (Array.isArray(value) && value[0] !== undefined) {
                // check if loop option is true
                if (schemaValue.loop == true) {
                    Array.from(value).forEach(function (element, i) {
                        _this._validateModel(element, schema[i], true);
                    });
                }
                else {
                    var result = Array.from(value).map(function (element) {
                        var validations = _this._validateModel(element, schema[0], false);
                        return validations.find(function (validation) { return validation !== undefined; });
                    }).filter(function (el) { return el !== undefined; })[0];
                    // check if the result is exist
                    if (result) {
                        message = message || keyName + " indexes should be " + result.valueType;
                        return this._buildValidationModel.apply(this, [keyName, result.valueType, result.currentValueType, message, pushToValidation]);
                    }
                }
            }
            else {
                // call build validation model
                return this._buildValidationModel.apply(this, [keyName, "array", typeof value, message, pushToValidation]);
            }
        }
    };
    // method to validate number
    Schema.prototype._validateNumber = function (data, pushToValidation) {
        var keyName = data.keyName, value = data.value, schemaValue = data.schemaValue, schema = data.schema, message = data.message;
        if (typeof value == "number" || typeof Number.parseInt(value) === "number") {
            // check the minimum length of the string
            if (typeof schemaValue.min === "number" && schemaValue.min.length > -1) {
                if (value < schemaValue.min) {
                    return this._buildValidationModel.apply(this, [keyName, "number", typeof value, message, pushToValidation]);
                }
            }
            // check the maximum length of the string
            if (typeof schemaValue.max === "number" && schemaValue.min.length > -1) {
                if (value > schemaValue.min) {
                    return this._buildValidationModel.apply(this, [keyName, "number", typeof value, message, pushToValidation]);
                }
            }
        }
        else {
            return this._buildValidationModel.apply(this, [keyName, "number", typeof value, message, pushToValidation]);
        }
    };
    return Schema;
}());
exports.Schema = Schema;
