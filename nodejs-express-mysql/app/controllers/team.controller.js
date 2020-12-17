const Team = require("../models/team.model.js");

const {body} = require('express-validator/check');
const {validationResult} = require('express-validator/check');

exports.validate = (method) => { // VALIDATION!---------------
    switch (method) {
      case 'createTeam': {
       return [  //name, coach_id, league_id
          body('name', 'name cannot be empty.').not().isEmpty().trim().escape(),
          body('coach_id', 'coach_id cannot be empty.').not().isEmpty(),
          body('league_id', 'league_id cannot be empty.').not().isEmpty(),
         ]   
      }
    }
  }

// Create and Save a new Team
exports.create = (req, res) => {
   // Validate request
   const errors = validationResult(req); // finds validation errors in the request, wraps them in an object

   if(!errors.isEmpty()) {
       res.status(422).json({errors: errors.array() });// 422 errors in data
       return;
   }
   if (!req.body) { // if body is null
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Team
  const team = new Team({
    name: req.body.name,
    coach_id: req.body.coach_id,
    league_id: req.body.league_id,
    notes: req.body.notes
  });

  // Save Team in the database
  Team.create(team, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Team."
      });
    else res.send(data);
  });
};

// Retrieve all teams from the database.
exports.findAll = (req, res) => {
    Team.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving teams."
          });
        else res.send(data);
      });
};

// Find a single Team with a teamId
exports.findOne = (req, res) => {
    Team.findById(req.params.teamId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Team with id ${req.params.teamId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Team with id " + req.params.teamId
            });
          }
        } else res.send(data);
      });
};

// Update a Team identified by the teamId in the request
exports.update = (req, res) => {
   // Validate Request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Team.updateById(
    req.params.teamId,
    new Team(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Team with id ${req.params.teamId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Team with id " + req.params.teamId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Team with the specified teamId in the request
exports.delete = (req, res) => {
    Team.remove(req.params.teamId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Team with id ${req.params.teamId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Team with id " + req.params.teamId
            });
          }
        } else res.send({ message: `Team was deleted successfully!` });
      });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Team.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all teams."
          });
        else res.send({ message: `All Teams were deleted successfully!` });
      });
};