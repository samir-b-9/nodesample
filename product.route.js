module.exports = (app) => {
    const productService = require('./product.controller.js');

    // Retrieve all products
    app.get('/products', productService.getAll);
    
}