var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

$('#logoutButton').on('click', function(){

  $.ajax({
    url: 'https://webproyectomacarena.herokuapp.com/users/logout',
    // url: 'http://localhost:3000/users/logout',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    /*data: json_to_send,*/
    success: function(){
      // guardar token en localstorage o cookie
      localStorage.removeItem('token')
      window.location = './index.html' //se direcciona a esta pagina
    },
    error: function(error) {
      console.log(error)
      alert(error["responseText"]);
      window.location = './index.html' //se direcciona a esta pagina
    }
  });
})

var todos = document.querySelectorAll("input[type=checkbox]");

function loadLibrary() {
  $.ajax({
    url: 'https://webproyectomacarena.herokuapp.com/articulos',
    // url: 'http://localhost:3000/articulos',
    // url: 'https://tuapp.herokuapp.com/library',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      //console.log(data)

      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        addArticle(data[i]._id, data[i].name, data[i].description, data[i].price, data[i].type, data[i].stock)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
      window.location = './index.html' //se direcciona a esta pagina
    }
  });
}

loadLibrary()

function addToCart() {
  json_to_send = {
    "articleId": this.id
  }
  json_to_send = JSON.stringify(json_to_send)
  $.ajax({
    url: 'https://webproyectomacarena.herokuapp.com/cart',
    // url: 'http://localhost:3000/cart',
    headers: {
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data) {
      alert("Agregado item al carrito de " + data.id)
      location.reload();
    },
    error: function(error_msg) {
      alert("ERROR")
      console.log(error_msg)
      alert((error_msg['responseText']))
    }
  })
}

function addArticle(id, articleName, articleDescription, articlePrice, articleType, articleStock) {
  var li = document.createElement("li")
  var innerHtml = "<div class='article'><b>" + articleName + "</b><br/>" 
  innerHtml += "<i>" + articleDescription + "</i><br/>" + articlePrice + "$<br/>" + articleType + "</br>Stock: " + articleStock + "</br></div>"
  li.innerHTML = innerHtml
  if (articleStock > 0) {
    var button = document.createElement('button')
    button.innerHTML = "Add to cart"
    button.id = id
    button.onclick = addToCart
    li.appendChild(button)
  }
  document.getElementById("articulos").appendChild(li)
}