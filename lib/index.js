"use strict";
/**
 * ======================================================
 * file role: package core file
 * ======================================================
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = exports.Types = exports.Validator = void 0;
//  dependencies
var schema_1 = require("./schema");
Object.defineProperty(exports, "Types", { enumerable: true, get: function () { return schema_1.Types; } });
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return schema_1.Schema; } });
var validator_1 = __importDefault(require("./validator"));
exports.Validator = validator_1.default;
validator_1.default.validation;
