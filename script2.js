// Pila para almacenar los datos
const stack = [];
// Función para manejar el evento de tecla presionada
function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita que el formulario se envíe
  
      const display = document.getElementById("display");
      const input = display.value.trim();
  
      if (input !== "") {
        addToStack(input);
        display.value = "";
      }
    }
}
// Función para agregar un elemento a la pila
function addToStack(item) {
    stack.push(item);
    updateStackDisplay();
}