module.exports = app => {
    const players = require("../controllers/person.controller.js");
  
    // Create a new Coach
    app.post("/players", 
    players.validate('createPerson'),
    players.create);
  
    // Retrieve all coaches
    app.get("/players", players.findAll);
  
    // Retrieve a single Player with personId
    app.get("/players/:personId", players.findOne);
  
    // Update a Player with personId
    app.put("/players/:personId", 
    players.validate('createPerson'), 
    players.update);

    // Delete a Player with personId
    app.delete("/players/:personId", players.delete);
  
    // Create a new Player
    app.delete("/players", players.deleteAll);
  };