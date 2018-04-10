var express = require('express');
var router = express.Router();

var cityList = [{
	name: "Marseille",
	min: 14,
	max:18,
	commentaires: "Couvert"
}, {
	name: "Lyon",
	min: 14,
	max:18,
	commentaires: "Ensoleille"	
}];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { cityList: cityList });
});

router.post('/add-city', function(req, res, next) {
  cityList.push({
  	name: req.body.city
  });
  res.render('index', { cityList: cityList });
});

router.get('/delete-city', function(req, res, next) {
  cityList.splice(req.query.position, 1);
  res.render('index', { cityList: cityList });
});

module.exports = router;
