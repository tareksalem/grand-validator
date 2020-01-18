/**
 * ========================================================
 * Types File to generate custom data types
 * ========================================================
 */
class ObjectId{
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
     constructor() {
         this.ObjectId = ObjectId;
         this.Any = {};
         this.Number = Number;
         this.String = String;
         this.Object = Object;
         this.Function = Function;
         this.Array = Array;
     }
    //  object id type
    generateObjectId() {
        return new ObjectId();
    }
 }

module.exports = new Types();