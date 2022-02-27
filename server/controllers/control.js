const path = require("path");

const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
//---------------------------------------------

const bcrypt = require("bcryptjs");
//find user needs to return an user obj??


function registerUser(req, res) {
  //post
  let { username, password } = req.body;
  let salt = bcrypt.genSaltSync(10); //
  const passHash = bcrypt.hashSync(password, salt);

  sequelize
    .query(`INSERT INTO users(username,password) VALUES(?,?) IF NOT EXIST;`, [
      username,
      passHash,
    ])
    .then((dbRes) => {
        let res = {}
    })
    .catch((err) => console.log(err));
}

function userLogin(req, res) {
  //get
  let { username, password } = req.body;

  sequelize
    .query(`SELECT * FROM users WHERE username=?;`, [username])
    .then((dbRes) => {
      const exists = bcrypt.compareSync(password, dbRes[0].password);
      if (exists) { //sends response to front if passwords match
          
      }
    })
    .catch((err) => console.log(err));
}
function deSerial(id, cb) {
    sequelize
    .query(`SELECT * FROM users WHERE user_id=?;`, [id])
    .then(dbRes => {
        cb(null, dbRes[0]);
    })
    .catch((err) => console.log(err));

  }
function myStrategy(username, password, done) {
  sequelize
    .query(`SELECT * FROM users WHERE username=?;`, [username])
    .then((dbRes) => {
      const exists = bcrypt.compareSync(password, dbRes.password);
      if (exists) {
        return done(null, { id: dbRes[0].id, username: dbRes[0].username, type: dbRes[0].isAdmin });
      } else if (!exists) {
        return done(null, false);
      }
    })
    .catch((err) => console.log(err));
    if(res) {
        cb(null, )
       } else {
        cb(null, false)
       }
  
}
//---------------------------------------------------
function getCharacter(req, res) {
  //get
  let { charID } = req.params;
  sequelize
    .query(`SELECT * FROM characters WHERE character_id=?;`, [charID])
    .then((dbRes) => {})
    .catch((err) => console.log(err));
}
function updateCharacter(req, res) {
  //put
  let { charID } = req.params;
  let { userID, cName, cStats, cClass, cSubclass, cLevel, cCurrCamp, cItems } =
    req.body;
  sequelize
    .query(
      `UPDATE characters SET character_name=? AND character_stats=? AND character_subclass=? AND character_level=? AND character_curr_campaign=?
    AND character_items=? WHERE user_id=? AND character_id=?;`,
      [
        cName,
        cStats,
        cClass,
        cSubclass,
        cLevel,
        cCurrCamp,
        cItems,
        userID,
        charID,
      ]
    )
    .then((dbRes) => {})
    .catch((err) => console.log(err));
}
function addCharacter(req, res) {
  //post
  let { userID, cName, cStats, cClass, cSubclass, cLevel, cCurrCamp, cItems } =
    req.body;
  sequelize
    .query(
      `INSERT INTO characters (user_id,character_name,character_stats,character_subclass,character_level,character_curr_campaign,character_items)
    VALUES(?,?,?,?,?,?,?,?);`,
      [userID, cName, cStats, cClass, cSubclass, cLevel, cCurrCamp, cItems]
    )
    .then((dbRes) => {})
    .catch((err) => console.log(err));
}
function addHomebrew(req, res) {
  //post
  let { userID, category, hName } = req.body;
  sequelize
    .query(
      `INSERT INTO homebrew (user_id,category,homebrew_name)
    VALUES (?,?,?);`,
      [userID, category, hName]
    )
    .then((dbRes) => {})
    .catch((err) => console.log(err));
}
function authenticationMiddleware () {
    return function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      }
      res.redirect('/')
    }
  }
module.exports = {
  getCharacter,
  addCharacter,
  updateCharacter,
  addHomebrew,
  registerUser,
  userLogin,
  myStrategy,
  deSerial,
  authenticationMiddleware
};
