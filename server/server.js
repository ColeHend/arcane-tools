const express = require('express');
const app = express()
const cors = require('cors')
const {SERVER_PORT} = require('./.env')
app.use(express.json())
app.use(cors())

app.listen(SERVER_PORT,()=>{
    console.log(`Server listening on ${SERVER_PORT}`);
})