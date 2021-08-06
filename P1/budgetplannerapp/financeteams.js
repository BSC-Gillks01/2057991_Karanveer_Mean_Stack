if (localStorage.getItem("budObj") == null) {
    var empArr = [];
    localStorage.setItem("budObj", JSON.stringify(empArr));
}
function addData(){
    var cName = document.getElementById("clientName").value;
    var pName = document.getElementById("projectName").value;
    var budget = document.getElementById("budgetPrice").value;
    let budObj = localStorage.getItem("budObj");
    let budJson = JSON.parse(budObj)
    console.log(budJson);
    //let budObj = localStorage.getItem("budObj");
    //let budJson = JSON.parse(budObj)  
    let bud = {"Client_Name": cName, "Project_Name": pName, "Budget_Price":budget};
    budJson.push(bud)
    localStorage.setItem("budObj", JSON.stringify(budJson))
    
}

function displayData(){
    let budObj = localStorage.getItem("budObj");
    let budJson = JSON.parse(budObj);
    console.log(budJson);
    var tableContent=""
    var counter = 0;
    var total = "Budget Total: $";
    for(var i = 0; i < budJson.length; i++){
        tableContent += "<tr>";
        tableContent += "<td>" + budJson[i].Client_Name +"</td>";
        tableContent += "<td>" + budJson[i].Project_Name + "</td>";
        tableContent += "<td>" + budJson[i].Budget_Price + "</td>";
        tableContent += "</tr>"; 
        counter += parseFloat(budJson[i].Budget_Price, 10);
        document.getElementById("tablebody").innerHTML=tableContent;        
    }  
    total = total + counter;
    document.getElementById("p1").innerHTML=total;
}


function clearData(){
    document.getElementById("clientName").value = '';
    document.getElementById("projectName").value = '';
    document.getElementById("budgetPrice").value = '';
}