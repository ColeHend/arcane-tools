require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express()
const http = require('http')

const server = http.createServer(app)
const {SERVER_PORT} = process.env
const {Server} = require('socket.io');
const io = new Server(server);

const {getCharacter, homePage} = require('./controllers/control.js')
const socketCon = require('./controllers/sockets')

app.use(express.json())
app.use(cors())
app.use(express.static(__dirname + "/client"))


// -------------endpoints------
app.get('/',homePage)
app.get('/api/character/:charID',getCharacter)

// ----------socketpoints-------
const userNamespace = io.of('/')
const adminNamespace = io.of('/admin')

adminNamespace.use((socket,next)=>{
    // check rights
    next();
})

userNamespace.on('connection',(socket)=>{
    console.log("A user connected!");
    socket.on("disconnect", socketCon.disconUser);
  })

adminNamespace.on('connection',(socket)=>{
    console.log('An admin connected!');
    socket.on("disconnect", socketCon.disconAdmin);
})

server.listen(SERVER_PORT,()=>{
    console.log(`Server listening on ${SERVER_PORT}`);
})