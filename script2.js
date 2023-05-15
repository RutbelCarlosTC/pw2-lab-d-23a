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
// Función para actualizar la visualización de la pila
function updateStackDisplay() {
    const stackElement = document.getElementById("stack");
    stackElement.innerHTML = ""; // Limpiar la visualización actual
  
    // Crear elementos de lista para cada elemento de la pila
    stack.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      stackElement.appendChild(listItem);
    });
}