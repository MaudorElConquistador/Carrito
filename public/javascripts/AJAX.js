function limpiardiv(e) {
    document.getElementById("municipios").innerHTML= "";
}
function guardar(nombre, preci, esta) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST","anadir",true);
    xhr.setRequestHeader("Content-type", "application/json");
    var precio = preci.replace(/['"]+/g, '');
    xhr.send(JSON.stringify({nom:nombre, pre:precio, cat:"MUN", estado:esta }));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            alert(xhr.responseText);              
        }
        else{
            document.getElementById("municipios").innerHTML= "Upps algo ha sucedido asegurese que su navegador soporte javascript";           
        }
    }
}
function tabla(longitud, json, estado) {
    for (var i = 0; i <= longitud; i++) {
        var formulario = document.createElement("form");
        formulario.method = "POST";
        formulario.name = "formulario"+i
        var salto = document.createElement("br");
        var nombre = document.createElement("input");
        var precio = document.createElement("input");
        nombre.name = "nombre";
        precio.name = "precio";
        var comprar = document.createElement("input");
        comprar.onclick = function hola(){
            guardar(this.form.nombre.value, this.form.precio.value, estado);
            }
        comprar.setAttribute("type", "submit");
        precio.setAttribute("type", "text");
        precio.setAttribute("readonly", "readonly");
        nombre.setAttribute("type", "text");
        nombre.setAttribute("readonly", "readonly");
        comprar.setAttribute("value", "comprar");
        nombre1 = json[i].nom_mun;
        var nom = nombre1.replace(/['"]+/g, '');
        nombre.setAttribute("value", nom);
        precio.setAttribute("value", JSON.stringify(json[i].pre_mun));
        formulario.appendChild(nombre);
        formulario.appendChild(precio);
        formulario.appendChild(comprar);
        document.getElementById("municipios").appendChild(formulario);
    }//Fin del for
}
function cambiar(estado){
    var xhr = new XMLHttpRequest();
    xhr.open("POST","estados",true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({hola: estado}));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            limpiardiv();
            var otra = JSON.parse(this.responseText);
            console.log("Estos son lo otra " + otra+ " estos es estado " + estado);
            var longitud = otra.length;
            var municipios = xhr.responseText;
            tabla(longitud, otra, estado);    
        }
        else{
            document.getElementById("municipios").innerHTML= "Upps algo ha sucedido asegurese que su navegador soporte javascript";           
        }
    }
}