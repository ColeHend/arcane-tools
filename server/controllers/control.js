const path = require('path')

module.exports = {
    getCharacter,
    homePage
}

function getCharacter(req,res) {
    req.sendStatus(200);
}

function homePage(req,res){
    res.sendFile(__dirname+'/client/index.html')
}
