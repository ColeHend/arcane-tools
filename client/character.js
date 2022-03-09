let username = window.localStorage.getItem("username");
const charName = document.getElementById("charName");
const raceSelect = document.getElementById("raceSelect");
const backSelect = document.getElementById("backSelect");
const selectClass = document.getElementById("classSelect");
const charLvlSelect = document.getElementById("characterLevel");
const chooseSkills = document.getElementById("chooseSkills");
const hitDie = document.getElementById("hitDie");
const proficiencies = document.getElementById("proficiencies");
const savingThrows = document.getElementById("savingThrows");
const subclasses = document.getElementById("subclasses");
const subclassSelect = document.getElementById("subclassSelect");
const skills = document.getElementById("skills");
const backInfo = document.getElementById("backInfo");
const raceSize = document.getElementById("raceSize");
const sizeDesc = document.getElementById("sizeDesc");
const raceLang = document.getElementById("raceLang");
const raceSpeed = document.getElementById("raceSpeed");
const raceStartProf = document.getElementById("raceStartProf");
const traits = document.getElementById("traits");
const subRaces = document.getElementById("subRaces");
const startingEquip = document.getElementById("startingEquip");
const charTableHead = document.getElementById("charTableHead");
const charTableBody = document.getElementById("charTableBody");
const bonds = document.getElementById("bonds");
const flaws = document.getElementById("flaws");
const ideals = document.getElementById("ideals");
const languageOptions = document.getElementById("languageOptions");
const personalityTraits = document.getElementById("personalityTraits");
const startingEquipment = document.getElementById("startingEquipment");
const backProficiencies = document.getElementById("backProficiencies");
const currentLvl = document.getElementById("currLevel");
const profBonus = document.getElementById("profBonus");
const classFeatures = document.getElementById("features");
const classSpecificData = document.getElementById("otherLevelData");
const chooseNameView = document.getAnimations("chooseNameView");
const charLevelView = document.getElementById("charLevel");
const chooseRaceView = document.getElementById("chooseRace");
const chooseClassView = document.getElementById("chooseClass");
const chooseBackView = document.getElementById("chooseBack");
const lastViewBtn = document.getElementById("lastView");
const nextViewBtn = document.getElementById("nextView");
const submitCharBtn = document.getElementById("submitChar");
var currView = 0;
const views = [
  //   chooseNameView,
  charLevelView,
  chooseRaceView,
  chooseClassView,
  chooseBackView,
];
const playerStats = {
  CHA: [10],
  WIS: [10],
  INT: [10],
  STR: [10],
  DEX: [10],
  CON: [10],
};
const martialWeapons = [
  {
    index: "battleaxe",
    name: "Battleaxe",
    url: "/api/equipment/battleaxe",
  },
  {
    index: "flail",
    name: "Flail",
    url: "/api/equipment/flail",
  },
  {
    index: "glaive",
    name: "Glaive",
    url: "/api/equipment/glaive",
  },
  {
    index: "greataxe",
    name: "Greataxe",
    url: "/api/equipment/greataxe",
  },
  {
    index: "greatsword",
    name: "Greatsword",
    url: "/api/equipment/greatsword",
  },
  {
    index: "halberd",
    name: "Halberd",
    url: "/api/equipment/halberd",
  },
  {
    index: "lance",
    name: "Lance",
    url: "/api/equipment/lance",
  },
  {
    index: "longsword",
    name: "Longsword",
    url: "/api/equipment/longsword",
  },
  {
    index: "maul",
    name: "Maul",
    url: "/api/equipment/maul",
  },
  {
    index: "morningstar",
    name: "Morningstar",
    url: "/api/equipment/morningstar",
  },
  {
    index: "pike",
    name: "Pike",
    url: "/api/equipment/pike",
  },
  {
    index: "rapier",
    name: "Rapier",
    url: "/api/equipment/rapier",
  },
  {
    index: "scimitar",
    name: "Scimitar",
    url: "/api/equipment/scimitar",
  },
  {
    index: "shortsword",
    name: "Shortsword",
    url: "/api/equipment/shortsword",
  },
  {
    index: "trident",
    name: "Trident",
    url: "/api/equipment/trident",
  },
  {
    index: "war-pick",
    name: "War pick",
    url: "/api/equipment/war-pick",
  },
  {
    index: "warhammer",
    name: "Warhammer",
    url: "/api/equipment/warhammer",
  },
  {
    index: "whip",
    name: "Whip",
    url: "/api/equipment/whip",
  },
  {
    index: "blowgun",
    name: "Blowgun",
    url: "/api/equipment/blowgun",
  },
  {
    index: "crossbow-hand",
    name: "Crossbow, hand",
    url: "/api/equipment/crossbow-hand",
  },
  {
    index: "crossbow-heavy",
    name: "Crossbow, heavy",
    url: "/api/equipment/crossbow-heavy",
  },
  {
    index: "longbow",
    name: "Longbow",
    url: "/api/equipment/longbow",
  },
  {
    index: "net",
    name: "Net",
    url: "/api/equipment/net",
  },
];
const martialMeleeWeapons = [
  {
    index: "battleaxe",
    name: "Battleaxe",
    url: "/api/equipment/battleaxe",
  },
  {
    index: "flail",
    name: "Flail",
    url: "/api/equipment/flail",
  },
  {
    index: "glaive",
    name: "Glaive",
    url: "/api/equipment/glaive",
  },
  {
    index: "greataxe",
    name: "Greataxe",
    url: "/api/equipment/greataxe",
  },
  {
    index: "greatsword",
    name: "Greatsword",
    url: "/api/equipment/greatsword",
  },
  {
    index: "halberd",
    name: "Halberd",
    url: "/api/equipment/halberd",
  },
  {
    index: "lance",
    name: "Lance",
    url: "/api/equipment/lance",
  },
  {
    index: "longsword",
    name: "Longsword",
    url: "/api/equipment/longsword",
  },
  {
    index: "maul",
    name: "Maul",
    url: "/api/equipment/maul",
  },
  {
    index: "morningstar",
    name: "Morningstar",
    url: "/api/equipment/morningstar",
  },
  {
    index: "pike",
    name: "Pike",
    url: "/api/equipment/pike",
  },
  {
    index: "rapier",
    name: "Rapier",
    url: "/api/equipment/rapier",
  },
  {
    index: "scimitar",
    name: "Scimitar",
    url: "/api/equipment/scimitar",
  },
  {
    index: "shortsword",
    name: "Shortsword",
    url: "/api/equipment/shortsword",
  },
  {
    index: "trident",
    name: "Trident",
    url: "/api/equipment/trident",
  },
  {
    index: "war-pick",
    name: "War pick",
    url: "/api/equipment/war-pick",
  },
  {
    index: "warhammer",
    name: "Warhammer",
    url: "/api/equipment/warhammer",
  },
  {
    index: "whip",
    name: "Whip",
    url: "/api/equipment/whip",
  },
];
const simpleWeapons = [
  {
    index: "club",
    name: "Club",
    url: "/api/equipment/club",
  },
  {
    index: "dagger",
    name: "Dagger",
    url: "/api/equipment/dagger",
  },
  {
    index: "greatclub",
    name: "Greatclub",
    url: "/api/equipment/greatclub",
  },
  {
    index: "handaxe",
    name: "Handaxe",
    url: "/api/equipment/handaxe",
  },
  {
    index: "javelin",
    name: "Javelin",
    url: "/api/equipment/javelin",
  },
  {
    index: "light-hammer",
    name: "Light hammer",
    url: "/api/equipment/light-hammer",
  },
  {
    index: "mace",
    name: "Mace",
    url: "/api/equipment/mace",
  },
  {
    index: "quarterstaff",
    name: "Quarterstaff",
    url: "/api/equipment/quarterstaff",
  },
  {
    index: "sickle",
    name: "Sickle",
    url: "/api/equipment/sickle",
  },
  {
    index: "spear",
    name: "Spear",
    url: "/api/equipment/spear",
  },
  {
    index: "crossbow-light",
    name: "Crossbow, light",
    url: "/api/equipment/crossbow-light",
  },
  {
    index: "dart",
    name: "Dart",
    url: "/api/equipment/dart",
  },
  {
    index: "shortbow",
    name: "Shortbow",
    url: "/api/equipment/shortbow",
  },
  {
    index: "sling",
    name: "Sling",
    url: "/api/equipment/sling",
  },
];
//--end variables---------

