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
    if (valor==0){
        titulo.innerText = "Ningun mensaje fue encontrado";
        subtitulo.innerText = "Ingresa el texto que desees encriptar o desencriptar";
        btnEncriptar.disabled = false;
        btnDesencriptar.disabled = false;
    }
    else{
        if (verificarMinusculas(valor) ) {
            titulo.innerText = "Texto no encriptable";
            subtitulo.innerText = "Texto debe contener sólo letras minúsculas";
            btnEncriptar.disabled = true;
            btnDesencriptar.disabled = true;
        } else {
            titulo.innerText = "Texto encriptable";
            subtitulo.innerText = "Texto contiene sólo letras minúsculas y sin acentos";
            btnEncriptar.disabled = false;
            btnDesencriptar.disabled = false;
        } 
    }        
    sinResultado();
}

function sinResultado(){
    document.getElementById('mostrartextoSinresultado').style.display = "flex";       
    document.getElementById('mostrartextoConresultado').style.display = "none";
}

function conResultado(){
    document.getElementById('mostrartextoSinresultado').style.display = "none";       
    document.getElementById('mostrartextoConresultado').style.display = "flex";
    btnCopiar.focus();
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
        mensaje.innerText = textoEncriptado;
        conResultado();
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
        conResultado();
    }
}

function Copiar(){
    navigator.clipboard.writeText(mensaje.innerText);
    btnCopiar.textContent = 'Texto copiado.';
    setTimeout(() => {
        btnCopiar.textContent = 'Copiar';
    }, 3000); // Ocultar el mensaje después de 3 segundos
}

textarea.addEventListener('input', habilitadorEncriptacion);
btnEncriptar.addEventListener('click', encriptarTexto);
btnDesencriptar.addEventListener('click', desencriptarTexto);
btnCopiar.addEventListener('click', Copiar);