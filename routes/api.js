
// DECLARE JWT-secret
const JWT_Secret = 'your_secret_key';
var express = require('express');
var UserData = require('../user.model');
const jwt = require('jsonwebtoken');

var router = express.Router();

router.post('/authenticate', (req, res) => {

  if(!req.body){
    res.status(403).send({
      errorMessage: 'Please provide email and password'
    });
  }
     
  if(req.body) {
      UserData.findOne({ email :  req.body.email }).then(doc => {
        
        if(!doc){
          res.status(403).send({
                  errorMessage: 'Invalid login details from moongose not found.'
          });
        }
        else{
          const payload = { email : req.body.email };
          var token = jwt.sign(payload , JWT_Secret, 
            {  expiresIn : '5m'   } );
            res.status(200).send({
              email : doc.email,
              userid : doc.userid,
              token: token
            });
        }
      });
  }
});
/* autheticate api end */

router.post('/verify', (req, res) => {

  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  if(authHeader){
    console.log("auth header passed in request.");
    const token = req.headers['authorization'].split(' ')[1];
    console.log("token is " + token);
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
        jwt.verify(token, JWT_Secret,
            (err, decoded) => {
                if (err)
                {
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                }
                else {
                    console.log(decoded);
                    res.status(200).send({ auth:true, message:'Token is verified.' });
                }
            }
        )
    }
  }
  else{
    console.log("auth header not passed in request.");
  }

});


module.exports = router;