function check(){
    var image = '<img src="' + document.formname.image.value + '">' + "</br>";
    var title = "<h2>" + document.formname.title.value + "</h2> " + "</br>";
    var article = "<h4>" + document.formname.article.value +"</h4></br></br>";

    var count = 0;
    var newDiv = document.createElement('div');
    newDiv.id = count;
    newDiv.className = "col-4";
    document.getElementById("row").appendChild(newDiv);
    var blog = image + title + article;

    document.getElementById(newDiv.id).innerHTML += blog;
    count++;

  }

 