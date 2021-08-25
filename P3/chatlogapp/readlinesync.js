function addInfo(){
let fs = require("fs")
let infos = JSON.parse(fs.readFileSync("log.json").toString());
let readline= require("readline-sync");
let fname = readline.question("Enter your first name ");
let lname = readline.question("Enter your last name ");
let gender = readline.question("Enter your gender ");
let email = readline.questionEMail("Enter your email address ");
let date = Date()
information = {Firstname:fname, Lastname: lname, Sex: gender, Email: email, Timedate: date}
infos.push(information)
//let infoString = JSON.stringify(infoArr)
fs.writeFileSync("log.json", JSON.stringify(infos), 
        console.log("Data entry added")

);
}

addInfo();



