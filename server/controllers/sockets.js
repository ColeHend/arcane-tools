module.exports = {
  connection,
  disconUser,
  disconAdmin
};

function connection(socket) {
  console.log("A user connected!");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
}

function disconUser() {
    console.log("user disconnected");
  }

 function disconAdmin() {
    console.log("user disconnected");
  }