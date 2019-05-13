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

$('#checkout').on('click', function(){

  $.ajax({
    url: 'https://webproyectomacarena.herokuapp.com/cart/checkout',
    // url: 'http://localhost:3000/cart/checkout',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    /*data: json_to_send,*/
    success: function(){
      alert("Cart ha sido vaciado!")
      location.reload();
    },
    error: function(error) {
      console.log(error)
      alert(error["responseText"]);
      window.location = './index.html' //se direcciona a esta pagina
    }
  });
})

function deleteFromCart() { 
  json_to_send = {
    "articleId" : this.id
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
      url: 'https://webproyectomacarena.herokuapp.com/cart/' + this.id,
      // url: 'http://localhost:3000/cart/' + this.id,
      // url: 'https://tuapp.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'DELETE',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log("DELETE!!")
        location.reload();
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
}

function loadCart() {
  $.ajax({
    url: 'https://webproyectomacarena.herokuapp.com/cart',
    // url: 'http://localhost:3000/cart',
    // url: 'https://tuapp.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      for( let i = 0; i < data.length; i++) {
        // Agregar los elementos de la lista
        addArticle(data[i]._id, data[i].name, data[i].description, data[i].price, data[i].type)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
      window.location = './index.html' //se direcciona a esta pagina
    }
  });
}

loadCart()

function addArticle(id, name, description, price, type) {
  var li = document.createElement("li")
  var innerHtml = "<div class='article'><b>" + name + "</b><br/>" 
  innerHtml += "<i>" + description + "</i><br/>" + price + "$<br/>" + type + "</br></div>"
  li.innerHTML = innerHtml
  var button = document.createElement('button')
  button.innerHTML = "Remove from cart"
  button.id = id
  button.onclick = deleteFromCart
  li.appendChild(button)
  document.getElementById("cart").appendChild(li)
}