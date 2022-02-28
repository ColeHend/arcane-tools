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

const {
  daSequel,
  getCharacter,
  myStrategy,
  addCharacter,
  updateCharacter,
  addHomebrew,
  registerUser,
  userLogin,
  deSerial,
  authenticationMiddleware,
} = require("./controllers/control.js");
passport.authenticationMiddleware = authenticationMiddleware;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../client")));
//-------------------------------------------------------------
let origin = process.env.HOSTNAME || "http://localhost:4444";
const mySqlStore = new SequelizeStore({
    db: daSequel(),
  });

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: mySqlStore,
    resave: false,
    proxy: false
  })
);
mySqlStore.sync()
passport.use(new LocalStrategy(myStrategy));

// -------------endpoints------
passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(deSerial);

app.use(passport.initialize());
app.use(passport.session());

app.post("/profile", passport.authenticationMiddleware(), (req, res) => {
  console.log(req);
  res.sendFile(path.join(__dirname, "../client/profile.html"));
});

app.get(
  "/api/character/:charID",
  passport.authenticationMiddleware(),
  getCharacter
);

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});
app.post('/api/register',registerUser)
// ----------socketpoints-------
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

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
