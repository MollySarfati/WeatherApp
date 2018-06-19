var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

  req.session.cityList = [{
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

  res.render('index', {cityList: req.session.cityList});
});


router.post('/add-city', function(req, res, next) {

  req.session.newRow = [{
    ville: "",
    picto: "/images/picto-1.png",
    etat: "Pluie",
    Tmatin: "-20°C",
    Tapmidi: "60°C"
  }];

  req.session.newRow[0].ville = req.body.ville;

  console.log(req.body.ville);
  req.session.cityList = (req.session.cityList.concat(req.session.newRow));
  res.render('index', {cityList:req.session.cityList});
});




router.get('/delete', function(req, res, next) {
  req.session.cityList.splice(req.query.type,1)
res.render('index',{cityList: req.session.cityList});
});



module.exports = router;
