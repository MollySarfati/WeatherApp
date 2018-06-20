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
      {name: "Paris", picto: "./images/picto-1.png",etat: "Couvert",Tmatin: "9°C",Tapmidi: "10°C"},
      {name: "Marseille",picto: "./images/picto-1.png",etat: "Couvert",Tmatin: "10°C",Tapmidi: "1°C"},
      {name: "Lyon", picto: "./images/picto-1.png", etat: "bruine légère", Tmatin: "6°C", Tapmidi: "3°C"},
      {name: "Lille", picto: "./images/picto-1.png", etat: "Couvert", Tmatin: "10°C", Tapmidi: "10°C"}
  ];

/*
  request("https://jsonplaceholder.typicode.com/users", function(error, response, body) {

  body = JSON.parse(body);
  console.log(body[2].name);

});
*/



res.render('index', {cityList: req.session.cityList });

});
/*
var cityList = [
	{name: "Marseille",
	min:14,
	max:18,
	picto1:"/images/picto-1.png",
	picto2:"/images/picto-1.png",
	commentaires: "Couvert"}
];
  cityList.push({name: req.body.city, min:14, max:18, picto1:"/images/picto-1.png", picto2:"/images/picto-1.png",commentaires:"soleil"});
*/


router.post('/add-city', function(req, res, next) {

//OpenWeatherMap
var search = "http://api.openweathermap.org/data/2.5/weather?q=";
search += req.body.name;
console.log(req.body);

search += "&units=metric&APPID=KEYS";
request(search, function(error, response, body) {


body = JSON.parse(body);


var icon = "http://openweathermap.org/img/w/";
icon+=body.weather[0].icon;
icon+=".png"
console.log(icon);

///////fin api debut push
req.session.newRow = [{
  name: "",
  picto: icon,
  etat: body.weather[0].main,
  Tmatin: body.main.temp_min,
  Tapmidi: body.main.temp_max
}];

req.session.newRow[0].name = req.body.name;

req.session.cityList = (req.session.cityList.concat(req.session.newRow));


  res.render('index', {cityList:req.session.cityList, });
});
});




router.get('/delete', function(req, res, next) {
  req.session.cityList.splice(req.query.type,1)
res.render('index',{cityList: req.session.cityList});
});



module.exports = router;
