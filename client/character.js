let username = window.localStorage.getItem("username");
const charName = document.getElementById("charName");
const raceSelect = document.getElementById("raceSelect");
const backSelect = document.getElementById("backSelect");
const chooseSkills = document.getElementById("chooseSkills");
const hitDie = document.getElementById("hitDie");
const proficiencies = document.getElementById("proficiencies");
const savingThrows = document.getElementById("savingThrows");
const subclasses = document.getElementById("subclasses");
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
const selectClass = document.getElementById("classSelect");
const charLvlSelect = document.getElementById("characterLevel");
const bonds = document.getElementById("bonds");
const flaws = document.getElementById("flaws");
const ideals = document.getElementById("ideals");
const languageOptions = document.getElementById("languageOptions");
const personalityTraits = document.getElementById("personalityTraits");
const startingEquipment = document.getElementById("startingEquipment");
const backProficiencies = document.getElementById("backProficiencies");
//----useful functions-------------- <select name="startEquipment" id="startEquipment"></select>
function createP(arr, list = false, amnt = false) {
  let p = document.createElement("p");
  if (list === false) {
    p.append(arr.join(", "));
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
      select.multiple = true;
      checkSelected(select, amnt + 1);
      select.addEventListener("change", () => checkSelected(select));
    }
    p.append(select);
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
    default:
      return false;
  }
}
function createTable(headers, levelData) {
  //--sort headers for display--------
  for (let i = 0; i < headers.length; i++) {
    if (isLiteralObject(headers[i]) === true) {
      for (let key in headers[i]) {
        headers.push(fixTableStr(key, true));
      }
      headers.splice(i, 1);
    }
  }
  console.log("Headers: ", headers);
  //--sort levelData for display---------------
  for (let i = 0; i < levelData.length; i++) {
    for (let k = 0; k < levelData[i].length; k++) {
      let element = levelData[i][k];
      if (isLiteralObject(element) === true) {
        if (element.spell_slots_level_1 >= 0) {
          levelData[i].splice(k, 1);
        } else {
          let ele = JSON.stringify(element);
          levelData[i].splice(k, 1, fixTableStr(ele));
        }
      }
      if (
        isLiteralObject(element) === false &&
        Array.isArray(element) === true
      ) {
        if (element.spell_slots_level_1 >= 0) {
          levelData[i].splice(k, 1);
        } else {
          let ele = JSON.stringify(element);
          levelData[i].splice(k, 1, fixTableStr(ele));
        }
      }
    }
  }
  console.log("Levels Data: ", levelData);
  //--table creation-------------------------
  charTableHead.innerHTML = "";
  for (let i = 0; i < headers.length; i++) {
    if (!checkCond(headers[i])) {
      let th = document.createElement("th");
      th.textContent = headers[i];
      charTableHead.append(th);
    }
  }

  charTableBody.innerHTML = "";
  let counting = 0;
  for (let l = 0; l < +charLvlSelect.value; l++) {
    counting++;
    let tr = document.createElement("tr");
    for (let i = 0; i < headers.length; i++) {
      let td = document.createElement("td");

      if (levelData[l][i] !== undefined) {
        td.textContent = levelData[l][i];
      } else {
        td.textContent = "N/A";
      }
      tr.append(td);
    }
    if (tr.childNodes.length > 0) {
      charTableBody.append(tr);
    }
  }

  console.log("Levels: ", counting);
}
function levelsToTableData(levels) {
  let headers = [];
  //---level table head--------
  //--get headers-
  for (let key in levels[levels.length - 1]) {
    if (checkCond(key) === false) {
      if (isLiteralObject(levels[levels.length - 1][key]) === true) {
        for (let key2 in levels[levels.length - 1][key]) {
          if (checkCond(key2) === false) {
            const element = levels[levels.length - 1][key][key2];
            key2 = key2.replace("spell_slots_level_", "");
            headers.push(fixTableStr(key2, true));
          }
        }
      } else {
        key = key.replace("spell_slots_level_", "");
        headers.push(fixTableStr(key, true));
      }
    }
  }
  //------level table body-----------
  //--get data-
  let levelData = [];
  for (let i = 0; i < levels.length; i++) {
    let levelArr = [];
    for (let key in levels[levels.length - 1]) {
      if (checkCond(key) === false) {
        let data = levels[i][key];
        if (Array.isArray(data)) {
          let arr = [];
          for (let k = 0; k < data.length; k++) {
            let element = data[k].name;
            arr.push(element);
          }
          data = arr.join(",\n ");
        }
        if (isLiteralObject(data) === true) {
          for (let newKey in data) {
            if (checkCond(newKey) === false) {
              let element = data[newKey];
              levelArr.push(element);
            }
          }
        }
        if (data) {
          levelArr.push(data);
        } else {
          levelArr.push("N/A");
        }
      }
    }
    levelData.push(levelArr);
  }
  return { headers, data: levelData };
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
  subclasses.innerHTML = '<span class="charSpecs">Subclasses</span>';
  savingThrows.innerHTML = '<span class="charSpecs">Saving Throws</span>';
  startingEquip.innerHTML = '<span class="charSpecs">Starting Equipment</span>';
  chooseSkills.innerHTML = `<span class="charSpecs">Choose ${chooseAmnt} Skills</span>`;

  hitDie.append("d" + JSON.stringify(res.data.hit_die));
  proficiencies.append(createP(createArr(res.data.proficiencies)));
  subclasses.append(createP(createArr(res.data.subclasses)));
  savingThrows.append(createP(createArr(res.data.saving_throws)));
  startingEquip.append(createP(createEquip(res.data.starting_equipment)));
  console.log("chooseTheSkills ", chooseAmnt);
  let chooseTheSkills = createArr(res.data.proficiency_choices[0].from);
  chooseSkills.append(createP(chooseTheSkills, true, chooseAmnt));
  createEquip(res.data.starting_equipment_options).forEach((elem) =>
    startingEquip.append(createP(elem, true))
  );
}
function addRaceInfo(res) {
  raceSize.innerHTML = "";
  sizeDesc.innerHTML = "";
  raceLang.innerHTML = "";
  raceSpeed.innerHTML = "";
  traits.innerHTML = "";
  subRaces.innerHTML = "";
  for (const key in res) {
    let containDiv = document.createElement("div");
    let span = document.createElement("span");
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
        containDiv.append(createArr(res[key]));
        raceLang.append(containDiv);
        break;
      case "language_options":
        span.append("Choose A Language: ");
        containDiv.append(span);
        containDiv.append(createP(createArr(res[key].from),true));
        raceLang.append(containDiv);
        break;
      case "speed":
        span.append("\nSpeed: ");
        containDiv.append(span);
        containDiv.append(`${res[key]}ft\n`);
        raceSpeed.append(containDiv);
        break;
      case "starting_proficiencies":
        break;
      case "starting_proficiencies":
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
        bonds.append(createP(chooseFrom, true));
        break;
      case "flaws":
        flaws.innerHTML = "<span>Flaws</span>";
        flaws.append(createP(chooseFrom, true));
        break;
      case "ideals":
        ideals.innerHTML = "<span>Ideals</span>";
        ideals.append(createP(chooseFrom, true, chooseAmnt));
        break;
      case "language_options":
        languageOptions.innerHTML = `<span>Choose ${chooseAmnt} Language Options</span>`;
        languageOptions.append(createP(chooseFrom, true, chooseAmnt));
        break;
      case "personality_traits":
        personalityTraits.innerHTML = "<span>Personality Traits</span>";
        personalityTraits.append(createP(chooseFrom, true, chooseAmnt));
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
function sortLevels(levelsRes) {
  let levels = [];
  let currLevel = 0;
  console.log(levelsRes);
  for (let i = 0; i < levelsRes.length; i++) {
    if (levelsRes[i].level > currLevel) {
      currLevel++;
      levels.push(levelsRes[i]);
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
  async function getClasses() {
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

  async function getLevels() {
    let cClass = selectClass.value;

    let cLvlObj = { params: { charClass: cClass } };
    await axios.get("/api/getCharLevels/", cLvlObj).then((charLevels) => {
      charLevels = charLevels.data;
      charLevels = sortLevels(charLevels);
      let tableData = levelsToTableData(charLevels);
      createTable(tableData.headers, tableData.data);
    });
  }

  async function getDndInfo() {
    console.log("called!!!!");
    let cClass = selectClass.value;
    let theURL = `classes@7@${cClass}`;
    await getLevels();
    await axios
      .get("/api/moreinfo", { params: { urlSent: theURL } })
      .then((classDetails) => {
        console.log("classDetails", classDetails);
        addCharInfo(classDetails);
      });
  }
  getClasses().then(() => {
    getDndInfo();
    getBackgr();
    getRace();
    raceSelect.addEventListener("change", getRace);
    backSelect.addEventListener("click", getBackgr);
    selectClass.addEventListener("change", getDndInfo);
    charLvlSelect.addEventListener("change", getLevels);
  });
} catch (error) {
  console.log(error);
}

loggedIn(username);
