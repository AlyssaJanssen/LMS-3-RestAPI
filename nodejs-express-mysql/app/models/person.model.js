const { selectFields } = require("express-validator/src/select-fields");
const sql = require("./db.js");

 // Person constructor
 const Person = function(person){
    this.first_name = person.first_name;
    this.last_name = person.last_name;
    this.address1 = person.address1;
    this.address2 = person.address2;
    this.notes = person.notes;
    this.city = person.city;
    this.state = person.state;
    this.zip = person.zip;
    this.team_id = person.team_id;
    this.email = person.email;
    this.password = person.password;
    this.user_name = person.user_name;
    this.license_level_id = person.license_level_id;
    this.person_type = person.person_type;
   };

Person.create = (newPerson, result) => {
  sql.query("INSERT INTO people SET ?", newPerson, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created person: ", { id: res.insertId, ...newPerson });
    result(null, { id: res.insertId, ...newPerson });
  });
};

Person.findById = (personId, result) => {
  sql.query(`SELECT * FROM people WHERE id = ${personId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found person: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Person with the id
    result({ kind: "not_found" }, null);
  });
};

Person.getAll = (result, person_type) => {
  sql.promise().query("SELECT * FROM people WHERE person_type = ?", [person_type])
  .then( ([rows, fields]) =>{
    result(null, rows);
  })
  .catch(err => {
      console.log("error: " , err);
      result(null, err);
  })

//   (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("people: ", res);
//     result(null, res);
//   });
};

Person.updateById = (id, person, result) => {
  sql.query(
    `UPDATE people SET first_name = ?, last_name = ?, address1 = ?, address2 = ?, notes = ?, city = ?, state = ?,
     zip = ?, team_id = ?, email = ?, password = ?, user_name = ?, license_level_id = ?, person_type = ?, 
      WHERE id = ?`,
    [   person.first_name, // prepared statements, cmpares against incoming data
        person.last_name,
        person.address1,
        person.address2,
        person.notes,
        person.city ,
        person.state,
        person.zip,
        person.team_id,
        person.email,
        person.password,
        person.user_name,
        person.license_level_id,
        person.person_type,
        id
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Person with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated person: ", { id: id, ...person });
      result(null, { id: id, ...person });
    }
  );
};

Person.remove = (id, result) => {
  sql.query("DELETE FROM people WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted person with id: ", id);
    result(null, res);
  });
};

Person.removeAll = result => {
  sql.query("DELETE FROM people", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} people`);
    result(null, res);
  });
};

module.exports = Person;