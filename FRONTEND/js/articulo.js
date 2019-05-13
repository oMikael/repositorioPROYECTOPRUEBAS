var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

$('#createArticleButton').on('click', function(){
  // cargar elementos del articulo
  let nombre = $("#nombre").val()
  let precio = $("#precio").val()
  let descripcion = $("#descripcion").val()
  let tipo = $("input[name='tipo']:checked").val();
  let stock = $("#stock").val()

  json_to_send = {
    "name": nombre,
    "price": precio,
    "description": descripcion,
    "stock": stock,
    "type": tipo
  };

  json_to_send = JSON.stringify(json_to_send);

  //console.log(json_to_send)

  $.ajax({
    url: 'https://webproyectomacarena.herokuapp.com/articulos',
    // url: 'http://localhost:3000/articulos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(){
      alert("Articulo creado con exito")
      //console.log('success: '+ data);
      window.location = './library.html'
    },
    error: function(error) {
      console.log(error)
      alert(error["responseText"]);
      window.location = './index.html' //se direcciona a esta pagina
    }
  });
})