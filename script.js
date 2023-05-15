function generarTeclado() {
    // Array de números del 0 al 9
    var numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    // Desordenar el array de números aleatoriamente
    numeros.sort(function() { return 0.5 - Math.random() });
}