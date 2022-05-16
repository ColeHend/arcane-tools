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

console.log("username: ", username);

function createRow(charArr,toShow) {
  let allChars = []
  for (let i = 0; i < charArr.length; i++) {
    let row = document.createElement('tr');
    // for (const key in charArr[i]) {
      let tdName = document.createElement('td');
      tdName.append(charArr[i].character_name)
      let tdLevel = document.createElement('td');
      tdLevel.append(charArr[i].character_level)
      let tdRace = document.createElement('td');
      tdRace.append(charArr[i].character_race)//n/a 
      let tdClass = document.createElement('td');
      tdClass.append(charArr[i].character_class)
      let tdSubclass = document.createElement('td');
      tdSubclass.append(charArr[i].character_subclass)
      let tdBackg = document.createElement('td');
      tdBackg.append(charArr[i].character_background)
      row.append(tdName)
      row.append(tdLevel)
      row.append(tdRace)
      row.append(tdClass)
      row.append(tdSubclass)
      row.append(tdBackg)
      allChars.push(row)
  }
  return allChars
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
      document.getElementById('charTable').classList.toggle('hidden',false)
      let tableChars = createRow(characters,toShow)
      for (let i = 0; i < tableChars.length; i++) {
        const element = tableChars[i];
        playerChars.append(element)
        
      }
    } else {
      charHead.textContent = "No Characters Found";
      document.getElementById('charTable').classList.toggle('hidden',true)
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

    addHomebrewBtn.addEventListener('click',()=>window.location.href='/homebrew.html');

    buttonBar.appendChild(addCharBtn)
    buttonBar.appendChild(addCampaignBtn)
    buttonBar.appendChild(addHomebrewBtn)

}createButtonBar()