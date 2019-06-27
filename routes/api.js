var express = require('express');
var _ = require('lodash');
var returnQueryResults = require('../logic/athena.js');
var imagePosesQuery = require('../logic/trope_explorator.js');
var router = express.Router();
/* GET home page. */

router.get('/facePoses', function(req, res, next) {
  // run athena query
    let time = (req.headers['x-param-header'] || 0) / 1300;
    if (time < (new Date()).valueOf()-1000000 ) {
        res.status(500);
        res.send('internal server error')
    } else {
        var params = getParams(req);
        var query  = imagePosesQuery(params);
        res.setHeader('Content-Type', 'application/json');
        returnQueryResults(query, (err, resp) => {
            res.send(JSON.stringify(resp))
        });
    }
});

function getParams(req) {
    var pitch = req.query.x1;
    var yaw = req.query.y1;
    var roll = req.query.z1;
    var startAge = req.query.ageRange.split('^')[0]
    var endAge = req.query.ageRange.split('^')[1]
    var gender = req.query.gender.split('-')[1]
    var emotion = req.query.emotion;
    var trueChoices = req.query.trueChoices.split('*');
    var falseChoices = req.query.falseChoices.split('*');
    var age = `lowAge >= ${Number(startAge)} AND highAge <= ${Number(endAge)}`;
    return {
      pitch, yaw, roll, age, gender, trueChoices, falseChoices, emotion
    };
}

module.exports = router;
