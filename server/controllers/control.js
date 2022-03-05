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

const daSequel = () => sequelize;
const bcrypt = require("bcryptjs");

const checkCharacters = (string) => {
  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (format.test(string)) {
    return true;
  } else {
    return false;
  }
};

//----------Session---------------------
async function myStrategy(username, password, done) {
  try {
    let dbRes = await sequelize.query("SELECT * FROM users WHERE username=?;", {
      replacements: [username],
    });

    if (!dbRes[0] || !dbRes[0][0]) {
      return done(null, false);
    }

    let user = dbRes[0][0];

    let secrtPass = user.user_password;

    const exists = await bcrypt.compare(password, secrtPass);
    console.log("Correct password?: ", exists);
    if (exists) {
      let maybeUser = {
        id: user.user_id,
        username: user.username,
        type: user.user_isAdmin,
      };
      return done(null, user);
    } else if (!exists) {
      return done(null, false);
    }
  } catch (error) {
    console.log(error);
    return done(null, false);
  }
}

function deSerial(id, cb) {
  id = id.username;
  sequelize
    .query(`SELECT * FROM users WHERE username=?;`, { replacements: [id] })
    .then((dbRes) => {
      cb(null, dbRes[0][0].username);
    })
    .catch((err) => console.log(err));
}

function authenticationMiddleware() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  };
}
//----------Login-------------------------
function registerUser(req, res) {
  //post

  let { username, password, passwordConfirm } = req.body;
  let usename = username;
  let specialChar = checkCharacters(password);
  console.log(
    password === passwordConfirm,
    specialChar,
    passwordConfirm.length >= 8
  );
  if (password === passwordConfirm && passwordConfirm.length >= 8) {
    const salt = bcrypt.genSaltSync(10);
    const passHash = bcrypt.hashSync(password, salt);
    sequelize
      .query(`INSERT INTO users(username,user_password) VALUES(?,?);`, {
        replacements: [usename, passHash],
      })
      .then((dbRes) => {
        console.log("response: ");
        res.status(200).send(dbRes[0][0]);
      })
      .catch((err) => console.log(err));
  } else {
    res.status(400).send("something was wrong");
  }
}

function userLogin(req, res) {
  //get
  let { username, password } = req.body;
  sequelize
    .query(`SELECT * FROM users WHERE username=?;`, { replacements: [usename] })
    .then((dbRes) => {
      const exists = bcrypt.compareSync(password, dbRes[0][0].password);
      if (exists) {
        res.status(200).redirect("/profile");
      }
    })
    .catch((err) => console.log(err));
  res.status(200).send("Not registered");
}

function profileInfo(req, res) {
  let { username } = req.body;
  console.log("USER STUFF: ", username);
  // sequelize.query('SELECT * FROM users WHERE users.username=? JOIN characters WHERE users.user_id=characters.user_id JOIN homebrew WHERE users.user_id=characters.user_id;',{replacements:[username]})
  // .then(dbRes=>{
  //   console.log(dbRes);
  //   res.status(200).send(dbRes[0][0])
  // })
  // .catch(err=>console.log(err))
}

//-----------Character----------------------------
function getCharacters(req, res) {
  //get
  let { username } = req.body;
  sequelize
    .query(
      `SELECT * FROM characters WHERE user_id IN (
      SELECT user_id FROM users WHERE username=?);`,
      { replacements: [username] }
    )
    .then((dbRes) => {
      res.status(200).send(dbRes);
    })
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
      {
        replacements: [
          cName,
          cStats,
          cClass,
          cSubclass,
          cLevel,
          cCurrCamp,
          cItems,
          userID,
          charID,
        ],
      }
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
      {
        replacements: [
          userID,
          cName,
          cStats,
          cClass,
          cSubclass,
          cLevel,
          cCurrCamp,
          cItems,
        ],
      }
    )
    .then((dbRes) => {})
    .catch((err) => console.log(err));
}
function getCampaigns(req, res) {
  let { username } = req.body;
  sequelize
    .query(
      `SELECT * FROM campaigns WHERE user_id IN (
      SELECT user_id FROM users WHERE username=?);`,
      { replacements: [username] }
    )
    .then((dbRes) => {
      res.status(200).send(dbRes);
    })
    .catch((err) => console.log(err));
}
//----------Homebrew-------------------------
function getHomebrew(req, res) {
  let { username } = req.body;
  sequelize
    .query(
      `SELECT * FROM homebrew WHERE user_id IN (
      SELECT user_id FROM users WHERE username=?);`,
      { replacements: [username] }
    )
    .then((dbRes) => {
      res.status(200).send(dbRes);
    })
    .catch((err) => console.log(err));
}
function addHomebrew(req, res) {
  //post
  let { userID, category, hName } = req.body;
  sequelize
    .query(
      `INSERT INTO homebrew (user_id,category,homebrew_name)
    VALUES (?,?,?);`,
      { replacements: [userID, category, hName] }
    )
    .then((dbRes) => {})
    .catch((err) => console.log(err));
}
/* 
  ability-scores
  skills
  proficiencies
  languages
  alignment
  backgrounds
  (classes)
  -name
  -hit_die
  -proficiency_choices
  -proficiencies
  -saving_throws
  -starting_equipment
  -class_levels
  -multi_classing
  -subclasses
  -spellcasting
  -spells
  (races)
  -name
  -speed
  -ability_bonuses
  -alignment
  -age
  -size
  -size_description
  -starting_proficiencies
  -starting_proficiency_options
  -languages
  -language_desc
  -traits
  -subraces
   traits
  */
const axios = require("axios");
const apiLink = "https://www.dnd5eapi.co/api/";
const link = "https://www.dnd5eapi.co";

async function getDndInfo(str) {
  try {
    let res;
    if (str.contains('/api/')) {
       res = await axios.get(link.concat(str));
    } else{
       res = await axios.get(apiLink.concat(str));
    }
    return res[0];
  } catch (error) {console.log(error);}
}

 function baseCharInfo(req,res) {
  let races = await getDndInfo("races");
  let classes = await getDndInfo("classes");
  let abilityScores = await getDndInfo('ability-scores');
  let skills = await getDndInfo('skills');
  let proficiencies = await getDndInfo('proficiencies');
  let languages = await getDndInfo('languages');
  let alignment = await getDndInfo('alignment');
  let backgrounds = await getDndInfo('backgrounds');

  
}
/*          

-- Name 
-- Race
-- Class
-background

-- Stat Choice

*/

module.exports = {
  getCampaigns,
  getCharacters,
  getDndInfo,
  addCharacter,
  updateCharacter,
  addHomebrew,
  getHomebrew,
  registerUser,
  userLogin,
  myStrategy,
  deSerial,
  authenticationMiddleware,
  daSequel,
  profileInfo,
};
