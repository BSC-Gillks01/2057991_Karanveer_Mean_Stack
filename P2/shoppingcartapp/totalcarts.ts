var bananaPrice = 2;
var applePrice = 1;
var lemonPrice = 1;
var pineapplePrice = 2;
var cartCount = 0;
if (localStorage.getItem("cartObj") == null){
    var empCart = [];
    localStorage.setItem("cartObj", JSON.stringify(empCart))
}

function addBanana(fruit: {name:string, price:number}) {

    let cartObj = localStorage.getItem("cartObj");
    let cartJson = JSON.parse(cartObj);
    let cart = {fruitName: "Banana", fruitPrice: bananaPrice};
    cartJson.push(cart);
    localStorage.setItem("cartObj", JSON.stringify(cartJson));
    
}

function addApple(fruit: {name:string, price:number}) {

    let cartObj = localStorage.getItem("cartObj");
    let cartJson = JSON.parse(cartObj);
    let cart = {fruitName: "Green Apple", fruitPrice: applePrice};
    cartJson.push(cart); 
    localStorage.setItem("cartObj", JSON.stringify(cartJson));
    
}

function addLemon(fruit: {name:string, price:number}) {

    let cartObj = localStorage.getItem("cartObj");
    let cartJson = JSON.parse(cartObj);
    let cart = {fruitName:"Lemon", fruitPrice: lemonPrice};
    cartJson.push(cart);
    localStorage.setItem("cartObj", JSON.stringify(cartJson));
    
}

function addPineapple(fruit: {name:string, price:number}) {

    let cartObj = localStorage.getItem("cartObj");
    let cartJson = JSON.parse(cartObj);
    let cart = {fruitName: "Pineapple", fruitPrice: pineapplePrice};
    cartJson.push(cart);
    localStorage.setItem("cartObj", JSON.stringify(cartJson));
    
}

function displayCart(){
    let cartObj = localStorage.getItem("cartObj");
    let cartJson = JSON.parse(cartObj);
    var tablecontent=""
    var counter = 0;
    var total= "Your price total is : $";
    var cartLen = "Items in cart: " + cartJson.length
    for(let i=0; i<cartJson.length; i++){
        tablecontent += "<tr>";
        tablecontent += "<td>" + cartJson[i].fruitName +"</td>";
        tablecontent += "<td>" + cartJson[i].fruitPrice + "</td>";
        tablecontent += "</tr>"; 
        counter += cartJson[i].fruitPrice;
        document.getElementById("main").innerHTML=tablecontent;
    }
    total = total + counter + ".00";
    cartLength = "Items in Cart: " + cartJson.length
    document.getElementById("cartTotal").innerHTML = total;
    document.getElementById("lenCart").innerHTML = cartLength;

}


