module.exports = app => {
    const teams = require("../controllers/team.controller.js");
  
    // Create a new Team
    app.post("/teams", 
    teams.validate('createTeam'),
    teams.create);
  
    // Retrieve all Teams
    app.get("/teams", teams.findAll);
  
    // Retrieve a single Team with teamId
    app.get("/teams/:teamId", teams.findOne);
  
    // Update a Team with teamId
    app.put("/teams/:teamId", 
    teams.validate('createTeam'),
    teams.update);
  
    // Delete a Team with teamId
    app.delete("/teams/:teamId", teams.delete);
  
    // Create a new Team
    app.delete("/teams", teams.deleteAll);
  };