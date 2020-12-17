const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");

const app = express();


const express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const app = express()
const router = express.Router()

app.use(bodyParser.json())

app.use(expressValidator())

app.use('/api', router)



app.use(cors());
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/team.routes.js")(app); 
require("./app/routes/player.routes.js")(app); 
require("./app/routes/coach.routes.js")(app); 

// set port, listen for requests
app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});


