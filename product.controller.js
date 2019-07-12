//all functions related to create, retrieve, update and delete products in our controller file
const Products = require('./product.model.js');

//retrive all products
exports.getAll = function(req, res){
    Products.find()
    .then(products => {
          res.json(products);
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });

    

    
    

};