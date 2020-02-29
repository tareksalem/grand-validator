/**
 * ===========================================================
 * validation class
 * ===========================================================
 */
// import helpers from "./helpers";
const helpers = require("./helpers");
const Types = require("./types");
 class SchemaValidator{
     constructor(schema) {
        if(helpers.validation.isObject(schema)) {
            this.Types = Types;
            this._typesValidators = {
                string: this._validateString,
                number: this._validateNumber,
                object: this._validateObject,
                array: this._validateObject
            }
            schema = schema || {};
            // continue
            this.schema = Object.assign({}, schema);
            // loop through model properties
        } else {
            return new Error("model should be an object")
        }
        this.validations = [];
    }
    // method public method to validate the schema
    validate(model) {
        this.model = model;
        this._validateModel(model, this.schema, true);
    }
    _validateModel(model, comingSchema, pushToValidation) {
        const self = this;
        return Object.keys(comingSchema).map((key) => {
            let value = model[key];
            let schemaValue = typeof comingSchema[key] == "object" ? comingSchema[key] : comingSchema;
            let schema = schemaValue.type;
            let required = typeof schemaValue.required == "boolean" ? schemaValue.required : true;
            let keyName = schemaValue.keyName || key;
            // console.log(schema, value, keyName)
            let message = schemaValue.message;
            if((!Array.isArray(schema)) && ((helpers.validation.isObject(schema)) || (schema == Object))) {
                // check if the required is true
                if(required == true) {
                    return this._validateObject.apply(self, [{keyName, value, schema, schemaValue, message}, pushToValidation]);
                } else {
                    if(value) {
                        var validation =  this._validateObject.apply(self, [{keyName, value, schema, schemaValue, message}, false]);
                        // check on the validation
                        if(validation) {
                            return this._validateObject.apply(self, [{keyName, value, schema, schemaValue, message}, pushToValidation]);
                        }
                    }
                }
            }else if((Array.isArray(schema) || schema == Array) && (schemaValue.multiTypes !== true)) {
                if(required == true) {
                    return this._validateArray.apply(self, [{keyName, value, schema, schemaValue, message}, pushToValidation]);
                } else {
                    if(value) {
                        var validation =  this._validateArray.apply(self, [{keyName, value, schema, schemaValue, message}, false]);
                        // check on the validation
                        if(validation) {
                            return this._validateArray.apply(self, [{keyName, value, schema, schemaValue, message}, pushToValidation]);
                        }
                    }
                }
            }else if(schema == String) {
                // call the validate string method
                if(required == true) {
                    return this._validateString.apply(self, [{keyName, value, schema, schemaValue, message}, pushToValidation]);
                } else {
                    if(value) {
                        var validation =  this._validateString.apply(self, [{keyName, value, schema, schemaValue, message}, false]);
                        // check on the validation
                        if(validation) {
                            return this._validateString.apply(self, [{keyName, value, schema, schemaValue, message}, pushToValidation]);
                        }
                    }
                }
            }else if(schema == Number) {
                if(required == true) {
                    return this._validateNumber.apply(self, [{keyName, value, schema, schemaValue, message}, pushToValidation]);
                } else {
                    if(value) {
                        var validation =  this._validateNumber.apply(self, [{keyName, value, schema, schemaValue, message}, false]);
                        // console.log(required)
                        // check on the validation
                        if(validation) {
                            return this._validateNumber.apply(self, [{keyName, value, schema, schemaValue, message}, pushToValidation]);
                        }
                    }
                }
            } else if(schema == this.Types.ObjectId) {
                if(required == true) {
                    return this._validateObjectId.apply(self, [{keyName, value, schema, schemaValue, message}, pushToValidation]);
                } else {
                    if(value) {
                    var validation =  this._validateObjectId.apply(self, [{keyName, value, schema, schemaValue, message}, false]);
                    // check on the validation
                    if(validation) {
                        return this._validateObjectId.apply(self, [{keyName, value, schema, schemaValue, message}, pushToValidation]);
                    }
                }
                }
            } else if(schema == Function) {
                if(required == true) {
                    return this._validateFunction.apply(self, [{keyName, value, schema, schemaValue, message}, pushToValidation]);
                } else {
                    if(value) {
                        var validation =  this._validateFunction.apply(self, [{keyName, value, schema, schemaValue, message}, false]);
                        // check on the validation
                        if(validation) {
                            return this._validateFunction.apply(self, [{keyName, value, schema, schemaValue, message}, pushToValidation]);
                        }
                    }
                }
            } else if(schema == this.Types.Any) {
                // continue
            } else if(Array.isArray(schema) && schema.length > 0 && schemaValue.multiTypes == true) {
                if(required == true) {
                    return this._validateMultiType.apply(self, [{keyName, value, schema, schemaValue, message}, pushToValidation]);
                } else {
                    if(value) {
                        var validation =  this._validateMultiType.apply(self, [{keyName, value, schema, schemaValue, message}, false]);
                        // check on the validation
                        if(validation) {
                            return this._validateMultiType.apply(self, [{keyName, value, schema, schemaValue, message}, pushToValidation]);
                        }
                    }
                }
            } else if(schema == Boolean) {
                if(required == true) {
                    return this._validateBoolean.apply(self, [{keyName, value, schema, schemaValue, message}, pushToValidation]);
                } else {
                   if(value) {
                    var validation =  this._validateBoolean.apply(self, [{keyName, value, schema, schemaValue, message}, false]);
                    // check on the validation
                    if(validation) {
                        return this._validateBoolean.apply(self, [{keyName, value, schema, schemaValue, message}, pushToValidation]);
                    }
                   }
                }
            }
        })
    }
    // method to build validation model
    _buildValidationModel(keyName, valueType, currentValueType, message, push) {
        message = message || `${keyName} should be ${valueType}`;
        let validationModel = {
            keyName,
            message: message,
            valueType,
            currentValueType
        }
        if(push == true) {
            // push it to validations array
            this.validations.push(validationModel);
        }
        return validationModel;
    }
    // ethod to validate boolean
    _validateBoolean(data, pushToValidation) {
        let {keyName, value, schemaValue, schema, message} = data;
        // check if the typeof value is boolean
        if(typeof value == "boolean") {

        } else {
            // call build validation model
            return this._buildValidationModel.apply(this, [keyName, "boolean", typeof value, message, pushToValidation]);
        }
    }
    // method to validate multiType data
    _validateMultiType(data, pushToValidation) {
        let {keyName, value, schemaValue, schema, message} = data;
        let type;
        let types = [];
                schema.forEach((schema) => {
                    if((!Array.isArray(schema)) && ((helpers.validation.isObject(schema)) || (schema == Object))) {
                        types.push("object");
                    }else if(Array.isArray(schema) || schema == Array && schemaValue.multiTypes !== true) {
                        types.push("array");
                    }else if(schema == String) {
                        types.push("string");
                    }else if(schema == Number) {
                        types.push("number");
                    } else if(schema == this.Types.ObjectId) {
                        types.push("objectId");
                    } else if(schema == Function) {
                        types.push("function");
                    } else if(schema == this.Types.Any) {
                        types.push("any");
                    }
                })
                if((!Array.isArray(value)) && ((helpers.validation.isObject(value)))) {
                    type = Object;
                }else if(Array.isArray(value)) {
                    type = Array;
                }else if(helpers.validation.isString(value)) {
                    type = String;
                }else if(typeof value == "number") {
                    type = Number;
                } else if(value == this.Types.ObjectId) {
                    type = this.Types.ObjectId;
                } else if(typeof value == "function") {
                    type = Function;
                }
                if(!schema.includes(type)) {
                    return this._buildValidationModel.apply(this, [keyName, `${types.join(", ")}`, typeof value, message, pushToValidation]);
                }
    }
    // method to validate function
    _validateFunction(data, pushToValidation) {
        let {keyName, value, schemaValue, schema, message} = data;
        if(typeof value !== "function") {
            // call build validation model
            return this._buildValidationModel.apply(this, [keyName, "function", typeof value, message, pushToValidation]);
        }
    }
    // method to validate objectId
    _validateObjectId(data, pushToValidation) {
        let regext = new RegExp("^[0-9a-fA-F]{24}$");
        let {keyName, value, schemaValue, schema, message} = data;
        // check if the value is object id
        if(!regext.test(value)) {
            // call build validation model
            return this._buildValidationModel.apply(this, [keyName, "objectId", typeof value, message, pushToValidation]);
        }
    }
    // method to validate string
    _validateString(data, pushToValidation) {
        let {keyName, value, schemaValue, schema, message} = data;
        if(helpers.validation.isString(value)) {
            // check if there is inot empty option
            if(schemaValue.notEmpty == true) {
                if(!helpers.validation.notEmptyString(value)) {
                    return this._buildValidationModel.apply(this, [keyName, "string",typeof value, message, pushToValidation]);
                }
            }
            // check if the schema has in propery
            if(Array.isArray(schemaValue.in)) {
                let value = value.trim();
                let inData = Array.from(schemaValue.in);
                if(!inData.includes(value)) {
                    return this._buildValidationModel.apply(this, [keyName, "string", typeof value, message, pushToValidation]);
                }
            }
            // check if the schema has length property to check the string length
            if(typeof schemaValue.length == "number") {
                let length = Number.parseInt(schemaValue.length);
                if(value.length > length) {
                    message = message || `${keyName} length shouldn't be greater than ${length}`;
                    return this._buildValidationModel.apply(this, [keyName, "string", typeof value, message, pushToValidation]);
                }
            }
        }else {
            return this._buildValidationModel.apply(this, [keyName, "string", typeof value, message, pushToValidation]);
        }
    }
    // method to validate object
    _validateObject(data, pushToValidation) {
        let {keyName, value, schemaValue, schema, message} = data;
        // console.log(schemaValue)
        if(!helpers.validation.isObject(value)) {
            // call build validation model
            return this._buildValidationModel.apply(this, [keyName, "object", typeof value, message, pushToValidation]);
        }else {
            this._validateModel(value, schema, pushToValidation)
        }
    }
    // method to validate array
    _validateArray(data, pushToValidation) {
        let {keyName, value, schemaValue, schema, message} = data;
        if(schema == Array) {
            if(!Array.isArray(value)) {
                return this._buildValidationModel.apply(this, [keyName, "array", typeof value, message, pushToValidation]);
            }
        } else if(Array.isArray(schema) && schema[0] !== undefined) {
            // check if the schema array length is greater than one
            if(Array.isArray(value) && value[0] !== undefined) {
                // check if loop option is true
                if(schemaValue.loop == true) {
                    Array.from(value).forEach((element, i) => {
                        this._validateModel(element, schema[i], true);
                    })
                } else {
                    let result = Array.from(value).map((element) => {
                    let validations = this._validateModel(element, schema[0], false);
                    return validations.find(validation => validation !== undefined)
                    }).filter(el => el !== undefined)[0]
                    // check if the result is exist
                    if(result) {
                        message = message || `${keyName} indexes should be ${result.valueType}`
                        return this._buildValidationModel.apply(this, [keyName, result.valueType, result.currentValueType, message, pushToValidation]);
                    }
                }
            }else {
                // call build validation model
                return this._buildValidationModel.apply(this, [keyName, "array", typeof value, message, pushToValidation]);
            }
        }
    }
    // method to validate number
    _validateNumber(data, pushToValidation) {
        let {keyName, value, schemaValue, schema, message} = data;
        if(typeof value == "number") {
        } else {
            return this._buildValidationModel.apply(this, [keyName, "number", typeof value, message, pushToValidation]);
        }
    }
}

var data = {
    name: 12
    // name: "12"
}
var schema = {
    name: {
        value: String,
        required: false
    }
}

var validator = new SchemaValidator(schema, data);

// export it
module.exports = {
    SchemaValidator,
    Types
}