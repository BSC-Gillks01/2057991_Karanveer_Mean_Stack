let express = require("express");
let app = express();
let http = require("http").Server(app)
let io = require('socket.io')(http);
let mongoose = require("mongoose")
let url = "mongodb://localhost:27017/tcsmean";
mongoose.pluralize(null);

app.get("/",(req, res) => {
    res.sendFile(__dirname + "\\chat.html");
});

var chatSchema = mongoose.Schema({
    clientName:String,
    clientsMessage:String
})

let chatModel = mongoose.model("Chatlog", chatSchema)

io.on("connection", (socket) => {
    console.log('Client connected');
    mongoose.connect(url).
    then(res=>console.log('connected')).
    catch(err=>console.log(err));

    socket.on("chat", (msgObj) => {
        chatModel.insertMany(msgObj, (err, result) => {
            if(!err){
                console.log("Record stored successfully")
            } else {
                console.log(err)
            }
        })
    })
    socket.emit("server", "SERVER: Received...")
})


http.listen(9090, ()=>console.log("Server running on port 9090"))