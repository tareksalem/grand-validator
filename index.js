/**
 * ======================================================
 * file role: package core file
 * ======================================================
 */


//  dependencies
const {Types, SchemaValidator} = require("./lib/schema");
const Validator = require("./lib/validator");



// export functions
module.exports = {
    Validator,
    Schema: SchemaValidator,
    Types
}