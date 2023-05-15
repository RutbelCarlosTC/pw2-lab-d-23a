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