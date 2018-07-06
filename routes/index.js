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

mongoose.connect('mongodb://<user>:<password>@ds161700.mlab.com:61700/myweatherapp', options, function(err) {
  console.log(err);
});

var citySchema = mongoose.Schema({name: String, description: String, icon: String, min: Number, max: Number, lat: Number, lon: Number});

var cityModel = mongoose.model('cities', citySchema); // cities = collection dataBase MongoDB



router.get('/', function(req, res, next) {

  cityModel.find(function(err, city) {
  //  console.log(body);
    res.render('index', {cityList: city});
  });
});



router.post('/add-city', function(req, res, next) {

  request("http://api.openweathermap.org/data/2.5/weather?q="+req.body.city+"&APPID={KEYS}&units=metric&lang=fr", function(error, response, body) {
    body = JSON.parse(body);


    var newCity = new cityModel({name: body.name,icon: "http://openweathermap.org/img/w/" + body.weather[0].icon + ".png", description: body.weather[0].description, max: body.main.temp_max, min: body.main.temp_min, lat:body.coord.lat, lon: body.coord.lon });

    newCity.save(function(error, user) {
      cityModel.find(function(err, city) {

        res.render('index', {cityList: city});
        });
      });
  });
});

router.get('/delete-city', function(req, res, next) {
  cityModel.remove(
    { _id: req.query.position},
    function(error) {

      cityModel.find(function(err, city) {
        console.log(city);
        res.render('index', {cityList: city});
      });
    });
});

module.exports = router;
