require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { PORT, SECRET } = process.env;
const { Server } = require("socket.io");
const io = new Server(server);

const passport = require("passport");
const session = require("express-session");
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const {
  getCampaigns,
  moreInfo,
  daSequel,
  getCharacters,
  myStrategy,
  baseCharInfo,
  addCharacter,
  getCharLevels,
  updateCharacter,
  addHomebrew,
  userLogin,
  registerUser,
  deSerial,
  getHomebrew,
  profileInfo,
  authenticationMiddleware,
} = require("./controllers/control.js");
passport.authenticationMiddleware = authenticationMiddleware;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client")));

app.use(cookieParser());
app.use(cors());

//--------------Session----------------------------
const mySqlStore = new SequelizeStore({
  db: daSequel()
});
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: mySqlStore,
    resave: false,
    proxy: false,
    cookie: { maxAge: oneDay },
  })
);
mySqlStore.sync();
passport.use(new LocalStrategy(myStrategy));

passport.serializeUser((user, done) => {
  done(null, { id: user.id, username: user.username, type: user.type });
});

passport.deserializeUser(deSerial);

app.use(passport.initialize());
app.use(passport.session());
// ---------Routes-----------------------------
//-----login-----------
app.post("/api/register", registerUser);

app.post("/api/login",passport.authenticate("local", {
    successRedirect: "/profile.html",
    failureRedirect: "/",
    failureMessage: true,
  }));

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
//----auth--
app.get("/api/auth", (req, res) => {
  console.log(req.isAuthenticated);
  if (req.isAuthenticated()) {
    res.status(200).send(true);
  } else {
    res.status(200).send(false);
  }
});
//------character routes-
app.post("/api/profileInfo/", passport.authenticationMiddleware(), profileInfo);
app.get('/api/moreinfo',passport.authenticationMiddleware(),moreInfo)
app.get("/api/characters/",passport.authenticationMiddleware(),
  getCharacters
);

app.get('/api/campaigns/',passport.authenticationMiddleware(),getCampaigns)

app.get('/api/baseCharInfo/',passport.authenticationMiddleware(),baseCharInfo)
app.get('/api/getCharLevels/',passport.authenticationMiddleware(),getCharLevels)
//-----homebrew routes--
app.get('/api/homebrew',passport.authenticationMiddleware(),getHomebrew)

// ----------socketpoints--------------------
const socketCon = require("./controllers/sockets");
const userNamespace = io.of("/");
const adminNamespace = io.of("/admin");

adminNamespace.use((socket, next) => {
  // check rights
  next();
});

userNamespace.on("connection", (socket) => {
  console.log("A user connected!");
  socket.on("disconnect", socketCon.disconUser);
});

adminNamespace.on("connection", (socket) => {
  console.log("An admin connected!");
  socket.on("disconnect", socketCon.disconAdmin);
});
//--------------------

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
