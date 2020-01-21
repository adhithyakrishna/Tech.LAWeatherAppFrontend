var express = require('express');
var router = express.Router();

router.get('/weather',function(req, res){
	res.render('weather' /*,{layout: false}*/);
});

router.all('*', function(req, res) {
  res.redirect("/weather");
});

module.exports = router;