var express = require('express');
var router = express.Router();
var ProfileData = require('../userprofile.model');


router.get('/profile/:userid', function (req, res) {
    console.log("find profile of " + req.params.userid);
    ProfileData.findOne({ userid :  req.params.userid }).then(profileUser => {
        if(!profileUser){
          res.status(403).send({
                  errorMessage: 'Profile not found.'
          });
        }
        else{
          console.log("sending profile " + profileUser);
            res.status(200).send(profileUser);
        }
      }).catch(err => {
        res.status(404).send("Profile not found.");
      });
});

router.put('/profile/:userid', function(req,res){
    ProfileData.findOne({ userid :  req.params.userid }).then( profileExisting =>{
        if(!profileExisting){
            res.status(403).send({
                    errorMessage: 'Profile not found.'
            });
          }
          else{
            profileExisting.profilename = req.body.profilename;
            profileExisting.profileheading = req.body.profileheading;
            profileExisting.stateid= req.body.stateid;
            profileExisting.cityid = req.body.cityid;
            profileExisting.save(function(err){
                if(!err) {
                    console.log("profile is updated");
                    res.status(200).send(profileExisting);
                }
                else {
                    console.log("Error: could not save profile");
                }
            });
          }
        })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

module.exports = router;
