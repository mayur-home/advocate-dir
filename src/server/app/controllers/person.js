'use strict';

var Person = require('../models/person');

/**
 * Person
 */
exports.getAll = function (req, res) {
  Person.find({}, function(err, result) {
    if (err) {
      res.json(500, err);
    }
    res.json(result);
  });
};
