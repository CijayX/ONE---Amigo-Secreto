// Lista donde se van a guardar los nombres
let nombres = [];

// Obtener los elementos del DOM
let btnAgregar = document.getElementById("btnAgregar");
let btnSortear = document.getElementById("btnSortear");
let inputNombre = document.getElementById("nombre");
let listaNombres = document.getElementById("listaNombres"); // Lista visible en la pantalla
let resultado = document.getElementById("resultado"); // Resultado del sorteo
let contenedorBotones = document.getElementById("contenedorBotones"); // Contenedor de botones

// Crear el botón de reinicio dinámicamente
let btnReiniciar = document.createElement("button");
btnReiniciar.textContent = "¡Volver a jugar?";
btnReiniciar.style.display = "none"; // Ocultarlo inicialmente
btnReiniciar.addEventListener("click", reiniciarJuego);
btnReiniciar.id = "btnReiniciar";
btnReiniciar.classList.add("boton"); // Agregar una clase para los estilos
contenedorBotones.appendChild(btnReiniciar);

btnAgregar.addEventListener("click", agregarNombre);
btnSortear.addEventListener("click", sortearAmigo);

// Esta función agrega nombres a la lista, pero primero revisa que el nombre sea válido
function agregarNombre() {
    let nombre = inputNombre.value.trim();
    
    // Expresión regular para que no permita números ni caracteres raros
    let regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
    
    if (nombre === "" || !regex.test(nombre)) {
        alert("Por favor, escribe un nombre válido, sin números ni símbolos.");
        inputNombre.value = ""; // Limpiar el campo de texto si es inválido
        return;
    }
    
    // Convertir la primera letra a mayúscula y el resto a minúscula para que se vea bonito
    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
    
    // Agregar el nombre al array
    nombres.push(nombre);
    actualizarLista(); // Llamar la función para que se vea en pantalla
    inputNombre.value = ""; // Limpiar el campo de texto
}

// Función para actualizar la lista de nombres en pantalla
function actualizarLista() {
    listaNombres.innerHTML = ""; // Limpiar todo antes de volver a escribir
    listaNombres.style.display = "block"; // Asegurar que la lista esté visible
    resultado.textContent = ""; // Borrar el resultado del sorteo anterior
    resultado.style.display = "none"; // Ocultar el resultado al actualizar la lista
    
    nombres.forEach(nombre => {
        let li = document.createElement("li"); // Crear un <li>
        li.textContent = nombre; // Poner el nombre dentro
        listaNombres.appendChild(li); // Agregarlo a la lista
    });
}

// Función para hacer el sorteo de amigo secreto
function sortearAmigo() {
    if (nombres.length === 0) {
        alert("No hay nombres en la lista para sortear. Agrega al menos uno.");
        return;
    }
    
    // Generar un número aleatorio dentro del rango de la lista
    let indiceAleatorio = Math.floor(Math.random() * nombres.length);
    
    // Ocultar la lista de nombres
    listaNombres.style.display = "none";
    
    // Mostrar el nombre seleccionado en negrita
    resultado.innerHTML = `<strong>El amigo secreto es: ${nombres[indiceAleatorio]}</strong>`;
    resultado.style.display = "block";
    
    // Ocultar los botones de agregar y sortear
    btnAgregar.style.display = "none";
    btnSortear.style.display = "none";
    
    // Mostrar el botón de reinicio
    btnReiniciar.style.display = "block";
    btnReiniciar.style.marginTop = "10px"; // Agregar espacio arriba
}

// Función para reiniciar el juego
function reiniciarJuego() {
    nombres = [];
    actualizarLista();
    resultado.textContent = "";
    resultado.style.display = "none"; // Ocultar el resultado al reiniciar
    listaNombres.style.display = "block";
    btnAgregar.style.display = "block";
    btnSortear.style.display = "block";
    btnReiniciar.style.display = "none";
}
