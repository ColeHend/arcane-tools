let username = window.localStorage.getItem("username");
const charName = document.getElementById('charName');
const raceSelect = document.getElementById('raceSelect');
const classSelect = document.getElementById('classSelect');
let allInfo;
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
try {
    async function getDndInfo() {
        await axios.get('/api/baseCharInfo/').then(res=>{
            
            placeInfo(allInfo,res.data)
            
            fillSelector(res.data.races,raceSelect)
            fillSelector(res.data.classes,classSelect)
        })

    } getDndInfo()
    
} catch (error) {console.log(error);}
loggedIn(username);

function fillSelector(info,selector) {
    for (let i = 0; i < info.length; i++) {
        let option = document.createElement('option');
        option.textContent = info[i].name
        option.value = info[i].index
        selector.append(option)
    }
}


