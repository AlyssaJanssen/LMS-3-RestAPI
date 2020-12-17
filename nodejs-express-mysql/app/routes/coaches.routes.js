module.exports = app => {
    const coaches = require("../controllers/person.controller.js");
  
    // Create a new Coach
    app.post("/coaches", 
    coaches.validate('createPerson'),
    coaches.create);
  
    // Retrieve all coaches
    app.get("/coaches", coaches.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/coaches/:personId", coaches.findOne);
  
    // Update a Customer with customerId
    app.put("/coaches/:personId", coaches.update);
  
    // Delete a Customer with customerId
    app.delete("/coaches/:personId", coaches.delete);
  
    // Create a new Customer
    app.delete("/coaches", coaches.deleteAll);
  };