//--the views---
function lastView() {
  if (currView > 0) {
    views[currView].classList.toggle("hidden", true);
    currView--;
    views[currView].classList.toggle("hidden", false);
    submitCharBtn.classList.toggle("hidden", true);

    // if (currView<1) {
    //     lastViewBtn.classList.toggle('hidden',true)
    // }
    // if (currView<views.length--) {
    //     nextViewBtn.classList.toggle('hidden',false)
    // }
    console.log("views ", views, currView);
  }
}
function nextView() {
  if (currView !== views.length - 1) {
    views[currView].classList.toggle("hidden", true);
    currView++;
    views[currView].classList.toggle("hidden", false);

    if (currView === views.length - 1) {
      //   nextViewBtn.classList.toggle("hidden", true);
      submitCharBtn.classList.toggle("hidden", false);
    } else {
      submitCharBtn.classList.toggle("hidden", true);
    }
    // if (currView>1) {
    //     lastViewBtn.classList.toggle('hidden',true)
    // }
    console.log("views ", views, currView);
  }
}
lastViewBtn.addEventListener("click", lastView);
nextViewBtn.addEventListener("click", nextView);

//----useful functions--------------

function createSpecialP(arr, list = false, listName = false) {
  let p = document.createElement("p");
  if (list === false) {
    p.append(arr.join(", "));
  } else if (list === true) {
    let select = document.createElement("select");

    for (let i = 0; i < arr.length; i++) {
      let option = document.createElement("option");
      let setValue = arr[i];
      switch (listName) {
        case "stats":
          select.classList.toggle("stats", true);
        case "equipment":
          select.classList.toggle("equipment", true);
          if (setValue === "Simple Weapons") {
            arr.splice(0, i);
            select.innerHTML = "";
            arr.push(...simpleWeapons);
          } else if (setValue === "Martial Weapons") {
            select.innerHTML = "";
            arr.splice(0, i);
            arr.push(...martialWeapons);
          } else if (setValue === "Martial Melee Weapons") {
            arr.splice(0, i);
            arr.push(...martialMeleeWeapons);
          }
          break;
        case "subclass":
          select.id = "subclassSelect";
          break;
        case "language":
          select.classList.toggle("language", true);
          break;
        case "skills":
          select.classList.toggle("skills", true);
          break;
        case "proficiency":
          select.classList.toggle("proficiency", true);
          break;
      }
      if (isLiteralObject(setValue) === true) {
        if (setValue.name !== undefined) {
          setValue = setValue.name;
        } else if (setValue.desc !== undefined) {
          setValue = setValue.desc;
        } else {
          setValue = JSON.stringify(setValue);
          setValue = fixTableStr(setValue);
        }
      }
      option.textContent = setValue;
      option.value = setValue;
      select.append(option);
    }
    p.append(select);
  }
  return p;
}
function createP(arr, list = false, amnt = false) {
  let p = document.createElement("p");
  if (list === false && amnt === false) {
    p.append(arr.join(", "));
  }
  if (list === "equipment" && amnt === false) {
    p.append(arr.join(", "));
    p.classList.toggle("equipment", true);
  } else if (list === "proficiency" && amnt === false) {
    p.append(arr.join(", "));
    p.classList.toggle("proficiency", true);
  } else {
    let select = document.createElement("select");
    for (let i = 0; i < arr.length; i++) {
      let option = document.createElement("option");
      let setValue = arr[i];
      if (isLiteralObject(setValue) === true) {
        if (setValue.name !== undefined) {
          setValue = setValue.name;
        } else if (setValue.desc !== undefined) {
          setValue = setValue.desc;
        } else {
          setValue = JSON.stringify(setValue);
          setValue = fixTableStr(setValue);
        }
      }
      option.textContent = setValue;
      option.value = setValue;
      select.append(option);
    }
    if (amnt !== false) {
      //   select.multiple = true;
      //   checkSelected(select, amnt + 1);
      //   select.addEventListener("change", () => checkSelected(select));
      select.classList.toggle(amnt, true);
      p.append(select);
    }
  }
  return p;
}
function checkSelected(select, amnt) {
  let numSelected = 0;
  for (let i = 0; i < select.length; i++) {
    if (select[i].selected) {
      numSelected++;
      if (numSelected > amnt) {
        if (select[i].selected === false) {
          select[i].disabled = true;
        }
      } else if (numSelected < amnt) {
        if (select[i].selected === false) {
          select[i].disabled = false;
        }
      }
    }
  }
}
function createArr(arr) {
  //res.data.saving_throws
  let saveThrow = [];
  for (let i = 0; i < arr.length; i++) {
    saveThrow.push(arr[i].name);
  }
  return saveThrow;
}

