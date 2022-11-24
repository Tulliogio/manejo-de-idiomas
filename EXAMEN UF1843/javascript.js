var texto ='{ "escala": ['+
'{"comentario":"Peso Insuficiente","imcminimo":"0","imcmaximo":"18.5"},'+
'{"comentario":"Normopeso","imcminimo":"18.5","imcmaximo":"24.9"},'+
'{"comentario":"Sobrepeso grado I","imcminimo":"24.9","imcmaximo":"26.9"},'+
'{"comentario":"Sobrepeso grado II","imcminimo":"26.9","imcmaximo":"29.9"},'+
'{"comentario":"Obesidad de tipo I","imcminimo":"29.9","imcmaximo":"34.9"},'+
'{"comentario":"Obesidad de tipo II","imcminimo":"34.9","imcmaximo":"39.9"},'+
'{"comentario":"Obesidad de tipo III (mórbida)","imcminimo":"39.9","imcmaximo":"49.9"},'+
'{"comentario":"Obesidad de tipo IV (extrema)","imcminimo":"49.9","imcmaximo":"999"}]}';

console.log(texto);
var datos = JSON.parse(texto);
console.log(datos);
var FD;

function idiomaSeleccionado(idSeleccionado) {
    var id = idSeleccionado;
    console.log('Mensaje   ' + idSeleccionado);
    cambiaidioma(idSeleccionado);

}

window.onload = function () {
    fetch('traducciones.json')
        .then(respuesta => respuesta.json())
        .then(textos => {
            idiomas = textos.idiomas;
        })
        .catch(error => console.log('Error en la carga de idiomas:' + error.message))
}

function cambiaidioma(idiomaactual) {
    var pais = idiomas.find(abuscar => abuscar.idioma === idiomaactual);
    console.log(pais);
    for (var clave in pais) {
        console.log("la clave es :" + clave + " y vale :" + pais[clave]);
        if (clave != "idioma")
            document.getElementById(clave).innerText = pais[clave]
        else {
         
        }
    }
}

const tabla = document.getElementById("lista-articulos");
const titulos = document.getElementById("titulos");
var idiomas;

function mensaje() {
  


    var altura = document.getElementById("altura").value;
    var altura2=document.getElementById("altura").value * 100; 
    var peso = document.getElementById("peso").value;
    var imc = (peso/(altura*altura)).toFixed(2);
    var sexo = document.getElementsByName("sexo");
    var edad = ( document.getElementById("edad").value);
    var TMB;
    //Calculo del TMB debo usar el punto como separador decimal.
    var TMBHombre = (66 + ( 13.7 * peso) + ( 5 *altura2)) - ( 6.75 * edad);
    var TMBMujer = (655 + ( 9.6 * peso) + ( 1.8 *altura2)) - ( 4.7 * edad); 
    //Hay que agregarle a este código el factor de ejercicio.
    //Si la persona hace deportes.
    /*
TMB x 1,2: Poco o ningún ejercicio
TMB x 1,375: Ejercicio ligero (1 a 3 días a la semana)
TMB x 1,55: Ejercicio moderado (3 a 5 días a la semana)
TMB x 1,72: Deportista (6 -7 días a la semana)
TMB x 1,9: Atleta (Entrenamientos mañana y tarde)

Llamaré a este valor FD ( Factor deporte )
    */
    FD = document.getElementsByName("select");
    var indice = document.getElementsByName("select").length; 
   	//var texto += "nIndice de la opcion escogida: " + indice ;
   	
    console.log("SELECT ="+ indice);
    
    if (sexo[0].checked){
        sexo = "hombre"; 
    TMB= TMBHombre;
    }else {
        sexo="mujer";
        TMB =TMBMujer;
    }
// Este TMB2 corresponde a el cálculo para sacar lo que debes consumir
//Si pretendes bajar 1 kg por semana.
    var TMB2=TMB-1000;    
    console.log(imc);
    console.log(edad);
    console.log(sexo);
    console.log(TMB);

    var filtrado = datos.escala.filter (function(elemento) {
        return (imc >elemento.imcminimo) && (imc <= elemento.imcmaximo);
    });
    console.log(filtrado); 
    if(filtrado[0].comentario=="Normopeso"){
        document.getElementById("respuesta").innerHTML =  "<br><br><p class='normalRespuesta'>"+"Su IMC es "+imc+" - "+filtrado[0].comentario;+"</p>"
        document.getElementById("respuesta2").innerHTML =  "<br><br><p class='normalRespuesta'>"+"Tu TMB es de "+TMB+" Calorias estando en reposo.</p>"

    }else{
    document.getElementById("respuesta").innerHTML = "<br><br>Su IMC es "+imc+" - "+filtrado[0].comentario;
    document.getElementById("respuesta2").innerHTML = "<br><br><p class='normalRespuesta'>"+"Tu TMB es de "+TMB+" Calorias estando en reposo.</p>"+"Si quieres bajar 1 kg debes ingerir " + TMB2 + " Calorias ";
    
    }
}



