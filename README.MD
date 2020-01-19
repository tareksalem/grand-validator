# Grandjs Validation Library
<p align="center"><img width="200" height="200" src="https://i.ibb.co/t4MDdkq/grandjs.png" alt="Grandjs logo"></p>

This package uses Grandjs framework validation methods, functions, schema to allow you to validate your coming data and build schema for dynamic data easily, smoothly and without confusing.

## Prerequisites

You don't need anything to start building amazing validation, you just need to be installed nodejs on your machine

## Features
* Different ways to validate your data
* Building schema for your data to easily validate them
* use Grandjs validators as middlewars for your routes
* Schema for nested objects and array's items
* Custom Types such as Object ID and Any type
* DYnamic validation messages are generated for each field based on the data type with the ability to send custom message for each input
* MultiTypes Schema to validate the coming data in different ways


**content**
  - [Installing](#installing)
  - [Types](#types)
  - [Schema](#schema)
    - [Schema String Type](#schema-string-type)
    - [Schema Number Type](#schema-number-type)
    - [Schema Boolean Type](#schema-boolean-type)
    - [Schema ObjectId Type](#schema-objectid-type)
    - [Schema Any Type](#schema-any-type)
    - [Schema Function Type](#schema-function-type)
    - [Schema Object Type](#schema-object-type)
    - [Schema Array Type](#schema-array-type)
  - [MultiTypes](#multitypes)
  - [Validate Data](#validate-data)
## Installing

open the command prompt and navigate to the project folder and just say

```
npm install grand-validator --save
```

## Getting Started
```javascript
const {Schema, Types, Validator} = require("grand-validator");
```

### Types
Grandjs Validator gives you different data types which include native javascript types and custom types to use these types inside the schema definition.

**Available Types**

- Object (native type)
- Array (native type)
- ObjectId (custom type)
- String (native type)
- Number (native type)
- Boolean (native type)
- Function (native type)
- Any (custom type)

### Schema
Grandjs validator introduces to you a basic way to validate your data with creating schema that opposites the data, schema helps you to define the coming data and specify the value of each filed with the ability to make this filed optional or required and the ability to specify multitypes for this filed.

Schema implies a class which is instantiated when you define new schema as the following:


```javascript
const {Schema, Types, Validator} = require("grand-validator");
const schema = new Schema();
```

When instantiating this class you can pass one argument to the constructor which is optional, this argument is object implies the schema modeling as the following:
```javascript
const {Schema, Types, Validator} = require("grand-validator");
const schema = new Schema({
    name: {
        type: String,
        required: false //default true
    }
});
```


each property inside the schema should be an object this object has main property called `type` which represents the type of this property


schema property options:

| property   |     type   | default|
|----------|:-------------:|:-------------:|
| type |  String, Object, Array, Number, ObjectId, Any, Boolean, Function |no default|
|required|true / false|true|
|message|String|automatic generated validation message|

#### Schema String Type

you can define the type of the property as string as one of the following ways:
```javascript
    name: {
        type: String,
        required: false, //default true
        message: "name should be a string", // optional
        in: ["Adam", "Tarek", "John"] //optional, filed Type: Array of
    }
```

or 
```javascript
    name: {
        type: Types.String,
        required: false, //default true
        message: "name should be a string", // optional
        in: ["Adam", "Tarek", "John"] //optional, filed Type: Array of strings
    }
```

#### Available options for string type

| property   |     type   | default|description|
|----------|:-------------:|:-------------:|:-------------:|
| type |  String, Object, Array, Number, ObjectId, Any, Boolean, Function |no default|the type of value of this property|
|required|true / false|true| is provding this property is required or not|
|message|String|automatic generated validation message||
|in|Array|-|Array of strings that this value should be one of them|
|notEmpty|Boolean|false|boolean value to check if the string is empty or not|
|length|Number|-|specified number to check if the length of this string is not greater than that number|




#### Schema Number Type

you can define the type of the property as Number as one of the following ways:
```javascript
    age: {
        type: Number,
        required: false, //default true
        message: "age should be a number", // optional
    }
```

or 
```javascript
    name: {
        type: Types.Number,
        required: false, //default true
        message: "age should be a number", // optional
    }
```


#### Schema Boolean Type

you can define the type of the property as Boolean as one of the following ways:
```javascript
    married: {
        type: Boolean,
        required: false, //default true
        message: "age should be a number", // optional
    }
```

or 
```javascript
    married: {
        type: Types.Boolean,
        required: false, //default true
        message: "married should be a boolean value", // optional
    }
```


#### Schema ObjectId Type

you can define the type of the property as ObjectId for mongodb documents as the following way:
```javascript
    _id: {
        type: Types.ObjectId,
        required: false, //default true
        message: "_id should be an object id", // optional
    }
```

**Note** ``ObjectId`` type is originally a string but we perform some validation to make sure that it's serialized as real mongodb object id


#### Schema Any Type

you can define the type of the property as Any type as the following way:
```javascript
    additionalInfo: {
        type: Types.Any,
        required: false, //default true
    }
```

**Note** ``Types.Any`` checks if the property has any type so it can be undefined, null, string, number, boolean, function, array or object


#### Schema Function Type

you can define the type of the property as Function as one of the following ways:
```javascript
    action: {
        type: Function,
        required: true, //default true
        message: "action should be a function", // optional
    }
```

or 
```javascript
    married: {
        type: Types.Function,
        required: false, //default true
        message: "action should be a function", // optional
    }
```

#### Schema Object Type

you can define the type of the property as Object as one of the following ways:
```javascript
    cardInfo: {
        type: Object || Types.Object,
        required: true, //default true
        message: "cardInfo should be an object", // optional
    }
```


**Note:** for nested data validations inside this object you can define an object with these properties as the following:

```javascript
    cardInfo: {
        type: {
            cardNumber: {
                type: Number
            },
            type: {
                type: String
            },
            csv: {
                type: Number
            }
        },
        required: true, //default true
        message: "cardInfo should be an object", // optional
    }
```


you can still add nested schema inside the object as you want and all of these schemas will be validated in the same way.


#### Schema Array Type

you can define the type of the property as an Array as the following way:
```javascript
{
    hobbies: {
        type: Array || Types.Array
    }
}
```


**Note:** for nested data validations inside this array you can define types inside the array as the following:

```javascript
 {
    hobbies: {
        type: [{
            type: String,
            message: "hobbies items should be string"
        }]
    }
}
```
this represents array of strings

you can still add nested schema inside the array as you want and all of these schemas will be validated in the same way.




### MultiTypes
Schema has the ability to define multi types for single field to give options to the validator to validate the coming data based one of the provided data types.

to use the multi type option you don't need anything just adding property called `multiTypes` as `true` inside the schema and set the type as array of types like the following

```javascript
var schema = {
    cardInfo: {
        type: {
            cardNumber: {
                type: [Number, String],
                multiTypes: true
            }
        },
    }
 }
```


### Changing the schema
you can change the schema of the instantiated class whenever you want by accessing a property called schema inside the class which implies an object contains your pre defined schema


```javascript
var userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    age: {
        type: Number
    }
})
console.log(userSchema.schema);

// output:
{
    name: {
        type: String
    },
    email: {
        type: String
    },
    age: {
        type: Number
    }
}
```



### Validate Data

Now you can validate the data against the pre defined schema using `validate` method which takes one argument which is an object contains the data

**Example**

```javascript
var userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    age: {
        type: Number
    }
})
// validate the schema
userSchema.validate({
    name: "tarek",
    email: "tarek@gmail.com",
    age: 20
})
```