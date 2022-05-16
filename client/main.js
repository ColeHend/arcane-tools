const url = window.location.href.replace(window.location.pathname, "");
console.log(url);
var socket = io();
//---------------------------------------------
const banner = document.getElementById("banner");
const loginBar = document.getElementById("loginBar");
const buttonBar = document.getElementById("buttonBar");
const postsDiv = document.getElementById("posts");
const modal = document.getElementById("modal");

let testPost = {
  title: "Welcome to Archies Arcane Tools!",
  message: "An excellent website to easily create a character for D&D 5E!",
};

function init() {
  mobileSetup();
  
  axios.get("/api/auth").then((res) => {
      let { data } = res;
      if (data === true) {
          let usn = window.localStorage.getItem('username') || 'user'
          loggedIn(usn);
          console.log("logged in");
      } else if (data === false) {
          notLoggedIN();
          console.log("not logged in");
      } else {
          console.log(res);
  }
});
}
init()

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



function login(e) {
  e.preventDefault();
  let userN = document.getElementById("username").value
  let passW = document.getElementById("password").value
  let sendObj = {
    username: userN,
    password: passW,
  };
  window.localStorage.setItem('username',userN)
  axios
    .post("/api/login", sendObj)
    .then((res) => {
      window.location.href='/profile.html'
      
    })
    .catch((err) => console.log(err));
}

function register(e) {
  e.preventDefault();
  let sendObj = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    passwordConfirm: document.getElementById("passwordConfirm").value
  };
  axios
    .post("/api/register", sendObj)
    .then((res) => {
      console.log('REGISTERED');
      login(e)
      res.status(200).send(res.data);
    })
    .catch((err) => console.log(err));
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

const loginBtn = document.getElementById("loginBtn");
