function limpiardiv(e) {
    document.getElementById("municipios").innerHTML= "";
}
function guardar(e) {
    var xhr = new XMLHttpRequest();
    alert("ok si esta entrando a la funcion");
    xhr.open("POST","anadir",true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var x = document.getElementById("nombre");
            alert("Holi esto es lo que se recibe " + xhr.responseText);              
        }
        else{
            document.getElementById("municipios").innerHTML= "Upps algo ha sucedido asegurese que su navegador soporte javascript";           
        }
    }
}
function tabla(longitud, json) {
    for (var i = 0; i <= longitud; i++) {
        var formulario = document.createElement("form");
        formulario.method = "POST";
        var salto = document.createElement("br");
        var nombre = document.createElement("input");
        var precio = document.createElement("input");
        var comprar = document.createElement("input");
        comprar.onclick = () => guardar();
        comprar.setAttribute("type", "submit");
        precio.setAttribute("type", "text");
        precio.setAttribute("readonly", "readonly");
        nombre.setAttribute("type", "text");
        nombre.setAttribute("readonly", "readonly");
        nombre.id = "nombre";
        comprar.setAttribute("value", "comprar");
        nombre.setAttribute("value", JSON.stringify(json[i].nom_mun));
        precio.setAttribute("value", JSON.stringify(json[i].pre_mun));
        formulario.appendChild(nombre);
        formulario.appendChild(precio);
        formulario.appendChild(comprar);
        document.getElementById("municipios").appendChild(formulario);
    }//Fin del for
}
function cambiar(estado){
    var xhr = new XMLHttpRequest();
    console.log("Hola este es el valor seleccionado " + estado);
    xhr.open("POST","estados",true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({hola: estado}));
    console.log("Si entro a la funcion");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            limpiardiv();
            console.log("No se esadas " + xhr.responseText);
            var otra = JSON.parse(this.responseText);
            var longitud = otra.length;
            var municipios = xhr.responseText;
            console.log("Esta es la longitud sin parsear " + JSON.stringify(otra[0]));    
            tabla(longitud, otra);    
        }
        else{
            document.getElementById("municipios").innerHTML= "Upps algo ha sucedido asegurese que su navegador soporte javascript";           
        }
    }
}