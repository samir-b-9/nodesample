const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
        ProductId : Number,
        ProductName : String,
        ProductDescription : String
    });

 // Create a model based on the schema
 //When you call mongoose.model() on a schema, Mongoose compiles a model for you.
 //The first argument is the singular name of the collection your model is for. 
 //** Mongoose automatically looks for the plural, lowercased version of your model name.
 // ** Thus, for the example above, the model Tank is for the tanks collection in the database.
module.exports = mongoose.model('Product', ProductSchema);