const screen = document.querySelector('.screen');
const memory = {
    m1: null,
    m2: null
};
let stack = [];
function handleButton(value) {
    screen.textContent += value;
}

function handleCalculate() {
    const result = eval(screen.textContent);
    stack.push(result);
    screen.textContent = '';
}
function saveToMemory(memoryIndex) {
    const result = screen.textContent;
    if (memoryIndex === 1) {
      memory.m1 = result;
    } else if (memoryIndex === 2) {
      memory.m2 = result;
    }
    screen.textContent = '';
}