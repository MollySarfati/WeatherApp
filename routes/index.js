var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

var cityList=[
          {ville: "Paris", picto:"/images/picto-1.png", etat:"Couvert",Tmatin:"9°C", Tapmidi:"10°C"},
          {ville: "Marseille", picto:"/images/picto-1.png", etat:"Couvert",Tmatin:"10°C", Tapmidi:"1°C"},
          {ville: "Lyon", picto:"/images/picto-1.png", etat:"bruine légère",Tmatin:"6°C", Tapmidi:"3°C"},
          {ville: "Lille", picto:"/images/picto-1.png", etat:"Couvert",Tmatin:"10°C", Tapmidi:"10°C"}
];

  res.render('index',{cityList:cityList});
});

module.exports = router;
