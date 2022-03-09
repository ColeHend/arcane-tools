let username = window.localStorage.getItem("username");
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

console.log("username: ", username);

loggedIn(username);
function createCharDisplay(charArr,toShow,toReplace=['','']) {
  let allChar = document.createElement('div');
  for (let i = 0; i < charArr.length; i++) {
    let oneChar = document.createElement('div');
    for (let key in charArr[i]) {
      let span = document.createElement('span');
      let p = document.createElement('p');
      const element = charArr[i][key];
      if (toShow.includes(key)) {
        let toSho = key.replace(toReplace[0],toReplace[1])
        span.append(toSho)
        p.append(span)
        p.append(element)
      } 
      oneChar.append(p)
    }
    allChar.append(oneChar);
  }
  return allChar
}
const playerContent = document.getElementById("playerContent");
const buttonBar = document.getElementById('buttonBar');
const playerChars = document.getElementById("characters");
const charHead = document.getElementById("charHead");
try {
  async function addChars() {
    let toShow = ['character_level','character_name','character_class','character_subclass','character_background']
    let res = await axios.get("/api/characters/", { username });
    let characters = res.data[0];
    let rows = res.data[1].rowCount;
    console.log(`rows: `,rows,'chars',characters);
    console.log("Char res: ", res);
    if (rows > 0) {
      playerChars.append(createCharDisplay(characters,toShow,['character_','']));
    } else {
      charHead.textContent = "No Characters Found";
    }
  }
  addChars();
} catch (error) {
  console.log(error);
}
const homebrew = document.getElementById("homebrew");
const homeHead = document.getElementById("homeHead");
try {
  async function getHomebrew() {
    let res = await axios.get("/api/homebrew/", { username });
    let homebrew = res.data[0],
      rows = res.data[1].rowCount;
    console.log('rows: ',rows,'homebrew:  ',homebrew);
    console.log("Homb res: ", res);
    if (rows > 0) {
      homebrew.innerText = homebrew;
    } else {
      homeHead.innerText = "No Homebrew Found";
    }
  }
  getHomebrew();
} catch (error) {
  console.log(error);
}
const campaigns = document.getElementById("campaigns");
const campHead = document.getElementById("campHead");
try {
  async function getCampaigns() {
    let res = await axios.get("/api/campaigns/", { username });
    let campaigns = res.data[0],
      rows = res.data[1].rowCount;
    console.log(`rows: `,rows,`campaigns: `,campaigns);
    console.log("Camp res: ", res);
    if (rows>0) {
        campaigns.innerText = campaigns
    } else{
        campHead.innerText = 'No Campaigns Found'
    }
  }
  getCampaigns()
} catch (error) {
  console.log(error);
}

function createButtonBar() {
    const addCharBtn = document.createElement('button');
    addCharBtn.textContent = 'Create A Character'
    addCharBtn.addEventListener('click',()=>window.location.href = './character.html')
    const addCampaignBtn = document.createElement('button');
    addCampaignBtn.textContent = "Add a Campaign"
    const addHomebrewBtn = document.createElement('button');
    addHomebrewBtn.textContent = 'Create Homebrew'
    buttonBar.appendChild(addCharBtn)
    buttonBar.appendChild(addCampaignBtn)
    buttonBar.appendChild(addHomebrewBtn)

}createButtonBar()