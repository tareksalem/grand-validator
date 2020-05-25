/**
 * ========================================================
 * Types File to generate custom data types
 * ========================================================
 */
declare class ObjectId {
    [prop: string]: any;
    constructor();
    toString(): any;
}
declare class Types {
    ObjectId: ObjectId;
    Any: {};
    Number: Number;
    String: String;
    Object: Object;
    Function: Function;
    Array: Array<any>;
    constructor();
    generateObjectId(): ObjectId;
}
declare const _default: Types;
export default _default;
//# sourceMappingURL=types.d.ts.map