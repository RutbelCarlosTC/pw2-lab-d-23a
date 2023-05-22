function generarTeclado() {
    // Array de números del 0 al 9
    var numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    // Desordenar el array de números aleatoriamente
    numeros.sort(function() { return 0.5 - Math.random() });
    // Crear los botones del teclado con los números aleatorios
    numeros.forEach(function(numero) {
        var boton = document.createElement('button');
        boton.textContent = numero;
        boton.addEventListener('click', function() {
          generarClave(numero);
        });
        document.getElementById('teclado').appendChild(boton);
    });
}
// Función para generar una clave a partir de los números presionados
function generarClave(numero) {
    var clave = document.getElementById('clave').value;
    clave += numero;
    document.getElementById('clave').value = clave;
}
// Llamar a la función para generar el teclado al cargar la página
window.addEventListener('load', generarTeclado);