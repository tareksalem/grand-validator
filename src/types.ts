/**
 * ========================================================
 * Types File to generate custom data types
 * ========================================================
 */
class ObjectId{
    [prop:string]: any;
    constructor() {
        var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        this.value = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }
    toString() {
        return this.value.toString();
    }
}
 class Types {
    //  [prop:string]:any;
     ObjectId:ObjectId
     Any:{}
     Number:Number
     String:String
     Object:Object
     Function:Function
     Array:Array<any>
     constructor() {
         this.ObjectId = ObjectId;
         this.Any = {};
         this.Number = <any>Number;
         this.String = <any>String;
         this.Object = Object;
         this.Function = Function;
         this.Array = <any>Array;
     }
    //  object id type
    generateObjectId() {
        return new ObjectId();
    }
 }

 
export default new Types;