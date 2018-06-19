var express = require('express');
var router = express.Router();


var cityList = [{
    ville: "Paris",
    picto: "/images/picto-1.png",
    etat: "Couvert",
    Tmatin: "9°C",
    Tapmidi: "10°C"
  },
  {
    ville: "Marseille",
    picto: "/images/picto-1.png",
    etat: "Couvert",
    Tmatin: "10°C",
    Tapmidi: "1°C"
  },
  {
    ville: "Lyon",
    picto: "/images/picto-1.png",
    etat: "bruine légère",
    Tmatin: "6°C",
    Tapmidi: "3°C"
  },
  {
    ville: "Lille",
    picto: "/images/picto-1.png",
    etat: "Couvert",
    Tmatin: "10°C",
    Tapmidi: "10°C"
  }
];


router.get('/', function(req, res, next) {

  res.render('index', {
    cityList: cityList
  });
});


router.post('/add-city', function(req, res, next) {

      var newRow = [{
        ville: "",
        picto: "/images/picto-1.png",
        etat: "Pluie",
        Tmatin: "-20°C",
        Tapmidi: "60°C"
      }];

      newRow[0].ville = req.body.ville;

      console.log(req.body.ville);

      cityList = (cityList.concat(newRow));

      res.render('index', {cityList});
      });

    router.get('/​delete​-city', function(req, res, next) {
        cityList.splice(req.query.position, 1);
    res.render('index', {cityList});
      });

      module.exports = router;
