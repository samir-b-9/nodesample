var express = require('express');
var router = express.Router();

var StateData = require('../state.model.js');

//get all states
router.get('/', function(req, res, next) {
    StateData.find()
    .then(states => {
          res.json(states);
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Something wrong while retrieving states."
        });
    });
});

module.exports = router;