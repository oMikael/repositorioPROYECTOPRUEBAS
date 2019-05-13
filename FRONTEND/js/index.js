$('#login_button').on('click', function(){
  // cargar email y password
  let email = $("#email").val()
  let password = $("#password").val()

  json_to_send = {
    "email": email,
    "password" : password
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'https://webproyectomacarena.herokuapp.com/users/login',
    // url: 'http://localhost:3000/users/login',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      // guardar token en localstorage o cookie
      localStorage.setItem('token', data.token)
      window.location = './cart.html' //se direcciona a esta pagina
    },
    error: function(error_msg) {
      console.log(error_msg)
      alert((error_msg["responseText"]));
    }
  });
})