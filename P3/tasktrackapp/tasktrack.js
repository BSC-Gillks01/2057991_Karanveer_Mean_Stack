let http = require("http");
let url = require("url");
let fs = require("fs");


let webPage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2 style="color: aqua; text-align: center;"><u>Task Tracker</u></h2>
    <h2 style="color: green;"><u>Add Task</u></h2>
    <form action="addTask">
        <label>Emp Id: </label>
        <input type="text" name="empId" required/><br/>
        <label>Task Id: </label>
        <input type="text" name="taskId" required/><br/>
        <label>Task: </label>
        <input type="text" name="task" required/><br/>
        <label>Deadline: </label>
        <input type="date" name="deadline" required/><br/>
        <input type="submit" value="Add Task"/>
        <input type="reset" value="reset"/>
    </form>
    <br/><br/>
    <form action="deleteTask">
        <h2 style="color: red;"><u>Delete Task</u></h2>
        <label>Task Id: </label>
        <input type="text" name="findTask"/><br/>
        <input type="submit" value="Delete Task"/>
    </form>
    <form action="taskTable">
        <h2 style="color: blue;"><u>List Task</u></h2>
        <input type="submit" value="Show Task List"/>
    </form>

</body>
</html>`



let taskDetails = [];
var tableContent = "";

let server = http.createServer((request,response)=> {
    let urlInfo = url.parse(request.url,true);
    if(urlInfo.path!="/favicon.ico"){
        response.write(webPage)
        if(urlInfo.pathname == "/addTask"){
            taskDetails = JSON.parse(fs.readFileSync("task.json").toString());
            let taskDetail = urlInfo.query;
            let taskIdx = taskDetails.find(u=>taskDetail.taskId == u.taskId)
            if(taskIdx != undefined){
                console.log("Value already exists...")
            } else {
                taskDetails.push(taskDetail);
                fs.writeFileSync("task.json", JSON.stringify(taskDetails),
                console.log("Task entry added"));              
            }}

        else if(urlInfo.pathname == "/deleteTask"){
            taskDetails = JSON.parse(fs.readFileSync("task.json").toString());
            let taskFinder = JSON.parse(JSON.stringify(urlInfo.query).toString());
            let found = taskDetails.find(u=>u.taskId == taskFinder.findTask);
            var foundIdx = taskDetails.indexOf(found);
            let foundItem = JSON.stringify(found)
            if(found != undefined){
                taskDetails.splice(foundIdx,1);
                fs.writeFileSync("task.json", JSON.stringify(taskDetails));
                console.log("Task ID " + foundItem + " has been removed.")
            } }
            else if(urlInfo.pathname == "/taskTable"){
                taskDetails = JSON.parse(fs.readFileSync("task.json").toString());
                tableContent = `<table style="border: black solid 1px; columns: auto;">
                <thead>
                    <th>Employee ID</th>
                    <th>Task ID</th>
                    <th>Task</th>
                    <th>Deadline</th>
                </thead>
                <tbody id="myTable">`

                for(var i = 0; i < taskDetails.length; i++){
                    tableContent += `<tr>;
                    <td>${taskDetails[i].empId}</td>;
                    <td>${taskDetails[i].taskId}</td>;
                    <td>${taskDetails[i].task}</td>;
                    <td>${taskDetails[i].deadline}</td>;
                    </tr>`; 
                }
                tableContent += `     
                </tbody>
                </table>`
                webPage += tableContent
            }
            else {
                console.log("not found")
            }

            
            
}
});


server.listen(9091,()=>console.log("Server running on port number 9091"));

/* app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(request,response) =>{
    response.sendFile(__dirname+"\\tasktracker.html")
});

app.post("/addTask",(request,response) =>{
    let taskDetail = request.body;
    taskDetails = JSON.parse(fs.readFileSync("task.json").toString());
    let taskIdx = taskDetails.find(u=>u.taskId == taskDetail.taskId)
    if(taskIdx != undefined){
        console.log("Value already exists...")
    } else {
        taskDetails.push(taskDetail);
        fs.writeFileSync("task.json", JSON.stringify(taskDetails),
        console.log("Task entry added"));
    }   
});

app.get("/deleteTask",(request,response) =>{
    taskDetails = JSON.parse(fs.readFileSync("task.json").toString());
    let findTask = request.query.findTask;
    let found = taskDetails.find(u=>u.taskId==findTask);
    let foundItem = JSON.stringify(found.taskId)
    if(found != undefined){
        var foundIdx = taskDetails.indexOf(found);
        taskDetails.splice(foundIdx,1);
        fs.writeFileSync("task.json", JSON.stringify(taskDetails));
        console.log("Task ID " + foundItem + " has been removed.")
    } else{
        console.log("not found")
    }
});

app.post("/taskTable",(request,response) =>{
    var table = document.getElementById("myTable");
    for(let i =0; i < taskDetails.length; i++){
       var row = `<tr>
                    <td>${taskDetails[i].empId}</td>
                    <td>${taskDetails[i].taskId}</td>
                    <td>${taskDetails[i].task}</td>
                    <td>${taskDetails[i].deadline}</td>
                  </tr>`
        table.innerHTML += row;
    }
});
 */


