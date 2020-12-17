const sql = require("./db.js");

// constructor
const Team = function(team) {
  this.name = team.name;
  this.coach_id = team.coach_id;
  this.league_id = team.league_id;
  this.notes = team.notes;
};

Team.create = (newTeam, result) => {
  sql.query("INSERT INTO teams SET ?", newTeam, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created team: ", { id: res.insertId, ...newTeam });
    result(null, { id: res.insertId, ...newTeam });
  });
};

Team.findById = (teamId, result) => {
  sql.query(`SELECT * FROM teams WHERE id = ${teamId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found team: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Team.getAll = result => {
  sql.query("SELECT * FROM teams", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("teams: ", res);
    result(null, res);
  });
};

Team.updateById = (id, team, result) => {
  sql.query( //name, coach_id, league_id
    "UPDATE teams SET name = ?, coach_id = ?, league_id = ? WHERE id = ?",
    [team.name, team.coach_id, team.league_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Team with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated team: ", { id: id, ...team });
      result(null, { id: id, ...team });
    }
  );
};

Team.remove = (id, result) => {
  sql.query("DELETE FROM teams WHERE id = ?", id, (err, res) => {
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

    console.log("deleted teams with id: ", id);
    result(null, res);
  });
};

Team.removeAll = result => {
  sql.query("DELETE FROM teams", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} teams`);
    result(null, res);
  });
};

module.exports = Team;