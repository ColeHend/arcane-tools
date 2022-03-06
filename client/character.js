let username = window.localStorage.getItem("username");
const charName = document.getElementById("charName");
const raceSelect = document.getElementById("raceSelect");
const classSelect = document.getElementById("classSelect");
const hitDie = document.getElementById("hitDie");
const proficiencies = document.getElementById("proficiencies");
const savingThrows = document.getElementById("savingThrows");
const subclasses = document.getElementById("subclasses");
const skills = document.getElementById("skills");
const startingEquip = document.getElementById("startingEquip");

function createP(arr, str = ", ") {
  let p = document.createElement("p");
  p.append(arr.join(str));
  return p;
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
    if (startOps[i].from) {
      for (let j = 0; j < startOps[i].from.length; j++) {
        if (startOps[i].from[j].equipment) {
          startOpsArr.add(startOps[i].from[j].equipment.name);
        } else if (startOps[i].from[j].equipment_option) {
          startOpsArr.add(startOps[i].from[j].equipment_option.from.equipment_category.name);
        }
      }
    } else {
      if (startOps[i].equipment.name) {
        startOpsArr.add(startOps[i].equipment.name);
      } else {
        startOpsArr.add(startOps[i].equipment_category.name);
      }
    }

    theArr.push([...startOpsArr]);
  }
  return theArr;
}

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
try {
  async function getDndInfo() {
    hitDie.innerHTML='<span class="">Hit Die:</span>'
    proficiencies.innerHTML='<span class="charSpecs">Proficiencies</span>'
    subclasses.innerHTML='<span class="charSpecs">Subclasses</span>'
    savingThrows.innerHTML='<span class="charSpecs">Saving Throws</span>'
    startingEquip.innerHTML='<span class="charSpecs">Starting Equipment</span>'
    await axios.get("/api/baseCharInfo/").then((resA) => {
      fillSelector(resA.data.races, raceSelect);
      fillSelector(resA.data.classes, classSelect);

      let link = "https://www.dnd5eapi.co/api/classes/";
      let url = classSelect.value || "warlock";
      let host = link.concat(url);
      console.log(resA.data.races);

      axios.get(host).then((res) => {
        hitDie.append("d" + JSON.stringify(res.data.hit_die));
        console.log(res.data);
        
        proficiencies.append(createP(createArr(res.data.proficiencies)));
        subclasses.append(createP(createArr(res.data.subclasses)));
        savingThrows.append(createP(createArr(res.data.saving_throws)));

        startingEquip.append(createP(createEquip(res.data.starting_equipment)));

        let soArr = createEquip(res.data.starting_equipment_options);
        soArr.forEach((elem) => startingEquip.append(createP(elem, " or ")));
      });

    });
  }
  getDndInfo();
  classSelect.addEventListener('change',getDndInfo)
} catch (error) {
  console.log(error);
}

loggedIn(username);
