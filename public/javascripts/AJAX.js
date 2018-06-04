function Alerta(e) {
      alert("Holi");
}
/*function xhr(url, method="POST"){
    const req = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    req.open(method, url, true);
    return req;
}


function Holi(argument) {
    var nombre = document.getElementById('nombre').value;
    addCarrito(nombre); 
}

function addCarrito(nombre){
    const req = xhr("/anadir");
    req.onreadystatechange = () => {
        if (req.readyState === 4){
            if (req.status === 200){
                document.getElementById('nombre').style.visibility = visible;
            } else {
                console.log("Valio caca");
            }
        }
    };
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify({id_ingredient: ingredient, quantity: quantity, unit: unit}));
}

/*
Esta madre hacerla con xhr
$(function() {
  $('#Tabla').hide();

  $('#holi').click(function() {

    $.getJSON('/estados', function(data) {
        $('<li>').appendTo('#facts').text(data);
    });
    $('#Tabla').show();
    
    return false;
  });
  /*
  $('#add-new-fact').click(function() {
    
    var name = $('#right-column h2').text();
    var fact = $('#new-fact').val();
  
    $.ajax({
      type: "POST",
      url: "/hero/add-fact",
      data: JSON.stringify({ name: name, fact: fact }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        $('<li>').appendTo('#facts').text(fact);
        $('#new-fact').val('');
      },
      error: function(err) {
        var msg = 'Status: ' + err.status + ': ' + err.responseText;
        alert(msg);
      }
    });
    return false;
  });*/

