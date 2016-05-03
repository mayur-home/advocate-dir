var mongoose = require('mongoose');

//Create a schema for Book
var personSchema = mongoose.Schema({
  //Also creating index on field id
  id: {type: Number, index: true},
  firstName: String,
  lastName: String,
  age: String,
  location: String
});

//Create a Model by using the schema defined above
//Optionally one can provide the name of collection where the instances
//of this model get stored. In this case it is "mongoose_demo". Skipping
//this value defaults the name of the collection to plural of model name i.e books.
var Person = mongoose.model('Person', personSchema);

//Connecting to Mongod instance.
// mongoose.connection;

module.exports = Person;

// module.exports.findOne = function(isbn, callback) {
//   Person.findOne({isbn: isbn}, function(err, result) {
//     if (err) {
//       throw err;
//     }
//     callback(result);
//   });
// };

// module.exports.findAll = function(callback) {
//   Person.find({}, function(err, result) {
//     if (err) {
//       throw err;
//     }
//     callback(result);
//   });
// };

// //Filename: book_dao.js
// //mongoose is used for interacting with MongoDB
// var mongoose = require('mongoose');

// var dbHost = 'mongodb://localhost:27017/test';
// mongoose.connect(dbHost);
// //Create a schema for Book
// var bookSchema = mongoose.Schema({
//   name: String,
//   //Also creating index on field isbn
//   isbn: {type: String, index: true},
//   author: String,
//   pages: Number
// });

// //Create a Model by using the schema defined above
// //Optionally one can provide the name of collection where the instances
// //of this model get stored. In this case it is "mongoose_demo". Skipping
// //this value defaults the name of the collection to plural of model name i.e books.
// var Book = mongoose.model('Book', bookSchema);

// //Connecting to Mongod instance.
// mongoose.connection;

// module.exports.findOne = function(isbn, callback){
//   Book.findOne({isbn: isbn}, function(err, result){
//     if ( err ) throw err;
//     callback(result);
//   });
// }

// module.exports.findAll = function(callback){
//   Book.find({}, function(err, result){
//     if ( err ) throw err;
//     callback(result);
//   });
// }

// module.exports.addNewBook = function(body, callback){
//   var book = new Book({
//     name:body.name,
//     isbn: body.isbn,
//     author: body.author,
//     pages: body.pages
//   });

//   //Saving the model instance to the DB
//   book.save(function(err, result){
//     if ( err ) throw err;
//     callback({
//       messaage:"Successfully added book",
//       book:result
//     });
//   });
// }

// module.exports.editBook = function(body, isbn, callback){
//   Book.findOne({isbn: isbn}, function(err, result){
//     if ( err ) throw err;

//     if(!result){
//       callback({
//         message:"Book with ISBN: " + isbn+" not found.",
//       });
//     }

//     result.name   = body.name;
//     result.isbn   = body.isbn;
//     result.author = body.author;
//     result.pages  = body.pages;

//     result.save(function(err, result){
//       if ( err ) throw err;
//       callback({
//         message:"Successfully updated the book",
//         book: result
//       });
//     });

//   });
// }

// module.exports.deleteBook = function(isbn, callback){
//   Book.findOneAndRemove({isbn: isbn}, function(err, result){
//       callback({
//         message: "Successfully deleted the book",
//         book: result
//       });
//   });
// }