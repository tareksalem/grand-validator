/**
 * ====================================================
 * file role: Helpers for validation
 * ====================================================
 */
interface OptionalObject {
    [key: string]: any;
}
export interface Validation {
    strip_html_tags(str: string): any;
    checkEmail(str: string, cb?: Function): any;
    notEmptyString(str: string, cb?: Function): any;
    checkContainsNumber(str: string, count: number, cb?: Function): any;
    isObject(obj: OptionalObject): any;
    notEmpty(obj: OptionalObject): any;
    isString(str: string): any;
    checkIsNumber(number: string | number, cb: Function): any;
}
declare const helpers: {
    validation?: Validation;
};
export { helpers };
//# sourceMappingURL=helpers.d.ts.map