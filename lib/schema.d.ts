import Types from "./types";
interface OptionalObject {
    [key: string]: any;
}
interface ValidationResult {
    keyName: string;
    message: string;
    valueType: string;
    currentValueType: string;
}
declare class Schema {
    Types: any;
    _typesValidators: any;
    schema: OptionalObject;
    validations: ValidationResult[];
    model: any;
    constructor(schema: any);
    validate(model: any): void;
    private _validateModel;
    private _buildValidationModel;
    private _validateBoolean;
    private _validateMultiType;
    private _validateFunction;
    private _validateObjectId;
    private _validateString;
    private _validateObject;
    private _validateArray;
    private _validateNumber;
}
export { Schema, Types, ValidationResult };
//# sourceMappingURL=schema.d.ts.map