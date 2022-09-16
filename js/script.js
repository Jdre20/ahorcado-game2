; (function () {
  
  var palabras = ["ALURA", "ORACLE", "HTML", "CSS", "JAVASCRIPT"];
  var juego = null;
  var final = false;
  var msg = document.getElementById("resultado");
  var html = {
    imghombre: document.getElementById("hombre"),
    correctas: document.querySelector(".correctas"),
    incorrectas: document.querySelector(".incorrectas")
  }

  function graficar(juego) {

    var ahorcado;
    var txtcorrectas;
    var txtincorrectas;

    ahorcado = html.imghombre;

    ahorcado.src = "./img/img" + juego.estado + ".png";

    var palabra = juego.palabra;

    var correcta = juego.correcto;
    var incorrecta = juego.incorrecto;

    txtcorrectas = html.correctas;
    txtcorrectas.innerHTML = "";
  
    for (let letra of palabra) {
      let txtspan = document.createElement("span");
      let texto = document.createTextNode("");

      if (correcta.indexOf(letra) >= 0) {
        texto.nodeValue = letra;
      }

      txtspan.setAttribute("class", "letra adivinada");
      txtspan.appendChild(texto);
      txtcorrectas.appendChild(txtspan);
    }

    txtincorrectas = html.incorrectas;
    txtincorrectas.innerHTML = "";

    for (let letra of incorrecta) {
      let txtspan = document.createElement("span");
      let texto = document.createTextNode(letra);
      txtspan.setAttribute("class", "letra fallada");
      txtspan.appendChild(texto);
      txtincorrectas.appendChild(txtspan);
    }
  }

  function adivinar(juego, letra) {

    let contador = juego.palabra.length;

    if (juego.estado == 1 || juego.estado == 8) {
      return;
    }

    if (juego.palabra.indexOf(letra) >= 0) {
      if (juego.correcto.indexOf(letra) >= 0) {
        return;
      } else {
        juego.correcto.push(letra);
      }
      
      for (let letra1 of juego.palabra) {
        for (let letra2 of juego.correcto) {
          if (letra1 == letra2) {
            contador--;
          }
        }
      }

      if (contador == 0) {
        juego.estado = 8;
      }
    } else {
      if (juego.incorrecto.indexOf(letra) >= 0) {
        return;
      } else {
        juego.estado--; 
        juego.incorrecto.push(letra);
      }
    }
  }


  window.onkeypress = function adivinarletra(e) {
    var letra = e.key; 
    letra = letra.toUpperCase();
    let patron = /[A-ZÑ]/;
    if (!patron.test(letra)) {
      return;
    }
    adivinar(juego, letra) 
    if (juego.estado == 8 && !final) { 

      msg.innerHTML = "GANASTE!!!, Felicidades";
      final = true;

    } else if (juego.estado == 1 && !final) { 

      msg.innerHTML = "PERDISTE!!! la palabra era " + juego.palabra;
      final = true;
    }

    graficar(juego);

  }


  window.nuevojuego = function nuevojuego() {

    var eleccion = Math.floor(Math.random() * palabras.length);
    var palabra = palabras[eleccion];

    juego = {};
    juego.palabra = palabra;
    juego.estado = 7;
    juego.correcto = [];
    juego.incorrecto = [];
    msg.innerHTML = '';
    final = false;
    graficar(juego);
    console.log(juego); 
  }

  window.nuevapalabra = function nuevapalabra() {
    var palabranueva = prompt("ingrese una palabra en minuscula, sin caracteres especiales y sin numeros");
    let patron = /[áéíóúÁÉÍÓÚ!"·$%&/()=?¿^\d*¨;:`+´,./*-_\s]/; 
    if (palabranueva == undefined) {
      alert("Ha pulsado cancelar");
    } else if (palabranueva == "") {
      alert("No ingreso ningun texto");
    } else {
      if (!patron.test(palabranueva)) {
        palabranueva = palabranueva.toUpperCase();
        palabras.push(palabranueva);
        alert("Se confirma el ingreso de la palabra " + palabranueva + " al listado de palabras");
      } else {
        alert("Ingrese solo letras minusculas, sin numeros, espacios, caracteres especiales y sin acentos");
      }
    }

    console.log(palabras); 

  }

  nuevojuego();

}());
