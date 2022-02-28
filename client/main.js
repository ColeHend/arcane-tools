const url = window.location.href.replace(window.location.pathname, "");
console.log(url);
var socket = io();
//-------Check If On Mobile---------------
var isMobile = false;
// device detection
if (
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent
  ) ||
  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    navigator.userAgent.substr(0, 4)
  )
) {
  isMobile = true;
}
let userType = isMobile ? "mobile" : "desktop";
console.log(`Hello, ${userType} user!`);
//---------------------------------------------
const banner = document.getElementById("banner");
const loginBar = document.getElementById("loginBar");
const buttonBar = document.getElementById("buttonBar");
const postsDiv = document.getElementById("posts");
const modal = document.getElementById("modal");

let testPost = {
  title: "Test",
  message: "This is a total test",
};

function mobileSetup() {
  if (isMobile) {
    //On mobile
    postsDiv.style.flexFlow = "column wrap";
  } else {
    //On desktop
    postsDiv.style.flexFlow = "row wrap";
    postsDiv.style.justifyContent = "space-around";
  }
}

function init() {
    mobileSetup();
    
    axios.get('/api/auth')
    .then(res=>{
        let {data} = res
        if (data===true) {
            console.log('logged in!')
        } else if (data===false){
            notLoggedIN()
        } else {
            console.log(res);
        }
    })
}init()

function loginForm(e) {
  let type = e.target.value;

  modal.innerHTML = "";
  let h3 = document.createElement("h3");
  h3.textContent = type;
  let span = document.createElement("span");
  span.textContent = "X";
  span.style.float = "right";
  span.id = "exitModal";
  span.addEventListener("click", closeModal);
  let theForm = document.createElement("form");
  theForm.setAttribute("method", "post");
  theForm.setAttribute("action", `/api/${type}`);
  let username = document.createElement("input");
  username.setAttribute("type", "text");
  username.setAttribute("name", "username");
  username.setAttribute("id", "username");
  username.setAttribute("placeholder", "username..");
  let password = document.createElement("input");
  password.setAttribute("type", "password");
  password.setAttribute("name", "password");
  password.setAttribute("id", "password");
  password.setAttribute("placeholder", "password..");
  let passwordConfirm = document.createElement("input");
  passwordConfirm.setAttribute("type", "password");
  passwordConfirm.setAttribute("name", "passwordConfirm");
  passwordConfirm.setAttribute("id", "passwordConfirm");
  passwordConfirm.setAttribute("placeholder", "enter password again");
  let submit = document.createElement("button");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Submit");
  submit.textContent = "Submit";
  theForm.appendChild(h3);
  theForm.appendChild(username);
    let h2 = document.createElement('p');
    h2.innerHTML = 'Please Enter a Password 8 Characters or Longer<br> that contains special characters!'
    h2.id = 'registerInfo'
 

  if (type === "login") {
    theForm.appendChild(password);
    theForm.addEventListener("submit", login);
  } else {
    theForm.appendChild(h2)
    theForm.appendChild(password);
    theForm.appendChild(passwordConfirm);
    theForm.addEventListener("submit", register);
  }
  theForm.appendChild(submit);
  modal.appendChild(span);
  modal.append(theForm);
  modal.classList.toggle("modalNone", false);
  modal.classList.toggle("modalShow", true);
  theForm.classList.toggle("modalLogin", true);
}

function closeModal() {
  modal.classList.toggle("modalNone", true);
  modal.classList.toggle("modalShow", false);
}

function login(e) {
  e.preventDefault();
  let userN = document.getElementById("username").value
  let passW = document.getElementById("password").value
  let sendObj = {
    username: userN,
    password: passW,
  };
  axios
    .post("/api/login", sendObj)
    .then((res) => {
      res.sendStatus(200);
    })
    .catch((err) => console.log(err));
}

function register(e) {
  e.preventDefault();
  let sendObj = {
    username: document.querySelector("#username").value(),
    password: document.getElementById("password").value(),
  };
  axios
    .post("/api/register", sendObj)
    .then((res) => {
      res.status(200).send(res.data);
    })
    .catch((err) => console.log(err));
}

function notLoggedIN() {
  let loginBtn = document.createElement("button");
  loginBtn.value = "login";
  loginBtn.innerText = "Login";
  loginBtn.setAttribute("id", "loginBtn");
  let registerBtn = document.createElement("button");
  registerBtn.value = "register";
  registerBtn.textContent = "Register";
  registerBtn.setAttribute("id", "registerBtn");
  loginBar.append(loginBtn);
  loginBar.appendChild(registerBtn);
  loginBtn.addEventListener("click", loginForm);
  registerBtn.addEventListener("click", loginForm);
}

function createPost(postObj) {
  let post = document.createElement("div");
  post.setAttribute("style", "display:flex;flex-direction:column");
  post.classList.toggle("post", true);
  let titlePost = document.createElement("span");
  titlePost.innerText = postObj.title;
  titlePost.classList.toggle("postTitle", true);
  let messPost = document.createElement("p");
  messPost.innerHTML = postObj.message;
  messPost.classList.toggle("postMessage", true);
  post.appendChild(titlePost);
  post.appendChild(messPost);
  postsDiv.prepend(post);
}
createPost(testPost);
createPost(testPost);

const loginBtn = document.getElementById("loginBtn");
