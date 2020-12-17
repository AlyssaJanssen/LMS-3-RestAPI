const Person = require("../models/person.model.js");

const {body} = require('express-validator/check');
const {validationResult} = require('express-validator/check');

exports.validate = (method) => { // VALIDATION!---------------
    switch (method) {
      case 'createPerson': {
       return [  //email, first_name, last_name, team_id
        body('email', 'invalid email.').not().isEmpty().isEmail().normalizeEmail(),
          body('first_name', 'first_name cannot be empty.').not().isEmpty().trim().escape(),
          body('last_name', 'last_name cannot be empty.').not().isEmpty().trim().escape(),
          body('team_id', 'team_id cannot be empty.').not().isEmpty(),
         ]   
      }
    }
  }


let personType = 'player';

function setPersonTypeFromReq(req){
    let re = /\/(\w+)\//; // reg ex
    let result = re.exec(req.url);
    let urlPart = result[1];
    urlPart = (urlPart == "players"?"player":"coach");
    //console.log(`personType set to ${personType}`);
    return urlPart;
    //console.log(`personType set to ${personType}`);

}

// Create and Save a new Person
exports.create = (req, res) => {
     // Validate request
   const errors = validationResult(req); // finds validation errors in the request, wraps them in an object

   if(!errors.isEmpty()) {
       res.status(422).json({errors: errors.array() });// 422 errors in data
       return;
   }
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  personType = setPersonTypeFromReq(req); // grab the personType from request URL

  // Create a Person
  const person = new Person({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address1:req.body.address1,
    address2:req.body.address2,
    city:req.body.city,
    notes:req.body.notes,
    state:req.body.state,
    zip:req.body.zip,
    team_id:req.body.team_id,
    email:req.body.email, 
    password:req.body.email,
    user_name:req.body.user_name,
    license_level_id:req.body.license_level_id,
    person_type: personType}
    );

  // Save Person in the database
  Person.create(person, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Person."
      });
    else res.send(data);
  });
};

// Retrieve all Persons from the database.
exports.findAll = (req, res) => {
    Person.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving person."
          });
        else res.send(data);
      }, personType);
};

// Find a single Person with a personId
exports.findOne = (req, res) => {
    Person.findById(req.params.personId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Person with id ${req.params.personId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Person with id " + req.params.personId
            });
          }
        } else res.send(data);
      });
};

// Update a Person identified by the personId in the request
exports.update = (req, res) => {
   // Validate Request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Person.updateById(
    req.params.personId,
    new Person(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Person with id ${req.params.personId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Person with id " + req.params.personId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Person.remove(req.params.personId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Person with id ${req.params.personId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Person with id " + req.params.personId
            });
          }
        } else res.send({ message: `Person was deleted successfully!` });
      });
};

// Delete all Person from the database.
exports.deleteAll = (req, res) => {
    Person.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Persons."
          });
        else res.send({ message: `All Persons were deleted successfully!` });
      });
};