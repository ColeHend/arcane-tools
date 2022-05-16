let username = window.localStorage.getItem("username");
loggedIn(username);
try {
    async function authy() {
      axios.get("/api/auth").then((resp) => {
        if (resp.data === false) {
          window.location.href = "./index.html";
        }
      });
    }
    authy();
  } catch (error) {console.log(error);}

const typeSelect = document.getElementById("homebrew_type");
const homeTitle = document.getElementById("homebrew_title");
const prof1 = document.getElementById("profChoice1");
const prof2 = document.getElementById("profChoice2");
const startLangs = document.getElementById("startLangs");
const allLangs = document.getElementById("allLangs");
const removeLangBtn = document.getElementById('removeLangBtn');
const addLangBtn = document.getElementById('addLangBtn');
const startEquip = document.getElementById("startEquip");
const allEquip = document.getElementById("allEquip");
const addEquipBtn = document.getElementById('addEquipBtn');
const removeEquipBtn = document.getElementById('removeEquipBtn');
const homeDesc = document.getElementById("homebrew_desc");
const personalityTraits = document.getElementById('personalityTraits')
const personalityTraitsAdd = document.getElementById('personalityTraitsAdd')
const homebrewIdeals = document.getElementById('homebrewIdeals')
const homebrewIdealsAdd = document.getElementById('homebrewIdealsAdd');
const homebrewBonds = document.getElementById('homebrewBonds');
const bondsAdd = document.getElementById('bondsAdd');
const submitBtn = document.getElementById("submitButton");

async function getInfo(params) {
  let urlSent = params;
  let prof = await axios.get("/api/moreInfo", { params: urlSent }).catch(err=>console.log(err))
  console.log(params,prof);
  return prof.data;
}

function getName(objArr) {
    let arr = []
    let keys = ['results']    
    for (let i = 0; i < objArr.length; i++) {
        const element = objArr[i];
        arr.push(element.name)
    }
    return arr
}

function addLang(params) {
    if (params==='add') {
        startLangs.value += allLangs.value
    } else if(params==='remove'){
        startLangs.value.replace(allLangs.value,'')
    }
}

try {
    async function fillForm() {
        let equip =  getInfo("equipment");
        let language = await getInfo('languages');
        let prof = await getInfo("proficiencies");
        console.log('equip',equip);
        console.log('language',language);
        console.log('prof',prof);
        equip = getName(equip.results)
        language = getName(language.results)
        prof = getName(prof.results)
    
        for (let i = 0; i < equip.length; i++) {
            let option = document.createElement('option');
            option.append(equip[i]);
            allEquip.append(option);
        }
        for (let i = 0; i < language.length; i++) {
            let option = document.createElement('option');
            option.append(language[i]);
            allLangs.append(option);
        }
        for (let i = 0; i < prof.length; i++) {
            let option = document.createElement('option');
            option.append(prof[i]);
            prof1.append(option);
            prof2.append(option);
        }
    } fillForm() 
} catch (error) {console.log(error);}

async function homebrewTypes() {
  let homebrewBackObj = {
    name: homeTitleV,
    starting_proficiencies: [prof1.value,prof2.value],
    language_options: allLangs.value,
    starting_equipment: allEquip.value,
    feature: {
      desc: [homeDesc.value],
      personality_traits: {
        from: [personalityTraits.value],
        choose: 2,
      },
    },
    ideals: {
      from: [homebrewIdeals.value],
      choose: 1,
    },
    bonds: {
      from: [homebrewBonds.value],
      choose: 1,
    },
  };
}

function submitHomebrew(e) {
  let typeSelectV = typeSelect.value;
  let homeDescV = homeDesc.value;
  let homeTitleV = homeTitle.value;

  let submitObj = { typeSelectV, homeDescV, homeTitleV };
  axios.post("/api/addHomebrew", submitObj).then((res) => {
    let homeDescV = "";
    let homeTitleV = "";
  });
}

submitBtn.addEventListener("click", submitHomebrew);