function fillSelector(info, selector) {
  selector.innerHTML = "";
  for (let i = 0; i < info.length; i++) {
    let option = document.createElement("option");
    option.textContent = info[i].name;
    option.value = info[i].index;
    selector.append(option);
  }
  return selector;
}

function createEquip(startOps) {
  let theArr = [];
  for (let i = 0; i < startOps.length; i++) {
    let startOpsArr = new Set();
    if (startOps[i].from !== undefined) {
      for (let j = 0; j < startOps[i].from.length; j++) {
        if (startOps[i].from[j].equipment) {
          startOpsArr.add(startOps[i].from[j].equipment.name);
        }
        if (startOps[i].from[j].equipment_option) {
          startOpsArr.add(
            startOps[i].from[j].equipment_option.from.equipment_category.name
          );
        }
      }
    } else {
      if (startOps[i].equipment.name !== undefined) {
        startOpsArr.add(startOps[i].equipment.name);
      } else {
        startOpsArr.add(startOps[i].equipment_category.name);
      }
    }

    theArr.push([...startOpsArr]);
  }
  return theArr;
}
function isLiteralObject(a) {
  return !!a && a.constructor === Object;
}
function checkCond(key) {
  switch (key.trim()) {
    case "index":
      return true;
    case "url":
      return true;
    case "class":
      return true;
    case "ability_score_bonuses":
      return true;
    case "magical_secrets_max_5":
      return true;
    case "magical_secrets_max_7":
      return true;
    case "magical_secrets_max_9":
      return true;
    case "level":
      return true;
    case "prof_bonus":
      return true;
    case "features":
      return true;
    case "creating_spell_slots":
      return true;
    case "brutal_critical_dice":
      return true;
    default:
      return false;
  }
}
function createLevelData(levelData) {
  currentLvl.innerHTML = "<span>Level: </span>";
  profBonus.innerHTML = "<span>PB: </span>";
  classFeatures.innerHTML = "<span>Features: </span>";
  classSpecificData.innerHTML = "";
  //--curr level--
  let lvl = charLvlSelect.value - 1;
  currentLvl.append(levelData[lvl].level);
  //---prof bonus--
  profBonus.append(levelData[lvl].prof_bonus);
  //-----class features---
  let allCharFeatures = [];
  for (let i = 0; i < levelData.length; i++) {
    allCharFeatures = allCharFeatures.concat(createArr(levelData[i].features));
  }
  classFeatures.append(allCharFeatures.join(",\n"));
  console.log("features: ", allCharFeatures);
  //--ability scores---
  let aScoreUpNum = levelData[lvl].ability_score_bonuses * 2;
  let stats = [[], []];
  for (const key in playerStats) {
    stats[0].push(key);
    stats[1].push(playerStats[key]);
  }
  for (let i = 0; i < aScoreUpNum; i++) {
    createSpecialP(stats[0], true, "stats");
  }
  //--class specific features---
  console.log("levelData[lvl]", levelData[lvl]);
  for (let key in levelData[lvl]) {
    if (checkCond(key) === false) {
      console.log("key", key);
      let p = document.createElement("p");
      let span = document.createElement("span");
      let div = document.createElement("div");
      let theData = levelData[lvl][key];
      if (isLiteralObject(theData) === true) {
        for (let key2 in theData) {
          if (checkCond(key2) === false) {
            span = document.createElement("span");
            div = document.createElement("p");
            span.append(fixTableStr(key2));
            p.append(span);
            p.append(theData[key2]);
            div.append(p);
            classSpecificData.append(div);
          }
        }
      } else if (Array.isArray(theData) === false) {
        span.append(fixTableStr(key));
        p.append(theData);
      } else if (Array.isArray(theData) === true && theData.length > 0) {
        span = document.createElement("span");
        div = document.createElement("div");
        span.textContent = fixTableStr(key);
        p.append(createArr(theData).join(",\n"));
        div.append(span);
        div.append(p);
        classSpecificData.append(div);
      } else {
        span.append(fixTableStr(key, true));
        p.append(fixTableStr(JSON.stringify(theData)));
      }
      div.append(span);
      div.append(p);
      classSpecificData.append(div);
    }
  }
}
function fixTableStr(str, isHeader = false) {
  //{ " , }
  str = str.replaceAll("{", "");
  str = str.replaceAll("}", "");
  str = str.replaceAll("[", "");
  str = str.replaceAll("]", "");
  str = str.replaceAll('"', "");
  str = str.replaceAll(",", "\n");
  if (isHeader === true) {
    str = str.replaceAll("_", "\n");
  } else {
    str = str.replaceAll("_", " ");
  }
  return str;
}
function addCharInfo(res) {
  let chooseAmnt = res.data.proficiency_choices[0].choose;
  hitDie.innerHTML = '<span class="">Hit Die:</span>';
  proficiencies.innerHTML = '<span class="charSpecs">Proficiencies</span>';
  subclasses.innerHTML = `<span class="charSpecs">Subclasses</span>`;
  let subSelect = document.createElement("select");
  subSelect.id = "subclassSelect";
  subSelect.name = "subclassSelect";
  subclasses.append(subSelect);
  savingThrows.innerHTML = '<span class="charSpecs">Saving Throws</span>';
  startingEquip.innerHTML = '<span class="charSpecs">Starting Equipment</span>';
  chooseSkills.innerHTML = `<span class="charSpecs">Choose ${chooseAmnt} Skills</span>`;

  hitDie.append("d" + JSON.stringify(res.data.hit_die));

  proficiencies.append(
    createP(createArr(res.data.proficiencies), "proficiency")
  );

  savingThrows.append(createP(createArr(res.data.saving_throws)));
  let classItems = createP(
    createEquip(res.data.starting_equipment),
    "equipment"
  );
  startingEquip.append(classItems);
  let chooseTheSkills = createArr(res.data.proficiency_choices[0].from);
  for (let i = 0; i < chooseAmnt; i++) {
    chooseSkills.append(createSpecialP(chooseTheSkills, true, "skills"));
  }
  createEquip(res.data.starting_equipment_options).forEach((elem) =>
    startingEquip.append(createSpecialP(elem, true, "equipment"))
  );
}
function addRaceInfo(res) {
  raceSize.innerHTML = "";
  sizeDesc.innerHTML = "";
  raceLang.innerHTML = "";
  raceSpeed.innerHTML = "";
  raceStartProf.innerHTML = "";
  traits.innerHTML = "";
  subRaces.innerHTML = "";
  for (const key in res) {
    let containDiv = document.createElement("div");
    let span = document.createElement("span");
    console.log("RaceKeys", key);
    switch (key) {
      case "size":
        span.append("\nSize: ");
        containDiv.append(span);
        containDiv.append(`${res[key]}`);
        raceSize.append(containDiv);
        break;
      case "size_description":
        sizeDesc.append(res[key]);
        break;
      case "languages":
        span.append("Languages: ");
        containDiv.append(span);
        let label = document.createElement("span");
        label.append(createArr(res[key]));
        label.classList.toggle("language", true);
        containDiv.append(label);
        raceLang.append(containDiv);
        break;
      case "language_options":
        span.append("Choose A Language: ");
        containDiv.append(span);
        containDiv.append(
          createSpecialP(createArr(res[key].from), true, "language")
        );
        raceLang.append(containDiv);
        break;
      case "speed":
        span.append("\nSpeed: ");
        containDiv.append(span);
        containDiv.append(`${res[key]}ft\n`);
        raceSpeed.append(containDiv);
        break;
      case "starting_proficiencies":
        span.append("Starting Proficiencies ");
        containDiv.append(span);
        console.log(res[key]);

        containDiv.append(createP(createArr(res[key]).slice(0, 0)));
        console.log("RaceKeys", createP(createArr(res[key])));
        raceStartProf.append(containDiv);
        break;
      case "starting_proficiency_options":
        containDiv.append(span);
        for (let i = 0; i < res[key].choose; i++) {
          const element = res[key].from;
          containDiv.append(
            createSpecialP(createArr(element), true, "proficiency")
          );
        }
        console.log("RaceKeys", res[key]);

        raceStartProf.append(containDiv);
        console.log("RaceKeys", res[key]);
        break;
      case "traits":
        span.append("Traits: ");
        containDiv.append(span);
        containDiv.append(createArr(res[key]));
        traits.append(containDiv);
        break;
      case "subRaces":
        span.append("Subraces: ");
        containDiv.append(span);
        containDiv.append(createArr(res[key]));
        subRaces.append(containDiv);
        break;
    }
  }
}
function addBackInfo(res) {
  for (const key in res.data) {
    let chooseAmnt = res.data[key].choose;
    let chooseFrom = res.data[key].from;
    switch (key) {
      case "bonds":
        bonds.innerHTML = "<span>Bonds</span>";
        for (let i = 0; i < chooseAmnt; i++) {
          bonds.append(createP(chooseFrom, true, "bonds"));
        }
        break;
      case "flaws":
        flaws.innerHTML = "<span>Flaws</span>";
        for (let i = 0; i < chooseAmnt; i++) {
          flaws.append(createP(chooseFrom, true, "flaws"));
        }
        break;
      case "ideals":
        ideals.innerHTML = "<span>Ideals</span>";
        for (let i = 0; i < chooseAmnt; i++) {
          ideals.append(createP(chooseFrom, true, "ideals"));
        }
        break;
      case "language_options":
        languageOptions.innerHTML = `<span>Choose ${chooseAmnt} Language Options</span>`;
        for (let i = 0; i < chooseAmnt; i++) {
          languageOptions.append(createSpecialP(chooseFrom, true, "language"));
        }
        break;
      case "personality_traits":
        personalityTraits.innerHTML = "<span>Personality Traits</span>";
        personalityTraits.append(createP(chooseFrom, true));
        personalityTraits.append(createP(chooseFrom, true));
        break;
      case "starting_equipment":
      // startingEquipment.append(res.data[key]);
      case "starting_equipment_options":
      // backProficiencies.append(createP(createEquip(res.data[key])));
      case "starting_proficiencies":
      // backProficiencies.append(createEquip(res.data[key]));
    }
  }
}
function sortLevels(levelsRes, maxLvl = 10) {
  let levels = [];
  let currLevel = 0;
  console.log(levelsRes);
  for (let i = 0; i < levelsRes.length; i++) {
    if (levelsRes[i].level > currLevel) {
      currLevel++;
      if (levelsRes[i].level <= maxLvl) {
        levels.push(levelsRes[i]);
      }
    }
  }
  return levels;
}

