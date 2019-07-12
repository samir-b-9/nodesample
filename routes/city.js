var express = require('express');
var router = express.Router();

var CityData = require('../city.model.js');

//get all cities
router.get('/:stateid', function(req, res, next) {
    CityData.find({ stateid : req.params.stateid })
    .then(cities => {
          res.json(cities);
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Something wrong while retrieving city."
        });
    });
});

module.exports = router;