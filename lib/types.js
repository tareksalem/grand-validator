"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ========================================================
 * Types File to generate custom data types
 * ========================================================
 */
var ObjectId = /** @class */ (function () {
    function ObjectId() {
        var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        this.value = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }
    ObjectId.prototype.toString = function () {
        return this.value.toString();
    };
    return ObjectId;
}());
var Types = /** @class */ (function () {
    function Types() {
        this.ObjectId = ObjectId;
        this.Any = {};
        this.Number = Number;
        this.String = String;
        this.Object = Object;
        this.Function = Function;
        this.Array = Array;
    }
    //  object id type
    Types.prototype.generateObjectId = function () {
        return new ObjectId();
    };
    return Types;
}());
exports.default = new Types;
//# sourceMappingURL=types.js.map