function classSelect() {
  return document.getElementById("classSelect");
}
// ------authentication----------
try {
  async function authy() {
    axios.get("/api/auth").then((resp) => {
      if (resp.data === false) {
        window.location.href = "./index.html";
      }
    });
  }
  authy();
} catch (error) {
  console.log(error);
}
//-------D&D character info-----------
try {
  async function getBaseSelections() {
    await axios.get("/api/baseCharInfo/").then((resA) => {
      fillSelector(resA.data.races, raceSelect);
      fillSelector(resA.data.classes, selectClass);
      fillSelector(resA.data.backgrounds, backSelect);
    });
  }

  async function getRace() {
    let raceURL = `races@7@${raceSelect.value}`;
    await axios
      .get("/api/moreinfo", { params: { urlSent: raceURL } })
      .then((raceInfo) => {
        console.log("raceinfo ", raceInfo.data);
        addRaceInfo(raceInfo.data);
      });
  }

  async function getBackgr() {
    let backURL = `backgrounds@7@${backSelect.value}`;
    await axios
      .get("/api/moreinfo", { params: { urlSent: backURL } })
      .then((backRes) => {
        console.log("backRes", backRes.data);
        addBackInfo(backRes);
      });
  }
  function addFeatsToLvl(charLevels, subLevels) {
    for (let i = 0; i < charLevels.length; i++) {
      for (let k = 0; k < subLevels.length; k++) {
        if (charLevels[i].level === subLevels[k].level) {
          subLevels[k].features.forEach((feat) => {
            charLevels[i].features.push(feat);
          });
        }
      }
    }
    return charLevels;
  }
  async function getLevels() {
    let cClass = selectClass.value;
    let subLevels = await getSubclassInfo();
    console.log("subLevels", subLevels);

    let cLvlObj = { params: { charClass: cClass } };
    let charLevels = await axios.get("/api/getCharLevels/", cLvlObj);

    let sortMyLevels = await sortLevels(charLevels.data, charLvlSelect.value);
    await addFeatsToLvl(sortMyLevels, subLevels.data);
    await createLevelData(sortMyLevels);
  }
  let classStartItems = [];
  async function getClassInfo() {
    let cClass = selectClass.value;
    let theURL = `classes@7@${cClass}`;
    await axios
      .get("/api/moreinfo", { params: { urlSent: theURL } })
      .then((classDetails) => {
        console.log("classDetails", classDetails);
        addCharInfo(classDetails);
        classStartItems = createP(
          createEquip(classDetails.data.starting_equipment)
        );
        console.log(createP(createArr(classDetails.data.subclasses)));
        subclassSelect.append(createP(createArr(classDetails.data.subclasses)));
        fillSelector(classDetails.data.subclasses, subclassSelect);
      });
    await getLevels();
  }
  async function getSubclassInfo() {
    let subURLvalue = subclassSelect.value;
    if (subclassSelect.value === undefined) {
      subURLvalue = "berserker";
    }
    let subURL = `subclasses@7@${subURLvalue}@7@levels`;
    console.log("subURL", subURL);
    let subRes = await axios.get("/api/moreinfo", {
      params: { urlSent: subURL },
    });
    return subRes;
  }
  getBaseSelections().then(async () => {
    raceSelect.addEventListener("change", getRace);
    backSelect.addEventListener("change", getBackgr);
    selectClass.addEventListener("change", getClassInfo);
    charLvlSelect.addEventListener("change", getLevels);
    subclassSelect.addEventListener("change", getLevels);
    await getClassInfo();
    await getSubclassInfo();
    await getLevels();
    await getBackgr();
    await getRace();

    console.log("startingEquipment", startingEquipment);
  });
} catch (error) {
  console.log(error);
}

