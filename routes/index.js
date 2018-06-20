var express = require('express');
var router = express.Router();
var request = require('request'); // module request pour l api

// Open weather Map
const OpenWeatherMapHelper = require("openweathermap-node");

const helper = new OpenWeatherMapHelper(
    {
        APPID: 'KEYS',
        units: "metric"
    }
);

//fin Open weather Map



router.get('/', function(req, res, next) {

    req.session.cityList = [
      {ville: "Paris", picto: "./images/picto-1.png",etat: "Couvert",Tmatin: "9°C",Tapmidi: "10°C"},
      {ville: "Marseille",picto: "./images/picto-1.png",etat: "Couvert",Tmatin: "10°C",Tapmidi: "1°C"},
      {ville: "Lyon", picto: "./images/picto-1.png", etat: "bruine légère", Tmatin: "6°C", Tapmidi: "3°C"},
      {ville: "Lille", picto: "./images/picto-1.png", etat: "Couvert", Tmatin: "10°C", Tapmidi: "10°C"}
  ];

/*
  request("https://jsonplaceholder.typicode.com/users", function(error, response, body) {

  body = JSON.parse(body);
  console.log(body[2].name);

});
*/

var search = "http://api.openweathermap.org/data/2.5/weather?q=";
search += req.body.ville;
search += "&APPID=KEYS";
request(search, function(error, response, body) {

body = JSON.parse(body);
console.log(body);

res.render('index', {cityList: req.session.cityList });

});

});



router.post('/add-city', function(req, res, next) {

  req.session.newRow = [{
    ville: "",
    picto: "./images/picto-1.png",
    etat: "Pluie",
    Tmatin: "-20°C",
    Tapmidi: "60°C"
  }];

  req.session.newRow[0].ville = req.body.ville;

  console.log(req.body.ville);
  req.session.cityList = (req.session.cityList.concat(req.session.newRow));

  /*  OU BIEN
  cityList.push({name: req.body.name, picto1:"/images/picto-1.png", picto2:"/images/picto-1.png",picto3:"/images/picto-1.png",picto4:"/images/picto-1.png"})
*/

  res.render('index', {cityList:req.session.cityList});
});




router.get('/delete', function(req, res, next) {
  req.session.cityList.splice(req.query.type,1)
res.render('index',{cityList: req.session.cityList});
});



module.exports = router;
