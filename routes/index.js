var express = require('express');
var request = require('request');
var router = express.Router();
var mongoose = require('mongoose');

// var cityList = [];

var options = {
  server: {
    socketOptions: {
      connectTimeoutMS: 5000
    }
  }
};

mongoose.connect('mongodb://{USER}:{PASSWORD}@ds161700.mlab.com:61700/myweatherapp', options, function(err) {
  console.log(err);
});

var citySchema = mongoose.Schema({name: String, description: String, icon: String, min: Number, max: Number, lat: Number, lon: Number});

var cityModel = mongoose.model('cities', citySchema); // cities = nom de ma collection dans la BDD



///////////////////ROUTE INDEX
router.get('/', function(req, res, next) {

  cityModel.find(function(err, ville) {
  //  console.log(body);
    res.render('index', {cityList: ville});
  });
});



///////////////////ROUTE ADD-CITY
router.post('/add-city', function(req, res, next) {

  request("http://api.openweathermap.org/data/2.5/weather?q="+req.body.city+"&APPID={KEY}&units=metric&lang=fr", function(error, response, body) {
    body = JSON.parse(body);
    ///////////sans bdd on avait push
    // cityList.push({
    // name: body.name,
    // description: body.weather[0].description,
    // max: body.main.temp_max + "°C",
    // min: body.main.temp_min + "°C",
    //   icon: "http://openweathermap.org/img/w/" + body.weather[0].icon + ".png"
    // });

    var newCity = new cityModel({name: body.name,icon: "http://openweathermap.org/img/w/" + body.weather[0].icon + ".png", description: body.weather[0].description, max: body.main.temp_max, min: body.main.temp_min, lat:body.coord.lat, lon: body.coord.lon });

    newCity.save(function(error, user) {
      cityModel.find(function(err, ville) {

        res.render('index', {cityList: ville});
        });
      });
  });
});

router.get('/delete-city', function(req, res, next) {
  // cityList.splice(req.query.position, 1);
  cityModel.remove(
    { _id: req.query.position},
    function(error) {

      cityModel.find(function(err, ville) { //trouver ma bdd
        console.log(ville); //afficher la bdd
        res.render('index', {cityList: ville});
      });
    });
});

module.exports = router;
