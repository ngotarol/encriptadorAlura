//Funcion para verificar que entrada solo sean minusculas
    const btnEncriptar = document.getElementById('botonEncriptar');
    const btnDesencriptar = document.getElementById('botonDesencriptar');
    const btnCopiar = document.getElementById('botonCopiar');
    const textarea = document.getElementById('texto');
    const mensaje = document.getElementById('textoResultado');
    const diccionario = {
        "a": "ai",
        "e": "enter",
        "i": "imes",
        "o": "ober",
        "u": "ufat"
    };

function habilitadorEncriptacion() {
    let titulo = document.getElementById('sinresultadoTitulo');
    let subtitulo = document.getElementById('sinresultadoSubtitulo');

    let valor = textarea.value; 
    if (verificarMinusculas(valor) ) {
        titulo.innerText = "Texto no encriptable";
        subtitulo.innerText = "Texto debe contener sólo letras minúsculas";
        btnEncriptar.disabled = true;
        btnDesencriptar.disabled = true;
    } else {
        titulo.innerText = "Texto encriptable";
        subtitulo.innerText = "Texto contiene sólo letras minúsculas";
        btnEncriptar.disabled = false;
        btnDesencriptar.disabled = false;
    }
}

function verificarMinusculas(textoValidar) {    
    return (/[^a-z\s]/.test(textoValidar));   
}

//Funcion para encriptar el texto
function encriptarTexto(){
    let texto = textarea.value;

    let textoEncriptado = ""

    if (!verificarMinusculas(texto)) {        
        for (let index = 0; index < texto.length; index++) {
            let element = texto[index];
            textoEncriptado += diccionario[element]??element;                   
        }
        console.log(textoEncriptado);
        mensaje.innerText = textoEncriptado;
        document.getElementById('mostrartextoSinresultado').style.display = "none";       
        document.getElementById('mostrartextoConresultado').style.display = "flex";
    }
}

//Funcion para desencriptar el texto
function desencriptarTexto(){
    let texto = textarea.value;  

    if (!verificarMinusculas(texto)) {
        for (const [clave, valor] of Object.entries(diccionario)) {            
            let regex = new RegExp(valor, 'g');
            texto = texto.replace(regex,clave);
        }
        textoDesencriptado = texto;
        mensaje.innerText = textoDesencriptado;
        document.getElementById('mostrartextoSinresultado').style.display = "none";       
        document.getElementById('mostrartextoConresultado').style.display = "flex";
    }
}

function Copiar(){
    navigator.clipboard.writeText(mensaje.innerText);
    alert('texto copiado');
}

// Seleccionar el área de texto y agregar el evento de entrada
textarea.addEventListener('input', habilitadorEncriptacion);
btnEncriptar.addEventListener('click', encriptarTexto);
btnDesencriptar.addEventListener('click', desencriptarTexto);
btnCopiar.addEventListener('click', Copiar);