function uniqueArr(elemArr) {
    let rSet = new Set();
    elemArr.forEach((elem) => {
      if (elem.value) {
        rSet.add(elem.value);
      } else {
        let addElem = elem.childNodes[0].data.split(",");
        addElem.forEach((x) => {
          rSet.add(x);
        });
      }
    });
    rSet = [...rSet];
    return rSet
  }

function submitCharacter(e) {
    e.preventDefault()
  let cStats = playerStats
  let cCurrCamp = null

  let cName = charName.value;
  let cClass = selectClass.value;
  let cSubclass = subclassSelect.value;
  let background = backSelect.value;
  let cLevel = charLvlSelect.value;
  //--stats-----

  //---skills---
  let charSkillSet = new Set();
  let allSkills = document.querySelectorAll(".skills");
  allSkills.forEach((ele) => {
    charSkillSet.add(ele.value);
  });
  charSkillSet = [...charSkillSet];
  //---items----
  let multiChoiceItems = [];
  let multiChoiceItemSelectors = document.querySelectorAll(".equipment");
  multiChoiceItemSelectors.forEach((ele) => {
    if (ele.value) {
      multiChoiceItems.push(ele.value);
    } else {
      multiChoiceItems.push(ele.childNodes[0].data);
    }
  });
  //   multiChoiceItems.concat(classStartItems);
  let cItems = multiChoiceItems.join(",\n ");
  //-- languages--
  let langSelect = document.querySelectorAll(".language");
  let alllangs = uniqueArr(langSelect);
 
  //-- proficiencys---
  let allSelectProf = document.querySelectorAll(".proficiency");
  
  let allProf = uniqueArr(allSelectProf);
  //---back---
  const yourBonds = document.querySelectorAll(".bonds");
  const yourFlaws = document.querySelectorAll(".flaws");
  const yourIdeals = document.querySelectorAll(".ideals");
  
  let allBonds = uniqueArr(yourBonds);
  let allFlaws = uniqueArr(yourFlaws)
  let allIdeals = uniqueArr(yourIdeals)

  //----the object-----------
  cStats = JSON.stringify(cStats);

  allProf = allProf.join(',')
  charSkillSet = charSkillSet.join(',')
  alllangs = alllangs.join(',')
  allBonds = allBonds.join(',')
  allFlaws = allFlaws.join(',')
  allIdeals = allIdeals.join(',')
  
  let submitObj = {
      cCurrCamp,
    username,
    character_name:cName,
    level:cLevel,
    char_class:cClass,
    subclass:cSubclass,
    background,
    proficiencies:allProf,
    skills:charSkillSet,
    languages:alllangs,
    inventory:cItems,
    bonds:allBonds,//a
    flaws:allFlaws,
    ideals:allIdeals,
    stats:cStats,
  };
  console.log(submitObj);
//   let toSend = JSON.stringify(submitObj)
    axios.post("/api/addChar", submitObj).then((res) => {
         window.location.href='/profile.html'
     }).catch(err=>console.log(err))
}
submitCharBtn.addEventListener("click", submitCharacter);
loggedIn(username);
