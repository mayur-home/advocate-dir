var router = require('express').Router();
var personController = require('./app/controllers/person');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

require('./passport')(passport); // pass passport for configuration

router.get('/person', getPeople);
// router.get('/person/:id', personController.get);
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/admin',
  failureRedirect: '/aa',
  failureFlash : true 
}));
/* Handle Registration POST */
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash : true 
}));


module.exports = router;

//////////////

function getPeople(req, res) {
	console.log('I am here');
  personController.getAll(function(result) {
    res.json(result);
  });
}

// function getPeople(req, res, next) {
//   res.status(200).send(data.people);
// }

// function getPerson(req, res, next) {
//   var id = +req.params.id;
//   var person = data.people.filter(function(p) {
//     return p.id === id;
//   })[0];

//   if (person) {
//     res.status(200).send(person);
//   } else {
//     four0four.send404(req, res, 'person ' + id + ' not found');
//   }
// }
