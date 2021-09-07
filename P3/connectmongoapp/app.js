let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require('socket.io')(http);
let cors = require("cors");

let bodyParser = require("body-parser");
let mongoose = require("mongoose");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

let url = "mongodb://localhost:27017/tcsmean";

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
})

app.get("/add.html", (request, response) => {
    response.sendFile(__dirname + "\\add.html")
})

app.get("/update.html", (request, response) => {
    response.sendFile(__dirname + "\\update.html")
})

app.get("/delete.html", (request, response) => {
    response.sendFile(__dirname + "\\delete.html")
})

app.get("/fetch.html", (request, response) => {
    response.sendFile(__dirname + "\\fetch.html")
})

var courseSchema = mongoose.Schema({
    _id:Number,
    courseName:String,
    description:String,
    amount:Number,
})

    let courseModel = mongoose.model("Course", courseSchema)


io.on("connection", (socket) => {
    
    console.log('Client connected');
    mongoose.connect(url).
    then(res=>console.log('connected')).
    catch(err=>console.log(err));
    mongoose.pluralize(null);

    socket.on("add", (added) => {
           courseModel.insertMany(added, (err, result) => {
               if(!err){
                   console.log("Record stored successfully")
               } else {
                   console.log(err)
               }
       })
})

socket.on("update", (updatedAmount) => {
    courseModel.updateOne({_id:updatedAmount._id}, {$set:{amount:updatedAmount.amount}}, (err, result) => {
        if(!err){
            console.log("Record updated successfully")
        } else {
            console.log(err)
        }
})
})

socket.on("delete", (_id) => {
    courseModel.deleteOne({_id: _id}, (err, result) => {
        if(!err){
            console.log("Record deleted successfully")
        } else {
            console.log(err)
        }
})
})

let tableContent = "";
socket.on("fetch", (courseData) => {
    courseModel.find(courseData, (err, doc) => {
        if(!err){
            doc.forEach(rec=>{
                //console.log(rec._id, rec.courseName, rec.description, rec.amount)
                tableContent += ` <tr>
                <td>${rec._id}</td>
                <td>${rec.courseName}</td> 
                <td>${rec.description}</td>
                <td>${rec.amount}</td>
               </tr>`     
            })
            tableContent += "</tbody></table>"
            socket.emit("fetch", tableContent)
        } else {
            console.log(err)
        }
})
})





socket.emit("server", "CRUD operation performed...")
})




   
    
   /*  app.post("/addCourse", (request, response) => {
        let course = request.body;
        courseModel.insertMany(course, (err, result) => {
            if(!err){
                response.send("Record stored successfully")
            } else {
                response.send(err);
            }
        })

        
        app.post("/updateAmount", (request, response) => {
            let course = request.body;
        
            courseModel.updateOne({_id:course._id}, {$set:{amount:course.amount}}, {new:true}),
            (err, result) => {
                 if(!err){
                     response.send(result)
                 } else {
                    response.send(err)
                    }
                }
            })
        
    }) */
    





http.listen(9090, ()=>console.log("Server running on port number 9090"));