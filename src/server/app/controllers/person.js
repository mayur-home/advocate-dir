
var Person = require('../models/person');

module.exports = {
  getAll: getPeople
  // get: getPerson
};

////////////////

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

// function getPerson(params, callback) {
//   console.log('Fetching details for person with id: ' + params.id);
//   Person.findOne({isbn: isbn}, function(err, result) {
//     if (err) {
//       throw err;
//     }
//     callback(result);
//   });
// }

function getPeople(callback) {
  console.log('Fetching all People');
  Person.find({}, function(err, result) {
    if (err) {
      throw err;
    }
    callback(result);
  });
}

// var bookDao = require("./book_dao");

// module.exports.getBookDetails = function(params, callback){
//   console.log("Fetching details for book with ISBN: " + params.isbn);
//   bookDao.findOne(params.isbn, callback);
// }

// module.exports.getAllBooks = function(callback){
//   console.log("Fetching all books");
//   bookDao.findAll(callback);
// }

// module.exports.addNewBook = function(body, callback){
//   console.log("Adding new book");
//   bookDao.addNewBook(body, callback);
// }

// module.exports.editBook = function(body, isbn, callback){
//   console.log("Editing Book");
//   bookDao.editBook(body, isbn, callback);
// }
// module.exports.deleteBook = function(isbn, callback){
//   console.log("Deleting book");
//   bookDao.deleteBook(isbn, callback);
// }