//https://adrianmejia.com/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/
var express = require('express');
var router = express.Router();

//var mongoose = require('mongoose');
var ProductData = require('../product.model.js');

//right code here also in route
// const ProductSchema = mongoose.Schema({
//     ProductId : Number,
//     ProductName : String,
//     ProductDescription : String
// });

//The first argument is the singular name of the collection your model is for. ** Mongoose automatically looks for the plural, lowercased version of your model name. ** Thus, for the example above, the model Tank is for the tanks collection in the database.
//const Product = mongoose.model('Product', ProductSchema);

//get all products
router.get('/', function(req, res, next) {
    ProductData.find()
    .then(products => {
          res.json(products);
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });

});

// api url is like GetProduct/:id to get by id
router.get('/GetProduct/:id', function(req, res,next) {
    ProductData.findById(req.params.id)
    .then(product => {
        res.json(product);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
});

//get by id
router.get('/:id', function(req, res,next) {
    ProductData.findById(req.params.id)
    .then(product => {
        res.json(product);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
});

//delete product by id
router.delete('/:id', function(req, res, next) {
    ProductData.findByIdAndRemove(req.params.id)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.id
        });
    });
    
});

//create new product
router.post('/' , function(req,res,next){
var product = new ProductData({ProductId: req.body.ProductId, 
    ProductDescription: req.body.ProductDescription, 
    ProductName: req.body.ProductName});
    // Save it to database
    product.save(function(err){
    if(err)
        res.send("error in saving");
    else
        res.json(product);
    });
});

//update product
router.put('/:id' , function(req,res,next){
    ProductData.findByIdAndUpdate(req.params.id, req.body, function (err, product) {
        if (err) return next(err);
        res.json(product);
      });

    });


module.exports = router;