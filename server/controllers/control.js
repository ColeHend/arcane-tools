const path = require("path");
let getCharLevelsHasRan = false;
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
const quickData = {};
const daSequel = () => sequelize;
const bcrypt = require("bcryptjs");

const allClasses = [
  "sorcerer",
  "fighter",
  "barbarian",
  "ranger",
  "monk",
  "warlock",
  "paladin",
  "wizard",
  "rogue",
  "druid",
  "bard",
  "cleric",
];

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

const axios = require("axios");
const apiLink = "https://www.dnd5eapi.co/api/";
const link = "https://www.dnd5eapi.co";
function quickSave(host, obj) {
  // for (let key in quickData) {
  // }
  quickData[host] = obj;
  console.log("Saved!");
  console.log(host, "data!");
}
function quickLoad(host) {
  for (const key in quickData) {
    if (host === key) {
      console.log(key,"Loaded!");
      return quickData[key];
    }
  }
  console.log("Not Loaded!");
  return false;
}
async function getDndInfo(str, api = false) {
  try {
    let res, host;
    if (api === false) {
      host = apiLink.concat(str);
    } else {
      host = link.concat(str);
    }
    if (quickLoad(host) === false) {
      let res = await axios.get(host);
      if (res.data.hasOwnProperty('results')) {
        res = res.data.results 
      } else {
        res = res.data
      }
      quickSave(host, res);
      return quickLoad(host)
    } else {
      console.log('quickloaded: ',JSON.stringify(quickLoad(host)));
      return quickLoad(host)
    }
  } catch (error) {
    console.log(error);
  }
}
async function moreInfo(req, res) {
  try {
    let { urlSent } = req.query;
    urlSent = urlSent.replaceAll('@7@','/')
    if (urlSent !== undefined) {
      if (quickLoad(urlSent) === false) {
        let theInfo = await getDndInfo(urlSent);
        quickSave(urlSent, theInfo);
        res.send(theInfo);
      } else {
        res.send(quickLoad(urlSent));
      }
    } else {
      res.status(404).send("No Class/URL Sent!");
    }
  } catch (error) {
    console.log(error);
  }
}

async function getCharLevels(req, res) {
  let { charClass } = req.query;
  console.log('charClass',charClass,req.query);

  if (getCharLevelsHasRan === false) {
    for (let i = 0; i < allClasses.length; i++) {
      let element = allClasses[i];
      let link = `classes/${element}/levels/`;
      await getDndInfo(link);
    }
    getCharLevelsHasRan = true;
  }
  let link = `classes/${charClass}/levels`;
  if (charClass !== undefined) {
    let lvlRes = await getDndInfo(link);
    console.log("charClass", charClass,lvlRes);
    res.status(200).send(lvlRes);
  } else {
    res.status(404).send("No Class Sent");
  }
}

async function baseCharInfo(req, res) {
  try {
    let races = await getDndInfo("races");
    let classes = await getDndInfo("classes");
    let abilityScores = await getDndInfo("ability-scores");
    let skills = await getDndInfo("skills");
    let proficiencies = await getDndInfo("proficiencies");
    let languages = await getDndInfo("languages");
    // let alignment = await getDndInfo("alignment");
    let backgrounds = await getDndInfo("backgrounds");
    let traits = await getDndInfo("traits");

    let info = {
      races,
      classes,
      abilityScores,
      skills,
      proficiencies,
      languages,
      // alignment,
      backgrounds,
      traits,
    };
    res.send(info);
  } catch (error) {
    console.log(error);
  }
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
  baseCharInfo,
  addHomebrew,
  getHomebrew,
  registerUser,
  userLogin,
  myStrategy,
  deSerial,
  getCharLevels,
  authenticationMiddleware,
  daSequel,
  profileInfo,
  moreInfo,
};
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
