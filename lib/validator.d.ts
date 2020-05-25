/**
 * =========================================
 * file role: base class for validation
 * =========================================
 */
import { Validation } from "./helpers";
interface OptionalObject {
    [key: string]: any;
}
declare class Validator {
    validation: Validation;
    imagMimeTypes: OptionalObject;
    constructor();
    validateRequired(inputs: any): any[];
    validateOptional(inputs: any): any[];
}
declare const _default: Validator;
export default _default;
//# sourceMappingURL=validator.d.ts.map