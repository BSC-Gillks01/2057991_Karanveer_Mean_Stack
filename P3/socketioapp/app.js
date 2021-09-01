let express = require("express");
let app = express();
let http = require("http").Server(app)
let io = require('socket.io')(http);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"\\index.html");
});

io.on("connection", (socket) => {
    console.log("Client connected");
    socket.on("obj", (message) => {
        console.log(message);
    })
    socket.emit("obj1", "Client speaking to Server...")
    socket.emit("obj", "Server responding to Client....")
})

http.listen(9090, ()=>console.log("Server running on port number 9090"));